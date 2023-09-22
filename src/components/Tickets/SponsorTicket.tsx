import { VerifiedBadge } from 'iconoir-react'
import Link from 'next/link'
import { DivProps, SpanProps, SVGProps } from 'react-html-props'
import { twJoin, twMerge } from 'tailwind-merge'

export type SafeNumber = number | `${number}`
export type SponsorTicketKind = SponsorTicketProps['kind']
export type SponsorTicketProps = DivProps & {
	companyName: string
	companyUrl: string
	imageUrl: string
	kind: 'Sponsor' | 'Partner'
}

export const SponsorTicket = ({
	companyName,
	companyUrl,
	imageUrl,
	kind,
	...props
}: SponsorTicketProps) => {
	const Separator = ({ className, ...props }: SpanProps) => (
		<span
			aria-hidden
			className={twMerge('h-full bg-black w-[1px]', className)}
			{...props}
		>
		</span>
	)
	const starSize = 16
	const topRadius = 'rounded-tl-xl rounded-tr-xl'
	const botRadius = 'rounded-bl-xl rounded-br-xl'
	return (
		<div className="flex flex-col py-6 px-6 drop-shadow-hackuta bg-[url('../cutout-ticket.png')] bg-center bg-cover bg-clip-border">
			<header
				className={twMerge(
					'flex flex-row gap-4 px-6 py-4 font-rhd text-hackuta-black uppercase border-2 border-hackuta-black border-dashed border-b-0',
					topRadius,
				)}
				{...props}
			>
				<span>HackUTA 2023</span>
				<Separator className="hidden sm:block" />
				<span className="hidden sm:block">{companyName}</span>
				<Separator className="hidden sm:block" />
				<span className="hidden sm:block tracking-widest">#0123456</span>
			</header>
			<div
				className={twJoin(
					'flex items-center justify-center px-2 sm:px-8 sm:py-4',
					'border-2 border-hackuta-black border-dashed border-b-0',
				)}
			>
				<Link href={companyUrl}>
					{/* eslint-disable-next-line @next/next/no-img-element */}
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
					botRadius,
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
			</footer>
		</div>
	)
}

type StarProps = SVGProps
const Star = ({ ...props }: StarProps) => {
	return (
		<svg
			viewBox="0 0 20 19"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden
			{...props}
		>
			<path
				d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"
				fill="#fff"
			/>
		</svg>
	)
}
