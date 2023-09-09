import { useEffect, useState } from 'react';

import User from '@/lib/db/models/User';

import styles from './users.module.css';

export default function Users() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchUsers() {
			try {
				const response = await fetch('/api/user'); // Adjust this if your API route has a different path
				const data = await response.json();
				if (data.status === 'success') {
					setUsers(data.data);
				} else {
					setError(data.message || "An error occurred while fetching data.");
				}
			} catch (error) {
				console.error("Failed to fetch users:", error);
				setError("An error occurred while fetching data.");
			} finally {
				setLoading(false);
			}
		}

		fetchUsers();
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<div>
			<h2>User List</h2>
			<table className={styles.usersTable}>
				<thead>
					<tr>
						<th>Email</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Roles</th>
						<th>Application Status</th>
						<th>Received Email Tags</th>
						<th>Check in Pin</th>
						<th>Checked in</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={index}>
							<td>{user.email}</td>
							<td>{user.application?.firstName || 'N/A'}</td>
							<td>{user.application?.lastName || 'N/A'}</td>
							<td>{user.roles?.join(', ') || 'N/A'}</td>
							<td>{user.applicationStatus || 'N/A'}</td>
							<td>{user.receivedEmailTags?.join(', ') || 'No Tags'}</td>
							<td>{user.checkInPin || 'Not Set'}</td>
							<td>{user.checkedIn ? user.checkedIn.toISOString() : 'Not Checked In'}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
