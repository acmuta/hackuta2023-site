import { headers } from 'next/headers'

import { getEnhancedSession } from '@/lib/utils/server'

import ApplicantDataTable from './ApplicantDataTable'
import { getUsers } from './utils'

export default async function Applications() {
	const { perms } = getEnhancedSession(headers())
	const applications = ((await getUsers()) ?? [])
		.filter((u) => u.application)
		.map((u) => ({
			...u.application!,
			email: u.email,
			status: u.applicationStatus ?? ('undecided' as const),
		}))

	return <ApplicantDataTable applications={applications} perms={perms} />
}
