/* eslint-disable @typescript-eslint/no-unused-vars */

import { headers } from 'next/headers'
import { SVGProps } from 'react-html-props'

import { Box } from '@/components/Box'
import { LinkButton } from '@/components/Button'
import { getEvents } from '@/components/calendar'
import { HackTicket } from '@/components/Tickets/HackTicket'
// import { ClippedBadge } from '@/components/ClippedBadge'
import { LogoTicket, LogoTicketKind } from '@/components/Tickets/LogoTicket'
import { WavyPattern } from '@/components/WavyPattern'
import { getEnhancedSession } from '@/lib/utils/server'

import GoogleMyMap from '@/components/GoogleMyMap'
import { Organizer, OrganizerProps } from '@/components/Organizer'
import Link from 'next/link'
import { AllTeams } from './admin/organizers/OrganizerData'
import { FaqSection, getFaqs } from './faq/utils'
// https://beta.nextjs.org/docs/api-reference/segment-config#dynamic
// We read from the database on this route, so this has to be dynamic.
export const dynamic = 'force-dynamic'

type SeparatorProps = SVGProps
const Separator = ({ ...props }: SeparatorProps) => {
	return (
		<svg
			width="1572"
			height="10"
			viewBox="0 0 1572 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden
			{...props}
		>
			<line
				y1="6"
				x2="1572"
				y2="6"
				stroke="rgb(0,0,0,.3)"
				strokeWidth="10"
				strokeDasharray="24 24"
			/>
		</svg>
	)
}

type CTAArrowProps = SVGProps
const CTAArrow = ({ ...props }: CTAArrowProps) => {
	return (
		<svg
			width="131"
			height="137"
			viewBox="0 0 131 137"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g filter="url(#filter0_d_1_855)">
				<path
					d="M10.7274 4.37185C9.82812 1.76097 6.98256 0.373457 4.37167 1.27276C1.76079 2.17206 0.373274 5.01763 1.27258 7.62851L10.7274 4.37185ZM121.536 95.0357C123.488 93.0831 123.488 89.9173 121.536 87.9646L89.7157 56.1448C87.7631 54.1922 84.5973 54.1922 82.6447 56.1448C80.6921 58.0975 80.6921 61.2633 82.6447 63.2159L110.929 91.5002L82.6447 119.784C80.6921 121.737 80.6921 124.903 82.6447 126.856C84.5973 128.808 87.7631 128.808 89.7157 126.856L121.536 95.0357ZM1.27258 7.62851C9.12479 30.4254 19.8402 52.7336 38.0036 69.3176C56.3116 86.0336 81.7007 96.5002 118 96.5002V86.5002C83.7993 86.5002 60.9384 76.7168 44.7463 61.9328C28.4097 47.0167 18.3751 26.575 10.7274 4.37185L1.27258 7.62851Z"
					fill="#130D08"
				/>
			</g>
			<defs>
				<filter
					id="filter0_d_1_855"
					x="0.998627"
					y="0.99881"
					width="130.001"
					height="135.321"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dx="8" dy="8" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.0705882 0 0 0 0 0.184314 0 0 0 0 0.298039 0 0 0 0.25 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_1_855"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_1_855"
						result="shape"
					/>
				</filter>
			</defs>
		</svg>
	)
}

export default async function Landing() {
	const startDate = new Date('10/07/2023 06:00:00')
	const endDate = new Date('10/08/2023 18:00:00')
	const events = await getEvents()
	const faqs = await getFaqs()
	const sponsors = [
		{
			companyName: 'Mouser Electronics',
			companyUrl: 'https://www.mouser.com/',
			imageUrl: '/images/Sponsors/mouser-electronics.svg',
			kind: 'Sponsor',
		},
		{
			companyName: 'UTA CSE Department',
			companyUrl:
				'https://www.uta.edu/academics/schools-colleges/engineering/academics/departments/cse',
			imageUrl: '/images/Sponsors/utacse.png',
			kind: 'Sponsor',
		},
		{
			companyName: 'StateFarm',
			companyUrl: 'https://www.statefarm.com/',
			imageUrl: '/images/Sponsors/statefarm.svg',
			kind: 'Sponsor',
		},
		{
			companyName: 'GitHub',
			companyUrl: 'https://github.com/',
			imageUrl: '/images/Sponsors/github.svg',
			kind: 'Sponsor',
		},
		{
			companyName: 'UTA ISO',
			companyUrl: 'https://www.uta.edu/security/',
			imageUrl: '/images/Sponsors/utaiso.png',
			kind: 'Sponsor',
		},
	]

	const partners = [
		{
			companyName: 'Major\xa0League Hacking',
			companyUrl: 'https://mlh.io/',
			imageUrl: '/images/Partners/mlh-logo-color-dark.svg',
			kind: 'Partner',
		},
		{
			companyName: 'Mathworks',
			companyUrl: 'https://www.mathworks.com/',
			imageUrl: '/images/Partners/mathworks.png',
			kind: 'Partner',
		},
		{
			companyName: 'Wolfram',
			companyUrl: 'https://www.wolfram.com/',
			imageUrl: '/images/Partners/wolfram.png',
			kind: 'Partner',
		},
		{
			companyName: 'Rosenfeld',
			companyUrl: 'https://rosenfeldmedia.com/',
			imageUrl: '/images/Partners/rosenfeld.png',
			kind: 'Partner',
		},
		{
			companyName: 'Standout Stickers',
			companyUrl: 'http://hackp.ac/mlh-StandOutStickers-hackathons',
			imageUrl: '/images/Partners/standout-stickers.png',
			kind: 'Partner',
		},
	]

	const { user } = getEnhancedSession(headers())

	const hackingDeadline = new Date('2023-10-08T12:00:00-05:00')
	const isHackingTimeOver = () => {
		const currentTime = new Date()
		const timeDifference = hackingDeadline.getTime() - currentTime.getTime()

		return timeDifference <= 0
	}

	return (
		<>
			<Box
				direction="column"
				alignItems="center"
				justifyContent="start"
				gap=".5rem"
				className="mb-2"
			>
				<div className="flex flex-col items-center justify-start gap-8 bg-hackuta-red bg-hackuta-pattern-transparent p-8 md:p-16 w-full min-h-max">
					<div className="flex flex-col items-center justify-start gap-8">
						<section className="flex flex-col items-center">
							<h1 className="text-4xl sm:text-6xl md:text-8xl mx-[-8rem] font-heading text-white drop-shadow-hackuta">
								HackUTA 2023
							</h1>
							<div className="sm:text-lg font-rhd text-white font-semibold md:text-3xl tracking-wider uppercase gap-2 inline-block">
								<span className="select-none mx-2">
									⎯<span className="hidden md:inline-block">⎯⎯⎯</span>
								</span>
								<span>The Greatest Show</span>
								<span className="select-none mx-2">
									⎯<span className="hidden md:inline-block">⎯⎯⎯</span>
								</span>
							</div>
							<div className="font-rhm text-2xl my-4 tracking-wider uppercase">
								<span className="mr-2">📅</span>
								<span className="text-white">October 7-8, 2023</span>
							</div>
						</section>
						<div className="relative">
							{
								/* <div className="sm:block hidden absolute left-0 top-0 mt-[-3rem] ml-[-10rem] rotate-[-15deg] z-10">
								<div className="flex py-2 px-6 md:ml-12 bg-hackuta-darkblue text-white font-heading drop-shadow-hackuta">
									Don&apos;t miss out!
								</div>
								<CTAArrow
									className={'w-[50px] h-auto ml-24 mt-2 drop-shadow-hackuta'}
									aria-hidden
								/>
							</div> */
							}
							<HackTicket
								className="animate-[jump-shaking_0.5s_ease-in-out_1] my-8"
								user={user}
							/>

							{/* Code below to allow tailwind to compile custom backgrounds (they dont load at compile time) */}
							<div className="hidden w-0 h-0 bg-hackuta-ticket-blue bg-hackuta-ticket-red bg-hackuta-noqrcode bg-hackuta-sqrbg-unregistered bg-hackuta-sqrbg-ruby">
							</div>
						</div>
						<div className="flex flex-col md:flex-row justify-center items-center flex-wrap gap-1 md:gap-3">
							{!user?.applied && (
								<LinkButton href="/apply" className="text-2xl">
									Apply
								</LinkButton>
							)}
							{(user?.applied && !isHackingTimeOver()) && (
								<LinkButton href="/dashboard" className="text-2xl">
									Dashboard
								</LinkButton>
							)}
							{(user?.applied && isHackingTimeOver()) && (
								<LinkButton href="/devpost" className="text-2xl">
									Submit to Devpost
								</LinkButton>
							)}
							<LinkButton
								href="https://discord.gg/4e64SfjmWS"
								className="bg-hackuta-darkblue"
								kind="secondary"
							>
								Discord
							</LinkButton>
							<LinkButton
								href="https://docs.google.com/forms/d/e/1FAIpQLSfQ5gopSj69iT5josqR7u5ztnebidDRo9h9F3gL5qduCHCTag/viewform?usp=sf_link"
								className="bg-hackuta-darkblue"
								kind="secondary"
							>
								Volunteer/Mentor
							</LinkButton>
						</div>
					</div>
				</div>
				{/* <Calendar events={events} /> */}
				<div className="flex flex-col items-center justify-start gap-8 bg-hackuta-red bg-hackuta-pattern-transparent p-8 md:p-16 w-full">
					<h2 className="flex flex-col items-center gap-2 font-heading drop-shadow-hackuta text-white text-4xl">
						Venue Map & Parking
						<WavyPattern className="w-32" strokeColor="rgb(0,0,0,.3)" />
					</h2>
					<div className="flex flex-col md:flex-row justify-center items-center flex-wrap flex-auto">
						<div className="flex flex-col items-center justify-start p-4 bg-hackuta-darkred rounded-lg">
							<GoogleMyMap />
							<div className="w-full flex justify-center items-center pt-4">
								<Link
									className="font-heading text-white no-underline mx-1 text-lg hover:opacity-80"
									href="https://maps.app.goo.gl/bawAGAcqcNr4Bwcw6"
									target="_blank"
								>
									[Google Maps]
								</Link>
								<Link
									className="font-heading text-white no-underline mx-1 text-lg hover:opacity-80"
									href="https://maps.apple.com/?ll=32.728052,-97.110779&q=Dropped%20Pin&t=m"
									target="_blank"
								>
									[Apple Maps]
								</Link>
								<Link
									className="font-heading text-white no-underline mx-1 text-lg hover:opacity-80"
									href="/images/hackuta2023map.png"
									target="_blank"
								>
									[PDF Map]
								</Link>
							</div>
						</div>
					</div>
				</div>
				<FaqSection faqs={faqs} />
				<div className="flex flex-col items-center justify-center gap-8 bg-hackuta-red bg-hackuta-pattern-transparent p-8 md:p-16 w-full">
					<h2 className="flex flex-col items-center gap-2 font-heading drop-shadow-hackuta text-white text-4xl">
						Meet the Team
						<WavyPattern className="w-32" strokeColor="rgb(0,0,0,.3)" />
					</h2>
					<div className="flex flex-row justify-center items-center flex-wrap flex-auto">
						{AllTeams.map((organizer: OrganizerProps) => (
							<Organizer
								key={`${organizer.name}`}
								name={organizer.name}
								role={organizer.role}
								avatar={organizer.avatar}
								socials={organizer.socials}
								isDirector={organizer.isDirector}
							/>
						))}
					</div>
				</div>
				<div className="flex flex-col items-center justify-center gap-8 bg-hackuta-red bg-hackuta-pattern-transparent p-8 md:p-16 w-full">
					<h2 className="flex flex-col items-center gap-2 font-heading drop-shadow-hackuta text-white text-4xl">
						Sponsors & Partners
						<WavyPattern className="w-32" strokeColor="rgb(0,0,0,.3)" />
					</h2>
					<div className="flex flex-col md:flex-row justify-center items-center flex-wrap flex-auto">
						{sponsors.map((company, index) => (
							<LogoTicket
								key={`${company.companyName}-${index}`}
								companyName={company.companyName}
								companyUrl={company.companyUrl}
								imageUrl={company.imageUrl}
								kind={company.kind as LogoTicketKind}
							/>
						))}
					</div>

					<div className="flex flex-col md:flex-row justify-center items-center flex-wrap flex-auto">
						{partners.map((company, index) => (
							<LogoTicket
								key={`${company.companyName}-${index}`}
								companyName={company.companyName}
								companyUrl={company.companyUrl}
								imageUrl={company.imageUrl}
								kind={company.kind as LogoTicketKind}
							/>
						))}
					</div>
				</div>
			</Box>
		</>
	)
}
