import mailchimp, {
	MessageAttachment,
	MessageRecipient,
	MessagesMessage,
} from '@mailchimp/mailchimp_transactional'

import { SendEmailOptions } from './types'

const { MAILCHIMP_TRANSACTIONAL_API_KEY: apiKey } = process.env

if (!apiKey) {
	throw new Error(
		'Invalid/Missing environment variable: "MAILCHIMP_TRANSACTIONAL_API_KEY"',
	)
}

const client = mailchimp(apiKey)

// logger.info('[email] backend: MailChimp')

export default async function sendEmail(opts: SendEmailOptions) {
	const messageAttachments =
		opts.mail.attachments?.map((attachment) => {
			const res: MessageAttachment = {
				content: attachment.content,
				name: attachment.filename,
				type: attachment.type,
			}
			return res
		}) ?? []

	const to =
		opts.mail.to?.map((recipient) => {
			const res: MessageRecipient = {
				email: recipient.email,
				name: recipient.name,
				type: 'to',
			}
			return res
		}) ?? []

	const cc =
		opts.mail.cc?.map((recipient) => {
			const res: MessageRecipient = {
				email: recipient.email,
				name: recipient.name,
				type: 'cc',
			}
			return res
		}) ?? []

	const bcc =
		opts.mail.bcc?.map((recipient) => {
			const res: MessageRecipient = {
				email: recipient.email,
				name: recipient.name,
				type: 'bcc',
			}
			return res
		}) ?? []

	const messageRecipients = [...to, ...cc, ...bcc]

	const message: MessagesMessage = {
		from_email: opts.fromEmail,
		from_name: opts.fromName || undefined,

		to: messageRecipients,

		subject: opts.mail.subject,
		text: opts.mail.text,
		html: opts.mail.html,

		attachments: messageAttachments,
	}

	return client.messages.send({
		message,
	})
}
