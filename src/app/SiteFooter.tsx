import { Discord, Instagram, Safari } from 'iconoir-react'
import Link from 'next/link'

import { Footer, FooterNav } from '@/components/Footer'

export default function SiteFooter() {
	return (
		<div className={'flex flex-col'}>
			<Footer>
				<FooterNav
					title={'Socials'}
					linkClassName={'flex flex-row gap-1'}
					links={[
						<Link
							key="discord"
							href={'/discord'}
							className="no-underline text-hackuta-beige"
						>
							<Discord
								width={'32px'}
								aria-label="HackUTA 2023 Discord"
							/>
						</Link>,
						<Link
							key="instagram"
							href={'https://instagram.com/hack.uta'}
							className="no-underline text-hackuta-beige"
						>
							<Instagram
								width={'32px'}
								aria-label="Instagram @hack.uta"
							/>
						</Link>,
						// <Link key="twitter" href={'https://twitter.com/utadatathon'}>
						// 	<Twitter width={'32px'} aria-label="Twitter @utadatathon" />
						// </Link>,
					]}
				/>
				<FooterNav
					title={'ACM'}
					linkClassName={'flex flex-row gap-1'}
					links={[
						<Link
							key="website"
							href={'https://acm.uta.edu'}
							className="no-underline text-hackuta-beige"
						>
							<Safari
								width={'32px'}
								aria-label="ACM UTA Website"
							/>
						</Link>,
						<Link
							key="discord"
							href={'https://discord.gg/nwUCt6tfCK'}
							className="no-underline text-hackuta-beige"
						>
							<Discord
								width={'32px'}
								aria-label="ACM UTA Discord"
							/>
						</Link>,
						<Link
							key="instagram"
							href={'https://instagram.com/acmuta'}
							className="no-underline text-hackuta-beige"
						>
							<Instagram
								width={'32px'}
								aria-label="Instagram @acmuta"
							/>
						</Link>,
					]}
				/>
				<FooterNav
					title={'Policy'}
					links={[
						<Link
							key="acm"
							href={'https://www.acm.org/code-of-ethics'}
							className="no-underline text-hackuta-beige"
						>
							ACM Code of Ethics
						</Link>,
						<Link
							key="mlh"
							href={'https://hackp.ac/coc'}
							className="no-underline text-hackuta-beige"
						>
							MLH Code of Conduct
						</Link>,
					]}
				/>
			</Footer>
		</div>
	)
}
