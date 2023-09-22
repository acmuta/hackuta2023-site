'use client'

import { useState } from 'react'
import { DivProps } from 'react-html-props'

import { Box } from '../Box'
import { ToggleButton } from './ToggleButton'

export type ToggleButtonGroupProps = DivProps & {
	allSelected?: boolean
	items: string[]
	groupId: string
	onUpdate?: (newValue: readonly string[]) => unknown
}

export const ToggleButtonGroup = ({
	allSelected,
	groupId,
	items,
	onUpdate,
}: ToggleButtonGroupProps) => {
	const [checkedState, setCheckedState] = useState(
		new Array<boolean>(items.length).fill(!!allSelected),
	)

	const handleOnChange = (position: number) => {
		const updatedCheckedState = checkedState.map((item, index) =>
			index === position ? !item : item
		)

		setCheckedState(updatedCheckedState)

		onUpdate?.(items.filter((_v, i) => updatedCheckedState[i]))
	}

	return (
		<Box direction="row" style={{ gap: '0.5rem' }} wrap={'wrap'}>
			{items.map((item, index) => (
				<ToggleButton
					key={`${groupId}-${index}`}
					selected={checkedState[index]}
					onClick={() => handleOnChange(index)}
					text={item}
				/>
			))}
		</Box>
	)
}
