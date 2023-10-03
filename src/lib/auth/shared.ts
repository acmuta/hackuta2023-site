import { AppPermissions } from '../db/models/Role'
import type { JsonUser } from '../db/models/User'

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
		if (permission === undefined) {
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
		matcher: new RegExp('^/admin/check-in'),
		perms: {
			administration: {
				checkIn: {},
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
		matcher: new RegExp('^/admin/users'),
		perms: {
			administration: {
				user: true,
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
