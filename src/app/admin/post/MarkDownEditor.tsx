'use client'

import { useEffect, useRef } from 'react'

import { Box } from '@/components/Box'
import { TextInput } from '@/components/Form'

import styles from './MarkDownEditor.module.css'
import { MarkDownRenderer } from './MarkDownRenderer'

export interface MarkDownEditorProps {
	formInputId: string
	label: string
	description?: string
	source?: string
	onSourceChange?: (newSource: string) => void
	onPreviewChange?: (newHtml: string) => void
	height?: string
}

export function MarkDownEditor({
	description,
	formInputId,
	height,
	label,
	onSourceChange,
	onPreviewChange,
	source,
}: MarkDownEditorProps) {
	return (
		<Box
			direction="row"
			gap="1rem"
			style={{ height: height ?? '36rem', maxHeight: '100vh' }}
		>
			<TextInput
				text={label}
				description={description}
				id={formInputId}
				isMultiline
				value={source}
				onChange={(e) =>
					onSourceChange?.((e.target as HTMLTextAreaElement).value)}
				spellCheck={false}
				style={{ flex: 1, fontFamily: 'monospace' }}
				boxProps={{ style: { flex: 1 } }}
			/>
			<Preview
				label={label}
				source={source}
				onPreviewChange={onPreviewChange}
			/>
		</Box>
	)
}

interface PreviewProps {
	label: string
	source: string | undefined
	onPreviewChange?: (newHtml: string) => void
}

function Preview({ label, source, onPreviewChange }: PreviewProps) {
	const ref = useRef<HTMLElement>(null)
	useEffect(() => {
		setInterval(() => {
			onPreviewChange?.(ref.current?.innerHTML ?? '')
		}, 1000)
	}, [onPreviewChange])
	return (
		<Box direction="column" className={styles.preview}>
			<span>{label} Preview</span>
			<article ref={ref}>
				{source ? <MarkDownRenderer>{source}</MarkDownRenderer> : undefined}
			</article>
		</Box>
	)
}
