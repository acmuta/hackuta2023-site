import clientPromise from '@/lib/db'
import { EventModel } from '@/lib/db/models/Event'
import logger from '@/lib/logger'
import { WithId } from 'mongodb'

export async function getEvents(): Promise<WithId<EventModel>[] | undefined> {
	try {
		const client = await clientPromise
		const events = (await client.db()
			.collection<EventModel>('events')
			.find()
			.toArray()).sort((a, b) =>
				new Date(a.date).getTime() - new Date(b.date).getTime()
			)

		return events
	} catch (error) {
		logger.error(error)
	}
}
