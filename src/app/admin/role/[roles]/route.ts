import clientPromise from '@/lib/db'
import { AppPermissionsSchema, Role } from '@/lib/db/models/Role'
import logger from '@/lib/logger'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

interface ViewAsRoleRouteProps {
	params: {
		/**
		 * Comma separated list of _id's of Role
		 */
		roles: string
	}
}

const PutBodySchema = z.object({ granted: AppPermissionsSchema })
export type PutBody = z.infer<typeof PutBodySchema>

export async function PUT(
	req: NextRequest,
	{ params: { roles } }: ViewAsRoleRouteProps,
) {
	try {
		const body = PutBodySchema.parse(await req.json())
		const client = await clientPromise
		await client.db()
			.collection<Role>('roles')
			.updateOne(
				{
					// Intentionally only support modifying one role at a time
					_id: { $eq: roles.split(',')[0] },
				},
				{
					$set: {
						granted: body.granted ?? undefined,
					},
				},
			)
		return NextResponse.json({ status: 'success' })
	} catch (e) {
		logger.error(e, req.nextUrl.toString())
		return NextResponse.json({ status: 'error' })
	}
}
