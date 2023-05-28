import type { ObjectId } from 'mongodb'

export default interface Account {
	provider: string
	providerAccountId: string
	userId: ObjectId
}
