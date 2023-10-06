import {
	ChannelBox,
	ChannelItem as IChannelItem,
	ChannelLogo,
} from '@acmuta/planby'

export const ChannelItem = ({ isVerticalMode, channel }: IChannelItem) => {
	const { position, logo } = channel

	return (
		<ChannelBox
			data-testid="sidebar-item"
			isVerticalMode={isVerticalMode}
			className="planby-channel-box"
			{...position}
		>
			{/* Overwrite styles by add eg. style={{ maxHeight: 52, maxWidth: 52,... }} */}
			{/* Or stay with default styles */}
			<ChannelLogo
				src={logo}
				alt="Logo"
				style={{ maxHeight: 18.6, maxWidth: 84 }}
				className="planby-channel-logo"
			/>
		</ChannelBox>
	)
}
