import { ReactNode } from 'react'

import Schedule from '@/components/Schedule'
import { EventModel } from '@/lib/db/models/Event'

import PageSection from '../PageSection'
import { queryDbForItems } from '../utils'

export function ScheduleSection({
	events,
}: {
	events: readonly EventModel[] | undefined
}) {
	const content: ReactNode = !events ? (
		<>Failed loading the schedule. Please try again later.</>
	) : (
		<>
			<Schedule events={events} />
		</>
	)

	return <PageSection heading="Schedule">{content}</PageSection>
}

export async function getEvents(): Promise<EventModel[] | undefined> {
	const now = new Date().getTime()
	return queryDbForItems<EventModel>(
		'events',
		'[@/app/schedule/page.tsx#getEvents]',
		(events) =>
			events
				.filter(
					(e) =>
						new Date(e.startTime).getTime() + e.durationMins * 60_000 >= now,
				)
				.sort((a, b) => a.startTime.localeCompare(b.startTime)),
	)
}
