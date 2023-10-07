'use client'

import { Column } from 'primereact/column'
import {
	DataTable,
	DataTableExpandedRows,
	DataTableValueArray,
} from 'primereact/datatable'
import { useState } from 'react'

import { hasPermission } from '@/lib/auth/shared'
import { getFullName, JsonUser } from '@/lib/db/models/User'

import { AppPermissions } from '@/lib/db/models/Role'
import { dedupe, printRoles, stringifyError } from '@/lib/utils/shared'
import { AddCircle, Cancel, Circle } from 'iconoir-react'
import { twJoin } from 'tailwind-merge'
import { useImmer } from 'use-immer'

export interface UserDataTableProps {
	users: JsonUser[]
	perms: AppPermissions
	allRoles: readonly string[]
}

export default function UserDataTable({
	allRoles,
	users: initialUsers,
	perms,
}: UserDataTableProps) {
	const [selectedRows, setSelectedRows] = useState<JsonUser[]>([])
	const [expandedRows, setExpandedRows] = useState<
		DataTableValueArray | DataTableExpandedRows
	>()

	const [users, setUsers] = useImmer(initialUsers)

	const hasWriteRolePerm = hasPermission(perms, {
		administration: { user: { writeRole: true } },
	})

	return (
		<div className="flex flex-col gap-2">
			<DataTable
				value={users}
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
				emptyMessage="No users found."
				showGridlines
			>
				{/* {hasWriteRolePerm && <Column selectionMode="multiple" />} */}
				<Column expander />
				<Column header="Email" field="email" filter sortable />
				<Column
					header="First Name"
					field="application.firstName"
					filter
					sortable
				/>
				<Column
					header="Last Name"
					field="application.lastName"
					filter
					sortable
				/>
				<Column
					header="Roles"
					field="roles"
					filter
					filterMatchMode="contains"
					body={(user: JsonUser) => (
						hasWriteRolePerm
							? (
								<RolesCell
									uid={user._id}
									uname={user.application
										? getFullName(user)
										: user.email}
									roles={user.rolesActual ?? user.roles}
									allRoles={allRoles}
									onAddRole={(r) => {
										setUsers((draft) => {
											const draftUser = draft.find((u) =>
												u._id === user._id
											)!
											draftUser.roles = dedupe([
												...draftUser.roles ?? [],
												r,
											])
										})
									}}
									onRemoveRole={(r) => {
										setUsers((draft) => {
											const draftUser = draft.find((u) =>
												u._id === user._id
											)!
											draftUser.roles = (draftUser.roles ?? [])
												.filter((v) => v !== r)
										})
									}}
								/>
							)
							: printRoles(user.rolesActual ?? user.roles)
					)}
				/>
				<Column
					header="Check-In PIN"
					field="checkInPin"
					filter
					sortable
				/>
				<Column header="Hex ID" field="hexId" filter sortable />
			</DataTable>
		</div>
	)
}

interface RolesCellProps {
	allRoles: readonly string[]
	uid: string
	uname: string
	roles: readonly string[] | undefined
	onAddRole: (role: string) => void
	onRemoveRole: (role: string) => void
}
function RolesCell(
	{ uid, uname, roles = [], allRoles, onAddRole, onRemoveRole }:
		RolesCellProps,
) {
	roles = dedupe(['hacker', ...roles])
	const additionalRoles = [...allRoles].filter((r) => !roles.includes(r))
		.sort()
	return (
		<div className="flex  gap-2">
			{roles.map((r) => (
				<RoleButton
					key={r}
					uid={uid}
					role={r}
					onRemoveRole={() => onRemoveRole(r)}
				/>
			))}
			{!!additionalRoles.length && (
				<AddRoleButton
					additionalRoles={additionalRoles}
					uid={uid}
					uname={uname}
					onAddRole={onAddRole}
				/>
			)}
		</div>
	)
}

interface RoleButtonProps {
	uid: string
	role: string
	onRemoveRole: () => void
}
function RoleButton({ uid, role, onRemoveRole }: RoleButtonProps) {
	const [hovered, setHovered] = useState(false)
	const Icon = hovered ? Cancel : Circle
	const removeRole = async () => {
		try {
			const response = await fetch(
				`/admin/user/role/remove/${uid}/${role}`,
				{
					method: 'POST',
				},
			)
			const obj = await response.json()
			if (obj.status !== 'success') {
				throw new Error(JSON.stringify(obj))
			}
			onRemoveRole()
		} catch (e) {
			alert(stringifyError(e))
		}
	}
	return (
		<button
			title={`Remove ${role}`}
			className={twJoin(
				'flex gap-1 items-center border rounded-md p-1',
				hovered
					? 'text-hackuta-red border-hackuta-red'
					: 'text-[rgb(73,80,87)] border-[rgb(73,80,87)]',
			)}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onClick={removeRole}
			disabled={role === 'hacker'}
		>
			<Icon className="w-3 h-3" aria-label="" />
			<span>{role}</span>
		</button>
	)
}

interface AddRoleButtonProps {
	additionalRoles: readonly string[]
	uid: string
	uname: string
	onAddRole: (role: string) => void
}
function AddRoleButton(
	{ additionalRoles, uid, uname, onAddRole }: AddRoleButtonProps,
) {
	const [hovered, setHovered] = useState(false)
	const addRole = async () => {
		try {
			const roleIdxStr = prompt(
				`Index of role to add to ${uname}:\n${
					additionalRoles.map((r, i) => `${i}: ${r}`).join('\n')
				}`,
			)
			if (roleIdxStr == null) {
				return
			} else if (!/^\d+$/.test(roleIdxStr)) {
				throw new Error('Type a number')
			}
			const roleIdx = parseInt(roleIdxStr)
			if (roleIdx < 0 || roleIdx >= additionalRoles.length) {
				throw new Error('Role index out of range')
			}

			const role = additionalRoles[roleIdx]
			const response = await fetch(
				`/admin/user/role/add/${uid}/${role}`,
				{
					method: 'POST',
				},
			)
			const obj = await response.json()
			if (obj.status !== 'success') {
				throw new Error(JSON.stringify(obj))
			}
			onAddRole(role)
		} catch (e) {
			alert(stringifyError(e))
		}
	}
	return (
		<button
			title="Add Role"
			className={twJoin(
				'border rounded-md p-1',
				hovered
					? 'text-hackuta-red border-hackuta-red'
					: 'text-[rgb(73,80,87)] border-[rgb(73,80,87)]',
			)}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onClick={addRole}
		>
			<AddCircle className="w-3 h-3" aria-label="Add Role" />
		</button>
	)
}
