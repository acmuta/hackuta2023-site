import { SectionProps } from 'react-html-props'

import { Box } from '@/components/Box'
import { Heading } from '@/components/Heading'

import styles from './PageSection.module.css'

export type PageSectionProps = SectionProps & {
	heading: string
}

export default function PageSection({ heading, children }: PageSectionProps) {
	return (
		<Box
			as="section"
			direction="column"
			gap="1rem"
			className={styles.pageSection}
		>
			<Heading id={heading.toLowerCase()} level={2} className={'anchorOffset'}>
				{heading}
			</Heading>
			{children}
		</Box>
	)
}
