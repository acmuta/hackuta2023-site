import type { JsonUser } from '../db/models/User'

export type PermissionShape = undefined | true | PermissionShapeObject

export type PermissionShapeObject = {
	[key: string]: PermissionShape
}

export type AppPermissions =
	| undefined
	| true
	| {
			administration?: true | OnlyRead
			applications?:
				| true
				| {
						submit?: true | OnlyWrite
						manage?:
							| true
							| {
									basic?: true | ReadWrite
									demographicsInformation?: true | OnlyRead
							  }
				  }
			auth?: OnlyWrite
			checkIn?: true | OnlyWrite
			faqs?: true | ReadWrite
			marketing?: true | OnlyWrite
			posts?: true | ReadWrite
			schedule?: true | ReadWrite
			teams?: true | ReadWrite
			users?: true | ReadWrite
	  }

export const RolePermissionMap = {
	'@unauthenticated': {
		// auth: { write: true },
		// faqs: { read: true },
		// schedule: { read: true },
		// posts: { read: true },
	},
	'@authenticated': {
		// applications: { submit: true },
	},
	organizer: {
		administration: true,
		applications: { submit: true, manage: { basic: true } },
		checkIn: true,
	},
	sponsor: {
		administration: true,
		posts: true,
		teams: true,
		users: true,
	},
	admin: {
		administration: true,
		applications: { submit: true, manage: { basic: true } },
		checkIn: true,
		faqs: true,
		marketing: true,
		posts: true,
		schedule: true,
		teams: true,
		users: true,
	},
} satisfies Record<string, AppPermissions>

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
			hasPermission(granted[k], v),
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

interface OnlyRead extends PermissionShapeObject {
	read?: true
}

interface OnlyWrite extends PermissionShapeObject {
	write?: true
}

interface ReadWrite extends OnlyRead, OnlyWrite {}

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
		matcher: new RegExp('^/admin($|/)'),
		perms: {
			administration: {
				read: true,
			},
		},
	},
	{
		matcher: new RegExp('^/admin/applications'),
		perms: {
			applications: {
				manage: {
					basic: {
						read: true,
					},
				},
			},
		},
	},
	{
		matcher: new RegExp('^/admin/check-in'),
		perms: {
			checkIn: {
				write: true,
			},
		},
	},
	{
		matcher: new RegExp('^/admin/marketing'),
		perms: {
			marketing: {
				write: true,
			},
		},
	},
	{
		matcher: new RegExp('^/admin/post'),
		perms: {
			posts: {
				write: true,
			},
		},
	},
	{
		matcher: new RegExp('^/admin/teams'),
		perms: {
			teams: {
				read: true,
			},
		},
	},
	{
		matcher: new RegExp('^/admin/users'),
		perms: {
			users: {
				read: true,
			},
		},
	},
	{
		matcher: new RegExp('^/api/admin/user'),
		perms: {
			applications: {
				manage: {
					basic: {
						write: true,
					},
				},
			},
		},
	},
	{
		matcher: new RegExp('^/api/auth'),
		perms: {
			auth: {
				write: true,
			},
		},
	},
	{
		matcher: new RegExp('^/faq$'),
		perms: {
			faqs: {
				read: true,
			},
		},
	},
	{
		matcher: new RegExp('^/post/'),
		perms: {
			posts: {
				read: true,
			},
		},
	},
	{
		matcher: new RegExp('^/schedule$'),
		perms: {
			schedule: {
				read: true,
			},
		},
	},
]
