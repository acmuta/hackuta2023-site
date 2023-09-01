/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames'
import { randomInt } from 'crypto'
import { headers } from 'next/headers'
import { SVGProps } from 'react-html-props'
import { twJoin } from 'tailwind-merge'

import { Box } from '@/components/Box'
import { LinkButton } from '@/components/Button'
import { ClippedBadge } from '@/components/ClippedBadge'
import { HackTicket } from '@/components/HackTicket'
import { SponsorTicket, SponsorTicketKind } from '@/components/SponsorTicket'
import { WavyPattern } from '@/components/WavyPattern'
import clientPromise from '@/lib/db'
import { Post } from '@/lib/db/models/Post'
import User, { JsonUser } from '@/lib/db/models/User'
import { getEnhancedSession } from '@/lib/utils/server'

import { ApplicationForm } from './ApplicationForm'
import Card from './Card'
import { FaqSection, getFaqs } from './faq/utils'
import styles from './page.module.css'
import PostRenderer from './post/[slug]/PostRenderer'
// https://beta.nextjs.org/docs/api-reference/segment-config#dynamic
// We read from the database on this route, so this has to be dynamic.
export const dynamic = 'force-dynamic'

export default async function Home() {
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

type SeparatorProps = SVGProps
const Separator = ({ ...props }: SeparatorProps) => {
	return (
		<svg width="1572" height="10" viewBox="0 0 1572 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
			<line y1="6" x2="1572" y2="6" stroke="#8C1B16" strokeWidth="10" strokeDasharray="24 24" />
		</svg>
	)
}

type CTAArrowProps = SVGProps
const CTAArrow = ({ ...props }: CTAArrowProps) => {
	return (
		<svg width="131" height="137" viewBox="0 0 131 137" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g filter="url(#filter0_d_1_855)">
				<path d="M10.7274 4.37185C9.82812 1.76097 6.98256 0.373457 4.37167 1.27276C1.76079 2.17206 0.373274 5.01763 1.27258 7.62851L10.7274 4.37185ZM121.536 95.0357C123.488 93.0831 123.488 89.9173 121.536 87.9646L89.7157 56.1448C87.7631 54.1922 84.5973 54.1922 82.6447 56.1448C80.6921 58.0975 80.6921 61.2633 82.6447 63.2159L110.929 91.5002L82.6447 119.784C80.6921 121.737 80.6921 124.903 82.6447 126.856C84.5973 128.808 87.7631 128.808 89.7157 126.856L121.536 95.0357ZM1.27258 7.62851C9.12479 30.4254 19.8402 52.7336 38.0036 69.3176C56.3116 86.0336 81.7007 96.5002 118 96.5002V86.5002C83.7993 86.5002 60.9384 76.7168 44.7463 61.9328C28.4097 47.0167 18.3751 26.575 10.7274 4.37185L1.27258 7.62851Z" fill="#130D08" />
			</g>
			<defs>
				<filter id="filter0_d_1_855" x="0.998627" y="0.99881" width="130.001" height="135.321" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
					<feOffset dx="8" dy="8" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0.0705882 0 0 0 0 0.184314 0 0 0 0 0.298039 0 0 0 0.25 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_855" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_855" result="shape" />
				</filter>
			</defs>
		</svg>
	)
}

async function Landing() {
	// const [events, faqs] = await Promise.all([getEvents(), getFaqs()])
	const faqs = await getFaqs()
	const sponsors = [
		{
			companyName: 'StateFarm',
			companyUrl: 'https://www.statefarm.com/',
			imageUrl: '/images/Sponsors/statefarm.svg',
			kind: 'Sponsor',
		},
		{
			companyName: 'Mouser Electronics',
			companyUrl: 'https://www.mouser.com/',
			imageUrl: '/images/Sponsors/mouser-electronics.svg',
			kind: 'Sponsor',
		},
		{
			companyName: 'Major League Hacking',
			companyUrl: 'https://mlh.io/',
			imageUrl: '/images/Partners/mlh-logo-color-dark.svg',
			kind: 'Partner',
		},
		{
			companyName: 'Rosenfeld',
			companyUrl: 'https://rosenfeldmedia.com/',
			imageUrl: '/images/Partners/rosenfeld.webp',
			kind: 'Partner',
		},
		{
			companyName: 'Standout Stickers',
			companyUrl: 'https://www.standoutstickers.com/',
			imageUrl: '/images/Partners/standout-stickers.jpg',
			kind: 'Partner',
		},
	]

	return (
		<>
			<Box
				direction="column"
				alignItems="center"
				justifyContent="start"
				gap=".5rem"
				className="my-2"
			>
				<div className="flex flex-col items-center justify-start gap-8 bg-hackuta-red p-16 w-full">
					<div className="flex flex-col items-center justify-start gap-8">
						<section className="flex flex-col items-center gap-4">
							<h1 className="font-heading text-hackuta-yellow text-6xl drop-shadow-hackuta">
								HackUTA 2023
							</h1>
							<div className="font-shrimp text-white tracking-wider uppercase">
								Once in a year event
							</div>
						</section>
						<Box direction="row" gap="1rem">
							<LinkButton href="/api/auth/signin">Apply</LinkButton>
							<LinkButton href="mailto:sponsor@hackuta.org" kind="secondary">
								Sponsor
							</LinkButton>
						</Box>
						<HackTicket className="animate-[jump-shaking_0.5s_ease-in-out_1]" />
						<div className="absolute left-[20%] top-[20%] rotate-[-15deg] z-10">
							<div className="flex py-2 px-6 bg-hackuta-darkblue text-white font-heading drop-shadow-hackuta">
								Don&apos;t miss out!
							</div>
							<CTAArrow
								className={'w-[50px] h-auto ml-24 mt-2 drop-shadow-hackuta'}
							/>
						</div>
					</div>
					<Separator className="h-[10px] w-full" />
					<section className="flex flex-col self-start gap-8">
						<h2 className="flex flex-col items-start gap-2 font-heading drop-shadow-hackuta text-white text-4xl">
							Schedule
							<WavyPattern className="w-32" />
						</h2>
						<div className="font-shrimp text-white tracking-wider uppercase">
							Coming soon...
						</div>
						<ClippedBadge className="w-[150px] h-[150px] absolute right-[10%] rotate-[15deg] mt-[-5rem]" />
					</section>
				</div>
				<FaqSection faqs={faqs} />
				<div className="flex flex-col items-start justify-start gap-8 bg-hackuta-yellow p-16 w-full">
					<h2 className="flex flex-col items-start gap-2 font-heading drop-shadow-hackuta text-hackuta-darkblue text-4xl">
						Sponsors & Partners
						<WavyPattern className="w-32" strokeColor="rgb(14 48 76)" />
					</h2>
					<div
						className={twJoin(
							'grid grid-cols-3 auto-rows-fr gap-4',
							'md:grid-cols-2',
						)}
					>
						{sponsors.map((company, index) => (
							<SponsorTicket
								key={`${company.companyName}-${index}`}
								companyName={company.companyName}
								companyUrl={company.companyUrl}
								imageUrl={company.imageUrl}
								kind={company.kind as SponsorTicketKind}
							/>
						))}
					</div>
				</div>
			</Box>
			{/* <Box as="main" direction="column" className={styles.main}>

			<Box direction="column" className={styles.sectionContainer}>
				<Box
					as="section"
					direction="column"
					className={classNames(styles.titleSection)}
				>
					<Heading id="organizers" level={2} className={'anchorOffset'}>
						Organizers
					</Heading>
					<div className='flex flex-col items-center justify-center'>
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
				</Box>*/}
		</>
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
				className={classNames(styles.cardContainer)}
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
