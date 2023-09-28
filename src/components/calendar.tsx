import { format, isBefore, isSameDay } from 'date-fns'
import { WithId } from 'mongodb'

import clientPromise from '@/lib/db'
import { EventModel } from '@/lib/db/models/Event'
import logger from '@/lib/logger'
import { twJoin } from 'tailwind-merge'

export async function getEvents(): Promise<WithId<EventModel>[] | undefined> {
	try {
		const client = await clientPromise
		const events = (await client.db()
			.collection<EventModel>('events')
			.find()
			.toArray()).sort((a, b) =>
				new Date(a.date).getTime() - new Date(b.date).getTime()
			)

		return events
	} catch (error) {
		logger.error(error)
	}
}

interface HackathonCalendarProps {
	startDate: Date
	endDate: Date
	events: WithId<EventModel>[] | undefined
}

export function HackathonCalendar(
	{ startDate, endDate, events }: HackathonCalendarProps,
) {
	return (
		<div className="container mx-auto p-8">
			<div className="grid lg:grid-cols-3 grid-cols-1 gap-16">
				<div>
					<h2 className="text-xl font-semibold">
						Pre-Events
					</h2>
					{events?.map((event) => (
						!(isSameDay(new Date(event.date), startDate)
							|| isSameDay(new Date(event.date), endDate)) && (
							<Event key={event.title + event.date} event={event} />
						)
					))}
				</div>
				<div>
					<h2 className="text-xl font-semibold">
						{format(startDate, 'MMMM d, yyyy')}
					</h2>
					{events?.map((event) => (
						isSameDay(new Date(event.date), startDate) && (
							<Event key={event.title + event.date} event={event} />
						)
					))}
				</div>
				<div>
					<h2 className="text-xl font-semibold">
						{format(endDate, 'MMMM d, yyyy')}
					</h2>
					{events?.map((event) => (
						isSameDay(new Date(event.date), endDate) && (
							<Event key={event.title + event.date} event={event} />
						)
					))}
				</div>
			</div>
		</div>
	)
}

function Event({ event }: { event: EventModel }) {
	const centralTimeZone = 'America/Chicago' // Central Time Zone (American Central Time)
	const now = new Date(new Date().toLocaleString('en-US', {timeZone: centralTimeZone}))

	// Convert event date and end date to Central Time
	const eventDate = new Date(event.date)
	const eventEndDate = new Date(
		eventDate.getTime() + event.durationMins * 60_000,
	)
	const eventDateCentral = new Date(		eventDate	)
	const eventEndDateCentral = new Date(		eventEndDate	)

	const isEventPast = isBefore(eventEndDateCentral, now)
	const isEventCurrent = !isEventPast
		&& now >= eventDateCentral
		&& now <= eventEndDateCentral

	const shadow = `shadow hover:shadow-lg`

	const eventClassNames = twJoin(
		'border-2 rounded p-4 mb-2',
		isEventPast
			? 'bg-event-past text-white-500'
			: isEventCurrent
			? 'bg-event-current text-white'
			: 'bg-event-future	 text-white',
		shadow,
	)

	const locationEmoji = '📍'
	const timeEmoji = '⏰'
	const calendarEmoji = '📅'

	return (
		<details className={twJoin(eventClassNames, 'cursor-pointer')}>
			<summary className="normal-case break-words">
				<span className="text-lg font-bold">
					{event.title}
				</span>
				<p className="flex flex-row text-white-600">
					<span className="flex-1">
						{`${timeEmoji} ${format(eventDateCentral, 'h:mm a')} — ${
							format(eventEndDateCentral, 'h:mm a')
						}`}
					</span>
					<span className="normal-case">
						{`${calendarEmoji} ${format(eventDateCentral, 'MMM dd')}`}
					</span>
				</p>
				{event.location && (
					<p className="normal-case text-white-600">
						{`${locationEmoji} ${event.location}`}
					</p>
				)}
			</summary>
			<p className="normal-case text-white-600">{event.details || 'No details provided.'}</p>
		</details>
	)
}
