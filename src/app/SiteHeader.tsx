'use client'

import { Header } from '@/components/Header'
import { hasPermission } from '@/lib/auth/shared'
import { useEnhancedSession } from '@/lib/utils/client'

export default function SiteHeader() {
	const { user, perms } = useEnhancedSession()

	return (
		<Header
			items={[
				{
					link: '/',
					name: user?.application ? 'Dashboard' : user ? 'Apply' : 'Home',
				},
				{ link: '/faq', name: 'FAQ' },
				{ link: '/schedule', name: 'Schedule' },
				// { link: '/organizers', name: 'Organizers' },
				// { link: '/sponsors', name: 'Sponsors' },
			]}
			endItems={[
				...(hasPermission(perms, { administration: { read: true } })
					? [{ link: '/admin', name: 'Admin' }]
					: []),
				user
					? { link: '/api/auth/signout', name: 'Sign out' }
					: { link: '/api/auth/signin', name: 'Sign in' },
			]}
		/>
	)
}
