import clientPromise from '@/lib/db'
import User from '@/lib/db/models/User'
import logger from '@/lib/logger'
import { getEnhancedSession } from '@/lib/utils/server'
import { ObjectId } from 'mongodb'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

interface ViewAsRoleRouteProps {
	params: {
		role: string
	}
}

export async function POST(
	_req: NextRequest,
	{ params: { role } }: ViewAsRoleRouteProps,
) {
	const { user } = getEnhancedSession(headers())
	if (!user) {
		return
	}
	try {
		const client = await clientPromise
		await client.db()
			.collection<User>('users')
			.updateOne(
				{
					_id: { $eq: new ObjectId(user._id) },
				},
				role === '@@reset'
					? {
						$set: {
							roles: user.rolesActual ?? user.roles,
							rolesActual: undefined,
						},
					}
					: {
						$set: {
							roles: ['@@view-as', role],
							rolesActual: user.rolesActual ?? user.roles ?? [],
						},
					},
			)
		return NextResponse.json({ status: 'success' })
	} catch (e) {
		logger.error(e, `/admin/role/view-as/`)
		return NextResponse.json({ status: 'error' })
	}
}
