import {
	ProgramBox,
	ProgramContent,
	ProgramItem,
	ProgramStack,
	ProgramText,
	useProgram,
} from 'planby'

export const Program = ({ program, ...rest }: ProgramItem) => {
	const { styles, formatTime, set12HoursTimeFormat, isLive } = useProgram({
		program,
		...rest,
	})

	const { data } = program
	const { title, since, till, location, details, pointValue } = data

	const sinceTime = formatTime(since, set12HoursTimeFormat()).toLowerCase()
	const tillTime = formatTime(till, set12HoursTimeFormat()).toLowerCase()

	return (
		<ProgramBox
			width={styles.width}
			style={styles.position}
			className="planby-program group transition-all"
		>
			<ProgramContent
				width={styles.width}
				isLive={isLive}
				className="planby-program-content transition-all"
			>
				<div className="flex justify-between items-center transition-all">
					{/* {isLive && isMinWidth && <ProgramImage src={image} alt="Preview" />} */}
					<ProgramStack className="planby-program-stack transition-all">
						<div className="inline-flex gap-2 items-center mb-1">
							<p className="bg-emerald-500 rounded-full w-fit p-1 text-white font-heading">
								{pointValue}
							</p>
							<p className="font-heading text-sm">{title}</p>
						</div>
						<p className="group-hover:block  hidden">{details}</p>
						<ProgramText className="planby-program-text group-hover:hidden transition-all">
							{location}
						</ProgramText>
						<ProgramText className="planby-program-text group-hover:hidden transition-all">
							{sinceTime} - {tillTime}
						</ProgramText>
					</ProgramStack>
				</div>
			</ProgramContent>
		</ProgramBox>
	)
}
