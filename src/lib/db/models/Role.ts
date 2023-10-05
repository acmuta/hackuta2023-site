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
				checkIn: z.union([
					z.literal(true),
					z.record(z.literal(true)),
				]).optional(),
				email: z.literal(true).optional(),
				faq: z.literal(true).optional(),
				post: z.literal(true).optional(),
				schedule: z.literal(true).optional(),
				user: z.literal(true).optional(),
			}),
		]).optional(),
		application: z.literal(true).optional(),
		auth: z.literal(true).optional(),
		faq: z.literal(true).optional(),
		post: z.literal(true).optional(),
		schedule: z.literal(true).optional(),
	}),
])

export type AppPermissions = z.infer<typeof AppPermissionsSchema>

export const RoleSchema = z.object({
	_id: z.string(),
	granted: AppPermissionsSchema,
})

export type Role = z.infer<typeof RoleSchema>
