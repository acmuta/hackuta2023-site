import { getEvents, ScheduleSection } from './utils'

export const revalidate = 10

export default async function SchedulePage() {
	const events = await getEvents()
	return ScheduleSection({ events })
}
