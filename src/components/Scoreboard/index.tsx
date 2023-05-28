import styles from './Scoreboard.module.css'

export interface ScoreboardProps {
	header: 'Team' | 'Individual'
	scores: readonly { name: string; score: number }[]
}

export function Scoreboard({ header, scores }: ScoreboardProps) {
	return (
		<div className={styles.wrapper}>
			<table className={styles.scoreboard}>
				<tbody>
					<tr>
						<th>Rank</th>
						<th>{header}</th>
						{<th>Score</th>}
					</tr>
					{scores.map((team, index) => (
						<tr key={team.name}>
							<td>{index + 1}</td>
							<td>{team.name}</td>
							{<td>{team.score}</td>}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
