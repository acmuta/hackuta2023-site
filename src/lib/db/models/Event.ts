import z from 'zod'

export const EventSchema = z.object({
	title: z.string(),
	date: z.string().datetime(),
})

export type EventModel = z.infer<typeof EventSchema>
