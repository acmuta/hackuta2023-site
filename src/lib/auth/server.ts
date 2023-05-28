import '@/node-only'

import User from '../db/models/User'
import {
	AppPermissions,
	mergePermission,
	PermissionShape,
	RolePermissionMap,
} from './shared'

export * from './shared'

export async function getUserPerms(user: User | null): Promise<AppPermissions> {
	const roles = [
		'@unauthenticated',
		...(user ? ['@authenticated'] : []),
		...(user?.roles ?? []),
	] satisfies [string, ...string[]]
	return mergePermission(
		...(roles.map(
			(r) =>
				RolePermissionMap[r as keyof typeof RolePermissionMap] ?? undefined,
		) as unknown as [PermissionShape, ...PermissionShape[]]),
	)
}
