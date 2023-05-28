import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'

import jsend from '@/lib/api/jsend'
import clientPromise from '@/lib/db'
import Account from '@/lib/db/models/Account'
import { Team } from '@/lib/db/models/Team'
import logger from '@/lib/logger'
import { dedupe, siteName, siteUrl, stringifyError } from '@/lib/utils/server'

const BodySchema = z.object({
	name: z.string(),
	members: z.array(z.string()),
})

// We can't add env vars ;(
const Secret = 's0sbmf2pAQWr9Up20yB7pQ6ywi1mg5zRdCNqNZdgxHd4O509UF912qizOWSeH7m'

export async function POST(request: NextRequest) {
	try {
		if (request.nextUrl.searchParams.get('secret') !== Secret) {
			throw new Error('Unauthorized')
		}

		const body = BodySchema.parse(await request.json())
		body.members = dedupe(body.members)
		if (body.members.length <= 1) {
			throw new Error('You must have at least 2 members in a team!')
		}

		const client = await clientPromise
		const existingTeam = await client
			.db()
			.collection<Team>('teams')
			.findOne({ name: body.name })
		if (existingTeam) {
			throw new Error(`There's already a team with the name '${body.name}'`)
		}

		const accounts = await client
			.db()
			.collection<Account>('accounts')
			.find({
				provider: 'discord',
				providerAccountId: { $in: body.members },
			})
			.toArray()
		if (accounts.length !== body.members.length) {
			const diff = body.members.filter(
				(m) => !accounts.some((a) => a.providerAccountId === m),
			)
			throw new Error(
				`${diff.map((id) => `<@${id}>`).join(', ')}
Please link your Discord account on the ${siteName} website before creating a team:
<${siteUrl}>`,
			)
		}

		const userIds = accounts.map((a) => a.userId)
		const conflictingTeam = await client
			.db()
			.collection<Team>('teams')
			.findOne({
				members: { $in: userIds },
			})
		if (conflictingTeam) {
			throw new Error(
				`Some users are already in another team: '${conflictingTeam.name}'`,
			)
		}

		await client.db().collection<Team>('teams').insertOne({
			name: body.name,
			members: userIds,
		})

		return NextResponse.json(jsend.success(undefined))
	} catch (e) {
		logger.warn(e, '[/team/create]')
		return NextResponse.json(jsend.error(stringifyError(e)))
	}
}
