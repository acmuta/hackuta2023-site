import JSZip from 'jszip'
import { NextResponse } from 'next/server'

import clientPromise from '@/lib/db'
import User, { getFullName } from '@/lib/db/models/User'
import logger from '@/lib/logger'
import { stringifyError } from '@/lib/utils/shared'

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
		const zip = await jzip.generateAsync({ type: 'nodebuffer' })
		const res = new NextResponse(zip, {
			headers: {
				'Content-Disposition': 'attachment; filename=resumes.zip',
				'Content-Type': 'application/zip',
			},
		})

		return res
	} catch (e) {
		logger.error(e, '[/api/admin/resumes]')
		return NextResponse.json({ status: 'error', message: stringifyError(e) })
	}
}
