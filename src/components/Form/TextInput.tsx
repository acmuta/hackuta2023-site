import { DivProps, InputProps, TextAreaProps } from 'react-html-props'

import { Box, BoxProps } from './../Box'
import ErrorMessage, { ErrorMessageProps } from './ErrorMessage'
import { Label, LabelProps } from './Label'
import styles from './styles.module.css'

type CommonProps =
	& {
		boxProps?: BoxProps<DivProps>
		suggestions?: string[]
	}
	& ErrorMessageProps
	& LabelProps

export type TextInputProps =
	| (
		& {
			isMultiline?: false
		}
		& CommonProps
		& InputProps
	)
	| (
		& {
			isMultiline: true
		}
		& CommonProps
		& TextAreaProps
	)

export const TextInput = ({
	errors,
	text,
	placeholder,
	name,
	id,
	isMultiline,
	description,
	style,
	boxProps,
	suggestions,
	...props
}: TextInputProps) => {
	const Component = isMultiline ? 'textarea' : 'input'
	return (
		<Box direction="column" gap=".125rem" {...boxProps}>
			<Label text={text} description={description} id={id} />
			<Component
				id={id}
				name={name ?? id}
				aria-labelledby={`${id}-title`}
				aria-describedby={description && `${id}-description`}
				placeholder={placeholder}
				className={styles.input}
				style={style}
				list={suggestions?.length ? `${id}-list` : undefined}
				{
					// TODO: a more elegant way to pass props
					...{
						defaultValue: props.defaultValue,
						maxLength: props.maxLength,
						minLength: props.minLength,
						onChange: props.onChange as never,
						onKeyDown: props.onKeyDown as never,
						onKeyUp: props.onKeyUp as never,
						pattern: (props as InputProps).pattern,
						readOnly: props.readOnly,
						required: props.required,
						spellCheck: props.spellCheck,
						value: props.value,
					}
				}
			/>
			<ErrorMessage errors={errors} />
			{suggestions?.length
				? (
					<datalist id={`${id}-list`}>
						{suggestions.map((s) => <option key={s} value={s}></option>)}
					</datalist>
				)
				: undefined}
		</Box>
	)
}
