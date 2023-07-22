import { Box } from '@/components/Box'
import { getDiscordIdOf } from '@/lib/db/helpers'
import { getResolvedTeams } from '@/lib/db/models/Team'
import { getFullName } from '@/lib/db/models/User'

export default async function Teams() {
	const teams = await getResolvedTeams()

	return (
		<Box direction="column" gap="1.5rem" alignItems="start">
			<h2>Teams</h2>
			{teams.length ? undefined : <div>No teams available.</div>}
			{...await Promise.all(
				teams.map(async (team) => (
					<section key={team.name}>
						<h3>{team.name}</h3>
						<table className="borderTable">
							<tbody>
								<tr>
									<th>Full Name</th>
									<th>Email</th>
									<th>Discord ID (paste into Discord to see who it is)</th>
								</tr>
								{await Promise.all(
									team.memberUsers.map(async (user) => (
										<tr key={user.email}>
											<td>{getFullName(user)}</td>
											<td>{user.email}</td>
											<td>
												<input
													type="text"
													readOnly
													defaultValue={`<@${await getDiscordIdOf(user._id)}>`}
												/>
											</td>
										</tr>
									)),
								)}
							</tbody>
						</table>
					</section>
				)),
			)}
		</Box>
	)
}
