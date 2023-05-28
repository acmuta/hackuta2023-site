import classNames from 'classnames'
import { ReactNode } from 'react'
import { HtmlProps } from 'react-html-props'

import { Box } from '@/components/Box'

import { Heading } from '../Heading'
import styles from './Footer.module.css'

export type FooterProps = HtmlProps & {
	children?: ReactNode
}

export type FooterNavProps = HtmlProps & {
	title: ReactNode
	links: ReactNode[]
	linkClassName?: string
}

export const Footer = ({ children, className, ...props }: FooterProps) => {
	return (
		<Box
			as="footer"
			direction="row"
			className={classNames(styles.footer, className)}
			wrap="wrap"
			{...props}
		>
			{children}
		</Box>
	)
}

export const FooterNav = ({
	title,
	links,
	linkClassName,
	...props
}: FooterNavProps) => {
	return (
		<Box direction="column" className={styles.footerNav} {...props}>
			<Heading level={2} className={styles.footerNavHeading}>
				{title}
			</Heading>
			<ul className={linkClassName}>
				{links.map((link, index) => (
					<li key={index}>{link}</li>
				))}
			</ul>
		</Box>
	)
}

export const ACMLogo = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 164.23 47.94"
			fill={'var(--color-white)'}
		>
			<path d="m61.03,17.38l-14.65-14.65c-1.76-1.76-4.1-2.73-6.59-2.73s-4.83.97-6.6,2.73l-1.32,1.32-1.32-1.32c-1.76-1.76-4.1-2.73-6.6-2.73s-4.83.97-6.59,2.73L2.73,17.38c-3.64,3.64-3.64,9.55,0,13.19l14.65,14.65c1.82,1.82,4.21,2.73,6.59,2.73s4.78-.91,6.6-2.73l1.32-1.32,1.32,1.32c1.82,1.82,4.21,2.73,6.6,2.73s4.78-.91,6.59-2.73l14.65-14.65c3.64-3.64,3.64-9.55,0-13.19Zm-34.07,24.24c-1.65,1.65-4.34,1.65-5.99,0l-14.65-14.65c-1.65-1.65-1.65-4.34,0-5.99l14.65-14.65c.8-.8,1.86-1.24,3-1.24s2.2.44,3,1.24l1.32,1.32-9.73,9.73c-3.64,3.64-3.64,9.55,0,13.19l9.73,9.73-1.32,1.32Zm4.91-4.91l-9.73-9.73c-1.65-1.65-1.65-4.34,0-5.99l9.73-9.73,9.73,9.73c1.65,1.65,1.65,4.34,0,5.99l-9.73,9.73Zm25.55-9.73l-14.65,14.65c-1.65,1.65-4.34,1.65-5.99,0l-1.32-1.32,9.73-9.73c3.64-3.64,3.64-9.55,0-13.19l-9.73-9.73,1.32-1.32c.8-.8,1.87-1.24,3-1.24s2.2.44,3,1.24l14.65,14.65c1.65,1.65,1.65,4.34,0,5.99Z" />
			<g>
				<path d="m77.07,27.53h-4.49l-.6,1.9h-3.02l4.11-12.09h3.52l4.11,12.09h-3.02l-.6-1.9Zm-.83-2.59l-1.42-4.44-1.42,4.44h2.83Z" />
				<path d="m80.79,23.38c0-3.56,2.64-6.29,6.29-6.29,2.19,0,4.13,1.09,5.18,2.8l-2.38,1.38c-.54-.93-1.57-1.49-2.8-1.49-2.14,0-3.52,1.43-3.52,3.59s1.38,3.59,3.52,3.59c1.23,0,2.28-.55,2.8-1.49l2.38,1.38c-1.04,1.71-2.97,2.8-5.18,2.8-3.64,0-6.29-2.73-6.29-6.29Z" />
				<path d="m105.65,29.43h-2.76v-7.03l-3.13,5.13h-.31l-3.13-5.13v7.03h-2.76v-12.09h2.76l3.28,5.37,3.28-5.37h2.76v12.09Z" />
				<path d="m120.82,20.79v8.64h-2.59v-.81c-.57.66-1.42,1.05-2.57,1.05-2.26,0-4.13-1.99-4.13-4.56s1.87-4.56,4.13-4.56c1.16,0,2,.4,2.57,1.05v-.81h2.59Zm-2.59,4.32c0-1.3-.86-2.11-2.06-2.11s-2.06.81-2.06,2.11.86,2.11,2.06,2.11,2.06-.81,2.06-2.11Z" />
				<path d="m126,23.28v3.06c0,.74.64.81,1.78.74v2.35c-3.39.35-4.37-.67-4.37-3.09v-3.06h-1.38v-2.49h1.38v-1.64l2.59-.78v2.42h1.78v2.49h-1.78Z" />
				<path d="m133.74,25.52v-8.19h2.76v7.95c0,.92.43,1.69,1.9,1.69s1.9-.78,1.9-1.69v-7.95h2.76v8.19c0,2.59-2,4.15-4.66,4.15s-4.66-1.55-4.66-4.15Z" />
				<path d="m153.17,19.99h-3.11v9.43h-2.76v-9.43h-3.11v-2.66h8.98v2.66Z" />
				<path d="m160.6,27.53h-4.49l-.6,1.9h-3.02l4.11-12.09h3.52l4.11,12.09h-3.02l-.6-1.9Zm-.83-2.59l-1.42-4.44-1.42,4.44h2.83Z" />
			</g>
		</svg>
	)
}
