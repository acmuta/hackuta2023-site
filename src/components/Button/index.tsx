import classNames from 'classnames'
import Link, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, ReactNode } from 'react'
import { ButtonProps as HtmlButtonProps } from 'react-html-props'

import styles from './Button.module.css'

export { ToggleButton } from './ToggleButton'

export type ButtonKind = 'primary' | 'secondary'

export type ButtonProps = HtmlButtonProps & {
	kind?: ButtonKind
}
export function Button({
	children,
	className,
	kind = 'primary',
	type = 'button',
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={classNames(styles.button, styles[kind], className)}
			{...props}
		>
			{children}
		</button>
	)
}

export type LinkButtonProps = LinkProps &
	AnchorHTMLAttributes<HTMLAnchorElement> & {
		children?: ReactNode
		kind?: ButtonKind
	}
export function LinkButton({
	children,
	kind = 'primary',
	...props
}: LinkButtonProps) {
	return (
		<Link className={classNames(styles.button, styles[kind])} {...props}>
			{children}
		</Link>
	)
}
