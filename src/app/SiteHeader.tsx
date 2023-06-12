'use client'

import { useEffect, useState } from 'react'

import { Header } from '@/components/Header'
import { hasPermission } from '@/lib/auth/shared'
import { useEnhancedSession } from '@/lib/utils/client'

export default function SiteHeader() {
	const { user, perms } = useEnhancedSession()
	const [isLandingPage, setLandingPage] = useState(false)

	useEffect(() => {
		setLandingPage(!user && window.location.pathname === '/')
	}, [user])

	const anchorPrefix = isLandingPage ? '#' : '/'

	return (
		<Header
			items={[
				{
					link: '/',
					name: user?.application ? 'Dashboard' : user ? 'Apply' : 'Home',
				},
				{ link: `${anchorPrefix}faq`, name: 'FAQ' },
				// { link: '/schedule', name: 'Schedule' },
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
