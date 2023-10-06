import clientPromise from '@/lib/db'
import User from '@/lib/db/models/User'
import logger from '@/lib/logger'
import { stringifyError } from '@/lib/utils/server'
import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

interface UserRoleRouteProps {
	params: {
		operation: 'add' | 'remove'
		user: string
		role: string
	}
}

export async function POST(
	req: NextRequest,
	{ params: { operation, user: id, role } }: UserRoleRouteProps,
) {
	try {
		const client = await clientPromise
		const user = await client.db()
			.collection<User>('users')
			.findOne({ _id: { $eq: new ObjectId(id) } })
		if (!user) {
			throw new Error('Unknown user')
		}
		await client.db()
			.collection<User>('users')
			.updateOne(
				{ _id: { $eq: new ObjectId(id) } },
				{
					[operation === 'add' ? '$addToSet' : '$pull']: {
						[user.rolesActual ? 'rolesActual' : 'roles']: role,
					},
				},
			)
		return NextResponse.json({ status: 'success' })
	} catch (e) {
		logger.error(e, req.nextUrl.toString())
		return NextResponse.json({ status: 'error', message: stringifyError(e) })
	}
}
