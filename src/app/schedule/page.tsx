import { getEvents } from '@/components/Schedule/getEvents'
import { Program } from 'planby'
import { Calendar } from './utils'

export const revalidate = 10

export default async function faq() {
	const convertToTime = (date: string, duration?: number) => {
		const newDate = new Date(
			new Date(date).getTime() + (duration ? duration * 60000 : 0),
		)
		return newDate.toISOString()
	}

	const preformEvents = await getEvents()
	const events = preformEvents?.map((event) => ({
		channelUuid: event.eventType === 'checkin'
			? 'checkin'
			: event.eventType === 'event'
			? 'minievent'
			: event.eventType,
		id: event._id.toString(),
		title: event.title,
		description: event.details,
		since: convertToTime(event.date),
		till: convertToTime(event.date, event.durationMins),
		image: '',
		location: event.location,
		pointValue: event.pointValue,
	})) as Program[]
	return Calendar({ events })
}
