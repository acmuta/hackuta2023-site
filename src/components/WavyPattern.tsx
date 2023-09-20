import { SVGProps } from 'react-html-props'

export type WavyPatternProps = SVGProps & {
	strokeColor?: string
}
export const WavyPattern = ({
	strokeColor = 'rgb(0,0,0,.3)',
	...props
}: WavyPatternProps) => {
	return (
		<svg
			viewBox="0 0 280 30"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden
			{...props}
		>
			<path
				d="M6 6C19.3547 6 19.3547 24 32.7094 24C46.0641 24 46.0641 6 59.4188 6C72.7735 6 72.7735 24 86.0969 24C99.452 24 99.452 6 112.775 6C126.13 6 126.13 24 139.453 24C152.808 24 152.808 6 166.162 6C179.517 6 179.517 24 192.872 24C206.226 24 206.226 6 219.581 6C232.936 6 232.936 24 246.291 24C259.645 24 259.645 6 273 6"
				stroke={strokeColor}
				strokeWidth="12"
				strokeMiterlimit="10"
				strokeLinecap="round"
			/>
		</svg>
	)
}
