import { Document } from 'mongodb'

import clientPromise from '@/lib/db'
import logger from '@/lib/logger'
import { getAllDocuments } from '@/lib/utils/server'

export async function queryDbForItems<TModel extends Document>(
	collectionName: string,
	logMetadata: string,
	onReturn: (items: TModel[]) => TModel[] = (items) => items,
): Promise<TModel[] | undefined> {
	try {
		const client = await clientPromise
		const items = await getAllDocuments<TModel>(client, collectionName, true)

		return onReturn(items)
	} catch (e) {
		logger.error(e as string, logMetadata)
		return undefined
	}
}
