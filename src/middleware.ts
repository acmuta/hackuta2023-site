import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import {
	EnhancedSession,
	hasPermission,
	RolePermissionMap,
	RoutePermissions,
} from './lib/auth/shared'

export async function middleware(request: NextRequest) {
	// Middleware can only run on the Edge runtime which cannot import from @/lib/utils/server.
	// So we duplicated the SITE_URL code here.
	// See also https://github.com/vercel/next.js/discussions/46722
	const { SITE_URL } = process.env
	if (!SITE_URL) {
		throw new Error('Missing SITE_URL environmental variable')
	}
	// Replace localhost with 127.0.0.1 due to DNS lookup potentially trying to interpret that as IPv6 loopback address,
	// which will cause issues as the production Next.js server only listens to IPv4 requests.
	const siteUrl = SITE_URL.replace(/\blocalhost\b/, '127.0.0.1')

	// Get session
	let session: EnhancedSession
	try {
		const sessionResponse = await fetch(
			`${siteUrl}/api/auth/enhanced-session`,
			{
				headers: {
					cookie: request.headers.get('cookie')!,
				},
			},
		)
		session = await sessionResponse.json()
	} catch (e) {
		console.error('[middleware]', e)
		session = {
			user: null,
			perms: RolePermissionMap['@unauthenticated'],
		}
	}

	// Initiate new headers for request
	const newRequestHeaders = new Headers(request.headers)
	newRequestHeaders.set(
		'x-middleware-session',
		encodeURIComponent(JSON.stringify(session)),
	)
	const middlewareInit = {
		request: {
			headers: newRequestHeaders,
		},
	}

	// Check authorization and rewrite accordingly.
	const authorized = RoutePermissions.every(
		({ matcher, perms }) =>
			!matcher.test(request.nextUrl.pathname) ||
			hasPermission(session?.perms, perms),
	)
	if (authorized) {
		return NextResponse.next(middlewareInit)
	} else {
		console.warn(
			`Unauthorized access to ${request.nextUrl.pathname}!`,
			'user:',
			session?.user?.email,
			'granted:',
			session?.perms,
		)
		return NextResponse.rewrite(new URL('/404', request.url), middlewareInit)
	}
}

export const config = {
	matcher: [
		// Exclude static/public resources
		'/((?!_next/static|_next/image|images|android-chrome-192x192.png|apple-touch-icon.png|favicon-16x16.png|favicon.ico|mstile-150x150.png|site.webmanifest|android-chrome-512x512.png|browserconfig.xml|favicon-32x32.png|images|safari-pinned-tab.svg).*)',
	],
}
