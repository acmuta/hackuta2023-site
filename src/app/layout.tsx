import './globals.css'

import classNames from 'classnames'

import { Box } from '@/components/Box'
import { siteName } from '@/lib/utils/server'

import styles from './layout.module.css'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

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
		<html lang="en">
			<Box as="body" direction="column">
				<div className={classNames(styles.star, styles.topLeft)}></div>
				<div className={classNames(styles.star, styles.topRight)}></div>
				<div className={classNames(styles.star, styles.bottomLeft)}></div>
				<div className={classNames(styles.star, styles.bottomRight)}></div>
				<SiteHeader />
				<main className={styles.main}>{children}</main>
				<SiteFooter />
				<div className="layout-background-overlay"></div>
			</Box>
		</html>
	)
}
