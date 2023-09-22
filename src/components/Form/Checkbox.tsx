import { useState } from 'react'
import { InputProps } from 'react-html-props'

import { Box } from './../Box'
import { Label, LabelProps } from './Label'

export type CheckboxProps =
	& InputProps
	& LabelProps
	& {
		indeterminate?: boolean
	}

export const Checkbox = ({
	text,
	description,
	id,
	name,
	...props
}: CheckboxProps) => {
	const [checked, setChecked] = useState(
		props.defaultChecked ?? props.checked ?? false,
	)
	const handleClick = () => setChecked(!checked)

	return (
		<Box direction="row">
			<input
				type="checkbox"
				id={id}
				name={name ?? id}
				aria-labelledby={`${id}-title`}
				aria-describedby={description && `${id}-description`}
				checked={checked}
				onChange={handleClick}
				{...props}
			/>
			<Label text={text} description={description} id={id} />
		</Box>
	)
}
