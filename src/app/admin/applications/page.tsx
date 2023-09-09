import { headers } from 'next/headers'

import clientPromise from '@/lib/db'
import {
	BlockedHacker,
	BlockedHackerCollection,
} from '@/lib/db/models/BlockedHacker'
import { getEnhancedSession } from '@/lib/utils/server'

import ApplicantDataTable from './ApplicantDataTable'
import { getUsers } from './utils'

export default async function Applications() {
	const { perms } = getEnhancedSession(headers())
	const client = await clientPromise
	const applications = ((await getUsers()) ?? [])
		.filter((u) => u.application)
		.map((u) => ({
			...u.application!,
			email: u.email,
			status: u.applicationStatus ?? ('undecided' as const),
			resume: /^data:application\/pdf;base64,./.test(
				u.application!.resume ?? '',
			),
		}))
	const blockedHackers = await client
		.db()
		.collection<BlockedHacker>(BlockedHackerCollection)
		.find({}, { projection: { _id: 0 } })
		.toArray()

	return (
		<ApplicantDataTable
			applications={applications}
			blockedHackers={blockedHackers}
			perms={perms}
		/>
	)
}
