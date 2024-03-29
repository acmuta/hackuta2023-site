import { ReactNode } from 'react'
import { DivProps, HtmlProps, SVGProps } from 'react-html-props'
import { twJoin } from 'tailwind-merge'

export type FooterProps = HtmlProps & {
	children?: ReactNode
}

export type FooterNavProps = DivProps & {
	title: ReactNode
	links: ReactNode[]
	linkClassName?: string
}

export type LogoProps = SVGProps
const Logo = (props: LogoProps) => {
	return (
		<svg
			className="mr-9"
			width="75"
			height="149"
			viewBox="0 0 149 149"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>HackUTA</title>
			<path
				d="M0 36.7586V119.829C0 121.811 1.17911 123.608 3.00673 124.414L57.7847 148.567C59.1912 149.187 60.8055 149.139 62.1755 148.439L85.8026 136.336C87.4927 135.471 88.551 133.739 88.5426 131.857L88.3433 85.0305C88.3264 81.3633 84.4747 78.95 81.1227 80.507L63.3715 88.7534C61.6168 89.5681 60.4855 91.303 60.4546 93.2242L60.1205 115.534C60.0672 119.095 56.3895 121.469 53.0767 120.082L31.1116 110.879C29.2363 110.092 28.0179 108.274 28.0179 106.256V27.6419C28.0179 23.8857 24.0033 21.4584 20.6288 23.1795L2.74845 32.2961C1.0612 33.1553 0 34.8791 0 36.7586Z"
				fill="#D2C2A9"
			/>
			<path
				d="M148.994 112.241V29.1709C148.994 27.1885 147.815 25.3924 145.988 24.5861L91.2125 0.433436C89.806 -0.186576 88.1917 -0.139311 86.8217 0.561331L63.1946 12.6641C61.5045 13.5288 60.4462 15.2609 60.4546 17.1432L60.6539 63.9694C60.6707 67.6367 64.5225 70.05 67.8745 68.493L85.6257 60.2465C87.3804 59.4319 88.5117 57.697 88.5426 55.7758L88.8767 33.4665C88.93 29.9049 92.6077 27.5305 95.9205 28.9179L117.886 38.1207C119.761 38.9076 120.979 40.7259 120.979 42.7444V121.358C120.979 125.114 124.994 127.542 128.368 125.82L146.252 116.704C147.939 115.845 149 114.121 149 112.241H148.994Z"
				fill="#D2C2A9"
			/>
		</svg>
	)
}

export const Footer = ({ children, className, ...props }: FooterProps) => {
	return (
		<footer
			className={twJoin(
				'flex flex-row items-center flex-wrap py-8 px-16 gap-4',
				'bg-hackuta-black text-hackuta-beige',
				className,
			)}
			{...props}
		>
			<Logo className="h-14 mr-5" />
			<div className="flex flex-col md:flex-row gap-8 items-start">
				{children}
			</div>
		</footer>
	)
}

export const FooterNav = ({
	title,
	links,
	linkClassName,
	...props
}: FooterNavProps) => {
	return (
		<section
			className={twJoin(
				'flex flex-col gap-2',
			)}
			{...props}
		>
			<h3 className={'font-heading text-4xl'}>
				{title}
			</h3>
			<ul className={linkClassName}>
				{links.map((link, index) => (
					<li className={'font-body'} key={index}>{link}</li>
				))}
			</ul>
		</section>
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
