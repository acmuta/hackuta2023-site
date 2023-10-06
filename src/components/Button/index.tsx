import Link, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, ReactNode } from 'react'
import { ButtonProps as HtmlButtonProps, SVGProps } from 'react-html-props'
import { twJoin } from 'tailwind-merge'

export { ToggleButton } from './ToggleButton'

const getButtonClassNames = () =>
	twJoin(
		'flex flex-row gap-4 justify-center items-center',
		'py-3 px-5 mb-2 md:mb-0 md:mr-2',
		'bg-hackuta-blue drop-shadow-hackuta text-white font-heading tracking-wider te',
		'cursor-pointer select-none',
		'disabled:bg-[gray] disabled:cursor-not-allowed',
	)

interface StarProps extends SVGProps {
	fillColor: string
}
const Star = ({ fillColor, ...props }: StarProps) => {
	return (
		<svg
			width="20"
			height="19"
			viewBox="0 0 20 19"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden
			{...props}
		>
			<path
				d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"
				fill={fillColor}
			/>
		</svg>
	)
}

const ButtonStar = () => <Star fillColor={'#fff'} className={'w-4 h-4'} />

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
			className={twJoin(getButtonClassNames(), className)}
			{...props}
		>
			{kind === 'primary' ? <ButtonStar /> : undefined}
			{children}
			{kind === 'primary' ? <ButtonStar /> : undefined}
		</button>
	)
}

export type LinkButtonProps =
	& LinkProps
	& AnchorHTMLAttributes<HTMLAnchorElement>
	& {
		children?: ReactNode
		kind?: ButtonKind
	}
export function LinkButton({
	children,
	className,
	kind = 'primary',
	...props
}: LinkButtonProps) {
	return (
		<Link
			className={twJoin(
				getButtonClassNames(),
				'no-underline transition-all hover:rounded-lg hover:shadow-none',
				className,
			)}
			{...props}
		>
			{kind === 'primary' ? <ButtonStar /> : undefined}
			{children}
			{kind === 'primary' ? <ButtonStar /> : undefined}
		</Link>
	)
}
