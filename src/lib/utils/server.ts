import '@/node-only'

import {
	Condition,
	Document as MongoDocument,
	MongoClient,
	ObjectId,
	WithId,
} from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'
import { headers } from 'next/headers'
import z from 'zod'

import jsend, { NextJSendResponse } from '@/lib/api/jsend'
import User, { JsonUser } from '@/lib/db/models/User'
import logger from '@/lib/logger'

import { BuiltInRoles, EnhancedSession, hasPermission } from '../auth/shared'
import clientPromise from '../db'
import Event from '../db/models/Event'
import { getGroupName, RenderContext, sumPointAdjustments } from './shared'

export * from './shared'

export function isDevelopment() {
	return process.env.NODE_ENV === 'development'
}

export async function getUser(
	client: MongoClient,
	email: string,
): Promise<WithId<User> | null> {
	return client.db().collection<User>('users').findOne({ email })
}

export async function verifyRoles(
	client: MongoClient,
	email: string,
	role: string,
) {
	const user = await getUser(client, email)

	if (!user) {
		throw new Error(`User with email "${email}" not found.`)
	}

	const roles = user.roles ?? []
	return role === 'participant' || roles.includes(role)
}

export async function addRoles(
	client: MongoClient,
	email: string,
	role: string,
) {
	const user = await client
		.db()
		.collection<User>('users')
		.updateOne(
			{ email },
			{
				$addToSet: {
					roles: { $each: ['participant', role] },
				},
			},
		)

	return user
}

export async function getAllDocuments<T extends MongoDocument>(
	client: MongoClient,
	collection: string,
	withId: true,
): Promise<WithId<T[]>>
export async function getAllDocuments<T extends MongoDocument>(
	client: MongoClient,
	collection: string,
	withId?: false,
): Promise<T[]>
export async function getAllDocuments<T extends MongoDocument>(
	client: MongoClient,
	collection: string,
	withId = false,
): Promise<T[]> {
	return (await client
		.db()
		.collection<T>(collection)
		.find(
			{},
			withId ? undefined : { projection: { _id: 0 }, maxTimeMS: 60000 },
		)
		.toArray()) as T[]
}

export async function paginateDocuments<T extends Document>(
	client: MongoClient,
	collection: string,
	{ limit, after }: { limit: number; after?: ObjectId },
): Promise<T[]> {
	return (await client
		.db()
		.collection<T>(collection)
		.find({ _id: { $gt: after as any } })
		.limit(limit)
		.toArray()) as T[]
}

export const { SITE_NAME: siteName, SITE_URL: siteUrl } = process.env
if (!(siteName && siteUrl)) {
	throw new Error(
		'Invalid/Missing environment variable: "SITE_NAME", "SITE_URL"',
	)
}

export function getEnhancedSession(
	...args:
		| [headers: ReadonlyHeaders]
		| [req: NextApiRequest, res: NextApiResponse]
): EnhancedSession {
	let sessionHeader: string | null | undefined
	if (args.length === 1) {
		const [headers] = args
		sessionHeader = headers.get('x-middleware-session')
	} else {
		const [req] = args
		const value = req.headers['x-middleware-session']
		sessionHeader = Array.isArray(value) ? value[0] : value
	}

	sessionHeader = sessionHeader && decodeURIComponent(sessionHeader)

	return sessionHeader
		? JSON.parse(sessionHeader)
		: { user: null, perms: BuiltInRoles['@@base'] }
}

export async function makeApiPostHandler<
	TSchema extends z.ZodType,
	TModel extends MongoDocument,
>(
	req: NextApiRequest,
	res: NextJSendResponse<TModel[]>,
	client: MongoClient,
	schema: TSchema,
	collectionName: string,
) {
	try {
		if (req.method === 'POST') {
			const body = req.body
			const models = schema.array().parse(body)

			await client
				.db()
				.collection<TModel>(collectionName)
				.bulkWrite([
					{
						deleteMany: { filter: {} },
					},
					...models.map((e) => ({
						insertOne: {
							document: e,
						},
					})),
				])

			res.status(200).json(jsend.success(models))
		} else {
			throw new Error(`Unsupported ${req.method}`)
		}
	} catch (e) {
		logger.error(e, req.url)
		res.status(500).json(jsend.error(e))
	}
}

export async function createTemplateRenderContext(): Promise<RenderContext> {
	const { user, perms } = getEnhancedSession(headers())

	return {
		user,
		applicationWaived: hasPermission(perms, { applicationWaived: true }),
		group: user?.hexId && getGroupName(user.hexId),
		pointHistory: createPointHistory(),
	}

	function createPointHistory(): string {
		let ans = ''
		const events = user?.attendedEvents
		if (user?.checkedIn || events?.length) {
			ans += '**Attended Events**\n\n'
			if (user?.checkedIn) {
				ans += `* Check In\n`
			}
			for (const event of events ?? []) {
				ans += `* ${event}\n`
			}
		}
		const adjustments = user?.pointAdjustments
		if (adjustments?.length) {
			ans += '\n**Adjustments**\n\n'
			for (const { reason, delta } of adjustments) {
				ans += `* ${reason}: **${delta >= 0 ? `+${delta}` : delta}**\n`
			}
		}
		return ans
	}
}

export async function computePoints(
	user: User | JsonUser | undefined | null,
): Promise<number> {
	const client = await clientPromise
	const events = user?.attendedEvents?.length
		? await client.db().collection<Event>('events').find({
			title: { $in: user.attendedEvents },
		}).toArray()
		: []
	const eventPoints = events.reduce((p, c) => p + c.pointValue, 0)
	const checkedInBonus = user?.checkedIn ? 50 : 0
	return eventPoints + checkedInBonus
		+ sumPointAdjustments(user?.pointAdjustments)
}

export async function updatePoints(
	filter: Condition<User>,
): Promise<WithId<User> & { points: number }> {
	const client = await clientPromise
	const users = client.db().collection<User>('users')
	const user = await users.findOne(filter, {
		projection: { 'application.resume': 0 },
	})
	if (!user) {
		throw new Error(`No user matching ${JSON.stringify(filter)}`)
	}
	const newPoints = await computePoints(user)
	await users.updateOne({ _id: user._id }, { $set: { points: newPoints } })
	return { ...user, points: newPoints }
}
