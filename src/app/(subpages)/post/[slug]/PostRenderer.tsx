import doT from 'dot'
import { ObjectId } from 'mongodb'
import { headers } from 'next/headers'

import { MarkDownRenderer } from '@/app/(subpages)/admin/post/MarkDownRenderer'
import clientPromise from '@/lib/db'
import Account from '@/lib/db/models/Account'
import { Post } from '@/lib/db/models/Post'
import { getEnhancedSession } from '@/lib/utils/server'

import { doTSettings, RenderContext } from './constants'

interface PostRendererProps {
	post: Post
	sourceType: 'briefSource' | 'contentSource'
}

export default async function PostRenderer({
	post,
	sourceType,
}: PostRendererProps) {
	const template = post[sourceType] ?? ''
	const renderer = doT.template(template, doTSettings)
	const context = await createRenderContext()
	const markdown = renderer(context)

	return <MarkDownRenderer>{markdown}</MarkDownRenderer>
}

async function createRenderContext(): Promise<RenderContext> {
	const { user } = getEnhancedSession(headers())

	const client = await clientPromise
	const discordAccount = user
		? await client
				.db()
				.collection<Account>('accounts')
				.findOne({
					provider: 'discord',
					userId: new ObjectId(user._id),
				})
		: null

	return {
		user,
		linkedDiscordAccount: !!discordAccount,
	}
}
