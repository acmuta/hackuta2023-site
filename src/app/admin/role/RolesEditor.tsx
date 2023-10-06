'use client'

import { Role } from '@/lib/db/models/Role'
import { useState } from 'react'
import { RoleEditor } from './RoleEditor'
import { RoleList } from './RoleList'

export interface RolesEditorProps {
	roles: readonly Role[]
}

export function RolesEditor({ roles }: RolesEditorProps) {
	const [editingRole, setEditingRole] = useState<string>()
	return editingRole
		? (
			<RoleEditor
				role={roles.find((r) => r._id === editingRole)!}
				onExit={() => setEditingRole(undefined)}
			/>
		)
		: <RoleList roles={roles} onRoleEdit={setEditingRole} />
}
