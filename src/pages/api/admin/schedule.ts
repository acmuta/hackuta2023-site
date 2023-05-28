import type { NextApiRequest } from 'next'

import { NextJSendResponse } from '@/lib/api/jsend'
import clientPromise from '@/lib/db'
import { EventModel, EventSchema } from '@/lib/db/models/Event'
import { makeApiPostHandler } from '@/lib/utils/server'

export default async function handler(
	req: NextApiRequest,
	res: NextJSendResponse<EventModel[]>,
) {
	await makeApiPostHandler<typeof EventSchema, EventModel>(
		req,
		res,
		await clientPromise,
		EventSchema,
		'events',
	)
}
