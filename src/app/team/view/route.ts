import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'

import jsend from '@/lib/api/jsend'
import clientPromise from '@/lib/db'
import Account from '@/lib/db/models/Account'
import { Team } from '@/lib/db/models/Team'
import logger from '@/lib/logger'
import { siteName, siteUrl, stringifyError } from '@/lib/utils/server'

const BodySchema = z.object({
	member: z.string(),
})

interface ResultData {
	team_name: string
	members: string[]
}

// We can't add env vars ;(
const Secret = 's0sbmf2pAQWr9Up20yB7pQ6ywi1mg5zRdCNqNZdgxHd4O509UF912qizOWSeH7m'

export async function POST(request: NextRequest) {
	try {
		if (request.nextUrl.searchParams.get('secret') !== Secret) {
			throw new Error('Unauthorized')
		}

		const body = BodySchema.parse(await request.json())
		const client = await clientPromise
		const account = await client.db().collection<Account>('accounts').findOne(
			{
				provider: 'discord',
				providerAccountId: body.member,
			},
		)
		if (!account) {
			throw new Error(
				`Please link your Discord account on the ${siteName} website before creating a team:
<${siteUrl}>`,
			)
		}

		const team = await client
			.db()
			.collection<Team>('teams')
			.findOne({ members: account.userId })
		if (!team) {
			return NextResponse.json(jsend.success(null))
		}

		const memberAccounts = await client
			.db()
			.collection<Account>('accounts')
			.find({
				provider: 'discord',
				userId: { $in: team.members },
			})
			.toArray()

		return NextResponse.json(
			jsend.success(
				{
					team_name: team.name,
					members: memberAccounts.map((a) => a.providerAccountId),
				} satisfies ResultData,
			),
		)
	} catch (e) {
		logger.error(e, '[/team/create]')
		return NextResponse.json(jsend.error(stringifyError(e)))
	}
}
