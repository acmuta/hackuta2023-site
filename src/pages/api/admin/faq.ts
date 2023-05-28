import type { NextApiRequest } from 'next'

import { NextJSendResponse } from '@/lib/api/jsend'
import clientPromise from '@/lib/db'
import { FaqModel, FaqSchema } from '@/lib/db/models/Faq'
import { makeApiPostHandler } from '@/lib/utils/server'

export default async function handler(
	req: NextApiRequest,
	res: NextJSendResponse<FaqModel[]>,
) {
	await makeApiPostHandler<typeof FaqSchema, FaqModel>(
		req,
		res,
		await clientPromise,
		FaqSchema,
		'faqs',
	)
}
