'use client'

import { Role } from '@/lib/db/models/Role'
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
		<ul>
			{roles.map((r) => (
				<li key={r._id}>
					<button onClick={() => onRoleSelected?.(r._id)}>
						{r._id}
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
		<>
			{role}
			<button onClick={onExit}>Back</button>
		</>
	)
}
