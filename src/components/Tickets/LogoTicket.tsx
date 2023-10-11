import Image from 'next/image'
import Link from 'next/link'
import { DivProps } from 'react-html-props'

export type SafeNumber = number | `${number}`
export type LogoTicketKind = LogoTicketProps['kind']
export type LogoTicketProps = DivProps & {
	companyName: string
	companyUrl: string
	imageUrl: string
	kind: 'Sponsor' | 'Partner' | 'SpecialThanks'
}

export const LogoTicket = ({
	companyName,
	companyUrl,
	imageUrl,
	kind,
}: LogoTicketProps) => {
	// const Separator = ({ className, ...props }: SpanProps) => (
	// 	<span
	// 		aria-hidden
	// 		className={twMerge('h-full bg-black w-[1px]', className)}
	// 		{...props}
	// 	></span>
	// )
	// // const starSize = 16
	// const topRadius = 'rounded-tl-xl rounded-tr-xl'
	// const botRadius = 'rounded-bl-xl rounded-br-xl'
	return (
		<Link
			href={companyUrl}
			className={`md:w-80 w-fit h-40 my-2 text-center flex flex-row justify-center gap-4 items-center py-6 px-6 drop-shadow-hackuta ${
				kind === 'SpecialThanks'
					? 'bg-hackuta-ticket-yellow'
					: kind === 'Sponsor'
					? 'bg-hackuta-ticket-red'
					: 'bg-hackuta-ticket-blue'
			} bg-center bg-clip-border bg-no-repeat no-underline hover:drop-shadow-none hover:mx-1 transition-all`}
		>
			<div className="w-15 h-28 flex justify-center items-center">
				<div className="rotate-90 text-center font-semibold text-sm font-mono uppercase text-hackuta-black-60">
					{companyName}
				</div>
			</div>
			<div className="w-28 flex justify-center items-center">
				<Image src={imageUrl} alt={companyName} width={128} height={96} />
			</div>
			<div className="w-15 h-28 flex justify-center items-center">
				<div
					className="-rotate-90 text-center font-semibold font-mono uppercase text-hackuta-black-60"
					style={{
						fontSize: kind === 'SpecialThanks' ? 'smaller' : 'inherit',
					}}
				>
					{kind}
				</div>
			</div>

			{
				/* <div
				className={twJoin(
					'flex items-center justify-center px-2 sm:px-8 sm:py-4',
					'border-2 border-hackuta-black border-dashed border-b-0',
				)}
			>
				<Link href={companyUrl}>
					<img
						src={imageUrl}
						alt={companyName}
						className="my-2 object-contain h-[100px]"
					/>
				</Link>
			</div>
			<footer
				className={twMerge(
					'flex flex-row justify-between items-center gap-8 px-6 py-4  font-rhd uppercase text-white',
					// botRadius,
					kind === 'Sponsor' ? 'bg-hackuta-black' : 'bg-[#cf4227]',
				)}
			>
				<div className="hidden sm:flex flex-row gap-1 opacity-25">
					<Star width={starSize} height={starSize} />
					<Star width={starSize} height={starSize} />
					<Star width={starSize} height={starSize} />
					<Star width={starSize} height={starSize} />
				</div>
				<div className="flex flex-row gap-4 items-center">
					<span className="hidden sm:inline">Oct 7-8 2023</span>
					<span className="flex flex-row gap-2 items-center">
						{kind} Certified
						<VerifiedBadge className="h-6 w-6" aria-hidden />
					</span>
				</div>
			</footer> */
			}
		</Link>
	)
}

// type StarProps = SVGProps
// const Star = ({ ...props }: StarProps) => {
// 	return (
// 		<svg
// 			viewBox="0 0 20 19"
// 			fill="none"
// 			xmlns="http://www.w3.org/2000/svg"
// 			aria-hidden
// 			{...props}
// 		>
// 			<path
// 				d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"
// 				fill="#fff"
// 			/>
// 		</svg>
// 	)
// }
