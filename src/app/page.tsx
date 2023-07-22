/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header } from '@/components/Header'
import classNames from 'classnames'
import { randomInt } from 'crypto'
import { headers } from 'next/headers'
import Image from 'next/image'

import { Box } from '@/components/Box'
import { LinkButton } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { Organizer, OrganizerProps } from '@/components/Organizer'
import { Post } from '@/lib/db/models/Post'
import { JsonUser } from '@/lib/db/models/User'
import { getEnhancedSession } from '@/lib/utils/server'

import LogoImage from '../../public/images/logo.svg'
import { AllTeams } from './admin/organizers/OrganizerData'
import { ApplicationForm } from './ApplicationForm'
import Card from './Card'
import { FaqSection, getFaqs } from './faq/utils'
import styles from './page.module.css'
import PostRenderer from './post/[slug]/PostRenderer'
import SiteFooter from './SiteFooter'
// https://beta.nextjs.org/docs/api-reference/segment-config#dynamic
// We read from the database on this route, so this has to be dynamic.
export const dynamic = 'force-dynamic'

export default function Home() {
	const { user } = getEnhancedSession(headers())

	if (user?.application) {
		/* @ts-expect-error Async React Server Component */
		return <Dashboard user={user} />
	} else if (user) {
		return <ApplicationForm />
	} else {
		/* @ts-expect-error Async React Server Component */
		return <Landing />
	}
}

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
			<Image src={LogoImage} alt="HackUTA logo" />
			<div className={styles.heroHeading1}>
				October 7-8, 2023
				<div className={styles.heroHeading2}>Details coming soon...</div>
			</div>
			<Box direction="row" gap="1rem">
				<LinkButton href="/api/auth/signin">Apply</LinkButton>
				<LinkButton href="mailto:sponsor@hackuta.org" kind="secondary">
					Sponsor
				</LinkButton>
			</Box>
			<Box justifyContent="center">
				<FaqSection faqs={faqs} />
			</Box>
			<Box as="main" direction="column" className={styles.main}>
				<Box direction="column" className={styles.sectionContainer}>
					<Box
						as="section"
						direction="column"
						className={classNames(styles.titleSection)}
					>
						<Heading id="organizers" level={2} className={'anchorOffset'}>
							Organizers
						</Heading>
						<div className={styles.Orgo}>
							{Object.entries(AllTeams).map(([team, organizers]) => (
								<>
									<h3 className={styles.heroHeading2}>{team}</h3>
									<Box justifyContent="center" wrap="wrap" gap="2rem">
										{organizers.map(
											({ name, major, avatar, socials }: OrganizerProps) => (
												<Organizer
													key={name}
													name={name}
													major={major}
													avatar={avatar}
													socials={socials}
												/>
											),
										)}
									</Box>
								</>
							))}
						</div>
					</Box>
					<Box
						as="section"
						direction="column"
						className={classNames(styles.titleSection)}
					>
						{/* <Heading id="sponsors" level={2} className={'anchorOffset'}>
							Sponsors
						</Heading> */}
						{/* <SponsorHeader /> */}
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

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

function Dashboard({ user, posts }: { user: JsonUser; posts: Post[] }) {
	// Generate check-in PIN
	if (user.checkInPin === undefined) {
		const pin = randomInt(100_000, 999_999)
		// Update user data with the generated check-in PIN
		// You'll need to implement the appropriate logic here
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
				<h2>
					Hello, {user.application?.firstName} {user.application?.lastName}
				</h2>
				<Box
					direction="row"
					alignItems="start"
					wrap="wrap"
					className={classNames(styles.cardContainer)}
				>
					{children}
				</Box>
			</Box>
		</Box>
	)
}
