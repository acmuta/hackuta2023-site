import '@/node-only'

import clientPromise from '../db'
import { AppPermissions, Role } from '../db/models/Role'
import User from '../db/models/User'
import { mergePermission, UnauthedPerms } from './shared'

export * from './shared'

export async function getUserPerms(user: User | null): Promise<AppPermissions> {
	const roles = [
		...(user ? ['@authenticated'] : []),
		...(user?.roles ?? []),
	]
	const client = await clientPromise
	const perms = (await client.db()
		.collection<Role>('roles')
		.find({
			_id: { $in: roles },
		})
		.toArray())
		.map((v) => v.granted)
	return mergePermission(UnauthedPerms, ...perms)
}
