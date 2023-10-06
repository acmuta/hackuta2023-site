import clientPromise from '@/lib/db'
import User from '@/lib/db/models/User'
import logger from '@/lib/logger'
import { getEnhancedSession, stringifyError } from '@/lib/utils/server'
import { ObjectId } from 'mongodb'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

interface ViewAsRoleRouteProps {
	params: {
		/**
		 * `@@reset` to restore to the user's original roles,
		 * or a comma separated list of roles to view as.
		 */
		roles: string
	}
}

export async function POST(
	req: NextRequest,
	{ params: { roles } }: ViewAsRoleRouteProps,
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
				roles.includes('@@reset')
					? {
						$set: {
							roles: user.rolesActual ?? user.roles,
							rolesActual: undefined,
						},
					}
					: {
						$set: {
							roles: [...roles.split(','), '@@view-as'],
							rolesActual: user.rolesActual ?? user.roles ?? [],
						},
					},
			)
		return NextResponse.json({ status: 'success' })
	} catch (e) {
		logger.error(e, req.nextUrl.toString())
		return NextResponse.json({ status: 'error', message: stringifyError(e) })
	}
}
