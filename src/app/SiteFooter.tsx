// import { Discord, Instagram, Twitter } from 'iconoir-react'
import Link from 'next/link'

import { Footer, FooterNav } from '@/components/Footer'

import styles from './SiteFooter.module.css'

export default function SiteFooter() {
	return (
		<Footer>
			<FooterNav
				title={'Socials'}
				linkClassName={styles.socials}
				links={
					[
						// <Link key="discord" href={'https://discord.gg/J34X7zCqfg'}>
						// 	<Discord width={'32px'} aria-label="UTA Datathon Discord" />
						// </Link>,
						// <Link key="instagram" href={'https://www.instagram.com/utadatathon/'}>
						// 	<Instagram width={'32px'} aria-label="Instagram @utadatathon" />
						// </Link>,
						// <Link key="twitter" href={'https://twitter.com/utadatathon'}>
						// 	<Twitter width={'32px'} aria-label="Twitter @utadatathon" />
						// </Link>,
					]
				}
			/>
			<FooterNav
				title={'Policy'}
				links={[
					<Link key="acm" href={'https://www.acm.org/code-of-ethics'}>
						ACM Code of Ethics
					</Link>,
					<Link
						key="mlh"
						href={'https://static.mlh.io/docs/mlh-code-of-conduct.pdf'}
					>
						MLH Code of Conduct
					</Link>,
					<Link key="uta" href={'https://libraries.uta.edu/about/policies'}>
						UTA Library Policies
					</Link>,
					<Link key="mlh-guide" href={'https://guide.mlh.io'}>
						We closely followed the MLH Hackathon Organizer Guide
					</Link>,
				]}
			/>
		</Footer>
	)
}
