import { headers } from 'next/headers'

import { getEnhancedSession } from '@/lib/utils/server'

import { AdminNav } from './AdminNav'

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { perms } = getEnhancedSession(headers())
	return (
		<div className={'flex flex-col gap-4 content-center w-full py-2'}>
			<nav className="flex flex-row justify-center">
				<AdminNav perms={perms} />
			</nav>
			<main className="max-w-[1000px] mx-auto">{children}</main>
		</div>
	)
}
