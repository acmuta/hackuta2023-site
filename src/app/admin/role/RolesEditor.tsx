'use client'

import { Button } from '@/components/Button'
import { Role } from '@/lib/db/models/Role'
import { stringifyError } from '@/lib/utils/shared'
import { EyeEmpty } from 'iconoir-react'
import { useState } from 'react'

export interface RolesEditorProps {
	roles: readonly Role[]
}

export function RolesEditor({ roles }: RolesEditorProps) {
	const [selectedRole, setSelectedRole] = useState<string>()
	return selectedRole
		? (
			<RoleEditor
				role={selectedRole}
				onExit={() => setSelectedRole(undefined)}
			/>
		)
		: <RoleList roles={roles} onRoleSelected={setSelectedRole} />
}

interface RoleListProps {
	roles: readonly Role[]
	onRoleSelected?: (role: string) => void
}
function RoleList({ roles, onRoleSelected }: RoleListProps) {
	return (
		<ul className="border border-black">
			{roles.map((r) => (
				<li
					key={r._id}
					className="flex w-full border border-black"
				>
					<button
						className="p-2 flex-1 text-left active:text-white hover:text-white"
						onClick={() => onRoleSelected?.(r._id)}
					>
						{r._id}
					</button>
					<button
						title="View As"
						className="p-2 active:text-white hover:text-white"
						onClick={async () => {
							try {
								const response = await fetch(
									`/admin/role/view-as/${r._id}`,
									{
										method: 'POST',
									},
								)
								const content = await response.json()
								if (content?.status !== 'success') {
									throw new Error('Error')
								}
								window.location.reload()
							} catch (e) {
								alert(stringifyError(e))
							}
						}}
					>
						<EyeEmpty aria-label="View As" />
					</button>
				</li>
			))}
		</ul>
	)
}

interface RoleEditorProps {
	role: string
	onExit?: () => void
}
function RoleEditor({ role, onExit }: RoleEditorProps) {
	return (
		<article className="flex flex-col gap-2">
			<header className="text-lg font-bold">{role}</header>
			<Button kind="secondary" onClick={onExit}>Back</Button>
		</article>
	)
}
