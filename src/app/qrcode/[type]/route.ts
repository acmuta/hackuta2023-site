import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'

import { getEnhancedSession, siteUrl } from '@/lib/utils/server'
import { notFound } from 'next/navigation'

interface QRCodeRouteProps {
	params: {
		type: string
	}
}

export async function GET(
	_req: NextRequest,
	{ params: { type } }: QRCodeRouteProps,
) {
	const { user } = getEnhancedSession(headers())
	if (!(type === 'check-in' || type === 'hex')) {
		return notFound()
	}

	const content = type === 'check-in'
		? user?.checkInPin
		: user?.hexId && `hackuta2023:${user?.hexId}`
	if (!content) {
		return NextResponse.redirect(`${siteUrl}/images/noqrcode.svg`)
	}

	const qrcode = await QRCode.toString(content.toString(), {
		type: 'svg',
		margin: 2,
	})
	return new NextResponse(qrcode, {
		headers: {
			'Content-Type': 'image/svg+xml',
		},
	})
}
