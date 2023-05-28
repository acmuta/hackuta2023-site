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
//import Image from 'next/image'
import { DivProps } from 'react-html-props'

import { Box } from '../../Box'
import styles from './Organizer.module.css'

export type OrganizerProps = DivProps & {
	avatar: string
	name: string
	major: string
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
	major,
	isDirector = false,
	socials,
}: OrganizerProps) => {
	return (
		<Box direction="column" gap=".625rem">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={avatar}
				alt={`Avatar of ${name}`}
				height={100}
				width={100}
				className={styles.avatar}
			/>
			<Box direction="column" gap=".125rem">
				{name}
				<span>{major}</span>
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
					<Box direction="row" gap=".25rem">
						{socials.github && <GitHubLink username={socials.github} />}
						{socials.instagram && (
							<InstagramLink username={socials.instagram} />
						)}
						{socials.linkedIn && <LinkedInLink username={socials.linkedIn} />}
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
		>
			{icon}
		</Link>
	)
}

const GitHubLink = ({ username }: OrganizerSocialUsername) => (
	<OrganizerSocial
		baseUrl={'https://github.com/'}
		username={username}
		icon={<GitHub aria-labelledby={`organizer-${username}-twitter`} />}
		platform="Twitter"
	/>
)

const InstagramLink = ({ username }: OrganizerSocialUsername) => (
	<OrganizerSocial
		baseUrl={'https://www.instagram.com/'}
		username={username}
		icon={<Instagram aria-labelledby={`organizer-${username}-github`} />}
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
