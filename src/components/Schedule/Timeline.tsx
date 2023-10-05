import {
	TimelineBox,
	TimelineDivider,
	TimelineDividers,
	TimelineTime,
	TimelineWrapper,
	useTimeline,
} from 'planby'
import { useEffect, useState } from 'react'

interface TimelineProps {
	isBaseTimeFormat: boolean
	isSidebar: boolean
	dayWidth: number
	hourWidth: number
	numberOfHoursInDay: number
	offsetStartHoursRange: number
	sidebarWidth: number
	isLoading?: boolean
}

export function Timeline({
	isBaseTimeFormat,
	isSidebar,
	dayWidth,
	hourWidth,
	numberOfHoursInDay,
	offsetStartHoursRange,
	sidebarWidth,
	isLoading,
}: TimelineProps) {
	const { time, dividers, formatTime } = useTimeline(
		numberOfHoursInDay,
		isBaseTimeFormat,
	)
	const [hidden, setHidden] = useState<string>('hidden')
	const [prevHidden, setPrevHidden] = useState(false)

	useEffect(() => {
		if (isLoading) { setPrevHidden(true) }
		if (!isLoading && prevHidden) { setHidden('') }
	}, [isLoading, prevHidden])

	const renderTime = (index: number) => (
		<TimelineBox key={index} width={hourWidth} className={hidden}>
			<TimelineTime className={hidden}>
				{formatTime(index + offsetStartHoursRange).toLowerCase()}
			</TimelineTime>
			<TimelineDividers className={hidden}>
				{renderDividers()}
			</TimelineDividers>
		</TimelineBox>
	)

	const renderDividers = () =>
		dividers.map((_, index) => (
			<TimelineDivider key={index} width={hourWidth} />
		))

	return (
		<TimelineWrapper
			dayWidth={dayWidth}
			sidebarWidth={sidebarWidth}
			isSidebar={isSidebar}
			className={hidden}
		>
			{time.map((_, index) => renderTime(index))}
		</TimelineWrapper>
	)
}
