import { Heading, HeadingProps } from '../Heading'
import styles from './EventHeading.module.css'

export type EventHeadingProps = Omit<HeadingProps, 'level'>

export const EventHeading = ({ children }: EventHeadingProps) => (
	<Heading level={3} className={styles.eventHeading}>
		{children}
	</Heading>
)
