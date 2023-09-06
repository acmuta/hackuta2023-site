import doT from 'dot'
import { WithId } from 'mongodb'
import { NextResponse } from 'next/server'

import jsend from '@/lib/api/jsend'
import clientPromise from '@/lib/db'
import User from '@/lib/db/models/User'
import sendEmail from '@/lib/email'
import logger from '@/lib/logger'
import { delay, doTSettings } from '@/lib/utils/shared'

import { CooldownMs, PostBodySchema } from '../constants'

export async function POST(request: Request) {
	try {
		const client = await clientPromise

		const body = PostBodySchema.parse(await request.json())

		const users: User[] = (
			await Promise.all(
				body.recipients.map(async (recipient) => {
					if (recipient.startsWith('{')) {
						// This is a filter.
						const filter = JSON.parse(recipient)
						return client
							.db()
							.collection<User>('users')
							.find({
								// Skip users that have already received this email.
								receivedEmailTags: { $nin: [body.tag] },
								...filter,
							})
							.toArray()
					} else {
						// This is an email address.
						return client
							.db()
							.collection<User>('users')
							.findOne({ email: recipient })
					}
				}),
			)
		)
			.flat()
			.filter((u): u is WithId<User> => !!u)

		logger.info(
			users.slice(0, 10).map((u) => u.email),
			`[/admin/email/send] sending emails to ${users.length} addresses: ${body.subject} ${body.tag}`,
		)

		const htmlRenderer = doT.template(body.html, doTSettings)
		const textRenderer = doT.template(body.text, doTSettings)

		for (const user of users) {
			const renderContext = {
				user: {
					name: `${user.application?.firstName} ${user.application?.lastName}`,
				},
			}
			await sendEmail({
				to: [{ email: user.email }],
				subject: body.subject,
				html: htmlRenderer(renderContext),
				text: textRenderer(renderContext),
			})

			// Add the tag of this email to the user.
			await client
				.db()
				.collection<User>('users')
				.updateOne(user, {
					$addToSet: {
						receivedEmailTags: body.tag,
					},
				})

			await delay(CooldownMs)
		}

		return NextResponse.json(jsend.success({ number_recipients: users.length }))
	} catch (e) {
		logger.error(e, '[/admin/email/send]')
		return NextResponse.json(
			jsend.error('/admin/email/send Error: see log for more information.'),
		)
	}
}
