'use client'

import { Organizer, OrganizerProps } from '@/components/Organizer'
import { WavyPattern } from '@/components/WavyPattern'
import { useRef } from 'react'
import { OrganizerData } from './admin/organizers/OrganizerData'

export interface MeetTheTeamSectionProps {
	organizers: readonly OrganizerData[]
}
export function MeetTheTeamSection({ organizers }: MeetTheTeamSectionProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	// const [pos, setPos] = useState(0)
	// const [autoScroll, setAutoScroll] = useState(true)

	// useEffect(() => {
	// 	const container = containerRef.current
	// 	if (!container) {
	// 		return
	// 	}
	// 	const interval = setInterval(() => {
	// 		if (!autoScroll) {
	// 			return
	// 		}
	// 		setPos((pos) =>
	// 			(pos + 1) % (container.scrollWidth - container.clientWidth)
	// 		)
	// 	}, 100)
	// 	container.addEventListener('mouseenter', () => {
	// 		setAutoScroll(false)
	// 	})
	// 	container.addEventListener('mouseleave', () => {
	// 		setAutoScroll(true)
	// 	})
	// 	return () => clearInterval(interval)
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])

	// useEffect(() => {
	// 	const container = containerRef.current
	// 	if (!container) {
	// 		return
	// 	}
	// 	container.scrollLeft = pos
	// }, [pos])

	return (
		<div className="flex flex-col items-center justify-center gap-8 bg-hackuta-red bg-hackuta-pattern-transparent p-8 md:p-16 w-full">
			<h2 className="flex flex-col items-center gap-2 font-heading drop-shadow-hackuta text-white text-4xl">
				Meet the Team
				<WavyPattern className="w-32" strokeColor="rgb(0,0,0,.3)" />
			</h2>
			<div
				ref={containerRef}
				className="flex flex-row justify-start items-center w-full overflow-x-auto lg:justify-center lg:flex-wrap"
			>
				{organizers.map((organizer: OrganizerProps) => (
					<Organizer
						key={`${organizer.name}`}
						name={organizer.name}
						role={organizer.role}
						avatar={organizer.avatar}
						socials={organizer.socials}
						isDirector={organizer.isDirector}
					/>
				))}
			</div>
		</div>
	)
}
