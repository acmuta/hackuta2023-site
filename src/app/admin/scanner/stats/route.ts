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
			.countDocuments({
				checkedIn: { $exists: true },
				roles: {
					$nin: [
						'admin',
						'info_admin',
						'mentor',
						'organizer',
						'role_admin',
						'scanner_checkin',
						'scanner_event',
						'scanner_meal',
						'scanner_shop',
						'shop_admin',
					],
				},
			})
		return NextResponse.json(
			{
				numAccepted,
				numCheckedIn,
			} satisfies Stats,
		)
	} catch (e) {
		logger.error(e, '[/admin/scanner/users]')
		return NextResponse.json([])
	}
}

export interface Stats {
	numAccepted: number
	numCheckedIn: number
}
