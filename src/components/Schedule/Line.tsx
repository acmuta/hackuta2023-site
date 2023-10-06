import { Line as ILine } from '@acmuta/planby'

export function Line({ styles }: ILine) {
	return (
		<div
			style={{
				...styles.position,
				background: 'red',
				pointerEvents: 'none',
			}}
		/>
	)
}
