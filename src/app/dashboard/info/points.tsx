'use client'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'

export interface UserDataTableProps {
	users: { name: string; pointsObtained: number }[]
}

export default function UserDataTable({
	users,
}: UserDataTableProps) {
	return (
		<div className="flex flex-col gap-2">
			<h2 className="text-2xl font-bold mb-2">Leaderboard</h2>
			<DataTable
				value={users}
				// pagination
				paginator
				rows={5}
				rowsPerPageOptions={[5, 10, 25, 50]}
				// sort
				sortMode="multiple"
				// misc
				className="text-sm shadow-md rounded-lg"
				emptyMessage="No users found."
			>
				<Column
					header="Name"
					field="name"
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
