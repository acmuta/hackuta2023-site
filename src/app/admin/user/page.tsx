// const UserPerPage = 25

import Link from 'next/link'

export default async function Users() {
	return (
		<>
			<br />
			<Link href="/admin/user/print">
				Print a table of all accepted users
			</Link>
		</>
	)
}
