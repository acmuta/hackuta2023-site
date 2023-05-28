import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

import clientPromise from '@/lib/db'
import User from '@/lib/db/models/User'
import logger from '@/lib/logger'

export async function POST(request: NextRequest) {
	const uid = request.nextUrl.searchParams.get('uid')
	try {
		if (!uid) {
			return NextResponse.json({})
		}

		const client = await clientPromise
		await client
			.db()
			.collection<User>('users')
			.updateOne(
				{ _id: new ObjectId(uid) },
				{ $set: { checkedIn: new Date() } },
			)
		return NextResponse.json({})
	} catch (e) {
		logger.error(e, `[/admin/check-in/submit?uid=${uid}]`)
		return NextResponse.json({})
	}
}
