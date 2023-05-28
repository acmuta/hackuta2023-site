'use client'

import { FormEvent, useState } from 'react'
import type { MultiValue } from 'react-select'

import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { Dropdown, Option, TextInput } from '@/components/Form'
import { fetchPost } from '@/lib/utils/client'

import { PostBodySchema, RecipientFilters } from './constants'
import styles from './Marketing.module.css'

interface Props {
	allEmails: string[]
}

export default function Form({ allEmails }: Props) {
	const [recipients, setRecipients] = useState<readonly Option[]>([])
	const [subject, setSubject] = useState('')
	const [tag, setTag] = useState('')
	const [bodyText, setBodyText] = useState('')
	const [bodyHtml, setBodyHtml] = useState('')

	const onSubmit = async (e: FormEvent) => {
		try {
			e.preventDefault()

			const body = PostBodySchema.parse({
				recipients: recipients.map((option) => option.value),
				subject: subject,
				tag: tag,
				text: bodyText,
				html: bodyHtml,
			})
			const confirmed = confirm(
				'Confirm to send? This might take a while if there are many recipients.',
			)
			if (!confirmed) {
				alert('Action cancelled!')
				return
			}
			await fetchPost<unknown>('/admin/marketing/send', JSON.stringify(body))
		} catch (e) {
			console.error(e)
			alert(e)
		}
	}

	return (
		<Box
			as="form"
			direction="column"
			gap=".75rem"
			method="post"
			onSubmit={onSubmit}
		>
			<Dropdown
				id="recipients"
				text="Recipients"
				options={[
					...Object.entries(RecipientFilters).map(([name, filter]) => ({
						label: `Filter: ${name}`,
						value: JSON.stringify(filter),
					})),
					...allEmails.map((e) => ({ label: e, value: e })),
				]}
				selectProps={{
					required: true,
					value: recipients,
					onChange: (newValue) => setRecipients(newValue as MultiValue<Option>),
				}}
				isMulti
			/>
			<TextInput
				id="tag"
				text="Email Tag"
				description="An arbitrary string that tags a batch of emails as part of the same campaign. When using filter-based recipients, users who've already received emails with the same tag as the current email will not receive the email again."
				required
				minLength={1}
				value={tag}
				onChange={(e) => setTag((e.target as HTMLInputElement).value)}
			/>
			<TextInput
				id="subject"
				text="Subject"
				required
				minLength={1}
				value={subject}
				onChange={(e) => setSubject((e.target as HTMLInputElement).value)}
			/>
			<Box direction="row" gap="2rem" style={{ maxWidth: '100%' }}>
				<TextInput
					id="text"
					text="Body (plain text)"
					isMultiline
					style={{ minHeight: '15rem' }}
					boxProps={{
						style: { width: '100%' },
					}}
					value={bodyText}
					onChange={(e) => setBodyText((e.target as HTMLTextAreaElement).value)}
				/>
				<TextInput
					id="html"
					text="Body (HTML)"
					isMultiline
					style={{ minHeight: '15rem', fontFamily: 'monospace' }}
					boxProps={{
						style: { width: '100%' },
					}}
					value={bodyHtml}
					onChange={(e) => setBodyHtml((e.target as HTMLTextAreaElement).value)}
				/>
			</Box>
			<Button className={styles.submitButton} type="submit">
				Send
			</Button>
		</Box>
	)
}
