import fetch from 'node-fetch'
import { Writable } from 'stream'

export default class DiscordWebhookStream extends Writable {
	constructor(private readonly webhookUrl: string) {
		super({
			objectMode: true,
		})
	}

	async _write(
		chunk: any,
		encoding: BufferEncoding,
		callback: (error?: Error | null) => void,
	) {
		const data = chunk.toString()
		try {
			await fetch(this.webhookUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					content: `\`\`\`json\n${data.slice(0, 1980)}\n\`\`\``,
				}),
			})
			callback()
		} catch (e) {
			callback(e as Error)
		}
	}
}
