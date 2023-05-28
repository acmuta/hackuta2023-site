export interface EmailAddressee {
	name?: string
	email: string
}

export interface EmailAttachment {
	/**
	 * Base64 encoded content.
	 */
	content: string
	filename: string
	/**
	 * MIME type.
	 */
	type: string
	disposition?: 'attachment' | 'inline'
}

export interface EmailData {
	to?: EmailAddressee[]
	cc?: EmailAddressee[]
	bcc?: EmailAddressee[]

	subject: string
	text: string
	html: string

	attachments?: EmailAttachment[]
}

export interface SendEmailOptions {
	mail: EmailData
	fromEmail: string
	fromName?: string
	replyToEmail?: string
	replyToName?: string
}
