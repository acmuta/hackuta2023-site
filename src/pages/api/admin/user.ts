import type { NextApiRequest } from 'next'

import jsend, { NextJSendResponse } from '@/lib/api/jsend'
import clientPromise from '@/lib/db'
import User from '@/lib/db/models/User'
import logger from '@/lib/logger'

export default async function handler(
	req: NextApiRequest,
	res: NextJSendResponse<User[]>,
) {
	try {
		const client = await clientPromise

		if (req.method !== 'POST') {
			throw new Error(`Unsupported ${req.method}`)
		}

		const { email, applicationStatus } = req.body

		await client
			.db()
			.collection<User>('users')
			.updateOne(
				{ email },
				{
					$set: {
						applicationStatus,
						applicationDecided: new Date(),
					},
				},
			)

		res.status(200).json(jsend.success(req.body))
	} catch (e) {
		logger.error(e, req.url)
		res.status(500).json(jsend.error(e))
	}
}
