import { NextRequest, NextResponse } from 'next/server'

import clientPromise from '@/lib/db'
import User from '@/lib/db/models/User'
import logger from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
	const currMeal = req.nextUrl.searchParams.get('currMeal')
	try {
		const client = await clientPromise
		const users = client
			.db()
			.collection<User>('users')
		const numAccepted = await users.countDocuments({
			applicationStatus: 'accepted',
		})
		const numCheckedIn = await users.countDocuments({
			checkedIn: { $exists: true },
			roles: {
				$nin: [
					'admin',
					'info_admin',
					'mentor',
					'organizer',
					'role_admin',
					'scanner_checkin',
					'scanner_shop',
					'shop_admin',
				],
			},
		})
		const numEatenMeal = currMeal
			? await users.countDocuments({
				attendedEvents: { $eq: currMeal },
			})
			: 0
		return NextResponse.json(
			{
				numAccepted,
				numCheckedIn,
				numEatenMeal,
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
	numEatenMeal: number
}
