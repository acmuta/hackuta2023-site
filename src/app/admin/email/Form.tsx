'use client'

import { FormEvent, useState } from 'react'
import type { MultiValue } from 'react-select'

import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { Dropdown, Option, TextInput } from '@/components/Form'
import { fetchPost } from '@/lib/utils/client'

import { MarkDownEditor } from '../post/MarkDownEditor'
import { PostBodySchema, RecipientFilters } from './constants'

interface Props {
	allEmails: string[]
	existingTags: (string | undefined)[]
}

const AutoTagPrefix = 'auto-tag-'

export default function Form({ allEmails, existingTags }: Props) {
	const [recipients, setRecipients] = useState<readonly Option[]>([])
	const [subject, setSubject] = useState('')
	const [tag, setTag] = useState(AutoTagPrefix + new Date().toISOString())
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
			await fetchPost<unknown>('/admin/email/send', JSON.stringify(body))
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
					onChange: (newValue) =>
						setRecipients(newValue as MultiValue<Option>),
				}}
				isMulti
			/>
			<TextInput
				id="tag"
				text="Email Tag"
				description="When using filter-based recipients, users who've already received emails with the same tag as the current email will not receive the email again. For example, you may use the tag 'application-accepted' to send an email to all accepted hackers 7 days before the event. You can then send the same email with the same tag a few days later, in which case only newly accepted hackers will receive that email, and hackers who've already received it won't receive it again. You can use any strings as a tag here."
				required
				minLength={1}
				value={tag}
				onChange={(e) => setTag((e.target as HTMLInputElement).value)}
				suggestions={existingTags.filter(
					(t): t is string => !!t && !t.startsWith(AutoTagPrefix),
				)}
			/>
			<TextInput
				id="subject"
				text="Subject"
				required
				minLength={1}
				value={subject}
				onChange={(e) => setSubject((e.target as HTMLInputElement).value)}
			/>
			<MarkDownEditor
				formInputId="body"
				label="Body"
				height="15rem"
				source={bodyText}
				onSourceChange={setBodyText}
				onPreviewChange={setBodyHtml}
			/>
			<Button className={'self-start'} type="submit">
				Send
			</Button>
		</Box>
	)
}
