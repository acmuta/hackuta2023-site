'use client'

import { DivProps } from 'react-html-props'

import { JsonUser } from '@/lib/db/models/User'
import { getGroupName, printRoles } from '@/lib/utils/shared'
import Countdown, { isCountdownOver } from '../Countdown'

export type HackTicketProps = DivProps & {
	user: JsonUser | null
}
export const HackTicket = ({
	className,
	user,
}: HackTicketProps) => {
	const qrCodePath = user?.hexId
		? '/qrcode/hex'
		: user?.checkInPin
		? '/qrcode/check-in'
		: '/images/noqrcode.svg'
	const countdownOver = false && isCountdownOver()
	const status = (user?.applicationStatus === 'waitlisted'
		? undefined
		: user?.applicationStatus) ?? 'walk in'

	let suite = ''
	if (user?.hexId) {
		switch (getGroupName(user.hexId)) {
			case 'Hearts':
				suite = '♥️'
				break
			case 'Spades':
				suite = '♠️'
				break
			case 'Clubs':
				suite = '♣️'
				break
			case 'Diamonds':
				suite = '♦️'
				break
			case 'Unknown':
			default:
				suite = ''
				break
		}
	}

	return (
		<>
			<div className="flex flex-col md:hidden justify-center items-center bg-hackuta-darkred p-2">
				<h2 className="text-white text-3xl mt-2 font-bold">
					{`${countdownOver ? 'Hacker ID' : 'Countdown'}`}
				</h2>
				<div className="my-2.5 px-4 gap-0.5 flex flex-col font-semibold text-3xl text-white">
					{countdownOver
						? (
							<div className="flex flex-col gap-2 items-center">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={qrCodePath}
									alt="ID QR code"
									className="h-40"
								/>
								<span className="uppercase">
									{status}
								</span>
							</div>
						)
						: <Countdown />}
				</div>
			</div>
			<div
				className={`mx-auto bg-white shadow-md drop-shadow-xl h-64 hidden md:flex ${className}`}
			>
				{/* Left */}
				<div
					className={`flex items-end w-64 bg-cover bg-center opacity-85 ${
						user?.applied
							? 'bg-hackuta-sqrbg-ruby'
							: 'bg-hackuta-sqrbg-unregistered'
					} bg-opacity-90`}
				>
					<p className="flex text-red-700 -rotate-90 w-1 text-sm font-bold gap-1 pt-4 translate-y-3 opacity-50">
						{/* if registered, show admit one */}
						{user?.applied && (
							<>
								<span>ADMIT&nbsp;ONE</span>
								<span className="text-red-500">ADMIT&nbsp;ONE</span>
								<span>ADMIT&nbsp;ONE</span>
							</>
						)}
						{/* if unregistered, show apply now */}
						{!user?.applied && (
							<>
								<span className="text-xs">APPLY&nbsp;NOW</span>
								<span>&nbsp;</span>
								<span className="text-red-500 text-xs">
									APPLY&nbsp;NOW
								</span>
								<span>&nbsp;</span>
								<span className="text-xs">APPLY&nbsp;NOW</span>
								<span>&nbsp;</span>
							</>
						)}
					</p>
					<div className="ticket-number w-64 flex justify-end items-end p-2">
						<p className="text-red-400 text-opacity-80">
							{`${suite} ${
								getGroupName(user?.hexId) !== 'Unknown'
									? getGroupName(user?.hexId)
									: ''
							}`}
						</p>
					</div>
				</div>

				{/* Middle */}
				<div className="px-8 py-2.5 flex flex-col justify-between text-center border-x border-dashed border-red-800">
					<p className="border-y border-gray-700 py-1 font-semibold flex items-center justify-around">
						<span className="text-left text-sm">SAT</span>
						<span className="text-xl">OCTOBER 7</span>
						<span className="text-sm">2023</span>
					</p>
					<div className="font-bold font-heading">
						<h1 className="text-3xl font-bold text-red-600">
							GREATEST SHOW
						</h1>
						<h2 className="text-xl font-bold text-red-800">ACM at UTA</h2>
					</div>
					<div className="my-2.5 gap-0.5 flex flex-col font-semibold text-3xl text-red-950">
						<Countdown />
						{
							/* <p>
						SAT 12PM <span className="font-bold text-lg">TO</span> SUN 12PM
					</p>
					<p>
						DOORS <span className="font-bold text-lg">@</span> 9:00 AM
					</p> */
						}
					</div>
					<p className="flex justify-around items-center pt-2 border-t font-normal border-gray-700">
						<span>SWSH & SEIR</span>
						<span className="text-xl">🎪</span>
						<span>Arlington, TX</span>
					</p>
				</div>

				{/* Right */}
				<div className="flex justify-between items-end gap-0 w-64">
					{/* admit one strip */}
					<p className="flex text-darkgray -rotate-90 w-1 text-sm font-bold gap-1 pt-4 translate-y-3">
						{user?.applied
							? (
								<>
									<span>ADMIT&nbsp;ONE</span>
									<span className="text-gray-600">ADMIT&nbsp;ONE</span>
									<span>ADMIT&nbsp;ONE</span>
								</>
							)
							: (
								<>
									<span className="text-xs">APPLY&nbsp;NOW</span>
									<span>&nbsp;</span>
									<span className="text-gray-600 text-xs">
										APPLY&nbsp;NOW
									</span>
									<span>&nbsp;</span>
									<span className="text-xs">APPLY&nbsp;NOW</span>
								</>
							)}
					</p>
					{/* info area */}
					<div className="w-64">
						<div className="p-2 flex flex-col justify-center items-center text-center">
							<h1 className="text-lg capitalize">
								{user?.application?.firstName ?? ''}{' '}
								[{printRoles(user?.roles)}]
							</h1>
							<div className="flex flex-col font-normal text-sm">
								<p className="m-0 text-sm">
									SAT 9AM{' '}
									<span className="font-medium text-base">TO</span>
									{' '}
									SUN 4PM
								</p>
								<p className="m-0">
									DOORS{' '}
									<span className="font-medium text-base">@</span>{' '}
									9:00 AM
								</p>
							</div>
							<div className="h-32 mt-2">
								<div
									className={`w-32 h-32`}
								>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={qrCodePath}
										alt="ID QR code"
										className="h-full"
									/>
								</div>
							</div>
							<p className="text-sm font-semibold text-gray-600 uppercase">
								{status}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
