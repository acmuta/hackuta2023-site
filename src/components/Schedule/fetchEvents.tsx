import { channels } from './channels'

export const fetchChannels = async () =>
	new Promise((res) => setTimeout(() => res(channels), 400))
