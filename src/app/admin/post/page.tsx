import Link from 'next/link'

import { Box } from '@/components/Box'
import clientPromise from '@/lib/db'
import { Post } from '@/lib/db/models/Post'
import logger from '@/lib/logger'

export default async function Post() {
	try {
		const client = await clientPromise
		const posts = await client
			.db()
			.collection<Post>('posts')
			.find({}, { sort: { priority: 'ascending' } })
			.toArray()
		return (
			<Box direction="column">
				<Link href="/admin/post/new">Create a new post</Link>
				{posts.length ? (
					<table className="borderTable" style={{ maxWidth: '48rem' }}>
						<tbody>
							<tr>
								<th>Name</th>
								<th>Display Type</th>
								<th>Priority</th>
								<th>Visible</th>
								<th>Actions</th>
							</tr>
							{...posts.map(
								({
									name,
									slug,
									hidden,
									priority,
									briefSource,
									contentSource,
								}) => (
									<tr key={slug}>
										<td>{name}</td>
										<td>
											{briefSource
												? contentSource
													? 'card + page'
													: 'card'
												: contentSource
												? 'page'
												: 'empty'}
										</td>
										<td>{priority}</td>
										<td
											style={{
												color: hidden
													? 'var(--color-red)'
													: 'var(--color-green)',
											}}
										>
											{(!hidden).toString()}
										</td>
										<td>
											<Box direction="row" gap="0.75rem">
												<Link href={`/admin/post/edit/${slug}`}>Edit</Link>
												{!hidden && contentSource ? (
													<Link href={`/post/${slug}`}>View Page</Link>
												) : undefined}
											</Box>
										</td>
									</tr>
								),
							)}
						</tbody>
					</table>
				) : undefined}
			</Box>
		)
	} catch (e) {
		logger.error(e, '[/admin/post]')
		throw e
	}
}
