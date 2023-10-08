import { headers } from 'next/headers'

import clientPromise from '@/lib/db'
import {
	BlockedHacker,
	BlockedHackerCollection,
} from '@/lib/db/models/BlockedHacker'
import { getEnhancedSession } from '@/lib/utils/server'

import User from '@/lib/db/models/User'
import ApplicantDataTable, { Row } from './ApplicantDataTable'

export default async function Applications() {
	const { perms } = getEnhancedSession(headers())
	const client = await clientPromise
	const applications = await client.db()
		.collection<User>('users')
		.aggregate([
			{
				$match: {
					application: { $exists: true },
				},
			},
			{
				$set: {
					'application.email': '$email',
					'application.resume': {
						$cond: {
							if: {
								$regexMatch: {
									input: {
										$substrCP: ['$application.resume', 0, 32],
									},
									regex: '^data:application/pdf;base64,.',
								},
							},
							then: true,
							else: false,
						},
					},
					'application.status': {
						$cond: {
							if: '$applicationStatus',
							then: '$applicationStatus',
							else: 'undecided',
						},
					},
					'application.checkedIn': '$checkedIn',
				},
			},
			{
				$replaceRoot: {
					newRoot: '$application',
				},
			},
		])
		.toArray() as Row[]
	const blockedHackers = await client
		.db()
		.collection<BlockedHacker>(BlockedHackerCollection)
		.find({}, { projection: { _id: 0 } })
		.toArray()

	return (
		<ApplicantDataTable
			applications={applications.map((a) => ({
				...a,
				checkedIn: a.checkedIn?.toString(),
			}))}
			blockedHackers={blockedHackers}
			perms={perms}
		/>
	)
}
