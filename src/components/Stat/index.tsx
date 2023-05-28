import { DivProps } from 'react-html-props'

import { Box } from '@/components/Box'
import { Counter } from '@/components/Counter'

import styles from './Stat.module.css'

export type StatProps = DivProps & {
	value: number
	prefix?: string
	suffix?: string
	caption: string
}

export const Stat = ({ value, prefix, suffix, caption }: StatProps) => {
	return (
		<Box direction="column">
			<span className={styles.value}>
				{prefix}
				<Counter from={0} to={value} useUnit={true} />
				{suffix}
			</span>
			<span className={styles.caption}>{caption}</span>
		</Box>
	)
}
