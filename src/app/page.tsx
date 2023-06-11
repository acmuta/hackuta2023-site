/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames'
import { randomInt } from 'crypto'
import { headers } from 'next/headers'
import Image from 'next/image'
import React from 'react'

import { ApplicationForm } from '@/components/ApplicationForm'
import { Box } from '@/components/Box'
import { LinkButton } from '@/components/Button'
import { Header } from '@/components/Header'
import clientPromise from '@/lib/db'
import { Post } from '@/lib/db/models/Post'
import User, { JsonUser } from '@/lib/db/models/User'
import { getEnhancedSession } from '@/lib/utils/server'

import LogoImage from '../../public/images/logo.svg'
import Card from './Card'
import { FaqSection, getFaqs } from './faq/utils'
import styles from './page.module.css'
import PostRenderer from './post/[slug]/PostRenderer'
import SiteFooter from './SiteFooter'
// https://beta.nextjs.org/docs/api-reference/segment-config#dynamic
// We read from the database on this route, so this has to be dynamic.
export const dynamic = 'force-dynamic'

export default async function Home() {
	const { user } = getEnhancedSession(headers())

	if (user?.application) {
		/* @ts-expect-error Async React Server Component */
		return <Dashboard user={user} />
	} else if (user) {
		return <Apply user={user} />
	} else {
		/* @ts-expect-error Async React Server Component */
		return <Landing />
	}
}

// const organizers: OrganizerProps[] = [
// 	{
// 		avatar: 'https://avatars.githubusercontent.com/u/4723983?v=4',
// 		name: 'Samantha Nguyen',
// 		major: 'Computer Science',
// 		socials: {
// 			github: 'neoncitylights',
// 			instagram: 'starry_flies',
// 			linkedIn: 'samanthaa-nguyen',
// 		},
// 	},
// ]

async function Landing() {
	// const [events, faqs] = await Promise.all([getEvents(), getFaqs()])
	const faqs = await getFaqs()

	return (
		<Box
			direction="column"
			alignItems="center"
			justifyContent="start"
			gap="1rem"
		>
			<div />
			<Image src={LogoImage} alt="HackUTA logo" />
			<div style={{ fontSize: '4rem', textAlign: 'center' }}>
				October 7-8, 2023
				<div style={{ fontSize: '2rem' }}>Details coming soon...</div>
			</div>
			<Box direction="row" gap="1rem">
				{/* <LinkButton href="/api/auth/signin">
					Apply
				</LinkButton> */}
				<LinkButton href="mailto:sponsor@hackuta.org" kind="secondary">
					Sponsor
				</LinkButton>
			</Box>
			<Box justifyContent="center">
				<FaqSection faqs={faqs} />
			</Box>
		</Box>
	)
	// return (
	// 	<Box as="main" direction="column" className={styles.main}>
	// 		<Header
	// 			items={[{ link: '#hi', name: '' }]}
	// 			endItems={[{ link: '/api/auth/signin', name: 'Sign in' }]}
	// 		/>
	// 		<Box
	// 			as="section"
	// 			className={classNames(styles.about, styles.fitParentWidth)}
	// 		>
	// 			<div
	// 				id="top"
	// 				className={classNames(
	// 					styles.gradientContainer,
	// 					'anchorOffset',
	// 					styles.fitParentWidth,
	// 				)}
	// 			>
	// 				<p className={classNames(styles.heroHeading)}>HackUTA 2023</p>
	// 				<p className={classNames(styles.text, styles.heading2)}>
	// 					Catchy slogan for the show.
	// 				</p>
	// 				<p className={classNames(styles.text, styles.heroText)}>
	// 					October 7-8, 2023
	// 				</p>
	// 				<Box as="div" gap="1.5rem" wrap="wrap">
	// 					<LinkButton href="/api/auth/signin" kind="primary">
	// 						Apply
	// 					</LinkButton>
	// 					<LinkButton href="mailto:sponsor@hackuta.org" kind="secondary">
	// 						Sponsor
	// 					</LinkButton>
	// 				</Box>
	// 			</div>
	// 		</Box>
	// 		<Box direction="column" className={styles.sectionContainer}>
	// 			<FaqSection faqs={faqs} />
	// 			<ScheduleSection events={events} />
	// 			<Box
	// 				as="section"
	// 				direction="column"
	// 				className={classNames(styles.titleSection)}
	// 			>
	// 				<Heading id="organizers" level={2} className={'anchorOffset'}>
	// 					Organizers
	// 				</Heading>
	// 				<ComingSoon />
	// 				{/* {organizers.map(({ name, major, avatar, socials }: OrganizerProps) =>
	// 					<Organizer key={name} name={name} major={major} avatar={avatar} socials={socials} />,
	// 				)} */}
	// 			</Box>
	// 			<Box
	// 				as="section"
	// 				direction="column"
	// 				className={classNames(styles.titleSection)}
	// 			>
	// 				<Heading id="sponsors" level={2} className={'anchorOffset'}>
	// 					Sponsors
	// 				</Heading>
	// 				<ComingSoon />
	// 				{/* <SponsorHeader /> */}
	// 			</Box>
	// 		</Box>

	// 		<SiteFooter />
	// 	</Box>
	// )
}

// const SponsorHeader: React.FC = () => {
// 	return (
// 		<Box
// 			direction="row"
// 			wrap="wrap"
// 			alignItems="center"
// 			justifyContent="center"
// 			gap="3rem"
// 			className={classNames(styles.sponsorLogoBox, styles.fitParentWidth)}
// 		>
// 			{/* <Link
// 				href="https://www.uta.edu/academics/schools-colleges/engineering/academics/departments/cse"
// 				rel="noreferrer"
// 			>
// 				<Image
// 					src={UtaCseDeptLogo}
// 					alt="UTA Department of Computer Science and Engineering, College of Engineering"
// 					style={{ width: '20rem', height: 'auto' }}
// 				/>
// 			</Link> */}
// 		</Box>
// 	)
// }

const ComingSoon: React.FC = () => (
	<Box style={{ paddingLeft: '0.5rem' }}>Coming Soon...</Box>
)

function Apply({ user }: { user: JsonUser }) {
	return (
		<Box as="main" direction="column" className={styles.main}>
			<Header
				items={[
					{ link: '/', name: 'Apply' },
					{ link: '/faq', name: 'FAQ' },
					{ link: '/schedule', name: 'Schedule' },
					// { link: '/organizers', name: 'Organizers' },
					// { link: '/sponsors', name: 'Sponsors' },
				]}
				endItems={[
					...(user?.roles?.includes('admin')
						? [{ link: '/admin', name: 'Admin' }]
						: []),
					{ link: '/api/auth/signout', name: 'Sign out' },
				]}
			/>
			<ApplicationForm />
			<SiteFooter />
		</Box>
	)
}

async function Dashboard({ user }: { user: JsonUser }) {
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
		const pin = randomInt(100_000, 999_999)
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
				accepted, and feel free to contact the organizers if you need any
				assistance!
			</p>,
		]
	}

	return (
		<Box as="main" direction="column" className={styles.main}>
			<Header
				items={[
					{ link: '/', name: 'Dashboard' },
					{ link: '/faq', name: 'FAQ' },
					{ link: '/schedule', name: 'Schedule' },
					// { link: '/organizers', name: 'Organizers' },
					// { link: '/sponsors', name: 'Sponsors' },
				]}
				endItems={[
					...(user?.roles?.includes('admin')
						? [{ link: '/admin', name: 'Admin' }]
						: []),
					{ link: '/api/auth/signout', name: 'Sign out' },
				]}
			/>
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
					className={classNames(styles.cardContainer)}
				>
					{...children}
				</Box>
			</Box>
			<SiteFooter />
		</Box>
	)
}
