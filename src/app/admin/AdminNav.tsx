'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import { AppPermissions, hasRoutePermission } from '@/lib/auth/shared'

const Links = {
	'/admin': 'Root',
	'/admin/applications': 'Applications',
	'/admin/check-in': 'Check-In',
	'/admin/email': 'Email',
	'/admin/faq': 'FAQ',
	'/admin/post': 'Posts',
	'/admin/schedule': 'Schedule',
	'/admin/users': 'Users',
}

export interface AdminNavProps {
	perms: AppPermissions
}

export function AdminNav({ perms }: AdminNavProps) {
	const selectedSegment = useSelectedLayoutSegment()
	const selectedPath = `/admin${selectedSegment ? `/${selectedSegment}` : ''}`
	return (
		<ul className="flex flex-row flex-wrap justify-center gap-2 bg-black px-2 py-1">
			{Object.entries(Links)
				.filter(([path]) => hasRoutePermission(path, perms))
				.map(([path, name]) => (
					<li key={path}>
						{selectedPath === path
							? <b className="text-white">&lt;{name}/&gt;</b>
							: (
								<Link href={path} className="text-[lime]">
									{name}
								</Link>
							)}
					</li>
				))}
		</ul>
	)
}
