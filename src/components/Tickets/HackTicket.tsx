'use client'

import { DivProps } from 'react-html-props'

import Countdown from '../Countdown'

export type HackTicketProps = DivProps
export const HackTicket = ({
	className,
	applied = false,
	role = 'Unregistered',
	id = 'APPLY FOR ID',
}: HackTicketProps) => {
	return (
		<div
			className={`mx-auto bg-white shadow-md drop-shadow-xl h-64 hidden md:flex ${className}`}
		>
			{/* Left */}
			<div
				className={`flex items-end w-64 bg-cover bg-center opacity-85 ${
					applied ? 'bg-hackuta-sqrbg-ruby' : 'bg-hackuta-sqrbg-unregistered'
				} bg-opacity-90`}
			>
				<p className="flex text-red-700 -rotate-90 w-1 text-sm font-bold gap-1 pt-4 translate-y-3 opacity-50">
					{/* if registered, show admit one */}
					{applied && (
						<>
							<span>ADMIT&nbsp;ONE</span>
							<span className="text-red-500">ADMIT&nbsp;ONE</span>
							<span>ADMIT&nbsp;ONE</span>
						</>
					)}
					{/* if unregistered, show apply now */}
					{!applied && (
						<>
							<span className="text-xs">APPLY&nbsp;NOW</span>
							<span>&nbsp;</span>
							<span className="text-red-500 text-xs">APPLY&nbsp;NOW</span>
							<span>&nbsp;</span>
							<span className="text-xs">APPLY&nbsp;NOW</span>
							<span>&nbsp;</span>
						</>
					)}
				</p>
				<div className="ticket-number w-64 flex justify-end items-end p-2">
					<p className="text-red-400 text-opacity-80">{id}</p>
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
					<h1 className="text-3xl font-bold text-red-600">GREATEST SHOW</h1>
					<h2 className="text-xl font-bold text-red-800">ACM at UTA</h2>
				</div>
				<div className="my-2.5 gap-0.5 flex flex-col font-semibold text-3xl text-red-950">
					<Countdown />
					{/* <p>
						SAT 12PM <span className="font-bold text-lg">TO</span> SUN 12PM
					</p>
					<p>
						DOORS <span className="font-bold text-lg">@</span> 9:00 AM
					</p> */}
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
					{/* if applied, show admit one */}
					{applied && (
						<>
							<span>ADMIT&nbsp;ONE</span>
							<span className="text-gray-600">ADMIT&nbsp;ONE</span>
							<span>ADMIT&nbsp;ONE</span>
						</>
					)}
					{/* if unregistered, show apply now */}
					{!applied && (
						<>
							<span className="text-xs">APPLY&nbsp;NOW</span>
							<span>&nbsp;</span>
							<span className="text-gray-600 text-xs">APPLY&nbsp;NOW</span>
							<span>&nbsp;</span>
							<span className="text-xs">APPLY&nbsp;NOW</span>
						</>
					)}
				</p>
				{/* info area */}
				<div className="w-64">
					<div className="p-2 flex flex-col justify-center items-center text-center">
						<h1 className="text-lg">{role}</h1>
						<div className="flex flex-col font-normal text-sm">
							<p className="m-0 text-sm">
								SAT 12PM <span className="font-medium text-base">TO</span> SUN
								12PM
							</p>
							<p className="m-0">
								DOORS <span className="font-medium text-base">@</span> 9:00 AM
							</p>
						</div>
						<div className="h-32 mt-2">
							<div
								className={`w-32 h-32 ${!applied ? 'bg-hackuta-noqrcode' : ''}`}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								{applied && (
									<img
										src="https://external-preview.redd.it/cg8k976AV52mDvDb5jDVJABPrSZ3tpi1aXhPjgcDTbw.png?auto=webp&s=1c205ba303c1fa0370b813ea83b9e1bddb7215eb"
										alt="QR code"
										className="h-full"
									/>
								)}
							</div>
						</div>
						<p className="text-sm font-semibold text-gray-600">{id}</p>
					</div>
				</div>
			</div>
		</div>
	)

	// return (
	// 	<div
	// 		className={twMerge(
	// 			'flex flex-row items-center justify-between',
	// 			'bg-hackuta-black drop-shadow-hackuta',
	// 			className,
	// 		)}
	// 		{...props}
	// 	>
	// 		<HackTicketSide childClassName="hidden sm:flex">081023</HackTicketSide>
	// 		{/* bg-[url(../../public/images/sunburst.svg)] */}
	// 		<div className="flex flex-col gap-10 md:gap-16 px-3 md:px-6 py-3 w-68 md:w-96 mr-[-1rem] bg-hackuta-yellow">
	// 			<h1 className="font-heading border-b border-black border-dashed">
	// 				Hackathon Ticket
	// 			</h1>
	// 			<div className="flex flex-row gap-4 md:gap-8">
	// 				<HackTicketKeyVal label="Date" val="Oct 7-8" />
	// 				<HackTicketKeyVal label="Time" val="12PM" />
	// 				<HackTicketKeyVal label="Location" val="SWSH" />
	// 			</div>
	// 		</div>
	// 		<HackTicketSide childClassName="mr-[-1rem]">Admit one</HackTicketSide>
	// 	</div>
	// )
}

// type HackTicketSideProps = DivProps & {
// 	childClassName?: string
// }
// const HackTicketSide = ({
// 	children,
// 	className,
// 	childClassName,
// }: HackTicketSideProps) => {
// 	return (
// 		<div
// 			className={twMerge(
// 				'flex items-center justify-center h-full font-heading text-md md:text-xl tracking-wide',
// 				className,
// 			)}
// 		>
// 			<span
// 				className={twMerge(
// 					'uppercaseflex text-white text-center uppercase -rotate-90',
// 					'py-2 border-y border-y-white border-dashed',
// 					childClassName,
// 				)}
// 			>
// 				{children}
// 			</span>
// 		</div>
// 	)
// }

// type HackTicketKeyValProps = {
// 	label: React.ReactNode
// 	val: React.ReactNode
// }

// const HackTicketKeyVal = ({ label, val }: HackTicketKeyValProps) => {
// 	return (
// 		<div className="text-hackuta-black flex flex-col">
// 			<span className="font-heading text-xs md:text-base">{label}</span>
// 			<span className="font-body text-xs md:text-base">{val}</span>
// 		</div>
// 	)
// }
