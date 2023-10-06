'use client'

import { JsonUser } from '@/lib/db/models/User'
import { printRoles, stringifyError } from '@/lib/utils/shared'
import { Cancel } from 'iconoir-react'

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
		<div className="fixed top-0 left-0 w-full bg-purple-700 text-white p-2 text-center z-50">
			<div className="flex items-center justify-center gap-4 font-bold">
				<span>
					You are currently viewing the website as the role{' '}
					{printRoles(user.roles)}
					<div className="text-sm">
						To prevent lock outs, you still have access to /admin/role
					</div>
				</span>
				<button
					title="Exit View As"
					className="active:text-hackuta-yellow hover:text-hackuta-yellow"
					onClick={exitViewAs}
				>
					<Cancel aria-label="Exit View As" />
				</button>
			</div>
		</div>
	)
}
