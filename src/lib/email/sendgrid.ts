import mail from '@sendgrid/mail'

import { SendEmailOptions } from './types'

const { SENDGRID_API_KEY: apiKey } = process.env

if (!apiKey) {
	throw new Error('Invalid/Missing environment variable: "SENDGRID_API_KEY"')
}

mail.setApiKey(apiKey)

// logger.info('[email] backend: SendGrid')

export default async function sendEmail(opts: SendEmailOptions) {
	return mail.send({
		from: {
			email: opts.fromEmail,
			name: opts.fromName || undefined,
		},
		replyTo: opts.replyToEmail
			? {
					email: opts.replyToEmail,
					name: opts.replyToName || undefined,
			  }
			: undefined,

		to: opts.mail.to,
		cc: opts.mail.cc,
		bcc: opts.mail.bcc,

		subject: opts.mail.subject,
		text: opts.mail.text,
		html: opts.mail.html,

		attachments: opts.mail.attachments,
	})
}
