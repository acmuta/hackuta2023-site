import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { getEnhancedSession } from '@/lib/utils/server'

export default function Home() {
	const { user } = getEnhancedSession(headers())

	// If the user isn't logged in, show the registration closed message
	if (!user) {
		return (
			<div>
				<p>
					Thank you for your interest in joining us at HackUTA 2023.
					Unfortunately, we&apos;ve hit our registration capacity and can
					no longer accept applications.
				</p>
				<p>
					We will have <strong>walk-in registrations</strong>{' '}
					starting at 11:00am on Saturday, October 7th as space becomes
					available.
				</p>
			</div>
		)
	} else if (user.application) {
		// If the user has already submitted an application, redirect them to the dashboard
		redirect('/dashboard')
	}
}
