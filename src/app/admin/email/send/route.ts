import { PromisePool } from '@supercharge/promise-pool'
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

		const users: WithId<User>[] = (
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
							}, { projection: { 'application.resume': 0 } })
							.toArray()
					} else {
						// This is an email address.
						return client
							.db()
							.collection<User>('users')
							.findOne({ email: recipient }, {
								projection: { 'application.resume': 0 },
							})
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

		await PromisePool
			.withConcurrency(8)
			.for(users)
			.handleError((e, u, p) => {
				p.stop()
				logger.error(e, `[/admin/email/send] on ${u.email}`)
				throw e
			})
			.process(async (user) => {
				const renderContext = {
					user: {
						name:
							`${user.application?.firstName} ${user.application?.lastName}`,
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
					.updateOne({
						_id: user._id,
					}, {
						$addToSet: {
							receivedEmailTags: body.tag,
						},
					})

				await delay(CooldownMs)
			})

		return NextResponse.json(
			jsend.success({ number_recipients: users.length }),
		)
	} catch (e) {
		logger.error(e, '[/admin/email/send]')
		return NextResponse.json(
			jsend.error('/admin/email/send Error: see log for more information.'),
		)
	}
}
