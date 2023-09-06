import { HeadingProps as HtmlHeadingProps } from 'react-html-props'
import { twMerge } from 'tailwind-merge'

export type HeadingProps = HtmlHeadingProps & {
	level?: 1 | 2 | 3 | 4 | 5 | 6
}

export const Heading = ({
	level = 1,
	children,
	className,
	...props
}: HeadingProps) => {
	const HeadingTag = `h${level}` as const

	return (
		<HeadingTag
			className={twMerge(
				level == 1 ? 'text-4xl' : level > 1 ? 'text-2xl' : undefined,
				className,
			)}
			{...props}
		>
			{children}
		</HeadingTag>
	)
}
