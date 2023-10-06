import {
	ProgramBox,
	ProgramContent,
	ProgramItem,
	ProgramStack,
	useProgram,
} from '@acmuta/planby'

export const Program = ({ isVerticalMode, program, ...rest }: ProgramItem) => {
	const { styles, formatTime, set12HoursTimeFormat, isLive } = useProgram({
		isVerticalMode,
		program,
		...rest,
	})

	const { data } = program
	const { title, since, till, location, description, pointValue } = data

	const sinceTime = formatTime(since, set12HoursTimeFormat()).toLowerCase()
	const tillTime = formatTime(till, set12HoursTimeFormat()).toLowerCase()

	return (
		<ProgramBox
			width={styles.width}
			style={styles.position}
			className="planby-program group transition-all hover:z-20"
			onClick={() =>
				alert(
					`Title: ${title}\n${
						description != '' ? `Description: ${description}\n` : ''
					}${
						pointValue > 0
							? `Points: ${pointValue}\n`
							: ''
					}Place: ${location}\nTime: ${sinceTime} - ${tillTime}`,
				)}
		>
			<ProgramContent
				width={styles.width}
				isVerticalMode={isVerticalMode}
				isLive={isLive}
				className="planby-program-content transition-all"
			>
				<div className="flex justify-between items-center transition-all">
					{/* {isLive && isMinWidth && <ProgramImage src={image} alt="Preview" />} */}
					<ProgramStack className="planby-program-stack transition-all">
						<div className="flex gap-2 items-center mb-1">
							{pointValue > 0 && (
								<p className="bg-emerald-500 rounded-full w-fit p-1 text-white font-heading">
									{pointValue > 0 ? pointValue : ''}
								</p>
							)}
							<p className="font-heading text-sm overflow-ellipsis line-clamp-2">
								{title}
							</p>
						</div>
						<p className="group-hover:block hidden overflow-ellipsis line-clamp-2 tracking-tight">
							{description}
						</p>
						<div className="flex content-start items-start flex-wrap flex-col text-gray-500">
							<p className="planby-program-text text-xs group-hover:hidden transition-all tracking-tight">
								{location}
							</p>
							<p className="planby-program-text text-xs group-hover:hidden transition-all tracking-tight">
								{sinceTime} - {tillTime}
							</p>
						</div>
					</ProgramStack>
				</div>
			</ProgramContent>
		</ProgramBox>
	)
}
