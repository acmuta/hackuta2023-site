import clientPromise from '@/lib/db'
import User from '@/lib/db/models/User'
import logger from '@/lib/logger'
import { getAllDocuments } from '@/lib/utils/server'

export async function getUsers(): Promise<User[] | undefined> {
	try {
		const client = await clientPromise
		const users = await getAllDocuments<User>(client, 'users')

		return users
	} catch (e) {
		logger.error(e, '[@/app/users/page.tsx#getUsers]')
		return undefined
	}
}
