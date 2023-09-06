'use client'

import { DownloadSquare } from 'iconoir-react'
import { Column } from 'primereact/column'
import {
	DataTable,
	DataTableExpandedRows,
	DataTableValueArray,
} from 'primereact/datatable'
import { useState } from 'react'

import { Button } from '@/components/Button'
import { AppPermissions, hasPermission } from '@/lib/auth/shared'
import User, { Application } from '@/lib/db/models/User'
import { stringifyError } from '@/lib/utils/shared'

import { ApplicationDecideRequestBody } from './decide/route'

export type Row = Application & {
	email: string
	status: 'accepted' | 'rejected' | 'waitlisted' | 'undecided'
}

export interface ApplicantDataTableProps {
	applications: Row[]
	perms: AppPermissions
}

export default function ApplicantDataTable({
	applications,
	perms,
}: ApplicantDataTableProps) {
	const [selectedRows, setSelectedRows] = useState<Row[]>([])
	const [expandedRows, setExpandedRows] = useState<
		DataTableValueArray | DataTableExpandedRows
	>()

	const hasSensitivePerm = hasPermission(perms, {
		administration: { application: { sensitive: true } },
	})
	const hasDecisionPerm = hasPermission(perms, {
		administration: { application: { decision: true } },
	})

	const decide = async (decision: NonNullable<User['applicationStatus']>) => {
		try {
			await fetch('/admin/applications/decide', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					decision,
					emails: selectedRows.map((r) => r.email),
				} satisfies ApplicationDecideRequestBody),
			})
			window.location.reload()
		} catch (e) {
			console.error(e)
			alert(stringifyError(e))
		}
	}

	return (
		<div className="flex flex-col gap-2">
			<DataTable
				value={applications}
				// pagination
				paginator
				rows={5}
				rowsPerPageOptions={[5, 10, 25, 50]}
				// row expansion
				expandedRows={expandedRows}
				onRowToggle={(e) => setExpandedRows(e.data)}
				rowExpansionTemplate={(r) => (
					<pre className="overflow-auto max-w-[600px]">
						<code>{JSON.stringify(r, undefined, '\t')}</code>
					</pre>
				)}
				// selection
				selectionMode="checkbox"
				selection={selectedRows}
				onSelectionChange={(e) => setSelectedRows(e.value)}
				selectionPageOnly
				// sort
				removableSort
				sortMode="multiple"
				// misc
				className="text-sm"
				emptyMessage="No applications found."
				showGridlines
			>
				{hasDecisionPerm && <Column selectionMode="multiple" />}
				{hasSensitivePerm && <Column expander />}
				<Column header="First Name" field="firstName" filter sortable />
				<Column header="Last Name" field="lastName" filter sortable />
				<Column header="Age" field="age" filter sortable />
				<Column header="School" field="school" filter sortable />
				<Column
					header="Country of Residence"
					field="countryOfResidence"
					filter
					sortable
				/>
				<Column
					header="Resume"
					body={(r: Row) =>
						r.resume?.startsWith('data:application/pdf;base64,') ? (
							<DownloadSquare
								className="cursor-pointer"
								onClick={() => {
									const a = document.createElement('a')
									a.download = `${r.firstName} ${r.lastName}.pdf`
									a.href = r.resume!
									a.click()
								}}
							/>
						) : (
							'N/A'
						)
					}
				/>
				<Column header="Status" field="status" filter sortable />
			</DataTable>
			{hasDecisionPerm && (
				<>
					<span>{selectedRows.length} row(s) selected</span>
					<div className="flex flex-row gap-2">
						<Button
							disabled={!selectedRows.length}
							onClick={decide.bind(undefined, 'accepted')}
						>
							Accept
						</Button>
						<Button
							kind="secondary"
							className="bg-hackuta-yellow"
							disabled={!selectedRows.length}
							onClick={decide.bind(undefined, 'waitlisted')}
						>
							Waitlist
						</Button>
						<Button
							kind="secondary"
							className="bg-hackuta-red"
							disabled={!selectedRows.length}
							onClick={decide.bind(undefined, 'rejected')}
						>
							Reject
						</Button>
					</div>
				</>
			)}
		</div>
	)
}
