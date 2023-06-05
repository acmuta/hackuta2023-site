import './globals.css'

import classNames from 'classnames'

import { siteName } from '@/lib/utils/server'

import styles from './layout.module.css'

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
			type: 'image/svg+xml',
			sizes: '512x512',
			url: '/favicon.svg',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '48x48',
			url: '/favicon.png',
		},
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
		<html lang="en">
			<body>
				<div className="layout-background-overlay"></div>
				<div className={classNames(styles.star, styles.topLeft)}></div>
				<div className={classNames(styles.star, styles.topRight)}></div>
				<div className={classNames(styles.star, styles.bottomLeft)}></div>
				<div className={classNames(styles.star, styles.bottomRight)}></div>
				{children}
			</body>
		</html>
	)
}
