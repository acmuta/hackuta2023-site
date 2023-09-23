import { NextRequest, NextResponse } from 'next/server'

import clientPromise from '@/lib/db'
import User from '@/lib/db/models/User'
import logger from '@/lib/logger'
import { stringifyError } from '@/lib/utils/server'

export async function POST(request: NextRequest) {
	const checkInPin = request.nextUrl.searchParams.get('checkInPin')
	const hexId = request.nextUrl.searchParams.get('hexId')

	try {
		if (!(checkInPin && hexId)) {
			throw new Error('Missing search params')
		}

		const client = await clientPromise
		const users = client.db().collection<User>('users')

		// Check if there's already someone with the hex ID
		const existingUser = await users.findOne({ hexId: { $eq: hexId } })
		if (existingUser) {
			throw new Error(`An user already has the hex ID ${hexId}`)
		}

		// Update the user document with checkedIn date and hexId
		await users.updateOne(
			{ checkInPin: { $eq: parseInt(checkInPin) } },
			{
				$set: {
					checkedIn: new Date(),
					hexId: hexId,
				},
			},
		)

		return NextResponse.json({ status: 'success' })
	} catch (e) {
		logger.error(e, request.nextUrl.toString())
		return NextResponse.json({ status: 'error', message: stringifyError(e) })
	}
}
