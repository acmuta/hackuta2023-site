'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className={'flex flex-col gap-2 content-center w-full py-2'}>
			<nav className="flex flex-row justify-center">
				<Sidebar />
			</nav>
			<main className="max-w-[1000px] mx-auto">{children}</main>
		</div>
	)
}

const Links = {
	'/admin': 'Root',
	'/admin/applications': 'Applications',
	'/admin/check-in': 'Check-In',
	'/admin/faq': 'FAQ',
	'/admin/marketing': 'Marketing',
	'/admin/post': 'Posts',
	'/admin/schedule': 'Schedule',
	'/admin/users': 'Users',
}

function Sidebar() {
	const selectedSegment = useSelectedLayoutSegment()
	const selectedPath = `/admin${selectedSegment ? `/${selectedSegment}` : ''}`
	return (
		<ul className="flex flex-row flex-wrap gap-2">
			{Object.entries(Links).map(([path, name]) => (
				<li key={path}>
					{selectedPath === path ? (
						<b>{name}</b>
					) : (
						<Link href={path}>{name}</Link>
					)}
				</li>
			))}
		</ul>
	)
}
