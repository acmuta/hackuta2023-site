'use client'

import { ChannelItem } from './ChannelItem'
import { Program } from './ProgramItem'
import { Timeline } from './Timeline'

import { Epg, Layout, Program as ProgramI } from '@acmuta/planby'
import { Line } from './Line'
import { LiveTime } from './LiveTime'
import { useSched } from './useSched'

// export async function getEvents(): Promise<WithId<EventModel>[] | undefined> {
// 	try {
// 		const client = await clientPromise
// 		const events = (await client.db()
// 			.collection<EventModel>('events')
// 			.find()
// 			.toArray()).sort((a, b) =>
// 				new Date(a.date).getTime() - new Date(b.date).getTime()
// 			)

// 		return events
// 	} catch (error) {
// 		logger.error(error)
// 	}
// }

interface HackathonCalendarProps {
	startDate: Date
	endDate: Date
	events: ProgramI[]
}

export function HackathonCalendar(
	{ startDate, endDate, events }: HackathonCalendarProps,
) {
	const { isLoading, getEpgProps, getLayoutProps } = useSched(
		startDate,
		endDate,
		events,
	)

	return (
		<div>
			<Epg isLoading={isLoading} {...getEpgProps()}>
				<Layout
					{...getLayoutProps()}
					renderLine={(props) => <Line {...props} />}
					renderCurrentTime={(props) => <LiveTime {...props} />}
					renderTimeline={(props) => (
						<Timeline {...props} isLoading={isLoading} />
					)}
					renderProgram={({ program, ...rest }) => (
						<Program key={program.data.id} program={program} {...rest} />
					)}
					renderChannel={({ channel, ...rest }) => (
						<ChannelItem key={channel.uuid} channel={channel} {...rest} />
					)}
				/>
				{/* dummy div so tailwind can compile hidden tag for loading stage */}
				<div className="hidden"></div>
			</Epg>
		</div>
	)
}

// function Event({ event }: { event: EventModel }) {
// 	const centralTimeZone = 'America/Chicago' // Central Time Zone (American Central Time)
// 	const now = new Date(
// 		new Date().toLocaleString('en-US', { timeZone: centralTimeZone }),
// 	)

// 	// Convert event date and end date to Central Time
// 	const eventDate = new Date(event.date)
// 	const eventEndDate = new Date(
// 		eventDate.getTime() + event.durationMins * 60_000,
// 	)
// 	const eventDateCentral = new Date(eventDate)
// 	const eventEndDateCentral = new Date(eventEndDate)

// 	const isEventPast = isBefore(eventEndDateCentral, now)
// 	const isEventCurrent = !isEventPast
// 		&& now >= eventDateCentral
// 		&& now <= eventEndDateCentral

// 	const shadow = `shadow hover:shadow-lg`

// 	const eventClassNames = twJoin(
// 		'border-2 rounded p-4 mb-2',
// 		isEventPast
// 			? 'bg-event-past text-white-500'
// 			: isEventCurrent
// 			? 'bg-event-current text-white'
// 			: 'bg-event-future	 text-white',
// 		shadow,
// 	)

// 	return (
// 		<details className={twJoin(eventClassNames, 'cursor-pointer')}>
// 			<summary className="normal-case break-words">
// 				<span className="text-lg font-bold">
// 					{event.title}
// 				</span>
// 				<p className="flex flex-row text-white-600">
// 					<span className="flex-1">
// 						⏰{` ${format(eventDateCentral, 'h:mm a')} — ${
// 							format(eventEndDateCentral, 'h:mm a')
// 						}`}
// 					</span>
// 					<span className="normal-case">
// 						📅{` ${format(eventDateCentral, 'MMM dd')}`}
// 					</span>
// 				</p>
// 				{event.location && (
// 					<>
// 						📍<span className="normal-case text-white-600">
// 							{` ${event.location}`}
// 						</span>
// 					</>
// 				)}
// 			</summary>
// 			<p className="normal-case text-white-600">
// 				{event.details || 'No details provided.'}
// 			</p>
// 		</details>
// 	)
// }
