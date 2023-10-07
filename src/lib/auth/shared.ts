import { AppPermissions } from '../db/models/Role'
import type { JsonUser } from '../db/models/User'
import User from '../db/models/User'

export type PermissionShape = undefined | true | PermissionShapeObject

export type PermissionShapeObject = {
	[key: string]: PermissionShape
}

export const UnauthedPerms: AppPermissions = {
	auth: true,
	faq: true,
	schedule: true,
	post: true,
}

/**
 * Types of roles:
 *
 * * Built-In: roles that are temporarily assigned by certain mechanisms
 * to achieve a certain purpose. These roles cannot be managed by admins.
 * * Unauthed: the base role that all users, including unauthenticated
 * ones, are granted. This role cannot be managed by admins.
 * * hacker: the base role that every authenticated user is granted.
 * The permissions of this role can be changed by admins, but it cannot be
 * deleted.
 * * Database: roles created and fully managed by admins.
 */
export const BuiltInRoles = {
	/**
	 * A role temporarily assigned to users who are viewing as other roles.
	 * This role has the neccessary permissions to ensure that the user
	 * can restore back to their previous roles.
	 */
	'@@view-as': {
		administration: {
			role: true,
		},
	},
} satisfies Record<`@@${string}`, AppPermissions>

export function hasPermission(
	granted: AppPermissions,
	required: AppPermissions,
): boolean
export function hasPermission(
	granted: PermissionShape,
	required: PermissionShape,
): boolean
export function hasPermission(
	granted: PermissionShape,
	required: PermissionShape,
): boolean {
	if (granted === true || required === undefined) {
		return true
	} else if (granted === undefined || required === true) {
		// An object with every possible field set to `true` is NOT equivalent to a literal `true`.
		// If a route requires a permission to be `true`, the `true` must be explicitly granted.
		return false
	} else {
		return Object.entries(required).every(([k, v]) =>
			hasPermission(granted[k], v)
		)
	}
}

/**
 * @param permissions Permissions to merge.
 * @returns The merged permission. Once a permission is given, it CANNOT be revoked by a later permission during merging.
 */
export function mergePermission(
	...permissions: readonly [PermissionShape, ...PermissionShape[]]
): PermissionShape {
	const result: PermissionShapeObject = {}

	for (const permission of permissions) {
		if (permission == null) {
			continue
		} else if (permission === true) {
			// This is the highest possible permission.
			// There's nothing to merge anymore. Return immediately.
			return true
		}

		for (const [key, value] of Object.entries(permission)) {
			result[key] = mergePermission(result[key], value)
		}
	}

	return result
}

/**
 * JSON friendly.
 */
export interface EnhancedSession {
	user: JsonUser | null
	perms: AppPermissions
}

export const RoutePermissions: { matcher: RegExp; perms: AppPermissions }[] = [
	{
		matcher: new RegExp('^/$'),
		perms: undefined,
	},
	{
		matcher: new RegExp('^/admin'),
		perms: {
			administration: {},
		},
	},
	{
		matcher: new RegExp('^/api/admin'),
		perms: {
			administration: {},
		},
	},
	{
		matcher: new RegExp('^/admin/applications'),
		perms: {
			administration: {
				application: {
					basic: true,
				},
			},
		},
	},
	{
		matcher: new RegExp('^/admin/applications/blocklist'),
		perms: {
			administration: {
				application: {
					blocklist: true,
				},
			},
		},
	},
	{
		matcher: new RegExp('^/admin/applications/decide'),
		perms: {
			administration: {
				application: {
					decision: true,
				},
			},
		},
	},
	{
		matcher: new RegExp('^/admin/email'),
		perms: {
			administration: {
				email: true,
			},
		},
	},
	{
		matcher: new RegExp('^/admin/faq'),
		perms: {
			administration: {
				faq: true,
			},
		},
	},
	{
		matcher: new RegExp('^/admin/post'),
		perms: {
			administration: {
				post: true,
			},
		},
	},
	{
		matcher: new RegExp('^/admin/role'),
		perms: {
			administration: {
				role: true,
			},
		},
	},
	{
		matcher: new RegExp('^/admin/scanner'),
		perms: {
			administration: {
				scanner: {},
			},
		},
	},
	{
		matcher: new RegExp('^/admin/schedule'),
		perms: {
			administration: {
				schedule: true,
			},
		},
	},
	{
		matcher: new RegExp('^/api/admin/schedule'),
		perms: {
			administration: {
				schedule: true,
			},
		},
	},
	{
		matcher: new RegExp('^/admin/user'),
		perms: {
			administration: {
				user: {
					read: true,
				},
			},
		},
	},
	{
		matcher: new RegExp('^/admin/user/role'),
		perms: {
			administration: {
				user: {
					writeRole: true,
				},
			},
		},
	},
	{
		matcher: new RegExp('^/api/apply'),
		perms: {
			application: true,
		},
	},
	{
		matcher: new RegExp('^/api/auth'),
		perms: {
			auth: true,
		},
	},
	{
		matcher: new RegExp('^/dashboard/info'),
		perms: {
			post: true,
		},
	},
	{
		matcher: new RegExp('^/faq'),
		perms: {
			faq: true,
		},
	},
	{
		matcher: new RegExp('^/post'),
		perms: {
			post: true,
		},
	},
	{
		matcher: new RegExp('^/schedule'),
		perms: {
			schedule: true,
		},
	},
]

export function hasRoutePermission(
	pathname: string,
	granted: AppPermissions,
): boolean {
	return RoutePermissions.every(
		({ matcher, perms }) =>
			!matcher.test(pathname) || hasPermission(granted, perms),
	)
}

export function canAccessDashboard(
	user: User | JsonUser | undefined | null,
	perms: AppPermissions,
): boolean {
	return !!(user?.applied || user?.checkedIn
		|| hasPermission(perms, { applicationWaived: true }))
}
