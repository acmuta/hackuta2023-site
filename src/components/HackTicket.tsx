import { DivProps } from 'react-html-props'
import { twMerge } from 'tailwind-merge'

export type HackTicketProps = DivProps
export const HackTicket = ({ className, ...props }: HackTicketProps) => {
	return (
		<div
			className={twMerge(
				'flex flex-row items-center justify-between',
				'bg-hackuta-black drop-shadow-hackuta',
				className,
			)}
			{...props}
		>
			<HackTicketSide>081023</HackTicketSide>
			{/* bg-[url(../../public/images/sunburst.svg)] */}
			<div className="flex flex-col gap-10 md:gap-16 px-3 md:px-6 py-3 w-68 md:w-96 mr-[-1rem] bg-hackuta-yellow">
				<h1 className="font-heading border-b border-black border-dashed">
					Hackathon Ticket
				</h1>
				<div className="flex flex-row gap-4 md:gap-8">
					<HackTicketKeyVal label="Date" val="Oct 7-8" />
					<HackTicketKeyVal label="Time" val="12PM" />
					<HackTicketKeyVal label="Location" val="SWSH" />
				</div>
			</div>
			<HackTicketSide childClassName="mr-[-1rem]">Admit one</HackTicketSide>
		</div>
	)
}

type HackTicketSideProps = DivProps & {
	childClassName?: string
}
const HackTicketSide = ({
	children,
	className,
	childClassName,
}: HackTicketSideProps) => {
	return (
		<div
			className={twMerge(
				'flex items-center justify-center h-full font-heading text-md md:text-xl tracking-wide',
				className,
			)}
		>
			<span
				className={twMerge(
					'uppercaseflex text-white text-center uppercase -rotate-90',
					'py-2 border-y border-y-white border-dashed',
					childClassName,
				)}
			>
				{children}
			</span>
		</div>
	)
}

type HackTicketKeyValProps = {
	label: React.ReactNode
	val: React.ReactNode
}

const HackTicketKeyVal = ({ label, val }: HackTicketKeyValProps) => {
	return (
		<div className="text-hackuta-black flex flex-col">
			<span className="font-heading text-xs md:text-base">{label}</span>
			<span className="font-body text-xs md:text-base">{val}</span>
		</div>
	)
}
