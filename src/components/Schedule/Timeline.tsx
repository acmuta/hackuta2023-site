import {
	CurrentTime,
	Timeline,
	TimelineBox,
	TimelineDivider,
	TimelineDividers,
	TimelineTime,
	TimelineWrapper,
	useTimeline,
} from '@acmuta/planby'
import { useEffect, useState } from 'react'

export function Timeline(props: Timeline & { isLoading: boolean }) {
	const {
		time,
		dividers,
		timelineHeight,
		getTime,
		getTimelineProps,
		getCurrentTimeProps,
	} = useTimeline(props)

	const {
		isToday,
		isBaseTimeFormat,
		isCurrentTime,
		isTimelineVisible,
		isVerticalMode,
		isLoading,
	} = props

	const { hourWidth } = props

	const [hidden, setHidden] = useState<string>('hidden')
	const [prevHidden, setPrevHidden] = useState(false)

	useEffect(() => {
		if (isLoading) { setPrevHidden(true) }
		if (!isLoading && prevHidden) { setHidden('') }
	}, [isLoading, prevHidden])

	// const renderTime = (index: number) => (
	// 	<TimelineBox key={index} width={hourWidth} className={hidden} isToday={false} isCurrentTime={false} left={0} timelineHeight={0}>
	// 		<TimelineTime className={hidden}>
	// 			{formatTime(index + offsetStartHoursRange).toLowerCase()}
	// 		</TimelineTime>
	// 		<TimelineDividers className={hidden}>
	// 			{renderDividers()}
	// 		</TimelineDividers>
	// 	</TimelineBox>
	// )

	const renderTime = (item: string | number, index: number) => {
		const { isNewDay, time } = getTime(item)
		const position = { left: hourWidth * index, width: hourWidth }
		const isVisible = isTimelineVisible(position)
		if (!isVisible) { return null }
		return (
			<TimelineBox
				key={index}
				isToday={isToday}
				isCurrentTime={isCurrentTime}
				isVerticalMode={isVerticalMode}
				timelineHeight={timelineHeight}
				className={hidden}
				{...position}
			>
				<TimelineTime
					isVerticalMode={isVerticalMode}
					isNewDay={isNewDay}
					isBaseTimeFormat={isBaseTimeFormat}
				>
					{time}
				</TimelineTime>
				<TimelineDividers isVerticalMode={isVerticalMode}>
					{renderDividers(isNewDay)}
				</TimelineDividers>
			</TimelineBox>
		)
	}

	const renderDividers = (isNewDay: boolean) =>
		dividers.map((_, index) => (
			<TimelineDivider
				key={index}
				isVerticalMode={isVerticalMode}
				isNewDay={isNewDay}
				width={hourWidth}
			/>
		))

	return (
		<TimelineWrapper {...getTimelineProps()}>
			{isCurrentTime && isToday && (
				<CurrentTime
					{...getCurrentTimeProps()}
				/>
			)}
			{time.map((item, index) => renderTime(item, index))}
		</TimelineWrapper>
	)
}
