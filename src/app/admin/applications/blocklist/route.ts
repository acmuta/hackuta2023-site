import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import clientPromise from '@/lib/db'
import {
	BlockedHacker,
	BlockedHackerCollection,
	BlockedHackerSchema,
} from '@/lib/db/models/BlockedHacker'
import logger from '@/lib/logger'
import { stringifyError } from '@/lib/utils/shared'

const BodySchema = z.object({
	emails: z.string().array(),
	decision: z.enum(['accepted', 'rejected', 'waitlisted']),
})

export type ApplicationDecideRequestBody = z.infer<typeof BodySchema>

export async function POST(request: NextRequest) {
	try {
		const body = BlockedHackerSchema.array().parse(await request.json())

		const client = await clientPromise
		await client
			.db()
			.collection<BlockedHacker>(BlockedHackerCollection)
			.bulkWrite([
				{
					deleteMany: { filter: {} },
				},
				...body.map((v) => ({
					insertOne: {
						document: v,
					},
				})),
			])

		return NextResponse.json({ status: 'success' })
	} catch (e) {
		logger.error(e, request.nextUrl.pathname)
		return NextResponse.json({ status: 'error', message: stringifyError(e) })
	}
}
