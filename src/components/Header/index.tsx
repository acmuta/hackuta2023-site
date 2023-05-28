'use client'
import classNames from 'classnames'
import { Menu,NavArrowRight } from 'iconoir-react'
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
				<nav>
					<Box
						as="ul"
						direction="row"
						alignItems="center"
						justifyContent="center"
						gap="1.75rem"
						className={styles.horizontal}
					>
						<Menu className={styles.icon} onClick={toggleMenu} />
						{...items.map(({ link, name }) => (
							<li key={link}>
								{link.startsWith('#') ? (
									<a href={link}>{name}</a>
								) : (
									<Link href={link}>{name}</Link>
								)}
							</li>
						))}
						{...endItems
							? endItems.map(({ link, name }, i) => (
									<li
										key={link}
										className={classNames(
											styles.isRight,
											i === 0 ? styles.shiftRight : undefined,
										)}
									>
										{link.startsWith('#') ? (
											<a href={link}>{name}</a>
										) : (
											<Link href={link}>{name}</Link>
										)}
									</li>
							  ))
							: []}
					</Box>
					{menuOpen ? (
						<Box
							as="ul"
							direction="column"
							alignItems="baseline"
							justifyContent="center"
							gap="1.75rem"
							className={styles.vertical}
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
					) : undefined}
				</nav>
			</header>
			<div className={styles.headerOffset} />
		</>
	)
}
