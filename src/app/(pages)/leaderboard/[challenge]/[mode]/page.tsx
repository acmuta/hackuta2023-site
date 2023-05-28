/* eslint-disable @typescript-eslint/no-unused-vars */

import { WithId } from 'mongodb'
import { notFound } from 'next/navigation'
import z from 'zod'

import { Scoreboard } from '@/components/Scoreboard'
import clientPromise from '@/lib/db'
import { getResolvedTeams } from '@/lib/db/models/Team'
import User, { getFullName } from '@/lib/db/models/User'

import { ScraperOutput } from '../../scraper'

interface PageProps {
	params: {
		challenge: string
		mode: string
	}
}

const ChallengeSchema = z.enum(['worthiness', 'claimpairs', 'stance'])

type Challenge = z.infer<typeof ChallengeSchema>

const ChallengeMap: Record<Challenge, { url: string; pointsIndex: number }> =
	Object.freeze({
		worthiness: {
			url: 'https://idir.uta.edu/classifyfact_survey/datathon_leaderboard.php',
			pointsIndex: 9,
		},
		claimpairs: {
			url: 'https://idir.uta.edu/claimpairs_annotation/datathon_leaderboard.php',
			pointsIndex: 8,
		},
		stance: {
			url: 'https://idir.uta.edu/stance_annotation/datathon_leaderboard.php',
			pointsIndex: 8,
		},
	})

const WorthinessPoints: ScraperOutput[] = [
	{ email: 'talhathmd@gmail.com', points: 33.45 },
	{ email: 'zmartinez326@gmail.com', points: 32.09 },
	{ email: 'alexandersackett@gmail.com', points: 19.7 },
	{ email: 'muaazfaiyazuddin476@gmail.com', points: 11.87 },
	{ email: 'cli@uta.edu', points: 8.22 },
	{ email: 'hasiburrahmandipto@gmail.com', points: 6.44 },
	{ email: 'gamegameguy99@gmail.com', points: 6.36 },
	{ email: 'proskills059@gmail.com', points: 5.52 },
	{ email: 'suspendedtundra2@gmail.com', points: 2.4 },
	{ email: 'armaannallifour@icloud.com', points: 1.56 },
	{ email: 'sdg2544@mavs.uta.edu', points: 1.4 },
	{ email: 'inshaad17@gmail.com', points: 1.03 },
	{ email: 'tejaguntupalli726@gmail.com', points: 0.83 },
	{ email: 'shivaranjani.palepally@gmail.com', points: 0.22 },
	{ email: 'gxy5341@mavs.uta.edu', points: 0.17 },
	{ email: 'pxp3168@mavs.uta.edu', points: 0 },
	{ email: 'amk9841@mavs.uta.edu', points: 0 },
	{ email: 'sxm4559@mavs.uta.edu', points: 0 },
	{ email: 'rxb2495@mavs.uta.edu', points: 0 },
	{ email: 'bbignall1225@gmail.com', points: 0 },
	{ email: 'uqs4614@mavs.uta.edu', points: 0 },
	{ email: 'Davix1648@gmail.com', points: 0 },
	{ email: 'nxb3832@mavs.uta.edu', points: 0 },
]

const ClaimpairsPoints: ScraperOutput[] = [
	{ email: 'axs4549@mavs.uta.edu', points: 36.16 },

	{ email: 'armaannallifour@icloud.com', points: 30.84 },
	{ email: 'alexandersackett@gmail.com', points: 9.31 },
	{ email: 'cli@uta.edu', points: 7.46 },
	{ email: 'shixiao9941@gmail.com', points: 1.35 },
	{ email: 'suspendedtundra2@gmail.com', points: 0.96 },
	{ email: 'anjanakillamsetty@gmail.com', points: 0.89 },
	{ email: 'nxb3832@mavs.uta.edu', points: 0.01 },
	{ email: 'uqs4614@mavs.uta.edu', points: 0 },
	{ email: 'amk9841@mavs.uta.edu', points: 0 },
	{ email: 'proskills059@gmail.com', points: 0 },
]

const StancePoints: ScraperOutput[] = [
	{ email: 'suspendedtundra2@gmail.com', points: 21.56 },
	{ email: 'gamegameguy99@gmail.com', points: 17.06 },
	{ email: 'cli@uta.edu', points: 11.22 },
	{ email: 'nxb3832@mavs.uta.edu', points: 10.3 },
	{ email: 'nguyen.andrew1234@yahoo.com', points: 8.38 },
	{ email: 'amk9841@mavs.uta.edu', points: 7.82 },
	{ email: 'alexandersackett@gmail.com', points: 7.72 },
	{ email: 'zmartinez326@gmail.com', points: 5.04 },
	{ email: 'armaannallifour@icloud.com', points: 0.38 },
	{ email: 'uqs4614@mavs.uta.edu', points: 0 },
	{ email: 'talhathmd@gmail.com', points: 0 },
	{ email: 'zhuzhengyuan824@gmail.com', points: 0 },
]

const Points: Record<Challenge, ScraperOutput[]> = {
	claimpairs: ClaimpairsPoints,
	worthiness: WorthinessPoints,
	stance: StancePoints,
}

const Names: Record<Challenge, string> = {
	claimpairs: 'A.2 Claim Matching',
	worthiness: 'A.1 Claim Check-worthiness',
	stance: 'A.3 Truthfulness Stance',
}

export default async function Leaderboard({
	params: { challenge: challengeIn, mode: modeIn },
}: PageProps) {
	if (!(modeIn === 'individual' || modeIn === 'team')) {
		return notFound()
	}

	let outputs: ScraperOutput[]
	let name: string
	if (challengeIn === 'all') {
		outputs = JSON.parse(JSON.stringify(WorthinessPoints))
		name = 'Overall IDIR Annotation'
		aggregateOutputs(ClaimpairsPoints)
		aggregateOutputs(StancePoints)
	} else {
		const challenge = ChallengeSchema.parse(challengeIn)
		outputs = Points[challenge]
		name = Names[challenge]
	}

	const client = await clientPromise
	const collection = client.db().collection<User>('users')
	const users = (
		await Promise.all(
			outputs
				.sort((a, b) => b.points - a.points)
				.map((o) => collection.findOne({ email: o.email })),
		)
	).filter((v): v is WithId<User> => !!v)

	if (modeIn === 'individual') {
		return (
			<>
				<h2>{name} Individual Leaderboard</h2>
				<Scoreboard
					header="Individual"
					scores={users.map((u) => ({
						name: `${u.application?.firstName} ${u.application?.lastName}`,
						score: outputs.find((o) => o.email === u.email)?.points ?? -1,
					}))}
				/>
			</>
		)
	} else {
		const finalOutputs: { name: string; score: number }[] = []
		const teams = await getResolvedTeams()
		for (const { email, points } of outputs) {
			const user = await client.db().collection<User>('users').findOne({
				email,
			})
			if (!user) {
				// logger.warn(`Not registered: ${email}, ${challengeIn}`)
				continue
			}
			const team = teams.find((team) =>
				team.memberUsers.find((member) => member.email === email),
			)
			const teamName = team?.name ?? getFullName(user) + ' (individual)'
			const existing = finalOutputs.find((o) => o.name === teamName)
			if (existing) {
				existing.score += points
			} else {
				finalOutputs.push({
					name: teamName,
					score: points,
				})
			}
		}
		return (
			<>
				<h2>{name} Team Leaderboard</h2>
				<Scoreboard
					header="Team"
					scores={finalOutputs.sort((a, b) => b.score - a.score)}
				/>
			</>
		)
	}

	function aggregateOutputs(target: ScraperOutput[]) {
		for (const { email, points } of Object.values(target)) {
			const existing = outputs.find((o) => o.email === email)
			if (existing) {
				existing.points += points
			} else {
				outputs.push({ email, points })
			}
		}
	}
}
