import { NextRequest, NextResponse } from 'next/server'

import clientPromise from '@/lib/db'
import Event from '@/lib/db/models/Event'
import { ShopSwag, ShopSwagCollection } from '@/lib/db/models/ShopSwap'
import User, { getFullName } from '@/lib/db/models/User'
import logger from '@/lib/logger'
import {
	getEnhancedSession,
	stringifyError,
	updatePoints,
} from '@/lib/utils/server'
import { Collection, MongoClient } from 'mongodb'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
	const { user: operator } = getEnhancedSession(headers())
	const checkInPin = request.nextUrl.searchParams.get('checkInPin')
	const hexId = request.nextUrl.searchParams.get('hexId')?.toUpperCase()
	const eventName = request.nextUrl.searchParams.get('eventName')
	const generalId = request.nextUrl.searchParams.get('id')?.toUpperCase()
	const swagName = request.nextUrl.searchParams.get('swagName')

	try {
		const client = await clientPromise
		const users = client.db().collection<User>('users')

		if (checkInPin && hexId) {
			return await linkIDs(users, hexId, checkInPin)
		}
		if (eventName && generalId) {
			return await addEvent(client, generalId, users, eventName)
		}
		if (swagName && generalId) {
			return await redeemSwag(generalId, client, swagName)
		}

		throw new Error('Missing search params')
	} catch (e) {
		logger.error(e, operator?.email + '@@' + request.nextUrl.toString())
		return NextResponse.json({ status: 'error', message: stringifyError(e) })
	}
}

async function linkIDs(
	users: Collection<User>,
	hexId: string,
	checkInPin: string,
) {
	const existingUser = await users.findOne({ hexId: { $eq: hexId } }, {
		projection: { 'application.resume': 0 },
	})

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
				hexId,
			},
		},
	)

	await updatePoints({ checkInPin: { $eq: parseInt(checkInPin) } })

	return NextResponse.json({ status: 'success' })
}

async function addEvent(
	client: MongoClient,
	generalId: string,
	users: Collection<User>,
	eventName: string,
) {
	const isHexId = generalId.match(/^[ABCD][a-f0-9]{5}$/i)
	const idKey = (isHexId ? 'hexId' : 'checkInPin') satisfies keyof User

	// check if user already has event
	const user = await users.findOne({
		[idKey]: { $eq: isHexId ? generalId : parseInt(generalId) },
	}, { projection: { 'application.resume': 0 } })

	// throw error if user not found
	if (!user) {
		throw new Error(`No user found with ID: "${generalId}"`)
	}

	if (user.attendedEvents?.includes(eventName)) {
		throw new Error(
			`${getFullName(user)} already checked into "${eventName}"`,
		)
	}

	const event = await client.db().collection<Event>('events').findOne({
		title: { $eq: eventName },
	})
	if (!event) {
		throw new Error(`Unknown event ${eventName}`)
	}

	await users.updateOne({ _id: user._id }, {
		$addToSet: { attendedEvents: eventName },
	})

	await updatePoints({ _id: user._id })

	return NextResponse.json({
		status: 'success',
		message: `Checked ${getFullName(user)} into "${eventName}" successfully`,
	})
}

async function redeemSwag(
	generalId: string,
	client: MongoClient,
	swagName: string,
) {
	const isHexId = generalId.match(/^[ABCD][a-f0-9]{5}$/i)
	const idKey = (isHexId ? 'hexId' : 'checkInPin') satisfies keyof User

	const swags = await client.db().collection<ShopSwag>(
		ShopSwagCollection,
	).find({ name: { $eq: swagName } }).toArray()
	if (swags.length !== 1) {
		throw new Error(
			`Found ${swags.length} swags with the name ${swagName}`,
		)
	}

	const swag = swags[0]

	const user = await updatePoints({
		[idKey]: { $eq: isHexId ? generalId : parseInt(generalId) },
	})
	if (user.points < swag.price) {
		throw new Error(
			`${
				getFullName(user)
			} cannot afford ${swagName}: ${user.points} < ${swag.price}`,
		)
	}

	await client.db().collection<User>('users').updateOne({
		_id: user._id,
	}, {
		$push: {
			pointAdjustments: {
				delta: -swag.price,
				reason: `Redeemed ${swagName} from Shop`,
				timestamp: new Date().getTime(),
			},
		},
		$set: {
			points: user.points - swag.price,
		},
	})

	return NextResponse.json({
		status: 'success',
		message: `${getFullName(user)} redeemed ${swagName} successfully`,
	})
}
