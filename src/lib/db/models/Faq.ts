import { ObjectId } from 'bson'
import z from 'zod'

export const FaqSchema = z.object({
	q: z.string().nonempty(),
	a: z.string().nonempty(),
	next: z.instanceof(ObjectId).or(z.null()),
})

export type FaqModel = z.infer<typeof FaqSchema>
