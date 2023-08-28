import { Discord, Instagram } from 'iconoir-react'
import Link from 'next/link'

import { Footer, FooterNav } from '@/components/Footer'

import { MarqueeHeader } from './MarqueeHeader'

export default function SiteFooter() {
	return (
		<div className={'flex flex-col'}>
			<Footer>
				<FooterNav
					title={'Socials'}
					linkClassName={'flex flex-row gap-1'}
					links={[
						<Link key="discord" href={'https://discord.gg/4e64SfjmWS'}>
							<Discord width={'32px'} aria-label="HackUTA 2023 Discord" />
						</Link>,
						<Link key="instagram" href={'https://instagram.com/acmuta'}>
							<Instagram width={'32px'} aria-label="Instagram @acmuta" />
						</Link>,
						// <Link key="twitter" href={'https://twitter.com/utadatathon'}>
						// 	<Twitter width={'32px'} aria-label="Twitter @utadatathon" />
						// </Link>,
					]}
				/>
				<FooterNav
					title={'Policy'}
					links={[
						<Link key="acm" href={'https://www.acm.org/code-of-ethics'}>
							ACM Code of Ethics
						</Link>,
						<Link key="mlh" href={'https://hackp.ac/coc'}>
							MLH Code of Conduct
						</Link>,
					]}
				/>
			</Footer>
			<MarqueeHeader />
		</div>
	)
}
