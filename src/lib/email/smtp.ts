import nodemailer from 'nodemailer'
import type NodeMailer from 'nodemailer/lib/mailer'

import { EmailAddressee, EmailAttachment, SendEmailOptions } from './types'

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env
const host = SMTP_HOST ?? 'localhost'
const port = parseInt(SMTP_PORT ?? '25')
const secure = SMTP_SECURE === 'true'

const transport = nodemailer.createTransport({
	host,
	port,
	secure,
	...(SMTP_USER || SMTP_PASS
		? { auth: { user: SMTP_USER, pass: SMTP_PASS } }
		: {}),
	tls: {
		// Accept self-signed certificate.
		rejectUnauthorized: false,
	},
})

// logger.info(`[email] backend: SMTP ${host}:${port} (secure: ${secure})`)

export default async function sendEmail(opts: SendEmailOptions) {
	const addresseeConverter = (
		addressee: EmailAddressee,
	): string | NodeMailer.Address =>
		addressee.name
			? { address: addressee.email, name: addressee.name }
			: addressee.email
	const attachmentConverter = (
		attachment: EmailAttachment,
	): NodeMailer.Attachment => ({
		content: attachment.content,
		contentDisposition: attachment.disposition,
		contentType: attachment.type,
		encoding: 'base64',
		filename: attachment.filename,
	})

	return transport.sendMail({
		from: opts.fromName
			? { address: opts.fromEmail, name: opts.fromName }
			: opts.fromEmail,

		replyTo: opts.replyToEmail
			? opts.replyToName
				? { address: opts.replyToEmail, name: opts.replyToName }
				: opts.replyToEmail
			: undefined,

		to: opts.mail.to?.map(addresseeConverter),
		cc: opts.mail.cc?.map(addresseeConverter),
		bcc: opts.mail.bcc?.map(addresseeConverter),

		subject: opts.mail.subject,
		text: opts.mail.text,
		html: opts.mail.html,

		attachments: opts.mail.attachments?.map(attachmentConverter),
	})
}
