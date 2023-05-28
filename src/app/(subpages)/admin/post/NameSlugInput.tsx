'use client'

import { useState } from 'react'

import { Box } from '@/components/Box'
import { TextInput } from '@/components/Form'
import { PostSlugPattern } from '@/lib/db/models/Post'

export interface NameSlugInputProps {
	name?: string
	slug?: string
	readOnly?: boolean
}

export function NameSlugInput({
	name,
	readOnly,
	slug: initialSlug,
}: NameSlugInputProps) {
	const [slug, setSlug] = useState(initialSlug)
	const [isSlugManuallySet, setIsSlugManuallySet] = useState(false)

	return (
		<Box direction="row" wrap="wrap" gap="1rem">
			<TextInput
				id="name"
				text="Name"
				description="A human-readable name"
				defaultValue={name}
				onChange={(e) => {
					if (isSlugManuallySet) {
						return
					}

					const newValue = (e.target as HTMLInputElement).value
					setSlug(
						newValue
							.toLowerCase()
							.replace(/\s+/g, '-')
							.replace(/[^a-z0-9-]/g, ''),
					)
				}}
				readOnly={readOnly}
				required
				minLength={1}
			/>
			<TextInput
				id="slug"
				text="URL Slug"
				description={`Must match ${PostSlugPattern.toString()}.`}
				value={slug}
				onChange={(e) => setSlug((e.target as HTMLInputElement).value)}
				onKeyDown={() => setIsSlugManuallySet(true)}
				readOnly={readOnly}
				spellCheck={false}
				required
				minLength={1}
				pattern={PostSlugPattern.toString().slice(1, -1)}
			/>
		</Box>
	)
}
