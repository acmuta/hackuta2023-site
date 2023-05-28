import classNames from 'classnames'
import { DivProps } from 'react-html-props'

import styles from './EventStatus.module.css'

export type EventStatusProps = DivProps & {
	active: boolean
}

export const EventStatus = ({ active, ...props }: EventStatusProps) => {
	return (
		<div
			className={classNames(styles.eventStatus, 'hiddenOnSmallScreen', {
				[styles.active]: active === true,
			})}
			{...props}
		/>
	)
}
