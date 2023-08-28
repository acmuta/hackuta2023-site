import z from 'zod'

export const FaqSchema = z.object({
	q: z.string().nonempty(),
	a: z.string().nonempty(),
	// Couldn't use ObjectId from mongodb cuz that somehow involves server code,
	// and Faq.ts needs to be usable on client.
	next: z.object({}).or(z.null()),
})

export type FaqModel = z.infer<typeof FaqSchema>
