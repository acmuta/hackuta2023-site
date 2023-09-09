import { notFound } from 'next/navigation'

import clientPromise from '@/lib/db'
import { Post } from '@/lib/db/models/Post'
import logger from '@/lib/logger'
import { createTemplateRenderContext } from '@/lib/utils/server'

import { isVisible } from '../constants'
import PostRenderer from './PostRenderer'

interface PageProps {
	params: { slug: string }
}

export default async function Post({ params: { slug } }: PageProps) {
	try {
		const client = await clientPromise
		const post = await client.db().collection<Post>('posts').findOne({ slug })
		const ctx = await createTemplateRenderContext()
		if (!(post?.contentSource && isVisible(post, ctx))) {
			return notFound()
		}

		return (
			<div className="pagePadding">
				<PostRenderer post={post} sourceType="contentSource" context={ctx} />
			</div>
		)
	} catch (e) {
		logger.error(e, `[/post/${slug}]`)
		throw e
	}
}
