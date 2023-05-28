import z from 'zod'

export const EventSchema = z.object({
	startTime: z.string().datetime(),
	durationMins: z.number().positive().int(),
	title: z.string(),
	shortDesc: z.string(),
	longDesc: z.string(),
	categories: z.string().array(),
})

export type EventModel = z.infer<typeof EventSchema>
