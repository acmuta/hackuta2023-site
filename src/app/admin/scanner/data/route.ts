import { NextResponse } from 'next/server'

import clientPromise from '@/lib/db'
import Event from '@/lib/db/models/Event'
import { ShopSwag, ShopSwagCollection } from '@/lib/db/models/ShopSwap'
import logger from '@/lib/logger'

export const dynamic = 'force-dynamic'

export interface ScannerDataResponse {
	events: Event[]
	swags: ShopSwag[]
}

export async function GET() {
	try {
		const client = await clientPromise
		const events = await client
			.db()
			.collection<Event>('events')
			.find({})
			.toArray()
		const swags = await client
			.db()
			.collection<ShopSwag>(ShopSwagCollection)
			.find({})
			.sort({ price: 'ascending' })
			.toArray()
		return NextResponse.json({ events, swags } satisfies ScannerDataResponse)
	} catch (e) {
		logger.error(e, '[/admin/scanner/data]')
		return NextResponse.json(
			{
				events: [],
				swags: [],
			} satisfies ScannerDataResponse,
		)
	}
}
