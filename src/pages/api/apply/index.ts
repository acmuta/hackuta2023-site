import type { NextApiRequest } from 'next'

import jsend, { NextJSendResponse } from '@/lib/api/jsend'
import clientPromise from '@/lib/db'
import User, { ApplicationSchema } from '@/lib/db/models/User'
import logger from '@/lib/logger'
import { getServerUser } from '@/pages/api/auth/[...nextauth]'

export default async function handler(
	req: NextApiRequest,
	res: NextJSendResponse<boolean>,
) {
	try {
		const client = await clientPromise
		const user = await getServerUser(client, req, res)
		if (!user) {
			throw new Error('Unauthenticated')
		}

		if (user.application) {
			throw new Error('Already applied')
		}

		const body = req.body
		const application = ApplicationSchema.parse(body)

		await client
			.db()
			.collection<User>('users')
			.updateOne(user, {
				$set: {
					application,
					applied: new Date(),
				},
			})

		res.status(200).json(jsend.success(true))
	} catch (e) {
		logger.error(e, req.url)
		res.status(500).json(jsend.error(e))
	}
}
