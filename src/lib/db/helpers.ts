import { Condition, ObjectId } from 'mongodb'

import clientPromise from '.'
import Account from './models/Account'
import User, { IdentifieableUser } from './models/User'

export function getUserFilter(user: IdentifieableUser): Condition<User> {
	if (typeof user === 'string') {
		return { email: user }
	} else if (user instanceof ObjectId) {
		return { _id: user }
	} else {
		return user
	}
}

export async function getDiscordIdOf(
	user: ObjectId,
): Promise<string | undefined> {
	const client = await clientPromise
	return (
		await client.db().collection<Account>('accounts').findOne({
			provider: 'discord',
			userId: user,
		})
	)?.providerAccountId
}
