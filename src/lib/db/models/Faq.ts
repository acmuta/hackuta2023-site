import z from 'zod'

export const FaqSchema = z.object({
	_id: z.number(),
	q: z.string().nonempty(),
	a: z.string().nonempty(),
})

export type FaqModel = z.infer<typeof FaqSchema>
