import { Box } from '@/components/Box'
import clientPromise from '@/lib/db'
import User from '@/lib/db/models/User'

import Form from './Form'

export default async function Marketing() {
	try {
		const client = await clientPromise
		const allEmails = await client
			.db()
			.collection<User>('users')
			.distinct('email')
		return (
			<Box direction="column" gap="1rem" style={{ width: '75%' }}>
				<h1>Marketing Emails</h1>
				<Form allEmails={allEmails} />
			</Box>
		)
	} catch (e) {
		return 'Error'
	}
}
