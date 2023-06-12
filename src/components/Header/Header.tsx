'use client'

import classNames from 'classnames'
import { Menu, NavArrowRight } from 'iconoir-react'
import Link from 'next/link'
import { useState } from 'react'

import { Box } from '@/components/Box'

import styles from './Header.module.css'

interface HeaderItem {
	link: string
	name: string
}

export interface HeaderProps {
	items: readonly HeaderItem[]
	/**
	 * Items that get squished to the end of the main axis.
	 */
	endItems?: readonly HeaderItem[]
}

export const Header = ({ items, endItems }: HeaderProps) => {
	const [menuOpen, setMenuOpen] = useState(false)

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	}

	return (
		<>
			<header className={styles.header}>
				<Box as="nav" direction="row" justifyContent="space-between">
					<Box alignItems="center" justifyContent="start">
						<Menu className={styles.icon} onClick={toggleMenu} />
					</Box>
					<Box
						as="ul"
						direction="row"
						alignItems="center"
						justifyContent="center"
						gap="1.75rem"
						className={styles.horizontal}
					>
						{...items.map(({ link, name }) => (
							<li key={link}>
								{link.startsWith('#') ? (
									<a href={link}>{name}</a>
								) : (
									<Link href={link}>{name}</Link>
								)}
							</li>
						))}
					</Box>
					<Box
						as="ul"
						direction="row"
						alignItems="center"
						justifyContent="end"
						gap="1.75rem"
						className={classNames(styles.horizontal, styles.horizontalEnd)}
					>
						{...endItems
							? endItems.map(({ link, name }) => (
									<li key={link}>
										{link.startsWith('#') ? (
											<a href={link}>{name}</a>
										) : (
											<Link href={link}>{name}</Link>
										)}
									</li>
							  ))
							: []}
					</Box>
				</Box>
				<Box
					as="ul"
					direction="column"
					alignItems="baseline"
					justifyContent="center"
					gap="1.75rem"
					className={classNames(
						styles.vertical,
						menuOpen ? styles.open : undefined,
					)}
				>
					{...items.map(({ link, name }) => (
						<li key={link}>
							{link.startsWith('#') ? (
								<a href={link} onClick={toggleMenu}>
									{name}
								</a>
							) : (
								<Link href={link} onClick={toggleMenu}>
									{name}
								</Link>
							)}
							<NavArrowRight className={styles.arrow} />
						</li>
					))}
				</Box>
				<Link
					className={styles.mlhBadge}
					href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2024-season&utm_content=yellow"
				>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src="https://s3.amazonaws.com/logged-assets/trust-badge/2024/mlh-trust-badge-2024-yellow.svg"
						alt="Major League Hacking 2024 Hackathon Season"
					/>
				</Link>
			</header>
			<div className={styles.headerOffset} />
		</>
	)
}
