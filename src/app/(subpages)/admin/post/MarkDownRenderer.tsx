'use client'

import { Remark } from 'react-remark'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

import styles from './MarkDownRenderer.module.css'

export interface MarkDownRendererProps {
	children: string
}

export function MarkDownRenderer({ children }: MarkDownRendererProps) {
	return (
		<div className={styles.renderer}>
			<Remark
				remarkPlugins={[remarkGfm]}
				remarkToRehypeOptions={{ allowDangerousHtml: true }}
				rehypePlugins={[rehypeRaw, rehypeSanitize]}
			>
				{children}
			</Remark>
		</div>
	)
}
