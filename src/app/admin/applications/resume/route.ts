import JSZip from 'jszip'
import { NextResponse } from 'next/server'

import clientPromise from '@/lib/db'
import User, { getFullName } from '@/lib/db/models/User'
import logger from '@/lib/logger'
import { stringifyError } from '@/lib/utils/shared'
import { Readable } from 'stream'

// Database query
export const dynamic = 'force-dynamic'

export async function GET() {
	try {
		// get all users with a resume by filter
		const client = await clientPromise
		const users: User[] = await client
			.db()
			.collection<User>('users')
			.find({
				'application.resume': { $regex: /^data:application\/pdf;base64,/ },
			})
			.toArray()

		if (!users) {
			throw new Error('No users found')
		}

		// create a zip file with all resumes
		const jzip = new JSZip()
		users.forEach((user) => {
			const resume = user.application?.resume?.split(
				'data:application/pdf;base64,',
			)
			if (resume?.length !== 2) {
				return
			}
			jzip.file(`${getFullName(user)}.pdf`, resume[1], { base64: true })
		})

		// send the zip file
		const nodeLegacyStream = jzip.generateNodeStream({ type: 'nodebuffer' })
		const res = new NextResponse(
			// typescript lib/lib.dom.d.ts and @types/node stream/web.d.ts have
			// incompatible type definitions for Web Streams API's `ReadableStream`
			// interface.
			Readable.toWeb(
				new Readable().wrap(nodeLegacyStream),
			) as ReadableStream<any>,
			{
				headers: {
					'Content-Disposition': 'attachment; filename=resumes.zip',
					'Content-Type': 'application/zip',
				},
			},
		)

		return res
	} catch (e) {
		logger.error(e, '[/api/admin/resumes]')
		return NextResponse.json({ status: 'error', message: stringifyError(e) })
	}
}
