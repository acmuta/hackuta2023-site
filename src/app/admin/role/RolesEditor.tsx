'use client'

import { Role } from '@/lib/db/models/Role'
import { useState } from 'react'
import { RoleEditor } from './RoleEditor'
import { RoleList } from './RoleList'

export interface RolesEditorProps {
	roles: readonly Role[]
}

export function RolesEditor({ roles }: RolesEditorProps) {
	const [selectedRole, setSelectedRole] = useState<string>()
	return selectedRole
		? (
			<RoleEditor
				role={roles.find((r) => r._id === selectedRole)!}
				onExit={() => setSelectedRole(undefined)}
			/>
		)
		: <RoleList roles={roles} onRoleSelected={setSelectedRole} />
}
