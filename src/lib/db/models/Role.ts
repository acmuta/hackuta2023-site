import { PermissionShape } from '@/lib/auth/shared'
import { z } from 'zod'

export const AppPermissionsSchema = z.union([
	z.undefined(),
	z.literal(true),
	z.object({
		administration: z.union([
			z.literal(true),
			z.object({
				application: z.union([
					z.literal(true),
					z.object({
						basic: z.literal(true).optional(),
						/** Read access to full application */
						sensitive: z.literal(true).optional(),
						/** Write access to blocklist */
						blocklist: z.literal(true).optional(),
						decision: z.literal(true).optional(),
					}),
				]).optional(),
				email: z.literal(true).optional(),
				faq: z.literal(true).optional(),
				post: z.literal(true).optional(),
				role: z.literal(true).optional(),
				scanner: z.union([
					z.literal(true),
					z.object({
						link: z.literal(true).optional(),
						event: z.literal(true).optional(),
						meal: z.literal(true).optional(),
						shop: z.literal(true).optional(),
					}),
				]).optional(),
				schedule: z.literal(true).optional(),
				shop: z.literal(true).optional(),
				user: z.union([
					z.literal(true),
					z.object({
						read: z.literal(true).optional(),
						writeRole: z.literal(true).optional(),
					}),
				]).optional(),
			}),
		]).optional(),
		application: z.literal(true).optional(),
		applicationWaived: z.literal(true).optional(),
		auth: z.literal(true).optional(),
		faq: z.literal(true).optional(),
		post: z.literal(true).optional(),
		schedule: z.literal(true).optional(),
	}),
])

export type AppPermissions = z.infer<typeof AppPermissionsSchema>

export function __type_test() {
	// Ensure AppPermissions is assignable to PermissionShape
	// If there's an error reported in this function,
	// fix AppPermissionsSchema so that its inferred type
	// is assignable to PermissionShape.
	const a: AppPermissions = undefined as unknown as AppPermissions
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _: PermissionShape = a
	throw new Error(
		'This function is for testing types only and should never be actually called',
	)
}

export const RoleSchema = z.object({
	_id: z.string(),
	granted: AppPermissionsSchema,
})

export type Role = z.infer<typeof RoleSchema>
