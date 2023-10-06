'use client'

import { useEnhancedSession } from '@/lib/utils/client'
import { printRoles, stringifyError } from '@/lib/utils/shared'
import { Cancel } from 'iconoir-react'

export function ViewAsRoleBanner() {
	const { user } = useEnhancedSession()
	if (!user?.rolesActual) {
		return undefined
	}

	return (
		<div className="flex items-center justify-center gap-4 fixed top-0 left-0 w-full bg-purple-700 text-white font-bold p-2 text-center z-50">
			<span>
				You are currently viewing the website as the role{' '}
				&lsquo;{printRoles(user.roles)}&rsquo;
			</span>
			<button
				title="Exit View As"
				className="active:text-hackuta-yellow hover:text-hackuta-yellow"
				onClick={async () => {
					try {
						const response = await fetch(
							`/admin/role/view-as/@@reset`,
							{
								method: 'POST',
							},
						)
						const content = await response.json()
						if (content?.status !== 'success') {
							throw new Error('Error')
						}
						window.location.reload()
					} catch (e) {
						alert(stringifyError(e))
					}
				}}
			>
				<Cancel aria-label="Exit View As" />
			</button>
		</div>
	)
}
