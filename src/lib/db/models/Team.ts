import { Condition, ObjectId, WithId } from 'mongodb'

import clientPromise from '../index'
import User from './User'

export interface Team {
	name: string
	members: ObjectId[]
}

export type IdentifieableTeam = ObjectId | string | Team

export function getTeamFilter(team: IdentifieableTeam): Condition<Team> {
	if (typeof team === 'string') {
		return { name: team }
	} else if (team instanceof ObjectId) {
		return { _id: team }
	} else {
		return team
	}
}

export interface ResolvedTeam extends Team {
	memberUsers: WithId<User>[]
}

export async function getResolvedTeams(): Promise<ResolvedTeam[]> {
	const client = await clientPromise
	return (await client
		.db()
		.collection<Team>('teams')
		.aggregate([
			{
				$lookup: {
					from: 'users',
					localField: 'members',
					foreignField: '_id',
					as: 'memberUsers',
				},
			},
		])
		.toArray()) as ResolvedTeam[]
}

export async function resolveTeam(
	team: IdentifieableTeam,
): Promise<ResolvedTeam | undefined> {
	const client = await clientPromise
	return (
		await client
			.db()
			.collection<Team>('teams')
			.aggregate([
				{
					$match: getTeamFilter(team),
				},
				{
					$lookup: {
						from: 'users',
						localField: 'members',
						foreignField: '_id',
						as: 'memberUsers',
					},
				},
			])
			.toArray()
	)[0] as ResolvedTeam | undefined
}
