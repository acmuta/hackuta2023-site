import { getEvents } from '@/components/Schedule/getEvents'
import { Program } from '@acmuta/planby'
import { Calendar } from './utils'

export const revalidate = 10

export default async function Schedule() {
	const convertToTime = (date: string, duration?: number) => {
		const localToCentralOffset = new Date().getTime() - new Date(
			new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }),
		).getTime()
		const newDate = new Date(
			new Date(date).getTime() + (duration ? duration * 60000 : 0)
				+ localToCentralOffset,
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
