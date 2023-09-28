import { getEvents } from '@/components/calendar'
import { Calendar } from './utils'

export const revalidate = 10

export default async function faq() {
	const events = await getEvents()
	return Calendar({ events })
}
