import { NextRequest, NextResponse } from 'next/server'

import clientPromise from '@/lib/db'
import User from '@/lib/db/models/User'
import logger from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
	try {
		const pinStr = request.nextUrl.searchParams.get('pin')
		const pin = parseInt(pinStr ?? '')
		if (!pin) {
			return NextResponse.json([])
		}

		const client = await clientPromise
		const users = await client
			.db()
			.collection<User>('users')
			.find({ checkInPin: pin })
			.toArray()
		return NextResponse.json(users)
	} catch (e) {
		logger.error(e, '[/admin/scanner/users]')
		return NextResponse.json([])
	}
}
