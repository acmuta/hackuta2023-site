'use client'

import Select, { createFilter, Props as SelectProps } from 'react-select'
import Creatable from 'react-select/creatable'

import { Box } from './../Box'
import ErrorMessage, { ErrorMessageProps } from './ErrorMessage'
import { Label, LabelProps } from './Label'
import styles from './styles.module.css'

export type DropdownProps =
	& ErrorMessageProps
	& LabelProps
	& {
		selectProps?: SelectProps<Option>
		isClearable?: boolean
		isCreatable?: boolean
		isMulti?: boolean
		options: Option[]
	}

export interface Option {
	label: string
	value: string
}

export const Dropdown = ({
	selectProps,
	options,
	text,
	description,
	id,
	isClearable,
	isCreatable,
	isMulti,
	errors,
}: DropdownProps) => {
	const SelectElement = isCreatable ? Creatable : Select
	return (
		<Box direction="column" gap=".125rem">
			<Label text={text} description={description} id={id} />
			<SelectElement
				id={id}
				name={id}
				options={options}
				classNames={{
					control: (state) =>
						state.isFocused ? styles.focused : styles.select,
				}}
				filterOption={createFilter({ ignoreAccents: false })}
				isClearable={isClearable}
				isMulti={isMulti}
				aria-labelledby={`${id}-title`}
				aria-describedby={description && `${id}-description`}
				{...selectProps}
			/>
			<ErrorMessage errors={errors} />
		</Box>
	)
}
