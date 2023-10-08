'use client'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'

import { JsonUser } from '@/lib/db/models/User'

import { AppPermissions } from '@/lib/db/models/Role'
import { useImmer } from 'use-immer'

export interface UserDataTableProps {
	users: JsonUser[]
	perms: AppPermissions
	allRoles: readonly string[]
}

export default function UserDataTable({
	users: initialUsers,
}: UserDataTableProps) {
	const [users] = useImmer(initialUsers)

	const sortedUsers = [...users].sort((a, b) =>
		(b.pointsObtained || 0) - (a.pointsObtained || 0)
	)

	const modifiedUsers = sortedUsers.map((user) => {
		return {
			...user,
			pointsObtained: user.pointsObtained === undefined
				? 0
				: user.pointsObtained,
		}
	})

	return (
		<div className="flex flex-col gap-2">
			<h2 className="text-2xl font-bold mb-2">Leaderboard</h2>
			<DataTable
				value={modifiedUsers}
				// pagination
				paginator
				rows={5}
				rowsPerPageOptions={[5, 10, 25, 50]}
				// row expansion

				// selection
				selectionPageOnly
				// sort
				removableSort
				sortMode="multiple"
				// misc
				className="text-sm shadow-md rounded-lg"
				emptyMessage="No users found."
			>
				<Column expander />
				<Column header="Email" field="email" filter />
				<Column
					header="First Name"
					field="application.firstName"
					filter
				/>
				<Column
					header="Last Name"
					field="application.lastName"
					filter
				/>
				<Column
					header="Points"
					field="pointsObtained"
					sortField="pointsObtained"
					sortable
				/>
			</DataTable>
		</div>
	)
}
