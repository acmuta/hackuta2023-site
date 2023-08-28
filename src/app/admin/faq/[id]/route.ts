import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import clientPromise from '@/lib/db'
import type { FaqModel } from '@/lib/db/models/Faq'
import logger from '@/lib/logger'

interface RouteProps {
	params: { id: string }
}

export async function DELETE(request: NextRequest, { params }: RouteProps) {
	try {
		const client = await clientPromise
		const faqs = client.db().collection<FaqModel>('faqs')

		const currentId = new ObjectId(params.id)
		const currentEntry = await faqs.findOne({ _id: currentId })
		if (!currentEntry) {
			throw new Error("Entry being deleted doesn't exist")
		}

		// Remove current entry from the list
		await faqs.updateOne(
			{ next: { $eq: currentId } },
			{ $set: { next: currentEntry.next } },
		)

		// Delete current entry
		await faqs.deleteOne(
			{ _id: new ObjectId(params.id) }
		)

		return NextResponse.json({})
	} catch (e) {
		logger.error(e, `[${request.url}]`)
		return NextResponse.json({})
	}
}

export const FaqRouteSchema = z.object({
	q: z.string(),
	a: z.string(),
	next: z.string().or(z.null()),
})
export type FaqRoute = z.infer<typeof FaqRouteSchema>

export async function POST(request: NextRequest) {
	try {
		const body = FaqRouteSchema.parse(await request.json())

		const client = await clientPromise
		const faqs = client.db().collection<FaqModel>('faqs')

		const newNextId = body.next ? new ObjectId(body.next) : null
		const newEntry = await faqs.insertOne({
			q: body.q,
			a: body.a,
			next: newNextId,
		})

		await faqs.updateOne(
			{ next: { $eq: newNextId } },
			{ $set: { next: newEntry.insertedId } },
		)

		return NextResponse.json({ insertedId: newEntry.insertedId })
	} catch (e) {
		logger.error(e, `[${request.url}]`)
		return NextResponse.json({})
	}
}

export async function PUT(request: NextRequest, { params }: RouteProps) {
	try {
		const body = FaqRouteSchema.parse(await request.json())

		const client = await clientPromise
		const faqs = client.db().collection<FaqModel>('faqs')

		const currentId = new ObjectId(params.id)
		const currentEntry = await faqs.findOne({ _id: currentId })
		if (!currentEntry) {
			throw new Error("Entry being modified doesn't exist")
		}

		// Remove current entry from the list
		await faqs.updateOne(
			{ next: { $eq: currentId } },
			{ $set: { next: currentEntry.next } },
		)

		// Update current entry
		const newNextId = body.next ? new ObjectId(body.next) : null
		await faqs.updateOne(
			currentEntry,
			{
				$set: {
					q: body.q,
					a: body.a,
					next: newNextId,
				},
			}
		)

		// Insert current entry back into flow
		await faqs.updateOne(
			{ next: { $eq: newNextId } },
			{ $set: { next: currentId } },
		)

		return NextResponse.json({})
	} catch (e) {
		logger.error(e, `[${request.url}]`)
		return NextResponse.json({})
	}
}
