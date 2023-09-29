import type { ToJsonValue } from '@/lib/utils/shared'
import { WithId } from 'mongodb'
import z from 'zod'

export const EventSchema = z.object({
	title: z.string(),
	date: z.string().regex(
		/\d\d\/\d\d\/\d\d\d\d \d\d:\d\d:\d\d/,
		'Expected MM/DD/YYYY HH:mm:SS',
	),
	durationMins: z.number().int(),
	details: z.string(),
	location: z.string(),
	eventType: z.string(),
	pointValue: z.number().int(),
})

export type EventModel = z.infer<typeof EventSchema>

export default interface Event extends EventModel {}

export type JsonEvents = ToJsonValue<WithId<EventModel>>
