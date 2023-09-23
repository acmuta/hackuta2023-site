import { InputProps } from 'react-html-props'

import { Box } from '../Box'
import { Label, LabelProps } from './Label'

export type FileInputProps =
	& InputProps
	& LabelProps
	& {
		indeterminate?: boolean
	}

export const FileInput = ({
	text,
	description,
	id,
	name,
	...props
}: FileInputProps) => {
	return (
		<Box direction="column" gap=".125rem">
			<Label text={text} description={description} id={id} />
			<input
				type="file"
				id={id}
				name={name ?? id}
				aria-labelledby={`${id}-title`}
				aria-describedby={description && `${id}-description`}
				{...props}
			/>
		</Box>
	)
}
