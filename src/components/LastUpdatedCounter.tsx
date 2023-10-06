import React from 'react'
import { DivProps } from 'react-html-props'

export type CounterProps = DivProps

interface Props {
	minsAgo: number
	className?: CounterProps
}

const LastUpdatedCounter: React.FC<Props> = ({ minsAgo, className }: Props) => {
	return (
		// Return the JSX for your component here
		<span
			className={`text-white flex justify-between items-center inherit gap-4 py-1 px-1 text-sm ${className}`}
		>
			<p>{`Last updated: ${Math.ceil(minsAgo / 60000)} mins ago`}</p>
			<button className="bg-hackuta-blue text-white font-heading hover:opacity-80 rounded text-lg text-center px-3 pb-1">
				{`⟳`}
			</button>
		</span>
	)
}

export default LastUpdatedCounter
