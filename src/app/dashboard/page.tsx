import classNames from 'classnames'
import { randomInt } from 'crypto'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { Box } from '@/components/Box'
import clientPromise from '@/lib/db'
import { Post } from '@/lib/db/models/Post'
import User from '@/lib/db/models/User'
import { getEnhancedSession } from '@/lib/utils/server'

import PostRenderer from '../post/[slug]/PostRenderer'
import Card from './Card'

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
	const posts = await client
		.db()
		.collection<Post>('posts')
		.find(
			{
				briefSource: { $exists: true, $ne: '' },
				hidden: { $ne: true },
			},
			{ sort: { priority: 'ascending' } },
		)
		.toArray()

	// Generate check-in PIN
	if (user.checkInPin === undefined) {
		const pin = randomInt(1000, 9999)
		await client
			.db()
			.collection<User>('users')
			.updateOne(
				{ email: user.email, checkInPin: { $exists: false } },
				{ $set: { checkInPin: pin } },
			)
	}

	let children: JSX.Element[]

	if (user.applicationStatus === 'accepted') {
		children = posts.map((post) => (
			<Card
				key={post.slug}
				cardStyle={post.cardStyle}
				href={post.contentSource ? `/post/${post.slug}` : undefined}
			>
				{/* @ts-expect-error Async React Server Component */}
				<PostRenderer post={post} sourceType="briefSource" />
			</Card>
		))
	} else if (user.applicationStatus) {
		children = [
			<p key="kid">
				Application status: {user.applicationStatus}. Please contact the
				organizers if you believe this is a mistake.
			</p>,
		]
	} else {
		children = [
			<p key="kid">
				We&apos;ve received your application. Check back later to see if you get
				accepted, and feel free to contact the organizers at{' '}
				<a href="mailto:hello@hackuta.org">hello@hackuta.org</a> if you need any
				assistance!
			</p>,
		]
	}

	return (
		<Box
			direction="column"
			className={classNames('pagePadding')}
			style={{ flex: 1 }}
			gap="1rem"
		>
			<h2>
				Hello, {user.application?.firstName} {user.application?.lastName}
			</h2>
			<Box
				direction="row"
				alignItems="start"
				wrap="wrap"
				className={classNames('flex-1 gap-8')}
			>
				{...children}
			</Box>
			<div
				dangerouslySetInnerHTML={{
					__html: `<!-- hey you found my ugly hack! --><script>setInterval(() => window.location.reload(), 60_000)</script>`,
				}}
			></div>
		</Box>
	)
}
