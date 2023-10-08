import clientPromise from '@/lib/db'
import { Role } from '@/lib/db/models/Role'
import User from '@/lib/db/models/User'
import { getEnhancedSession } from '@/lib/utils/server'
import { headers } from 'next/headers'
import UserDataTable from './info/points'

export default async function Users() {
	const { perms } = getEnhancedSession(headers())
	const client = await clientPromise
	const roles = await client.db()
		.collection<Role>('roles')
		.find({}, { projection: { granted: 0 } })
		.toArray()
	const users = await client.db()
		.collection<User>('users')
		.find({}, { projection: { 'application.resume': 0 } })
		.toArray()
	return (
		<>
			<UserDataTable
				allRoles={roles.map((r) => r._id)}
				users={JSON.parse(JSON.stringify(users))}
				perms={perms}
			/>
			<br />
		</>
	)
}
