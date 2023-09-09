import { NextResponse } from 'next/server'

import { isVisible } from '@/app/post/constants'
import jsend from '@/lib/api/jsend'
import clientPromise from '@/lib/db'
import { Post } from '@/lib/db/models/Post'
import { createTemplateRenderContext, RenderContext } from '@/lib/utils/server'

export const dynamic = 'force-dynamic'

export interface DashboardInfoResponse {
	ctx: RenderContext
	posts: Post[]
}

export async function GET() {
	try {
		const client = await clientPromise
		const posts = await client
			.db()
			.collection<Post>('posts')
			.find(
				{
					briefSource: { $exists: true, $ne: '' },
				},
				{ sort: { priority: 'ascending' } },
			)
			.toArray()
		const ctx = await createTemplateRenderContext()
		const visiblePosts = posts.filter((p) => isVisible(p, ctx))
		return NextResponse.json(
			jsend.success<DashboardInfoResponse>({
				ctx,
				posts: visiblePosts,
			}),
		)
	} catch (e) {
		return NextResponse.json(jsend.error(e), {
			status: 500,
		})
	}
}
