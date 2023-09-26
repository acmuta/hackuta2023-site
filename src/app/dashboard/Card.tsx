import classNames from 'classnames'
import Link from 'next/link'

import { CardStyle } from '@/lib/db/models/Post'

import styles from './Card.module.css'

export interface CardProps {
	cardStyle?: CardStyle
	children: JSX.Element
	href?: string
}

export default function Card({ cardStyle, children, href }: CardProps) {
	const card = (
		<div
			className={classNames(
				styles.card,
				styles[cardStyle ?? 'blue'],
				'p-4 w-full',
			)}
		>
			{children}
		</div>
	)
	return href
		? (
			<Link href={href} className={styles.cardLink}>
				{card}
			</Link>
		)
		: card
}
