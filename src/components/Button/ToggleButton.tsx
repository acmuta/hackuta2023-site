'use client'

import { AddCircle, CheckCircle } from 'iconoir-react'
import { useId } from 'react'

import { Button, ButtonProps } from '.'

export type ToggleButtonProps = ButtonProps & {
	selected?: boolean
	text: string
}

export function ToggleButton({
	selected = false,
	text,
	...props
}: ToggleButtonProps) {
	const id = useId()
	return (
		<Button
			kind={selected ? 'primary' : 'secondary'}
			role="checkbox"
			aria-checked={selected}
			id={id}
			aria-labelledby={id}
			{...props}
		>
			{selected
				? <CheckCircle aria-hidden={true} />
				: <AddCircle aria-hidden={true} />}
			{text}
		</Button>
	)
}
