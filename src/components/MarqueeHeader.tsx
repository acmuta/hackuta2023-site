'use client'

import { Menu } from 'iconoir-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { SVGProps } from 'react-html-props'
import { twMerge } from 'tailwind-merge'

import { canAccessDashboard, hasPermission } from '@/lib/auth/shared'
import { AppPermissions } from '@/lib/db/models/Role'
import { JsonUser } from '@/lib/db/models/User'

export type MarqueeHeaderProps = {
	showBadge?: boolean
	user: JsonUser | null
	perms: AppPermissions
}

export type LogoProps = SVGProps
const Logo = (props: LogoProps) => {
	return (
		<svg
			className="mr-9"
			width="40"
			height="40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>HackUTA</title>
			<path
				fill="#D2C2A9"
				d="m0.03516,9.88587l0,22.26158c0,0.53115 0.31598,1.01271 0.80576,1.22871l14.67965,6.47263c0.37692,0.16615 0.80953,0.15329 1.17667,-0.0343l6.3317,-3.24342c0.45292,-0.23181 0.73653,-0.69596 0.73428,-1.2003l-0.05341,-12.54877c-0.00453,-0.98275 -1.03672,-1.62948 -1.93501,-1.21223l-4.75705,2.20991c-0.47023,0.21833 -0.7734,0.68325 -0.78168,1.1981l-0.08953,5.97868c-0.01428,0.95429 -0.99985,1.59049 -1.88763,1.21879l-5.88631,-2.46626c-0.50255,-0.2109 -0.82906,-0.6981 -0.82906,-1.23889l0,-21.06736c0,-1.0066 -1.07585,-1.65708 -1.98016,-1.19585l-4.79166,2.44311c-0.45216,0.23025 -0.73654,0.6922 -0.73654,1.19588z"
			/>
			<path
				fill="#D2C2A9"
				d="m39.96323,30.11398l0,-22.2615c0,-0.53125 -0.31595,-1.01258 -0.80556,-1.22866l-14.67898,-6.47254c-0.37692,-0.16616 -0.80953,-0.15349 -1.17667,0.03427l-6.3317,3.24335c-0.45292,0.23173 -0.73653,0.6959 -0.73428,1.20033l0.05341,12.54869c0.0045,0.98278 1.03672,1.62951 1.93501,1.21225l4.75705,-2.20993c0.47023,-0.2183 0.7734,-0.68323 0.78168,-1.19808l0.08953,-5.97855c0.01428,-0.95445 0.99985,-1.59076 1.88763,-1.21895l5.88641,2.46621c0.50247,0.21088 0.82888,0.69815 0.82888,1.23908l0,21.06722c0,1.00655 1.07596,1.65722 1.98014,1.19575l4.79263,-2.44295c0.45209,-0.2302 0.73642,-0.6922 0.73642,-1.19601l-0.00161,0z"
			/>
		</svg>
	)
}

export const MarqueeHeader = (
	{ showBadge, user, perms, ...props }: MarqueeHeaderProps,
) => {
	const pathname = usePathname()
	if (showBadge === undefined) {
		showBadge = pathname === '/'
	}

	const [menuOpen, setMenuOpen] = useState(false)

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	}

	const closeMenu = () => setMenuOpen(false)
	const dashboardAccess = canAccessDashboard(user, perms)

	return (
		<div
			className={twMerge('bg-hackuta-black mb-2 sticky z-100 top-0')}
			{...props}
		>
			<div
				className={twMerge(
					'flex flex-row items-center',
					'bg-hackuta-black text-hackuta-beige font-heading',
					'border-t-hackuta-beige border-b-hackuta-beige border-t-8 border-b-8',
					'my-2 px-4',
				)}
			>
				{/* Hamburger Menu Icon */}
				<button onClick={toggleMenu} className="mr-4 md:hidden">
					<Menu className={twMerge('cursor-pointer')} aria-label="Menu" />
				</button>

				<div
					className={twMerge(
						'flex-wrap flex flex-row flex-1 justify-between items-center content-start gap-8 gap-y-2 py-4',
					)}
				>
					{
						<a
							className="flex items-center gap-2 no-underline text-hackuta-beige hover:opacity-80 hover:drop-shadow-hackuta transition-all"
							href="/"
						>
							<Logo className="inline-block" />
							<span className="text-center text-3xl">HackUTA 2023</span>
						</a>
					}

					{
						/* <span className="text-center">
						Arlington&apos;s One and Only Hackathon
					</span>
					<span className="text-center">The Greatest Show Around</span> */
					}

					<ul
						className={twMerge(
							'flex-col md:flex-row gap-4 py-2 bg-hackuta-black no-underline hidden md:flex',
						)}
					>
						<HeaderLink href="/">Home</HeaderLink>
						{hasPermission(perms, { administration: {} }) && (
							<HeaderLink href="/admin">Admin</HeaderLink>
						)}
						{!user?.applied && (
							<HeaderLink href="/apply">Apply</HeaderLink>
						)}
						{dashboardAccess && (
							<HeaderLink href="/dashboard">Dashboard</HeaderLink>
						)}
						<HeaderLink href="/faq">FAQ</HeaderLink>
						<HeaderLink href="/schedule">Schedule</HeaderLink>
						<HeaderLink
							href={user ? '/api/auth/signout' : '/api/auth/signin'}
						>
							{user ? 'Sign Out' : 'Sign In'}
						</HeaderLink>
					</ul>
				</div>
			</div>

			{/* Optional: Displaying the menu list */}
			{menuOpen && (
				<ul
					className={twMerge(
						'flex flex-col md:flex-row gap-4 pt-2 pb-4 bg-hackuta-black px-8 md:hidden',
					)}
				>
					<HeaderLink href="/" onClick={closeMenu}>Home</HeaderLink>
					{hasPermission(perms, { administration: {} }) && (
						<HeaderLink href="/admin" onClick={closeMenu}>
							Admin
						</HeaderLink>
					)}
					{!user?.application && (
						<HeaderLink href="/apply" onClick={closeMenu}>
							Apply
						</HeaderLink>
					)}
					{dashboardAccess && (
						<HeaderLink href="/dashboard" onClick={closeMenu}>
							Dashboard
						</HeaderLink>
					)}
					<HeaderLink href="/faq" onClick={closeMenu}>FAQ</HeaderLink>
					<HeaderLink href="/schedule" onClick={closeMenu}>
						Schedule
					</HeaderLink>
					<HeaderLink
						href={user ? '/api/auth/signout' : '/api/auth/signin'}
						onClick={closeMenu}
					>
						{user ? 'Sign Out' : 'Sign In'}
					</HeaderLink>
				</ul>
			)}

			{showBadge && (
				<MLHTrustBadge
					color="black"
					imageClassName={twMerge(
						'md:w-[100px] block w-[50px] absolute max-w-[100px] min-w-[60px] md:right-[min(1vw,10px)] z-50 top-24 right-0',
					)}
				/>
			)}
		</div>
	)
}

export type MLHTrustBadgeColor = MLHTrustBadgeProps['color']

export type MLHTrustBadgeProps = {
	color: 'white' | 'black' | 'gray' | 'red' | 'blue' | 'yellow'
	imageClassName?: string
}

export const MLHTrustBadge = ({
	color,
	imageClassName,
}: MLHTrustBadgeProps) => {
	return (
		<Link
			href={`https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2024-season&utm_content=${color}`}
		>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={`https://s3.amazonaws.com/logged-assets/trust-badge/2024/mlh-trust-badge-2024-${color}.svg`}
				alt="Major League Hacking 2024 Hackathon Season"
				className={imageClassName}
			/>
		</Link>
	)
}

interface HeaderLinkProps {
	href: string
	children: ReactNode
	onClick?: () => void
}

const HeaderLink = ({ href, children, onClick }: HeaderLinkProps) => {
	const pathname = usePathname()
	const selected = href === '/'
		? !pathname || pathname === '/'
		: pathname?.startsWith(href)
	return (
		<li>
			{selected
				? (
					<Link
						href={href}
						className="font-heading text-hackuta-black border-2 p-2 opacity-95 hover:opacity-85 bg-hackuta-beige rounded-lg border-hackuta-beige no-underline transition-all"
						onClick={onClick}
					>
						{children}
					</Link>
				)
				: (
					<Link
						href={href}
						className="font-heading text-hackuta-beige hover:opacity-80 no-underline transition-all rounded-lg hover:underline"
						onClick={onClick}
					>
						{children}
					</Link>
				)}
		</li>
	)
}
