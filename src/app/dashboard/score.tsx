import clientPromise from '@/lib/db'
import User, { getFullName } from '@/lib/db/models/User'
import UserDataTable from './info/points'

export default async function Users() {
	const client = await clientPromise
	const users = (await client.db()
		.collection<User>('users')
		.find({ pointsObtained: { $gt: 0 } }, {
			projection: { 'application.resume': 0 },
		})
		.sort({ pointsObtained: 'descending' })
		.toArray())
		.map((u) => ({ name: getFullName(u), pointsObtained: u.pointsObtained! }))
	return (
		<>
			<UserDataTable
				users={users}
			/>
			<br />
		</>
	)
}
