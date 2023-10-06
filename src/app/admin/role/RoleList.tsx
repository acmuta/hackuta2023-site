'use client'

import { Button } from '@/components/Button'
import { Role } from '@/lib/db/models/Role'
import { stringifyError } from '@/lib/utils/client'
import { Edit } from 'iconoir-react'
import { ChangeEvent } from 'react'
import { useImmer } from 'use-immer'

export interface RoleListProps {
	roles: readonly Role[]
	onRoleEdit?: (role: string) => void
}
export function RoleList({ roles, onRoleEdit }: RoleListProps) {
	const [selectedRoles, setSelectedRoles] = useImmer<
		Partial<Record<string, true>>
	>({})

	const onCheckboxChange =
		(role: string) => (event: ChangeEvent<HTMLInputElement>) => {
			const target = event.currentTarget
			setSelectedRoles((draft) => {
				if (target.checked) {
					draft[role] = true
				} else {
					delete draft[role]
				}
			})
		}

	const viewAs = async () => {
		try {
			const response = await fetch(
				`/admin/role/${Object.keys(selectedRoles).join(',')}/view-as`,
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
		<article className="flex flex-col gap-2">
			<ul className="border border-black w-[300px]">
				{roles.map((r) => (
					<li
						key={r._id}
						className="flex w-full border border-black"
					>
						<label className="p-2 flex gap-2 flex-1 text-left active:text-hackuta-red hover:text-hackuta-red">
							<input
								type="checkbox"
								checked={selectedRoles[r._id]}
								onChange={onCheckboxChange(r._id)}
							/>
							{r._id}
						</label>
						<button
							title="Edit"
							className="p-2 active:text-hackuta-red hover:text-hackuta-red"
							onClick={() => onRoleEdit?.(r._id)}
						>
							<Edit aria-label="Edit" />
						</button>
					</li>
				))}
			</ul>
			<div className="flex gap-2c">
				<Button
					kind="secondary"
					disabled={!Object.keys(selectedRoles).length}
					onClick={viewAs}
				>
					View As
				</Button>
				<Button
					kind="secondary"
					className="bg-hackuta-red"
					disabled={!Object.keys(selectedRoles).length
						|| 'hacker' in selectedRoles}
				>
					Delete
				</Button>
			</div>
		</article>
	)
}
