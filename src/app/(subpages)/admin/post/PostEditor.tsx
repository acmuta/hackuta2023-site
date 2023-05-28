'use client'

import { useState } from 'react'

import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { Dropdown, TextInput } from '@/components/Form'
import { Checkbox } from '@/components/Form/Checkbox'
import { CardStyleSchema, Post } from '@/lib/db/models/Post'
import { zodEnumToOptions } from '@/lib/utils/shared'

import { MarkDownEditor } from './MarkDownEditor'
import { NameSlugInput } from './NameSlugInput'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PostEditorProps extends Partial<Post> {}

export default function PostEditor({
	briefSource: initialBriefSource,
	contentSource: initialContentSource,
	hidden,
	name,
	priority,
	slug,
	cardStyle,
}: PostEditorProps) {
	const isEditing = !!slug
	// The internal states are used on <TextInput>'s to make sure hydration works.
	// We will then synchronize the persisted states backed by the local storage on client side.
	const [briefSource, setBriefSource] = useState(initialBriefSource)
	const [contentSource, setContentSource] = useState(initialContentSource)

	const submit = () => {
		if (!isEditing) {
			setTimeout(() => {
				// Clear local storage of the sources on submission.
				setBriefSource('')
				setContentSource('')
			}, 1)
		}
	}

	const cardStyleOptions = zodEnumToOptions(CardStyleSchema)

	return (
		<Box
			as="form"
			direction="column"
			action="/admin/post/submit"
			method="POST"
			gap="1.5rem"
			onSubmit={submit}
		>
			<Box direction="row" alignItems="start" wrap="wrap" gap="1rem">
				<NameSlugInput name={name} slug={slug} readOnly={isEditing} />
				<TextInput
					id="priority"
					text="Priority"
					description="Lower number, higher priority."
					defaultValue={priority ?? 10}
					required
					pattern="\d+"
				/>
				<Checkbox id="hidden" text="Hide the Post" defaultChecked={hidden} />
			</Box>
			<Box direction="row" alignItems="start" wrap="wrap" gap="1rem">
				<Dropdown
					id="cardStyle"
					text="Card Style"
					description="Change look of the Dashboard card"
					options={cardStyleOptions}
					selectProps={{
						defaultValue: cardStyle
							? cardStyleOptions.find((o) => o.value === cardStyle)
							: undefined,
					}}
					isClearable
				/>
			</Box>
			<MarkDownEditor
				label="Brief"
				formInputId="brief"
				description="(Optional) If provided, a card with the brief will be added to Dashboard. MarkDown with doT template is available."
				source={briefSource}
				onSourceChange={(newValue) => setBriefSource(newValue)}
				height="16rem"
			/>
			<MarkDownEditor
				label="Content"
				formInputId="content"
				description="(Optional) If provided, a subpage with the content will be created. MarkDown with doT template is available."
				source={contentSource}
				onSourceChange={(newValue) => setContentSource(newValue)}
			/>
			<Box direction="row">
				<Button type="submit">{isEditing ? 'Update' : 'Post'}</Button>
			</Box>
		</Box>
	)
}
