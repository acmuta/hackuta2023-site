'use client'

import { JsonUser } from '@/lib/db/models/User'
import { printRoles, stringifyError } from '@/lib/utils/shared'

export interface ViewAsRoleBannerProps {
	user: JsonUser | null
}

export function ViewAsRoleBanner({ user }: ViewAsRoleBannerProps) {
	if (!user?.rolesActual) {
		return undefined
	}

	const exitViewAs = async () => {
		try {
			const response = await fetch(`/admin/role/@@reset/view-as`, {
				method: 'POST',
			})
			const content = await response.json()
			if (content?.status !== 'success') {
				throw new Error('Error')
			}
			window.location.reload()
		} catch (e) {
			alert(stringifyError(e))
		}
	}

	return (
		<>
			<div className="fixed top-0 left-0 w-full h-2 bg-purple-700 z-50" />
			<div className="fixed top-0 left-0 w-2 h-full bg-purple-700 z-50" />
			<div className="fixed top-0 right-0 w-2 h-full bg-purple-700 z-50" />
			<section className="fixed bottom-0 left-0 w-full bg-purple-700 text-white p-2 text-center z-50">
				<div className="flex items-center justify-center gap-4 text-lg font-bold">
					<span>
						You are viewing the website as {printRoles(user.roles)}
						<div className="text-sm">
							To prevent lockout, you still have access to /admin/role
						</div>
					</span>
					<button
						className="border-2 p-2 rounded-md active:text-hackuta-yellow hover:text-hackuta-yellow"
						onClick={exitViewAs}
					>
						Exit View
					</button>
				</div>
			</section>
		</>
	)
}
