import { AdminNav } from './AdminNav'

export const dynamic = 'force-dynamic'

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className={'flex flex-col gap-2 content-center w-full py-2'}>
			<nav className="flex flex-row justify-center">
				<AdminNav />
			</nav>
			<main className="max-w-[1000px] mx-auto">{children}</main>
		</div>
	)
}
