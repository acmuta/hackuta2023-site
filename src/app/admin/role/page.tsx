import clientPromise from '@/lib/db'
import { Role } from '@/lib/db/models/Role'
import { RolesEditor } from './RolesEditor'

export default async function AdminRolePage() {
	const client = await clientPromise
	const roles = await client.db()
		.collection<Role>('roles')
		.find()
		.sort({ _id: 1 })
		.toArray()
	return <RolesEditor roles={roles} />
}
