'use client'

import useSWR from 'swr'

import { JSend, JSendError } from '@/lib/api/jsend'
import { jsonFetcher, stringifyError } from '@/lib/utils/client'

import PostRenderer from '../post/[slug]/PostRenderer'
import Card from './Card'
import { DashboardInfoResponse } from './info/route'

export default function Cards() {
	const { data, error, isLoading } = useSWR<JSend<DashboardInfoResponse>>(
		'/dashboard/info',
		jsonFetcher,
		{
			refreshInterval: 30_000,
		},
	)

	if (isLoading) {
		return <div>Loading...</div>
	} else if (error || data?.status !== 'success') {
		return (
			<div>
				Error:{' '}
				{error ? stringifyError(error) : (data as JSendError)?.message}
			</div>
		)
	}
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{data.data.posts.map((post) => (
				<Card
					key={post.slug}
					cardStyle={post.cardStyle}
					href={post.contentSource ? `/post/${post.slug}` : undefined}
				>
					<PostRenderer
						post={post}
						sourceType="briefSource"
						context={data.data.ctx}
					/>
				</Card>
			)) ?? 'Loading...'}
		</div>
	)
}
