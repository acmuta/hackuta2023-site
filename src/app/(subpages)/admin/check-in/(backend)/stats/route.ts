import { NextResponse } from 'next/server'

import clientPromise from '@/lib/db'
import User from '@/lib/db/models/User'
import logger from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function GET() {
	try {
		const client = await clientPromise
		const numAccepted = await client
			.db()
			.collection<User>('users')
			.countDocuments({ applicationStatus: 'accepted' })
		const numCheckedIn = await client
			.db()
			.collection<User>('users')
			.countDocuments({ checkedIn: { $exists: true } })
		return NextResponse.json({
			numAccepted,
			numCheckedIn,
		} satisfies Stats)
	} catch (e) {
		logger.error(e, '[/admin/check-in/users]')
		return NextResponse.json([])
	}
}

export interface Stats {
	numAccepted: number
	numCheckedIn: number
}
