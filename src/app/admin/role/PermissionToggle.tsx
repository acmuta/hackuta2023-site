// This IS a client component.
// 'use client' intentionally omitted, as this does not serve as a boundary
// between server components and client components.
// See also https://github.com/vercel/next.js/discussions/46795

import { Check, NavArrowDown, Prohibition } from 'iconoir-react'
import { ReactNode } from 'react'
import { twJoin } from 'tailwind-merge'

const PermissionOptions = Object.freeze(
	[
		'Partial',
		'Granted',
		'Omitted',
	] as const,
)
export type PermissionOption = (typeof PermissionOptions)[number]

export interface PermissionToggleProps {
	name: string
	/**
	 * Specified if the current permission is expandable.
	 * Children should be an iterable of `PermissionToggle`'s for the child
	 * permissions of the expanded permission.
	 */
	children?: Iterable<ReactNode>
	value: PermissionOption
	onChange: (newValue: PermissionOption) => void
	level: number
}
export function PermissionToggle(
	{ name, children, value = 'Omitted', onChange }: PermissionToggleProps,
) {
	const ToggleButton = (
		{ valueToSet, Icon, className }: {
			valueToSet: PermissionOption
			Icon: typeof Check
			className: string
		},
	) => (
		<button onClick={() => onChange?.(valueToSet)} title={valueToSet}>
			<Icon
				className={value === valueToSet
					? twJoin(className, 'text-white')
					: `text-black`}
				aria-label={valueToSet}
			/>
		</button>
	)

	return (
		<div className={twJoin('flex flex-col')}>
			<div
				className={twJoin(
					'flex justify-between gap-12 border-b border-black',
				)}
			>
				<span className="flex gap-1">
					{children && (
						<ToggleButton
							Icon={NavArrowDown}
							className="bg-hackuta-darkblue"
							valueToSet="Partial"
						/>
					)}
					{name}
				</span>
				<div className="flex gap-1">
					<ToggleButton
						Icon={Check}
						className="bg-green-700"
						valueToSet="Granted"
					/>
					<ToggleButton
						Icon={Prohibition}
						className="bg-hackuta-red"
						valueToSet="Omitted"
					/>
				</div>
			</div>
			{value === 'Partial' && (
				<div className="flex flex-col pl-8">
					{children}
				</div>
			)}
		</div>
	)
}
