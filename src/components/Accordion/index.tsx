import classNames from 'classnames'
import { ArrowRight } from 'iconoir-react'
import { ReactNode } from 'react'
import { DetailsProps, SummaryProps } from 'react-html-props'

import styles from './Accordion.module.css'

export type ButtonStyle = 'primary' | 'secondary'

export type AccordionProps = DetailsProps & {
	dangerouslySetInnerHTMLOnChildren?: { __html: string }
	summary: ReactNode
	summaryClassName?: string
	summaryProps?: SummaryProps
}

export function Accordion({
	children,
	dangerouslySetInnerHTMLOnChildren,
	summary,
	className,
	summaryClassName,
	summaryProps,
}: AccordionProps) {
	return (
		<details className={classNames(styles.accordion, className)}>
			<summary className={summaryClassName} {...summaryProps}>
				{summary} <ArrowRight aria-hidden />
			</summary>
			<div
				className={styles.child}
				dangerouslySetInnerHTML={dangerouslySetInnerHTMLOnChildren}
			>
				{children}
			</div>
		</details>
	)
}
