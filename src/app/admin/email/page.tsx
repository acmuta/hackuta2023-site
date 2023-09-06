import { Box } from '@/components/Box'
import { Heading } from '@/components/Heading'
import clientPromise from '@/lib/db'
import User from '@/lib/db/models/User'

import Form from './Form'

export default async function Email() {
	try {
		const client = await clientPromise
		const allEmails = await client
			.db()
			.collection<User>('users')
			.distinct('email')
		const existingTags = await client
			.db()
			.collection<User>('users')
			.distinct('receivedEmailTags')
		return (
			<Box direction="column" gap="1rem">
				<Heading level={1}>Emails</Heading>
				<Form allEmails={allEmails} existingTags={existingTags} />
			</Box>
		)
	} catch (e) {
		return 'Error'
	}
}
