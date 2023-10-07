'use client'

import { useState } from 'react'
import { ZodTypeAny } from 'zod'
import { fromZodError } from 'zod-validation-error'

import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { BlockedHackerSchema } from '@/lib/db/models/BlockedHacker'
import { EventSchema } from '@/lib/db/models/Event'
import { ShopSwapSchema } from '@/lib/db/models/ShopSwap'
import { fetchPost, stringifyError } from '@/lib/utils/client'

interface Props {
	text: string
	postUrl: string
	schema: SchemaName
}

type SchemaName = 'blocked_hacker' | 'event' | 'shop'

const SchemaMap: Record<SchemaName, ZodTypeAny> = {
	blocked_hacker: BlockedHackerSchema,
	event: EventSchema,
	shop: ShopSwapSchema,
}

export default function JsonEditor({ text, postUrl, schema }: Props) {
	const [textVal, setTextVal] = useState(text)
	const [error, setError] = useState<string>()

	const save = async () => {
		try {
			const isValid = validate()
			if (isValid) {
				await fetchPost<unknown>(postUrl, textVal)
			}
		} catch (e) {
			setError(stringifyError(e))
		}
	}

	const validate = () => {
		try {
			const obj = JSON.parse(textVal)
			setTextVal(JSON.stringify(obj, undefined, 4))

			const result = SchemaMap[schema].array().safeParse(obj)
			if (result.success) {
				setError(undefined)
				return true
			} else {
				setError(fromZodError(result.error).message)
			}
		} catch (e) {
			setError(stringifyError(e))
		}
		return false
	}

	return (
		<Box direction="column" gap="1rem">
			<span className="text-hackuta-red">{error}</span>
			<textarea
				title="idk"
				id="json"
				rows={16}
				cols={80}
				value={textVal}
				onChange={(e) => setTextVal(e.target.value)}
			/>
			<Box direction="row" gap="1rem">
				<Button onClick={save}>Save</Button>
				<Button kind="secondary" onClick={validate}>
					Validate
				</Button>
			</Box>
		</Box>
	)
}
