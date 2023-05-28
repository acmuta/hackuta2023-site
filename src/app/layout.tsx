import './globals.css'

import classNames from 'classnames'
import localFont from 'next/font/local'

import { siteName } from '@/lib/utils/server'

// fonts
const frutiger = localFont({
	src: [
		{
			path: 'fonts/Frutiger_Light.ttf',
			weight: '300',
			style: 'normal',
		},
		{
			path: 'fonts/Frutiger.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: 'fonts/Frutiger_Bold.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: 'fonts/Frutiger_UltraBlack.otf',
			weight: '950',
			style: 'normal',
		},
	],
	variable: '--font-frutiger',
	fallback: ['sans-serif'],
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
		{ rel: 'apple-touch-icon', sizes: '180x180', url: '/apple-touch-icon.png' },
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
		{ rel: 'mask-icon', url: '/safari-pinned-tab.svg' },
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
		<html lang="en" className={classNames(frutiger.variable)}>
			<body>{children}</body>
		</html>
	)
}
