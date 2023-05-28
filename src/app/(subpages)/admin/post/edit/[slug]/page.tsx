import { notFound } from 'next/navigation'

import clientPromise from '@/lib/db'
import { Post } from '@/lib/db/models/Post'
import logger from '@/lib/logger'

import PostEditor from '../../PostEditor'

interface PageProps {
	params: { slug: string }
}

export default async function Post({ params: { slug } }: PageProps) {
	try {
		const client = await clientPromise
		const post = await client
			.db()
			.collection<Post>('posts')
			.findOne({ slug }, { projection: { _id: 0 } })
		if (!post) {
			return notFound()
		}

		return <PostEditor {...post} />
	} catch (e) {
		logger.error(e, `[/admin/post/edit/${slug}]`)
		throw e
	}
}
