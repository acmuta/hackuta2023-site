import { NextResponse } from 'next/server';

import clientPromise from '@/lib/db';
import Event from '@/lib/db/models/Event';
import logger from '@/lib/logger';

export const dynamic = 'force-dynamic'

export async function GET() {
	try {

		const client = await clientPromise
		const events = await client
			.db()
			.collection<Event>('events')
			.find({})
			.toArray()
		return NextResponse.json(events)
	} catch (e) {
		logger.error(e, '[/admin/check-in/events]')
		return NextResponse.json([])
	}
}
