import clientPromise from '@/lib/db'
import { AppPermissionsSchema, Role } from '@/lib/db/models/Role'
import User from '@/lib/db/models/User'
import logger from '@/lib/logger'
import { stringifyError } from '@/lib/utils/shared'
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

export async function DELETE(
	req: NextRequest,
	{ params: { roles } }: ViewAsRoleRouteProps,
) {
	const splitRoles = roles.split(',').filter((r) => r !== 'hacker')
	try {
		const client = await clientPromise
		await client.db()
			.collection<Role>('roles')
			.deleteMany({
				_id: { $in: splitRoles },
			})
		await client.db()
			.collection<User>('users')
			.updateMany(
				{ roles: { $in: splitRoles } },
				{ $pull: { roles: { $in: splitRoles } } },
			)
		return NextResponse.json({ status: 'success' })
	} catch (e) {
		logger.error(e, req.nextUrl.toString())
		return NextResponse.json({ status: 'error', message: stringifyError(e) })
	}
}

export async function POST(
	req: NextRequest,
	{ params: { roles } }: ViewAsRoleRouteProps,
) {
	try {
		const regex = /^[a-z0-9_]+$/
		// Intentionally only support adding one role at a time
		const role = roles.split(',')[0]

		if (!regex.test(role)) {
			throw new Error('Illegal role name')
		}

		const client = await clientPromise
		await client.db()
			.collection<Role>('roles')
			.insertOne({ _id: role, granted: undefined })
		return NextResponse.json({ status: 'success' })
	} catch (e) {
		logger.error(e, req.nextUrl.toString())
		return NextResponse.json({ status: 'error', message: stringifyError(e) })
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
		return NextResponse.json({ status: 'error', message: stringifyError(e) })
	}
}
