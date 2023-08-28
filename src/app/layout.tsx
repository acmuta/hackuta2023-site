import './globals.css'

import { Atkinson_Hyperlegible, Bungee } from 'next/font/google'
import localFont from 'next/font/local'
import { twMerge } from 'tailwind-merge'

import { Box } from '@/components/Box'
import { MarqueeHeader } from '@/components/MarqueeHeader'
import { siteName } from '@/lib/utils/server'

import SiteFooter from './SiteFooter'

/** fonts **/
export const bungee = Bungee({
	subsets: ['latin-ext'],
	weight: ['400'],
	variable: '--font-bungee',
})
export const atkinson = Atkinson_Hyperlegible({
	subsets: ['latin-ext'],
	weight: ['400', '700'],
	variable: '--font-atkinson',
})
export const saoTorpes = localFont({
	src: '../../public/fonts/SaoTorpes.otf',
	variable: '--font-sao-torpes'
})
export const shrimp = localFont({
	src: '../../public/fonts/Shrimp.ttf',
	variable: '--font-shrimp'
})

export const metadata = {
	title: siteName,
	description: siteName,
	viewport: {
		width: 'device-width',
		initialScale: 1,
	},
	icons: [
		// https://realfavicongenerator.net
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
	other: {
		'msapplication-TileColor': '#da532c',
		'theme-color': '#ffffff',
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className={twMerge(bungee.variable, atkinson.variable, saoTorpes.variable, shrimp.variable)}>
			<Box as="body" direction="column" className='p-2'>
				<MarqueeHeader showBadge />
				<main className='flex-[1]'>{children}</main>
				<SiteFooter />
			</Box>
		</html>
	)
}
