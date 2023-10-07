import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from 'process'

const clientPromise = new MongoClient(env.MONGODB_URI, {
	serverApi: ServerApiVersion.v1,
}).connect()
const client = await clientPromise
const users = client.db().collection('users')

export function sumPointAdjustments(adjustments) {
	return adjustments?.reduce((p, c) => p + c.delta, 0) ?? 0
}

export async function computePoints(user) {
	const events = user?.attendedEvents?.length
		? await client.db().collection('events').find({
			title: { $in: user.attendedEvents },
		}).toArray()
		: []
	const eventPoints = events.reduce((p, c) => p + c.pointValue, 0)
	const checkedInBonus = user?.checkedIn ? 50 : 0
	return eventPoints + checkedInBonus
		+ sumPointAdjustments(user?.pointAdjustments)
}

let counter = 0

export async function updateUser(user) {
	const newPoints = await computePoints(user)
	await users.updateOne({ _id: user._id }, { $set: { points: newPoints } })
	if (user.points !== newPoints) {
		console.log(`updated ${user.email} from ${user.points} to ${newPoints}`)
	}
	if (++counter % 20 === 0) {
		console.log(counter)
	}
	return { ...user, points: newPoints }
}

export async function updateAll() {
	const all = await users.find({}, { projection: { 'application.resume': 0 } })
		.toArray()
	return await Promise.all(all.map(updateUser))
}

await updateAll()
