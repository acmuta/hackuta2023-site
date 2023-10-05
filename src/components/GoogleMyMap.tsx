// components/Countdown.tsx
import React from 'react'
import Iframe from 'react-iframe'

const Countdown: React.FC = () => {
	return (
		<Iframe
			url="https://www.google.com/maps/d/embed?mid=17d4SqZ5DRYsMwP1y5kkszrcxU3zc2-k&ehbc=2E312F"
			width="720px"
			height="480px"
			className=""
			display="block"
			position="relative"
		/>
	)
}

export default Countdown
