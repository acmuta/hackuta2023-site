import { NextRequest, NextResponse } from 'next/server'

import clientPromise from '@/lib/db'
import User from '@/lib/db/models/User'
import logger from '@/lib/logger'
import { stringifyError } from '@/lib/utils/shared'

// Database query
export const dynamic = 'force-dynamic'

interface RouteProps {
	params: { email: string }
}

export async function GET(
	_req: NextRequest,
	{ params: { email } }: RouteProps,
) {
	const Regex = /^data:application\/pdf;base64,/
	try {
		const client = await clientPromise
		const user = await client
			.db()
			.collection<User>('users')
			.findOne({
				email: { $eq: email },
				'application.resume': { $regex: Regex },
			})

		if (!user?.application?.resume) {
			throw new Error('No user found')
		}

		return new NextResponse(
			Buffer.from(user.application.resume.replace(Regex, ''), 'base64'),
			{
				headers: {
					'Content-Disposition':
						`attachment; filename=${user.application.firstName}%20${user.application.lastName}.zip`,
					'Content-Type': 'application/pdf',
				},
			},
		)
	} catch (e) {
		logger.error(e, `[/api/admin/resume/${email}]`)
		return NextResponse.json({ status: 'error', message: stringifyError(e) })
	}
}
