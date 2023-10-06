import {
	CurrentTimeBox,
	CurrentTimeContent,
	CurrentTimeIndicator,
} from '@acmuta/planby'

export function LiveTime({
	isVerticalMode,
	isBaseTimeFormat,
	isRTL,
	time,
	styles,
}: CurrentTimeIndicator) {
	return (
		<CurrentTimeBox {...styles.position}>
			<CurrentTimeContent
				isVerticalMode={isVerticalMode}
				isBaseTimeFormat={isBaseTimeFormat}
				isRTL={isRTL}
				style={{ color: 'red' }}
			>
				{time}
			</CurrentTimeContent>
		</CurrentTimeBox>
	)
}
