// components/Countdown.tsx
import React, { useEffect, useState } from 'react'
import { DivProps } from 'react-html-props'

const targetDate = new Date('2023-10-07T09:00:00-05:00') // October 7, 2023, 9:00 AM CST
const checkinEnd = new Date('2023-10-07T12:00:00-05:00') // October 7, 2023, 12:00 PM CST
const submissionEnd = new Date('2023-10-08T10:00:00-05:00') // October 8, 2023, 10:00 AM CST
const hackingEnd = new Date('2023-10-08T09:12:00-05:00') // October 8, 2023, 12:00 AM CST
const judgingStart = new Date('2023-10-08T13:00:00-05:00') // October 8, 2023, 1:00 PM CST
const judgingEnd = new Date('2023-10-08T15:00:00-05:00') // October 8, 2023, 3:00 PM CST
const eventEnd = new Date('2023-10-08T17:00:00-05:00') // October 8, 2023, 5:00 PM CST
const nextYear = new Date('2024-10-01T09:00:00-05:00') // October 1, 2024, 9:00 AM CST

const currentCountdown = () => {
	// find current time period
	const currentTime = new Date()

	if (currentTime < targetDate) {
		return targetDate.getTime()
	} else if (currentTime < checkinEnd) {
		return checkinEnd.getTime()
	} else if (currentTime < submissionEnd) {
		return submissionEnd.getTime()
	} else if (currentTime < hackingEnd) {
		return hackingEnd.getTime()
	} else if (currentTime < judgingStart) {
		return judgingStart.getTime()
	} else if (currentTime < judgingEnd) {
		return judgingEnd.getTime()
	} else if (currentTime < eventEnd) {
		return eventEnd.getTime()
	} else {
		return nextYear.getTime()
	}
}

export const isCountdownOver = () => {
	const currentTime = new Date()
	const timeDifference = currentCountdown() - currentTime.getTime()

	return timeDifference <= 0
}

export type CountdownProps = DivProps
const Countdown: React.FC = ({ className }: CountdownProps) => {
	const calculate = () => {
		const currentTime = new Date()
		const timeDifference = currentCountdown() - currentTime.getTime()

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

	const getText = () => {
		// find current time period
		const currentTime = new Date()

		if (currentTime < targetDate) {
			return 'Until Check-in Opens'
		} else if (currentTime < checkinEnd) {
			return 'Until Check-in Closes'
		} else if (currentTime < submissionEnd) {
			return 'Until Submissions Close'
		} else if (currentTime < hackingEnd) {
			return "Until Hacking's Over"
		} else if (currentTime < judgingStart) {
			return 'Until Judging Begins'
		} else if (currentTime < judgingEnd) {
			return 'Until Judging Ends'
		} else if (currentTime < eventEnd) {
			return 'Until Closing Ceremony'
		} else {
			return 'Thanks for coming!'
		}
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
		<div className="flex flex-center justify-center flex-col">
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
			<div className="text-center text-sm uppercase">
				{getText()}
			</div>
		</div>
	)
}

export default Countdown
