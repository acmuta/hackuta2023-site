'use client'

import { Role } from '@/lib/db/models/Role'
import { stringifyError } from '@/lib/utils/client'
import { EyeEmpty } from 'iconoir-react'

export interface RoleListProps {
	roles: readonly Role[]
	onRoleSelected?: (role: string) => void
}
export function RoleList({ roles, onRoleSelected }: RoleListProps) {
	const viewAs = (r: Role) => async () => {
		try {
			const response = await fetch(
				`/admin/role/view-as/${r._id}`,
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
	}

	return (
		<ul className="border border-black">
			{roles.map((r) => (
				<li
					key={r._id}
					className="flex w-full border border-black"
				>
					<button
						className="p-2 flex-1 text-left active:text-white hover:text-white"
						onClick={() => onRoleSelected?.(r._id)}
					>
						{r._id}
					</button>
					<button
						title="View As"
						className="p-2 active:text-white hover:text-white"
						onClick={viewAs(r)}
					>
						<EyeEmpty aria-label="View As" />
					</button>
				</li>
			))}
		</ul>
	)
}
