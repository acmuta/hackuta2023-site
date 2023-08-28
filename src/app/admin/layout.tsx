import Link from 'next/link'

import { Box } from '@/components/Box'

import styles from './layout.module.css'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<Box direction="row" className={styles.adminLayoutRoot}>
			<aside>
				<Sidebar />
			</aside>
			<main className={'w-full'}>{children}</main>
		</Box>
	)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Links = {
	'/admin/users': 'Users',
	'/admin/teams': 'Teams',
	'/admin/schedule': 'Schedule',
	'/admin/post': 'Posts',
	'/admin/organizers': 'Organizers',
	'/admin/marketing': 'Marketing',
	'/admin/faq': 'FAQ',
	'/admin/check-in': 'Check',
	'/admin/applications': 'Applications',
	'/admin': 'Root',
}

function Sidebar() {
	return (
		<ul>
			<li>
				<Link href="/admin">Root</Link>
			</li>
			<li>
				<Link href="/admin/applications">Applications</Link>
			</li>
			<li>
				<Link href="/admin/check-in">Check-In</Link>
			</li>
			<li>
				<Link href="/admin/faq">FAQ</Link>
			</li>
			<li>
				<Link href="/admin/marketing">Marketing Emails</Link>
			</li>
			<li>
				<Link href="/admin/organizers">Organizers</Link>
			</li>
			<li>
				<Link href="/admin/post">Posts</Link>
			</li>
			<li>
				<Link href="/admin/schedule">Schedule</Link>
			</li>
			<li>
				<Link href="/admin/teams">Teams</Link>
			</li>
			<li>
				<Link href="/admin/users">Users</Link>
			</li>
		</ul>
	)
}
