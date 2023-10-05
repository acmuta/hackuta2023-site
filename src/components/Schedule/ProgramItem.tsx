import {
	ProgramBox,
	ProgramContent,
	ProgramFlex,
	ProgramItem,
	ProgramStack,
	ProgramText,
	ProgramTitle,
	useProgram,
} from 'planby'

export const Program = ({ program, ...rest }: ProgramItem) => {
	const { styles, formatTime, set12HoursTimeFormat, isLive } = useProgram({
		program,
		...rest,
	})

	const { data } = program
	const { title, since, till, location, details, eventType, pointValue } = data

	const sinceTime = formatTime(since, set12HoursTimeFormat()).toLowerCase()
	const tillTime = formatTime(till, set12HoursTimeFormat()).toLowerCase()

	return (
		<ProgramBox
			width={styles.width}
			style={styles.position}
			className="planby-program"
		>
			<ProgramContent
				width={styles.width}
				isLive={isLive}
				className="planby-program-content"
			>
				<ProgramFlex className="planby-program-flex">
					{/* {isLive && isMinWidth && <ProgramImage src={image} alt="Preview" />} */}
					<ProgramStack className="planby-program-stack">
						<ProgramTitle className="planby-program-title">
							{title}
						</ProgramTitle>
						<ProgramText className="planby-program-text">
							{location} {details} {eventType} {pointValue}
							{sinceTime} - {tillTime}
						</ProgramText>
					</ProgramStack>
				</ProgramFlex>
			</ProgramContent>
		</ProgramBox>
	)
}
