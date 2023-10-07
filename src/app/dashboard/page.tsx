import classNames from 'classnames'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { Box } from '@/components/Box'
import { getEnhancedSession } from '@/lib/utils/server'

import { canAccessDashboard } from '@/lib/auth/shared'
import Cards from './Cards'

// https://beta.nextjs.org/docs/api-reference/segment-config#dynamic
// We read from the database on this route, so this has to be dynamic.
export const dynamic = 'force-dynamic'

export default async function Dashboard() {
	const { user, perms } = getEnhancedSession(headers())
	if (!user) {
		redirect('/api/auth/signin?callbackUrl=%2Fdashboard')
	} else if (!canAccessDashboard(user, perms)) {
		redirect('/apply')
	}

	return (
		<Box
			direction="column"
			className={classNames('pagePadding')}
			style={{ flex: 1 }}
			gap="1rem"
		>
			<Cards />
			<Box
				direction="row"
				alignItems="start"
				wrap="wrap"
				className={classNames('flex-1 gap-8')}
			>
			</Box>
		</Box>
	)
}
