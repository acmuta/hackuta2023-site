'use client' // IconoirProvider can only be used in client components

import {
	GitHub,
	IconoirProvider,
	Instagram,
	LinkedIn,
	VerifiedBadge,
} from 'iconoir-react'
import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'
// import Image from 'next/image'
import { DivProps } from 'react-html-props'

import { Box } from '../Box'

export type OrganizerProps = DivProps & {
	avatar: string
	name: string
	role: string
	isDirector?: boolean
	socials?: {
		github?: string
		instagram?: string
		linkedIn?: string
	}
}

export const Organizer = ({
	avatar,
	name,
	role,
	isDirector = false,
	socials,
}: OrganizerProps) => {
	return (
		<Box
			alignItems="center"
			direction="column"
			justifyContent="space-between"
			gap=".625rem"
			className="bg-hackuta-darkred drop-shadow-hackuta hover:drop-shadow-none hover:rounded-2xl py-4 m-2 max-w-xl w-40 h-56 text-center rounded-lg flex flex-col flex-shrink-0 justify-between transition-all hover:opacity-90"
		>
			<div>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={avatar}
					alt={`${name}`}
					// height={100}
					// width={100}
					className="bg-hackuta-sqrbg-red w-28 h-28 overflow-hidden rounded-full  hover:animate-spin transition-all"
				/>
			</div>
			<Box alignItems="center" direction="column" gap=".125rem">
				<span className="font-heading text-white">{name}</span>
				<span className="font-medium text-xs text-gray-300">{role}</span>
				{isDirector && (
					<Box direction="row" gap=".125rem">
						Director <VerifiedBadge aria-hidden="true" />
					</Box>
				)}
			</Box>
			{socials && (
				<IconoirProvider
					iconProps={{
						height: 20,
						width: 20,
					}}
				>
					<Box direction="row" alignItems="center" gap=".25rem">
						{socials.github && (
							<GitHubLink
								username={socials.github}
								aria-label={`${name}'s GitHub`}
							/>
						)}
						{socials.instagram && (
							<InstagramLink
								username={socials.instagram}
								aria-label={`${name}'s Instagram`}
							/>
						)}
						{socials.linkedIn && (
							<LinkedInLink
								username={socials.linkedIn}
								aria-label={`${name}'s LinkedIn`}
							/>
						)}
					</Box>
				</IconoirProvider>
			)}
		</Box>
	)
}

export type OrganizerSocialUsername = Omit<
	OrganizerSocialProps,
	'baseUrl' | 'icon' | 'href' | 'platform'
>
export type OrganizerSocialProps = Omit<LinkProps, 'href'> & {
	baseUrl: string
	username: string
	icon: ReactNode
	platform: string
}

export const OrganizerSocial = ({
	baseUrl,
	username,
	icon,
	platform,
}: OrganizerSocialProps) => {
	return (
		<Link
			href={`${baseUrl}${username}`}
			id={`organizer-${username}-${platform.toLowerCase()}`}
			aria-label={`@${username} on ${platform}`}
			target="_blank"
			className="text-white"
		>
			{icon}
		</Link>
	)
}

const GitHubLink = ({ username }: OrganizerSocialUsername) => (
	<OrganizerSocial
		baseUrl={'https://github.com/'}
		username={username}
		icon={<GitHub aria-labelledby={`organizer-${username}-github`} />}
		platform="Twitter"
	/>
)

const InstagramLink = ({ username }: OrganizerSocialUsername) => (
	<OrganizerSocial
		baseUrl={'https://www.instagram.com/'}
		username={username}
		icon={<Instagram aria-labelledby={`organizer-${username}-instagram`} />}
		platform="Twitter"
	/>
)

const LinkedInLink = ({ username }: OrganizerSocialUsername) => (
	<OrganizerSocial
		baseUrl={'https://www.linkedin.com/in/'}
		username={username}
		icon={<LinkedIn aria-labelledby={`organizer-${username}-linkedin`} />}
		platform="LinkedIn"
	/>
)
