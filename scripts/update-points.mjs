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
	const adjusterPoints = sumPointAdjustments(user?.pointAdjustments)
	return [
		eventPoints + checkedInBonus,
		eventPoints + checkedInBonus + adjusterPoints,
	]
}

let counter = 0

export async function updateUser(user) {
	const [newPointsObtained, newPoints] = await computePoints(user)
	if (user.points !== newPoints || user.pointsObtained !== newPointsObtained) {
		await users.updateOne({ _id: user._id }, {
			$set: { points: newPoints, pointsObtained: newPointsObtained },
		})
		console.log(
			`updated ${user.email} from [${user.pointsObtained}, ${user.points}] to [${newPointsObtained}, ${newPoints}]`,
		)
	}
	if (++counter % 20 === 0) {
		console.log(counter)
	}
	return { ...user, points: newPoints, pointsObtained: newPointsObtained }
}

export async function updateAll() {
	const all = await users.find({}, { projection: { 'application.resume': 0 } })
		.toArray()
	return await Promise.all(all.map(updateUser))
}

await updateAll()
