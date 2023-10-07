import { HackathonCalendar } from '@/components/Schedule/calendar'
import { WavyPattern } from '@/components/WavyPattern'
import { Program } from '@acmuta/planby'
export const revalidate = 10

export function Calendar(
	{
		events,
	}: {
		events: Program[]
	},
) {
	const startDate = new Date('2023-10-07T08:00:00.000-05:00')
	const endDate = new Date('2023-10-08T17:00:00.000-05:00')

	return (
		<div className="flex flex-col items-center justify-center gap-8 bg-hackuta-red bg-hackuta-pattern-transparent py-8 md:p-16 w-full">
			<section className="flex flex-col self-start gap-2">
				<h2 className="flex flex-col items-center gap-2 font-heading drop-shadow-hackuta text-white text-4xl">
					Schedule
					<WavyPattern className="w-32" />
				</h2>
				<div className="font-rhd drop-shadow-hackuta flex flex-nowrap text-white tracking-wider uppercase">
					<HackathonCalendar
						startDate={startDate}
						endDate={endDate}
						events={events}
					/>
				</div>
			</section>
		</div>
	)
}
