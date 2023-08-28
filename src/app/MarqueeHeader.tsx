import Link from 'next/link';
import { DivProps, ElementProps } from 'react-html-props';

export type MarqueeHeaderProps = DivProps
export const MarqueeHeader = ({ ...props }: MarqueeHeaderProps) => {
	return (
		<div className='bg-hackuta-black' {...props}>
			<div className='flex flex-row justify-center gap-8 px-24 py-4 my-2 bg-hackuta-black text-hackuta-beige font-heading border-t-hackuta-beige border-b-hackuta-beige border-t-8 border-b-8'>
				<span>Arlington's One and Only Hackathon</span>
				<span>The Greatest Show Around</span>
			</div>
			<Link
				href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2024-season&utm_content=gray"
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src="https://s3.amazonaws.com/logged-assets/trust-badge/2024/mlh-trust-badge-2024-gray.svg"
					alt="Major League Hacking 2024 Hackathon Season"
					className={'block w-[100px] absolute top-0 max-w-[100px] min-w-[60px] right-[min(5vw,50px)] z-50'}
				/>
			</Link>
		</div>
	)
}

export type MLHTrustBadgeColor = MLHTrustBadgeProps['color']
export type MLHTrustBadgeProps = ElementProps & {
	color: 'white' | 'black' | 'gray' | 'red' | 'blue' | 'yellow'
}
export const MLHTrustBadge = ({ color }: MLHTrustBadgeProps) => {
	return (
		<Link
			href={`https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2024-season&utm_content=${color}`}
		>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={`https://s3.amazonaws.com/logged-assets/trust-badge/2024/mlh-trust-badge-2024-${color}.svg`}
				alt="Major League Hacking 2024 Hackathon Season"
			/>
		</Link>
	)
}
