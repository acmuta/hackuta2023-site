import JSZip from 'jszip'
import type { NextApiRequest, NextApiResponse } from 'next'

import clientPromise from '@/lib/db'
import User, { getFullName } from '@/lib/db/models/User'
import logger from '@/lib/logger'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		if (req.method !== 'GET') {
			throw new Error(`Unsupported ${req.method}`)
		}

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
		res.setHeader('Content-Type', 'application/zip')
		res.setHeader('Content-Disposition', 'attachment; filename=resumes.zip')

		return res.status(200).send(zip)
	} catch (e) {
		logger.error(e, '[/api/admin/resumes]')
		return res.status(500)
	}
}
