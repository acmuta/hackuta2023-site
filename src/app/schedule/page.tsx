import { getEvents, HackathonCalendar } from '@/components/calendar'
import { WavyPattern } from '@/components/WavyPattern'
export const revalidate = 10

export default async function calendar() {
	const startDate = new Date('10/07/2023 06:00:00')
	const endDate = new Date('10/08/2023 18:00:00')
	const events = await getEvents()

	return (
		<div className="flex flex-col items-center justify-start gap-8 bg-hackuta-red bg-hackuta-pattern-transparent p-8 md:p-16 w-full">
			<section className="flex flex-col self-start gap-8">
				<h2 className="flex flex-col items-start gap-2 font-heading drop-shadow-hackuta text-white text-4xl">
					Schedule
					<WavyPattern className="w-32" />
				</h2>
				<div className="font-rhd text-white tracking-wider uppercase">
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
