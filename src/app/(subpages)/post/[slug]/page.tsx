import { notFound } from 'next/navigation'

import clientPromise from '@/lib/db'
import { Post } from '@/lib/db/models/Post'
import logger from '@/lib/logger'

import PostRenderer from './PostRenderer'

interface PageProps {
	params: { slug: string }
}

export default async function Post({ params: { slug } }: PageProps) {
	try {
		const client = await clientPromise
		const post = await client.db().collection<Post>('posts').findOne({ slug })
		if (!post?.contentSource || post.hidden) {
			return notFound()
		}

		return (
			<div className="pagePadding">
				{/* @ts-expect-error Async React Server Component */}
				<PostRenderer post={post} sourceType="contentSource" />
			</div>
		)
	} catch (e) {
		logger.error(e, `[/post/${slug}]`)
		throw e
	}
}
