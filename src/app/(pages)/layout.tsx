import { Box } from '@/components/Box'

import styles from './layout.module.css'
import SubpageHeader from './SubpageHeader'

export default async function SubpageLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<Box direction="column" className={styles.subpageLayoutRoot}>
			<SubpageHeader />
			<main className={styles.subpageMain}>{children}</main>
		</Box>
	)
}
