import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import clientPromise from '@/lib/db'
import User from '@/lib/db/models/User'
import logger from '@/lib/logger'

const BodySchema = z.object({
	emails: z.string().array(),
	decision: z.enum(['accepted', 'rejected', 'waitlisted']),
})

export type ApplicationDecideRequestBody = z.infer<typeof BodySchema>

export async function POST(request: NextRequest) {
	const body = BodySchema.parse(await request.json())
	try {
		const client = await clientPromise
		await client
			.db()
			.collection<User>('users')
			.updateMany(
				{ email: { $in: body.emails } },
				{
					$set: {
						applicationDecided: new Date(),
						applicationStatus: body.decision,
					},
				},
			)
		return NextResponse.json({})
	} catch (e) {
		logger.error(e, `[/admin/applications/decide]`)
		return NextResponse.json({})
	}
}
