import z from 'zod'

export const EventSchema = z.object({
	title: z.string(),
	date: z.string().regex(
		/\d\d\/\d\d\/\d\d\d\d \d\d:\d\d:\d\d/,
		'Expected MM/DD/YYYY HH:mm:SS',
	),
	durationMins: z.number().int(),
})

export type EventModel = z.infer<typeof EventSchema>
