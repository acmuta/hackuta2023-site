import clientPromise from '@/lib/db'
import User from '@/lib/db/models/User'

import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function PrintPage() {
	const client = await clientPromise
	const users = await client
		.db()
		.collection<User>('users')
		.find({ applicationStatus: 'accepted' })
		.sort({
			'application.lastName': 'ascending',
			'application.firstName': 'ascending',
		})
		.limit(0)
		.toArray()
	return (
		<table className="borderTable alternatingTableBg">
			<tbody>
				<tr className={styles.headerRow}>
					<th>Name</th>
					<th></th>
					<th></th>
					<th></th>
					<th></th>
					<th></th>
					<th></th>
					<th></th>
					<th></th>
				</tr>
				{...users.map((user) => (
					<tr key={user.email}>
						<td>
							{user.application?.lastName}, {user.application?.firstName}
						</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
