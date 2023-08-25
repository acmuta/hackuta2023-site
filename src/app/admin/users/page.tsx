import { queryDbForItems } from '@/app/utils';
import User from '@/lib/db/models/User';

import styles from './users.module.css'; // Import the CSS module

export default async function Users() {
	const users = await queryDbForItems<User>(
		'users',
		'[@/app/admin/users/page.tsx]',
	)

	if (!users) {
		return <p>Error fetching users data.</p>
	}

	return (
		<div>
			<h2>Users</h2>
			<table className={styles.usersTable}> {/* Use className to apply CSS module */}
				<thead>
					<tr>
						<th>Email</th>
						<th>Roles</th>
						<th>Email Verified</th>
						<th>Applied</th>
						<th>Application Status</th>
						<th>Application Decided</th>
						<th>Received Email Tags</th>
						<th>Check in Pin</th>
						<th>Checked in</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={index}>
							<td>{user.email}</td>
							<td>{user.roles.join(', ')}</td>
							<td>{user.emailVerified ? user.emailVerified.toISOString() : 'Not Verified'}</td>
							<td className={styles.spacedCell}>
								{user.applied ? user.applied.toISOString() : 'Not Applied'}
							</td>
							<td>{user.applicationStatus || 'N/A'}</td>
							<td>{user.applicationDecided ? user.applicationDecided.toISOString() : 'Not Decided'}</td>
							<td>{user.receivedEmailTags?.join(', ') || 'No Tags'}</td>
							<td>{user.checkInPin || 'Not Set'}</td>
							<td>{user.checkedIn ? user.checkedIn.toISOString() : 'Not Checked In'}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
