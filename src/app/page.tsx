/* eslint-disable @typescript-eslint/no-unused-vars */

import { SVGProps } from 'react-html-props'

import { Box } from '@/components/Box'
import { LinkButton } from '@/components/Button'
import { getEvents } from '@/components/calendar'
import { HackTicket } from '@/components/Tickets/HackTicket'
// import { ClippedBadge } from '@/components/ClippedBadge'
import { LogoTicket, LogoTicketKind } from '@/components/Tickets/LogoTicket'
import { WavyPattern } from '@/components/WavyPattern'

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
			companyName: 'Rosenfeld',
			companyUrl: 'https://rosenfeldmedia.com/',
			imageUrl: '/images/Partners/rosenfeld.png',
			kind: 'Partner',
		},
		{
			companyName: 'Standout Stickers',
			companyUrl: 'https://www.standoutstickers.com/',
			imageUrl: '/images/Partners/standout-stickers.png',
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
							{/* <div className="sm:block hidden absolute left-0 top-0 mt-[-3rem] ml-[-10rem] rotate-[-15deg] z-10">
								<div className="flex py-2 px-6 md:ml-12 bg-hackuta-darkblue text-white font-heading drop-shadow-hackuta">
									Don&apos;t miss out!
								</div>
								<CTAArrow
									className={'w-[50px] h-auto ml-24 mt-2 drop-shadow-hackuta'}
									aria-hidden
								/>
							</div> */}
							<HackTicket className="animate-[jump-shaking_0.5s_ease-in-out_1] my-8" />
						</div>
						<div className="flex gap-3">
							<LinkButton href="/apply" className="text-2xl">
								Apply
							</LinkButton>
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
					{/* <Separator className="h-[10px] w-full" />
					<section className="flex flex-col self-start gap-8">
						<h2 className="flex flex-col items-start gap-2 font-heading drop-shadow-hackuta text-white text-4xl">
							Schedule
							<WavyPattern className="w-32" />
						</h2>
						<div className="font-rhd text-white tracking-wider uppercase">
							<HackathonCalendar
								startDate={startDate}
								endDate={endDate}
								events={events}
							/>
						</div>
						<ClippedBadge
							className="md:block hidden w-[150px] h-[150px] absolute right-[10%] rotate-[15deg] mt-[-5rem]"
							aria-hidden
						/> 
					</section> */}
				</div>
				<FaqSection faqs={faqs} />
				<div className="flex flex-col items-start justify-start gap-8 bg-hackuta-red bg-hackuta-pattern-transparent p-8 md:p-16 w-full">
					<h2 className="flex flex-col items-start gap-2 font-heading drop-shadow-hackuta text-white text-4xl">
						Sponsors & Partners
						<WavyPattern className="w-32" strokeColor="rgb(0,0,0,.3)" />
					</h2>
					<div className="flex flex-col md:flex-row justify-start items-center flex-wrap flex-auto">
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

					<div className="flex flex-col md:flex-row justify-start items-center flex-wrap flex-auto">
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
