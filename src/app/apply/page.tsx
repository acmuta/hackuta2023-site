import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { getEnhancedSession } from '@/lib/utils/server'

import { ApplicationForm } from './ApplicationForm'

export default async function Home() {
	const { user } = getEnhancedSession(headers())

	if (!user) {
		redirect('/api/auth/signin')
	} else if (user.application) {
		redirect('/dashboard')
	}

	return <ApplicationForm />
}
