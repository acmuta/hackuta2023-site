import { ArrowRight } from 'iconoir-react'
import { ReactNode } from 'react'
import { DetailsProps, SummaryProps } from 'react-html-props'
import { twMerge } from 'tailwind-merge'

import styles from './Accordion.module.css'

export type ButtonStyle = 'primary' | 'secondary'

export type AccordionProps = DetailsProps & {
	dangerouslySetInnerHTMLOnChildren?: { __html: string }
	summary: ReactNode
	summaryClassName?: string
	summaryProps?: SummaryProps
	contentClassName?: string
	arrowClassName?: string
}

export function Accordion({
	children,
	dangerouslySetInnerHTMLOnChildren,
	summary,
	className,
	summaryClassName,
	summaryProps,
	contentClassName,
	arrowClassName,
}: AccordionProps) {
	return (
		<details className={twMerge(styles.accordion, className)}>
			<summary className={summaryClassName} {...summaryProps}>
				{summary} <ArrowRight aria-hidden className={arrowClassName} />
			</summary>
			<div
				className={twMerge(styles.child, contentClassName)}
				dangerouslySetInnerHTML={dangerouslySetInnerHTMLOnChildren}
			>
				{children}
			</div>
		</details>
	)
}
