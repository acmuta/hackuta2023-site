import { NextRequest, NextResponse } from 'next/server'

import clientPromise from '@/lib/db'
import User from '@/lib/db/models/User'
import logger from '@/lib/logger'
import { stringifyError } from '@/lib/utils/server'

export async function POST(request: NextRequest) {
	const checkInPin = request.nextUrl.searchParams.get('checkInPin')
	const hexId = request.nextUrl.searchParams.get('hexId')
	const eventName = request.nextUrl.searchParams.get('eventName')
	const generalId = request.nextUrl.searchParams.get('id')

	try {
		if (!((checkInPin && hexId) || (eventName && generalId))) {
			throw new Error('Missing search params')
		}

		const client = await clientPromise
		const users = client.db().collection<User>('users')

		// FOR CHECKING IN (LINKING USERS)
		if (checkInPin && hexId) {
			const existingUser = await users.findOne({ hexId: { $eq: hexId } })

			// Check if there's already someone with the hex ID
			if (existingUser) {
				throw new Error(`An user already has the hex ID ${hexId}`)
			}

			// Update the user document with checkedIn date and hexId
			await users.updateOne(
				{ checkInPin: { $eq: parseInt(checkInPin) } },
				{
					$set: {
						checkedIn: new Date(),
						hexId: hexId,
					},
				},
			)
		}

		// FOR ADDING EVENTS TO USER
		if (eventName && generalId) {
			if (generalId.match(/^[ABCD][a-f0-9]{5}$/i)) {
				// if phys id

				// check if user already has event
				const existingUser = await users.findOne({
					hexId: { $eq: generalId },
				})

				if (existingUser?.attendedEvents?.includes(eventName)) {
					throw new Error(`User already checked into "${eventName}"`)
				}

				await users.updateOne(
					{ hexId: { $eq: generalId } },
					{
						$addToSet: {
							attendedEvents: eventName,
						},
					},
				)
			} else if (generalId.match(/^\d{6}$/i)) {
				// if dig id

				// check if user already has event
				const existingUser = await users.findOne({
					checkInPin: { $eq: parseInt(generalId) },
				})

				if (existingUser?.attendedEvents?.includes(eventName)) {
					throw new Error(`User already checked into "${eventName}"`)
				}

				await users.updateOne(
					{ checkInPin: { $eq: parseInt(generalId) } },
					{
						$addToSet: {
							attendedEvents: eventName,
						},
					},
				)
			}
		}

		return NextResponse.json({ status: 'success' })
	} catch (e) {
		logger.error(e, request.nextUrl.toString())
		return NextResponse.json({ status: 'error', message: stringifyError(e) })
	}
}
