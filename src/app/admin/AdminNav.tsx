'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import { hasRoutePermission } from '@/lib/auth/shared'
import { AppPermissions } from '@/lib/db/models/Role'

const Links = {
	'/admin': 'Root',
	'/admin/applications': 'Applications',
	'/admin/email': 'Email',
	'/admin/faq': 'FAQ',
	'/admin/post': 'Post',
	'/admin/role': 'Role',
	'/admin/scanner': 'Scanner',
	'/admin/schedule': 'Schedule',
	'/admin/shop': 'Shop',
	'/admin/user': 'User',
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
