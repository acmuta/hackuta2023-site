import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { MongoClient, WithId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { AuthOptions, getServerSession } from 'next-auth'
import { OAuthConfig, OAuthUserConfig } from 'next-auth/providers'
import DiscordProvider from 'next-auth/providers/discord'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import GitLabProvider from 'next-auth/providers/gitlab'
import GoogleProvider from 'next-auth/providers/google'
import TwitterProvider from 'next-auth/providers/twitter'

import {
	EnhancedSession,
	getUserPerms,
	RolePermissionMap,
} from '@/lib/auth/server'
import clientPromise from '@/lib/db'
import User from '@/lib/db/models/User'
import sendEmail from '@/lib/email'
import logger from '@/lib/logger'
import { getUser, siteName } from '@/lib/utils/server'
import { randomInt } from 'crypto'

const { NEXTAUTH_SECRET: secret, NEXTAUTH_DISABLE_EMAIL: disableEmail } =
	process.env
if (!secret) {
	throw new Error('Invalid/Missing environment variable: "NEXTAUTH_SECRET"')
}

const SupportedProviders = new Map<
	string,
	(options: OAuthUserConfig<any>) => OAuthConfig<any>
>([
	['discord', DiscordProvider],
	['github', GitHubProvider],
	['gitlab', GitLabProvider],
	['google', GoogleProvider],
	['twitter', TwitterProvider],
])

function* getOAuthProviders(): Generator<OAuthConfig<any>> {
	for (const [name, provider] of SupportedProviders) {
		const idEnvName = `OAUTH_${name.toUpperCase()}_ID`
		const secretEnvName = `OAUTH_${name.toUpperCase()}_SECRET`
		const { [idEnvName]: id, [secretEnvName]: secret } = process.env

		// Skip if neither id nor secret were supplied.
		// Log a warning if only one of them is supplied.
		if (!(id && secret)) {
			if (id || secret) {
				logger.warn(
					`Missing "${idEnvName}" or "${secretEnvName}" environment variable.`,
				)
			}
			continue
		}

		yield provider({
			clientId: id,
			clientSecret: secret,
			allowDangerousEmailAccountLinking: true,
		})
	}
}

export const authOptions: AuthOptions = {
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		...getOAuthProviders(),
		...(disableEmail === 'true'
			? []
			: [
				EmailProvider({
					async sendVerificationRequest(params) {
						const { identifier, url } = params
						try {
							await sendEmail({
								to: [{ email: identifier }],

								subject: `Sign in to your ${siteName} account`,

								html: `<body>
<p>Hello,</p>
<p>Follow this link to sign in to your ${siteName} account.</p>
<p><a href="${url}">${url}</a></p>
<p>
Thanks,<br>
${siteName} Team
</p>
</body>`,
								text: `Hello,

Follow this link to sign in to your ${siteName} account.

${url}

Thanks,
${siteName} Team`,
							})
						} catch (e) {
							logger.error(e, '[NextAuth] send email')
						}
					},
				}),
			]),
	],
	secret,
}

/**
 * @deprecated use {@link import('@/lib/utils/server').getEnhancedSession}
 */
export async function getServerUser(
	client: MongoClient,
	req?: NextApiRequest,
	res?: NextApiResponse<any>,
): Promise<WithId<User> | null> {
	try {
		const session = await getServerSession(
			...(req && res ? [req, res, authOptions] : [authOptions]),
		)
		if (!session?.user?.email) {
			return null
		}
		return getUser(client, session.user.email)
	} catch (e) {
		logger.error(e, '[getServerUser]')
		return null
	}
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	// https://next-auth.js.org/tutorials/avoid-corporate-link-checking-email-provider
	if (req.method === 'HEAD') {
		return res.status(200).end()
	}

	const routeName = 'enhanced-session'
	if (
		req.query.nextauth?.length === 1 && req.query.nextauth[0] === routeName
	) {
		try {
			const client = await clientPromise
			// This is the only place where getServerUser should be used
			// All other instances of getServerUser should be replaced by getEnhancedSession
			const user = await getServerUser(client, req, res)
			const perms = await getUserPerms(user)
			if (user?.application) {
				user.application.resume = user.application.resume ? 'exists' : ''
			}
			if (user && (!user.checkInPin || user.checkInPin < 100_000)) {
				// Generate check-in PIN
				for (let i = 0; i < 3; i++) {
					// Retry at most two times.
					try {
						const pin = randomInt(100_000, 999_999)
						await client
							.db()
							.collection<User>('users')
							.updateOne(
								{ email: user.email },
								{ $set: { checkInPin: pin } },
							)
						user.checkInPin = pin
						break
					} catch (_ignored) {
						// Ignore
					}
				}
			}
			return res.status(200).json({
				user,
				perms,
			})
		} catch (e) {
			logger.error(e, `[/api/auth/${routeName}]`)
			return res.status(200).json(
				{
					user: null,
					perms: RolePermissionMap['@unauthenticated'],
				} satisfies EnhancedSession,
			)
		}
	}

	return NextAuth(req, res, authOptions)
}
