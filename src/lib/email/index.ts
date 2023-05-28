import '@/node-only'

import { isDevelopment } from '@/lib/utils/server'

import { EmailData, SendEmailOptions } from './types'

const {
	MAILCHIMP_TRANSACTIONAL_API_KEY: mcApiKey,
	SENDGRID_API_KEY: sgApiKey,
	TRANSACTIONAL_FROM_EMAIL: fromEmail,
	TRANSACTIONAL_FROM_NAME: fromName,
	TRANSACTIONAL_REPLY_TO_EMAIL: replyToEmail,
	TRANSACTIONAL_REPLY_TO_NAME: replyToName,
} = process.env

if (!fromEmail) {
	throw new Error(
		'Invalid/Missing environment variable: "TRANSACTIONAL_FROM_EMAIL"',
	)
}

let client: Promise<{
	default: (options: SendEmailOptions) => Promise<unknown>
}>
if (mcApiKey) {
	client = import('./mailchimp')
} else if (sgApiKey) {
	client = import('./sendgrid')
} else {
	client = import('./smtp')
}

export default async function sendEmail(data: EmailData) {
	const subject = isDevelopment()
		? `[TEST] [NOT PROD] ${data.subject}`
		: data.subject

	return (await client).default({
		mail: {
			...data,
			subject,
		},
		fromEmail: fromEmail!,
		fromName: fromName,
		replyToEmail: replyToEmail,
		replyToName: replyToName,
	})
}
