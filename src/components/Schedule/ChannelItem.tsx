import { Channel, ChannelBox, ChannelLogo } from 'planby'

interface ChannelItemProps {
	channel: Channel
}

export const ChannelItem = ({ channel }: ChannelItemProps) => {
	const { position, logo } = channel
	return (
		<ChannelBox {...position} className="planby-channel-box">
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
