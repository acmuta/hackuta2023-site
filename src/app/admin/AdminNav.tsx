'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

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

export function AdminNav() {
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
