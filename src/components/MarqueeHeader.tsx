'use client'

import { Menu } from 'iconoir-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactFragment, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { hasPermission } from '@/lib/auth/shared'
import { useEnhancedSession } from '@/lib/utils/client'

export type MarqueeHeaderProps = {
	showBadge?: boolean
}

export const MarqueeHeader = ({ showBadge, ...props }: MarqueeHeaderProps) => {
	const pathname = usePathname()
	if (showBadge === undefined) {
		showBadge = pathname === '/'
	}

	const { user, perms } = useEnhancedSession()
	const [menuOpen, setMenuOpen] = useState(false)

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	}

	return (
		<div className={twMerge('bg-hackuta-black mb-2')} {...props}>
			<div
				className={twMerge(
					'flex flex-row items-center',
					'bg-hackuta-black text-hackuta-beige font-heading',
					'border-t-hackuta-beige border-b-hackuta-beige border-t-8 border-b-8',
					'my-2 px-4',
				)}
			>
				{/* Hamburger Menu Icon */}
				<Menu className={twMerge('cursor-pointer')} onClick={toggleMenu} />

				<div
					className={twMerge(
						'flex-wrap flex flex-row flex-1 justify-center items-center content-start gap-8 gap-y-2 px-12 md:px-24 py-4',
					)}
				>
					<span className="text-center">
						Arlington&apos;s One and Only Hackathon
					</span>
					<span className="text-center">The Greatest Show Around</span>
				</div>
			</div>

			{/* Optional: Displaying the menu list */}
			{menuOpen && (
				<ul
					className={twMerge(
						'flex flex-col md:flex-row gap-4 px-8 pt-2 pb-4 bg-hackuta-black',
					)}
				>
					<HeaderLink href="/">Home</HeaderLink>
					{hasPermission(perms, { administration: {} }) && (
						<HeaderLink href="/admin">Admin</HeaderLink>
					)}
					{!user?.application && <HeaderLink href="/apply">Apply</HeaderLink>}
					{user?.application && (
						<HeaderLink href="/dashboard">Dashboard</HeaderLink>
					)}
					<HeaderLink href="/faq">FAQ</HeaderLink>
					<HeaderLink href={user ? '/api/auth/signout' : '/api/auth/signin'}>
						{user ? 'Sign Out' : 'Sign In'}
					</HeaderLink>
				</ul>
			)}

			{showBadge && (
				<MLHTrustBadge
					color="gray"
					imageClassName={twMerge(
						'md:w-[100px] block w-[50px] absolute top-0 max-w-[100px] min-w-[60px] right-[min(5vw,50px)] z-50',
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
	children: ReactFragment
}

const HeaderLink = ({ href, children }: HeaderLinkProps) => {
	return (
		<li>
			<Link href={href} className="font-heading text-hackuta-beige">
				{children}
			</Link>
		</li>
	)
}
