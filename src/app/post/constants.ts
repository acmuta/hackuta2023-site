import { Post } from '@/lib/db/models/Post'
import { RenderContext } from '@/lib/utils/server'
import { renderTemplate } from '@/lib/utils/shared'

export function isVisible(post: Post, ctx: RenderContext) {
	const result = renderTemplate(post.visibleCondition, ctx)
	return result.match(/^\s*true\s*$/)
}
