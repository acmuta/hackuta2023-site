import { NextResponse } from 'next/server'

import clientPromise from '@/lib/db'
import { Post, PostSchema } from '@/lib/db/models/Post'
import logger from '@/lib/logger'
import { siteUrl } from '@/lib/utils/server'

export async function POST(request: Request) {
	try {
		// Convert form data to regular object.
		const formData = await request.formData()
		const bodyObj: Record<string, any> = Object.fromEntries(formData)
		if ('priority' in bodyObj) {
			bodyObj.priority = parseInt(bodyObj.priority)
		}
		bodyObj.briefSource = bodyObj.brief
		bodyObj.contentSource = bodyObj.content
		const post = PostSchema.parse(bodyObj)

		// Save post to DB.
		const client = await clientPromise
		await client
			.db()
			.collection<Post>('posts')
			.replaceOne({ slug: post.slug }, post, { upsert: true })

		return NextResponse.redirect(`${siteUrl}/admin/post`, 303)
	} catch (e) {
		logger.error(e, '[/admin/post/submit]')
		return NextResponse.redirect(`${siteUrl}/admin/post?error=1`, 303)
	}
}
