import { ObjectId } from 'mongodb'
import type { NextApiRequest } from 'next'

import jsend, { NextJSendResponse } from '@/lib/api/jsend'
import clientPromise from '@/lib/db'
import User, { ApplicationSchema } from '@/lib/db/models/User'
import logger from '@/lib/logger'
import { getEnhancedSession } from '@/lib/utils/server'

export default async function handler(
	req: NextApiRequest,
	res: NextJSendResponse<boolean>,
) {
	try {
		const client = await clientPromise
		const { user } = getEnhancedSession(req, res)
		if (!user) {
			throw new Error('Unauthenticated')
		}

		if (user.application) {
			throw new Error('Already applied')
		}

		const body = req.body
		const application = ApplicationSchema.parse(body)

		if ((application.resume?.length ?? 0) > 1024 * 1024 * 2.8) {
			throw new Error('Resume must be smaller than 2 MB')
		}

		await client
			.db()
			.collection<User>('users')
			.updateOne(
				{ _id: new ObjectId(user._id) },
				{
					$set: {
						application,
						applied: new Date(),
					},
				},
			)

		res.status(200).json(jsend.success(true))
	} catch (e) {
		logger.error(e, req.url)
		res.status(500).json(jsend.error(e))
	}
}
