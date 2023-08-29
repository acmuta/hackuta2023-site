import { z } from 'zod'

export const FaqRouteSchema = z.object({
	q: z.string(),
	a: z.string(),
	next: z.string().or(z.null()),
})
export type FaqRoute = z.infer<typeof FaqRouteSchema>
