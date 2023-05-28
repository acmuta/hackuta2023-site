import classNames from 'classnames'
import { DivProps } from 'react-html-props'

import { Accordion } from '@/components/Accordion'
import { Box } from '@/components/Box'
import { Heading } from '@/components/Heading'
import { EventModel } from '@/lib/db/models/Event'

import styles from './Event.module.css'
import { EventStatus } from './EventStatus'

export type EventProps = DivProps & {
	active: boolean
	event: EventModel
	dangerousLongDescInHTML?: string
}

const getTimeFromDate = (date: Date): string => {
	return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const getDuration = (minutes: number): string => {
	const days = Math.floor(minutes / 1440)
	const hours = Math.floor((minutes % 1440) / 60)
	const remainingMinutes = minutes % 60

	const durationParts: string[] = []
	if (days > 0) {
		durationParts.push(`${days}d`)
	}
	if (hours > 0) {
		durationParts.push(`${hours}h`)
	}
	if (remainingMinutes > 0) {
		durationParts.push(
			`${remainingMinutes} min` + (remainingMinutes > 1 ? 's' : ''),
		)
	}

	return durationParts.join(' ')
}

export const Event = ({
	active,
	dangerousLongDescInHTML,
	event: { startTime, durationMins, title, shortDesc, longDesc },
}: EventProps) => {
	const startDate = new Date(startTime)
	const time = getTimeFromDate(startDate)
	const duration = getDuration(durationMins)

	return (
		<Box as="div" direction="row" className={styles.eventContainer}>
			<EventStatus active={active} />
			<Accordion
				className={styles.eventCardContainer}
				summary={
					<Box
						as="div"
						direction="row"
						alignItems="center"
						className={styles.summaryContainer}
					>
						<Box as="span" direction="column" className={styles.eventTime}>
							<time
								className={styles.eventStartTime}
								dateTime={startDate.toISOString()}
							>
								{time}
							</time>
							<time
								className={styles.eventLength}
								dateTime={startDate.toLocaleTimeString('en-US', {
									hour12: false,
								})}
							>
								{duration}
							</time>
						</Box>
						<div
							className={classNames(styles.eventDivider, 'hiddenOnSmallScreen')}
							aria-hidden
						/>
						<Box
							as="span"
							direction="column"
							gap=".25rem"
							className={styles.eventText}
						>
							<Heading level={3} className={styles.eventTitle}>
								{title}
							</Heading>
							<span className={styles.eventShortDesc}>{shortDesc}</span>
						</Box>
					</Box>
				}
				dangerouslySetInnerHTMLOnChildren={
					dangerousLongDescInHTML
						? { __html: dangerousLongDescInHTML }
						: undefined
				}
			>
				{dangerousLongDescInHTML ? undefined : longDesc}
			</Accordion>
		</Box>
	)
}
