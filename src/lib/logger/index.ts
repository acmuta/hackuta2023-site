import pino from 'pino'

import DiscordWebhookStream from './DiscordWebhookDestination'

const { LOGGER_DISCORD_WEBHOOK: webhookUrl } = process.env

const streams = [
	// STDOUT
	pino.destination(1),
	...(webhookUrl ? [new DiscordWebhookStream(webhookUrl)] : []),
]

const logger = pino({}, pino.multistream(streams))

export default logger
