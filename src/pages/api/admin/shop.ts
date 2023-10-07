import type { NextApiRequest } from 'next'

import { NextJSendResponse } from '@/lib/api/jsend'
import clientPromise from '@/lib/db'
import {
	ShopSwag,
	ShopSwagCollection,
	ShopSwapSchema,
} from '@/lib/db/models/ShopSwap'
import { makeApiPostHandler } from '@/lib/utils/server'

export default async function handler(
	req: NextApiRequest,
	res: NextJSendResponse<ShopSwag[]>,
) {
	await makeApiPostHandler<typeof ShopSwapSchema, ShopSwag>(
		req,
		res,
		await clientPromise,
		ShopSwapSchema,
		ShopSwagCollection,
	)
}
