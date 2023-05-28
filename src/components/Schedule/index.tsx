'use client'

import { useState } from 'react'

import { EventModel } from '@/lib/db/models/Event'
import { dedupe } from '@/lib/utils/client'

import { Box } from '../Box'
import { ToggleButtonGroup } from '../Button/ToggleButtonGroup'
import { Event } from './Event'
import { EventHeading } from './EventHeading'
import { EventTimeline } from './EventTimeline'

export interface ScheduleProps {
	events: readonly EventModel[]
}

export default function Schedule({ events }: ScheduleProps) {
	const date = new Date().getTime()
	const categories = dedupe(events.flatMap((e) => e.categories))
	const dateMap = getDateEventMap(events)
	dedupe(
		events.map(
			(e) =>
				new Date(e.startTime).getMonth() +
				1 +
				'-' +
				new Date(e.startTime).getDate(),
		),
	)

	const [selectedCategories, setSelectedCategories] =
		useState<readonly string[]>(categories)

	return (
		<>
			<Box direction="row" gap="2rem" style={{ margin: '2rem 0' }}>
				<ToggleButtonGroup
					groupId="event-filter"
					allSelected
					items={categories}
					onUpdate={(newValues) => setSelectedCategories(newValues)}
				/>
			</Box>
			<Box as="section" direction="column" gap="2rem">
				{Object.entries(dateMap).map(([dateStr, events]) => (
					<Box as="section" display="block" key={dateStr}>
						<EventHeading>{dateStr}</EventHeading>
						<EventTimeline>
							{events
								.filter((e) =>
									e.categories.some((c) => selectedCategories.includes(c)),
								)
								.map((e) => (
									<Event
										key={e.startTime + e.title}
										active={
											new Date(e.startTime).getTime() <= date &&
											date <=
												new Date(e.startTime).getTime() +
													e.durationMins * 60_000
										}
										// DANGER: input coming from database that is only edible by admin. absolutely no unsanitized input can be passed!
										dangerousLongDescInHTML={e.longDesc}
										event={e}
									/>
								))}
						</EventTimeline>
					</Box>
				))}
			</Box>
		</>
	)
}

function getDateEventMap(
	events: readonly EventModel[],
): Record<string, EventModel[]> {
	const ans: Record<string, EventModel[]> = {}

	for (const e of events) {
		const { startTime: time } = e
		const dateStr = new Date(time).toLocaleDateString(undefined, {
			month: 'long',
			day: 'numeric',
		})
		;(ans[dateStr] ??= []).push(e)
	}

	return ans
}
