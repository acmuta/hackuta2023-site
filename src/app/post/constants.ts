import { Post } from '@/lib/db/models/Post'
import { RenderContext } from '@/lib/utils/server'

/**
 * SECURITY: eval unsanitized user input.
 *
 * To exploit requires gaining access to either admin panel or the database.
 * If either happens HackUTA is fucked anyways, so might as well give them full remote
 * code execution access as a bonus. Good job breachers!
 */
export function isVisible(post: Post, ctx: RenderContext): boolean {
	return new Function(
		`const it = arguments[0];
		try {
			return !!(${post.visibleCondition})
		} catch (_ignored) {
			return false
		}
	`,
	)(ctx)
}
