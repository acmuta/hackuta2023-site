import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-teal/theme.css'
import './globals.css'

import { Atkinson_Hyperlegible, Red_Hat_Display } from 'next/font/google'
import { twMerge } from 'tailwind-merge'

import { Box } from '@/components/Box'
import { MarqueeHeader } from '@/components/MarqueeHeader'
import { siteName } from '@/lib/utils/server'

import SiteFooter from './SiteFooter'

/** fonts **/
// const bungee = Bungee({
// 	subsets: ['latin-ext'],
// 	weight: ['400'],
// 	variable: '--font-bungee',
// })
const rhd = Red_Hat_Display({
	subsets: ['latin-ext'],
	weight: ['900'],
	variable: '--font-rhd',
})
const atkinson = Atkinson_Hyperlegible({
	subsets: ['latin-ext'],
	weight: ['400', '700'],
	variable: '--font-atkinson',
})

export const metadata = {
	title: siteName,
	description: siteName,
	viewport: {
		width: 'device-width',
		initialScale: 1,
	},
	icons: [
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			url: '/favicon-32x32.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			url: '/favicon-16x16.png',
		},
	],
	manifest: '/site.webmanifest',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className={twMerge(rhd.variable, atkinson.variable)}>
			<Box as="body" direction="column" className="p-2">
				<MarqueeHeader />
				<main className="flex-[1]">{children}</main>
				<SiteFooter />
			</Box>
		</html>
	)
}
