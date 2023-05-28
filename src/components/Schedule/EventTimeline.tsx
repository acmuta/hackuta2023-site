import { DivProps } from 'react-html-props'

import { Box } from '@/components/Box'

import styles from './EventTimeline.module.css'

export type EventTimelineProps = DivProps

export const EventTimeline = ({ children, ...props }: EventTimelineProps) => {
	return (
		<Box
			direction="column"
			alignItems="stretch"
			gap=".5rem"
			className={styles.timeline}
			{...props}
		>
			{children}
		</Box>
	)
}
