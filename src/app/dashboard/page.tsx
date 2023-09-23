import classNames from 'classnames'
import { randomInt } from 'crypto'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { Box } from '@/components/Box'
import clientPromise from '@/lib/db'
import User from '@/lib/db/models/User'
import { getEnhancedSession } from '@/lib/utils/server'

import Cards from './Cards'

// https://beta.nextjs.org/docs/api-reference/segment-config#dynamic
// We read from the database on this route, so this has to be dynamic.
export const dynamic = 'force-dynamic'

export default async function Dashboard() {
	const { user } = getEnhancedSession(headers())
	if (!user) {
		redirect('/api/auth/signin?callbackUrl=%2Fdashboard')
	} else if (!user.application) {
		redirect('/apply')
	}

	const client = await clientPromise

	// Generate check-in PIN
	if (user.checkInPin === undefined) {
		const pin = randomInt(100_000, 999_999)
		await client
			.db()
			.collection<User>('users')
			.updateOne(
				{ email: user.email, checkInPin: { $exists: false } },
				{ $set: { checkInPin: pin } },
			)
	}

	let kid: JSX.Element

	if (user.applicationStatus === 'accepted') {
		kid = <Cards />
	} else if (user.applicationStatus) {
		kid = (
			<p className="flex-1">
				Application status:{' '}
				{user.applicationStatus}. Please contact the organizers if you
				believe this is a mistake.
			</p>
		)
	} else {
		kid = (
			<p className="flex-1">
				We&apos;ve received your application. You will receive an email
				update about the status of the application. Feel free to contact the
				organizers at{' '}
				<a href="mailto:hello@hackuta.org">hello@hackuta.org</a>{' '}
				if you need any assistance!
			</p>
		)
	}

	return (
		<Box
			direction="column"
			className={classNames('pagePadding')}
			style={{ flex: 1 }}
			gap="1rem"
		>
			{kid}
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
