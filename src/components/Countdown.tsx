// components/Countdown.tsx
import React, { useEffect, useState } from 'react'
import { DivProps } from 'react-html-props'

const targetDate = new Date('2023-10-07T09:00:00-05:00') // October 7, 2023, 9:00 AM CST

export const isCountdownOver = () => {
	const currentTime = new Date()
	const timeDifference = targetDate.getTime() - currentTime.getTime()

	return timeDifference <= 0
}

export type CountdownProps = DivProps
const Countdown: React.FC = ({ className }: CountdownProps) => {
	const calculate = () => {
		const currentTime = new Date()
		const timeDifference = targetDate.getTime() - currentTime.getTime()

		if (timeDifference <= 0) {
			return { weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
		}

		const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7))
		const days = Math.floor(
			(timeDifference % (1000 * 60 * 60 * 24 * 7))
				/ (1000 * 60 * 60 * 24),
		)
			+ weeks * 7
		const hours = Math.floor(
			(timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
		)
		const minutes = Math.floor(
			(timeDifference % (1000 * 60 * 60)) / (1000 * 60),
		)
		const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

		return { weeks, days, hours, minutes, seconds }
	}

	const [countdown, setCountdown] = useState(calculate())

	useEffect(() => {
		const interval = setInterval(() => {
			const result = calculate()
			setCountdown(result)
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className={`inline-block gap-2 ${className}`}>
			<div className="inline-block">
				<span suppressHydrationWarning>{countdown.days}</span>
				<span className="text-sm">d</span>
				<span className="font-normal mx-2">·</span>
			</div>
			<div className="inline-block">
				<span suppressHydrationWarning>{countdown.hours}</span>
				<span className="text-sm">h</span>
				<span className="font-normal mx-2">·</span>
			</div>
			<div className="inline-block">
				<span suppressHydrationWarning>{countdown.minutes}</span>
				<span className="text-sm">m</span>
				<span className="font-normal mx-2">·</span>
			</div>
			<div className="inline-block">
				<span suppressHydrationWarning>{countdown.seconds}</span>
				<span className="text-sm">s</span>
			</div>
		</div>
	)
}

export default Countdown
