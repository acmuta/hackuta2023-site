import classNames from 'classnames'
import { LabelProps as HtmlLabelProps } from 'react-html-props'

import styles from './Label.module.css'

export type DescriberProps = {
	text?: string
	description?: string
}

export type LabelProps = HtmlLabelProps & DescriberProps

export const Label = ({
	text,
	description,
	className,
	id,
	...props
}: LabelProps) => {
	const labelTitleId = `${id}-title`
	const labelDescriptionId = `${id}-description`

	return (
		<label
			className={classNames('label', styles.label, className)}
			htmlFor={id}
			aria-labelledby={`${id}-title`}
			aria-describedby={description && `${id}-description`}
			{...props}
		>
			<span id={labelTitleId}>{text}</span>
			{description && <div id={labelDescriptionId}>{description}</div>}
		</label>
	)
}
