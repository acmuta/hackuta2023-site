import { format, isSameDay } from 'date-fns'
import { WithId } from 'mongodb'

import clientPromise from '@/lib/db'
import { EventModel } from '@/lib/db/models/Event'
import logger from '@/lib/logger'

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
			<div className="grid md:grid-cols-2 grid-cols-1 gap-16">
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
	return (
		<div className="border rounded p-4 mb-2">
			<h3 className="text-sm break-words font-bold">{event.title}</h3>
			<p className="text-white-600">
				{format(new Date(event.date), 'h:mm a')} — {format(
					new Date(
						new Date(event.date).getTime()
							+ event.durationMins * 60_000,
					),
					'h:mm a',
				)}
			</p>
		</div>
	)
}
