import classNames from 'classnames'
import { HeadingProps as HtmlHeadingProps } from 'react-html-props'

import styles from './Heading.module.css'

export type HeadingProps = HtmlHeadingProps & {
	level: 1 | 2 | 3 | 4 | 5 | 6
}

export const Heading = ({
	level = 1,
	children,
	className,
	...props
}: HeadingProps) => {
	const Tag: string = !level ? 'h1' : `h${level}`
	const HeadingTag = Tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

	return (
		<HeadingTag className={classNames(styles.heading, className)} {...props}>
			{children}
		</HeadingTag>
	)
}
