'use client'

import { Attachment, InfoEmpty } from 'iconoir-react'
import Link from 'next/link'
import { Column } from 'primereact/column'
import {
	DataTable,
	DataTableExpandedRows,
	DataTableValueArray,
} from 'primereact/datatable'
import { ReactFragment, useState } from 'react'
import { twJoin } from 'tailwind-merge'

import { Button } from '@/components/Button'
import { AppPermissions, hasPermission } from '@/lib/auth/shared'
import { BlockedHacker } from '@/lib/db/models/BlockedHacker'
import User, { Application } from '@/lib/db/models/User'
import { stringifyError } from '@/lib/utils/shared'

import JsonEditor from '../JsonEditor'
import { ApplicationDecideRequestBody } from './decide/route'

export type Row = Omit<Application, 'resume'> & {
	email: string
	resume: boolean
	status: 'accepted' | 'rejected' | 'waitlisted' | 'undecided'
}

export interface ApplicantDataTableProps {
	applications: Row[]
	blockedHackers: readonly BlockedHacker[]
	perms: AppPermissions
}

export default function ApplicantDataTable({
	applications,
	blockedHackers,
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
	const hasBlocklistPerm = hasPermission(perms, {
		administration: { application: { blocklist: true } },
	})

	const isBlocked = (r: Row) =>
		blockedHackers.some(
			(b) =>
				`${b.first_name} ${b.last_name}` === `${r.firstName} ${r.lastName}`,
		)

	interface DisqualifierFieldProps {
		children: ReactFragment | number
		criterionName?: string
		disqualified: boolean
	}

	const DisqualifierField = ({
		children,
		criterionName,
		disqualified,
	}: DisqualifierFieldProps) => (
		<div
			className={twJoin(
				disqualified ? 'bg-hackuta-red text-white' : '',
				'p-2',
			)}
		>
			{children}
			{disqualified && criterionName ? ` (${criterionName})` : ''}
		</div>
	)

	const decide = async (decision: NonNullable<User['applicationStatus']>) => {
		try {
			await fetch('/admin/applications/decide', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(
					{
						decision,
						emails: selectedRows.map((r) => r.email),
					} satisfies ApplicationDecideRequestBody,
				),
			})
			window.location.reload()
		} catch (e) {
			console.error(e)
			alert(stringifyError(e))
		}
	}

	return (
		<div className="flex flex-col gap-2">
			<p>
				Total Applications: {applications.length}.{' '}
				<Link href={`/admin/applications/resume`} target="_blank" download>
					Download All Resume
				</Link>
			</p>
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
				<Column
					header="First Name"
					field="firstName"
					body={(r: Row) => (
						<DisqualifierField disqualified={isBlocked(r)}>
							{r.firstName}
						</DisqualifierField>
					)}
					filter
					sortable
				/>
				<Column
					header="Last Name"
					field="lastName"
					body={(r: Row) => (
						<DisqualifierField
							criterionName="BLOCKED"
							disqualified={isBlocked(r)}
						>
							{r.lastName}
						</DisqualifierField>
					)}
					filter
					sortable
				/>
				<Column
					header="Age"
					field="age"
					body={(r: Row) => (
						<DisqualifierField
							criterionName="UNDER18"
							disqualified={r.age < 18}
						>
							{r.age}
						</DisqualifierField>
					)}
					filter
					sortable
				/>
				<Column header="School" field="school" filter sortable />
				<Column
					header="Country of Residence"
					field="countryOfResidence"
					filter
					sortable
				/>
				<Column
					header="Misc"
					body={(r: Row) => (
						<div className="flex gap-1">
							{r.resume
								? (
									<Link
										href={`/admin/applications/resume/${r.email}`}
										title="Download resume"
										target="_blank"
										download
									>
										<Attachment aria-hidden />
									</Link>
								)
								: undefined}
							{r.catchall
								? (
									<button
										title={`View other information applicant'd like to share`}
										onClick={() =>
											alert(
												`The applicant also would like to share:\n${r.catchall}`,
											)}
									>
										<InfoEmpty aria-hidden />
									</button>
								)
								: undefined}
						</div>
					)}
				/>
				<Column
					header="Status"
					field="status"
					body={(r: Row) => (
						<span
							className={twJoin(
								r.status === 'accepted'
									? 'bg-[green] text-white'
									: r.status === 'waitlisted'
									? 'bg-hackuta-yellow text-black'
									: r.status === 'rejected'
									? 'bg-hackuta-red text-white'
									: 'bg-black text-white',
								'p-2',
							)}
						>
							{r.status}
						</span>
					)}
					filter
					sortable
				/>
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
			{hasBlocklistPerm && (
				<details className="border-2 border-black p-2 mt-2">
					<summary>Blocklist</summary>
					<JsonEditor
						postUrl="/admin/applications/blocklist"
						schema="blocked_hacker"
						text={JSON.stringify(blockedHackers, undefined, 4)}
					/>
				</details>
			)}
		</div>
	)
}
