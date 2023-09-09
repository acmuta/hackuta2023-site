import '@/node-only'

import {
	Document as MongoDocument,
	MongoClient,
	ObjectId,
	WithId,
} from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'
import { headers } from 'next/headers'
import z from 'zod'

import jsend, { NextJSendResponse } from '@/lib/api/jsend'
import User from '@/lib/db/models/User'
import logger from '@/lib/logger'

import { EnhancedSession, RolePermissionMap } from '../auth/shared'
import clientPromise from '../db'
import Account from '../db/models/Account'
import { RenderContext } from './shared'

export * from './shared'

export function isDevelopment() {
	return process.env.NODE_ENV === 'development'
}

export async function getUser(
	client: MongoClient,
	email: string,
): Promise<WithId<User> | null> {
	return client.db().collection<User>('users').findOne({ email })
}

export async function verifyRoles(
	client: MongoClient,
	email: string,
	role: string,
) {
	const user = await getUser(client, email)

	if (!user) {
		throw new Error(`User with email "${email}" not found.`)
	}

	const roles = user.roles ?? []
	return role === 'participant' || roles.includes(role)
}

export async function addRoles(
	client: MongoClient,
	email: string,
	role: string,
) {
	const user = await client
		.db()
		.collection<User>('users')
		.updateOne(
			{ email },
			{
				$addToSet: {
					roles: { $each: ['participant', role] },
				},
			},
		)

	return user
}

export async function getAllDocuments<T extends MongoDocument>(
	client: MongoClient,
	collection: string,
	withId: true,
): Promise<WithId<T[]>>
export async function getAllDocuments<T extends MongoDocument>(
	client: MongoClient,
	collection: string,
	withId?: false,
): Promise<T[]>
export async function getAllDocuments<T extends MongoDocument>(
	client: MongoClient,
	collection: string,
	withId = false,
): Promise<T[]> {
	return (await client
		.db()
		.collection<T>(collection)
		.find({}, withId ? undefined : { projection: { _id: 0 } })
		.toArray()) as T[]
}

export async function paginateDocuments<T extends Document>(
	client: MongoClient,
	collection: string,
	{ limit, after }: { limit: number; after?: ObjectId },
): Promise<T[]> {
	return (await client
		.db()
		.collection<T>(collection)
		.find({ _id: { $gt: after as any } })
		.limit(limit)
		.toArray()) as T[]
}

export const { SITE_NAME: siteName, SITE_URL: siteUrl } = process.env
if (!(siteName && siteUrl)) {
	throw new Error(
		'Invalid/Missing environment variable: "SITE_NAME", "SITE_URL"',
	)
}

export function getEnhancedSession(
	...args:
		| [headers: ReadonlyHeaders]
		| [req: NextApiRequest, res: NextApiResponse]
): EnhancedSession {
	let sessionHeader: string | null | undefined
	if (args.length === 1) {
		const [headers] = args
		sessionHeader = headers.get('x-middleware-session')
	} else {
		const [req] = args
		const value = req.headers['x-middleware-session']
		sessionHeader = Array.isArray(value) ? value[0] : value
	}

	sessionHeader = sessionHeader
		? decodeURIComponent(sessionHeader)
		: sessionHeader

	return sessionHeader
		? JSON.parse(sessionHeader)
		: { user: null, perms: RolePermissionMap['@unauthenticated'] }
}

export async function checkPermissions<TJSendResponse>(
	req: NextApiRequest,
	res: NextJSendResponse<TJSendResponse[]>,
	role: string,
) {
	const { user } = getEnhancedSession(req, res)
	if (!user) {
		throw new Error('Unauthenticated')
	}

	if (!user.roles.includes(role)) {
		throw new Error('Unauthorized')
	}
}

export async function makeApiPostHandler<
	TSchema extends z.ZodType,
	TModel extends MongoDocument,
>(
	req: NextApiRequest,
	res: NextJSendResponse<TModel[]>,
	client: MongoClient,
	schema: TSchema,
	collectionName: string,
) {
	try {
		await checkPermissions<TModel>(req, res, 'admin')

		if (req.method === 'POST') {
			const body = req.body
			const models = schema.array().parse(body)

			await client
				.db()
				.collection<TModel>(collectionName)
				.bulkWrite([
					{
						deleteMany: { filter: {} },
					},
					...models.map((e) => ({
						insertOne: {
							document: e,
						},
					})),
				])

			res.status(200).json(jsend.success(models))
		} else {
			throw new Error(`Unsupported ${req.method}`)
		}
	} catch (e) {
		logger.error(e, req.url)
		res.status(500).json(jsend.error(e))
	}
}

export async function createTemplateRenderContext(): Promise<RenderContext> {
	const { user } = getEnhancedSession(headers())

	const client = await clientPromise
	const discordAccount = user
		? await client
				.db()
				.collection<Account>('accounts')
				.findOne({
					provider: 'discord',
					userId: new ObjectId(user._id),
				})
		: null

	return {
		user,
		linkedDiscordAccount: !!discordAccount,
	}
}
