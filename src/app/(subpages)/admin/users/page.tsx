// const UserPerPage = 25

import Link from 'next/link'

export default async function Users() {
	return (
		<>
			<h2>Users</h2>
			TODO
			<br />
			<Link href="/admin/users/print">Print a table of all accepted users</Link>
		</>
	)
}
