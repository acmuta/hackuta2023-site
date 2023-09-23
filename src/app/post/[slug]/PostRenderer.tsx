'use client'

import { MarkDownRenderer } from '@/app/admin/post/MarkDownRenderer'
import { Post } from '@/lib/db/models/Post'
import { RenderContext, renderTemplate } from '@/lib/utils/shared'

interface PostRendererProps {
	context: RenderContext
	post: Post
	sourceType: 'briefSource' | 'contentSource'
}

export default function PostRenderer({
	context,
	post,
	sourceType,
}: PostRendererProps) {
	const markdown = renderTemplate(post[sourceType], context)

	return <MarkDownRenderer>{markdown}</MarkDownRenderer>
}
