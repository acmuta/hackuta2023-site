import classNames from 'classnames'
import { ElementProps } from 'react-html-props'

import styles from './Box.module.css'
import { BoxProps } from './types'

export function Box<T extends ElementProps = ElementProps>({
	as = 'div',
	display = 'flex',
	direction = 'row',
	justifyContent = 'normal',
	alignItems = 'stretch',
	wrap = 'nowrap',
	gap,
	className,
	style,
	children,
	...props
}: BoxProps<T>) {
	const Component = as
	const isFlex = display === 'flex' || display === 'inline-flex'

	return (
		<Component
			className={classNames(
				styles[display],
				{
					[styles[`flex-${direction}`]]: isFlex,
					[styles[`justify-${justifyContent}`]]: isFlex,
					[styles[`align-${alignItems}`]]: isFlex,
					[styles[`flex-wrap-${wrap}`]]: isFlex,
				},
				className,
			)}
			style={{
				...(style && style),
				...(gap && { gap: gap }),
			}}
			{...props}
		>
			{children}
		</Component>
	)
}
