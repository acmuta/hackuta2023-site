import { ElementProps } from 'react-html-props'

export type Display =
	| 'block'
	| 'inline-block'
	| 'inline'
	| 'flex'
	| 'inline-flex'

export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'

export type JustifyContent =
	| 'normal'
	| 'start'
	| 'end'
	| 'center'
	| 'space-between'
	| 'space-around'
	| 'space-evenly'

export type AlignItems =
	| 'normal'
	| 'start'
	| 'end'
	| 'center'
	| 'stretch'
	| 'baseline'

export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

export type BoxProps<T extends ElementProps> = T & {
	as?: React.ElementType
	display?: Display
	direction?: FlexDirection
	justifyContent?: JustifyContent
	alignItems?: AlignItems
	wrap?: FlexWrap
	gap?: string
}
