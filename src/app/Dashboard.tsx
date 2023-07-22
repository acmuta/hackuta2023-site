'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

import { Post } from '@/lib/db/models/Post'
import { JsonUser } from '@/lib/db/models/User'

import { Box } from '@/components/Box'
import { Header } from '@/components/Header'

import classNames from 'classnames'

import { EnhancedSession } from '@/lib/auth/shared'
import Card from './Card'
import styles from './page.module.css'
import PostRenderer from './post/[slug]/PostRenderer'
import SiteFooter from './SiteFooter'

function Dashboard() {
	const [posts, setPosts] = useState<Post[]>([])
	const [user, setUser] = useState<JsonUser | null>(null)

	useEffect(() => {
		// Fetch posts on component mount and every 30 seconds afterwards
		const fetchPosts = async () => {
			try {
				const response = await axios.get('/api/posts')
				setPosts(response.data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchPosts()
		const interval = setInterval(fetchPosts, 30000)

		// Cleanup interval on component unmount
		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		// Fetch user on component mount
		const fetchUser = async () => {
			try {
				const response: EnhancedSession = await axios.get(
					'/api/auth/enhanced-session',
				)
				setUser(response.user)
			} catch (error) {
				console.error(error)
			}
		}

		fetchUser()
	}, [])

	return (
		<Box as="main" direction="column" className={styles.main}>
			<Header
				items={[
					{ link: '/', name: 'Dashboard' },
					{ link: '/faq', name: 'FAQ' },
					{ link: '/schedule', name: 'Schedule' },
				]}
				endItems={[
					...(user?.roles?.includes('admin')
						? [{ link: '/admin', name: 'Admin' }]
						: []),
					{ link: '/api/auth/signout', name: 'Sign out' },
				]}
			/>
			<Box
				direction="column"
				className={classNames('pagePadding')}
				style={{ flex: 1 }}
				gap="1rem"
			>
				<h2>
					Hello, {user?.application?.firstName} {user?.application?.lastName}
				</h2>
				<Box
					direction="row"
					alignItems="start"
					wrap="wrap"
					className={classNames(styles.cardContainer)}
				>
					{posts.map((post) => (
						<Card
							key={post.slug}
							cardStyle={post.cardStyle}
							href={post.contentSource ? `/post/${post.slug}` : undefined}
						>
							{/* @ts-expect-error Async React Server Component */}
							<PostRenderer post={post} sourceType="briefSource" />
						</Card>
					))}
				</Box>
			</Box>
			<SiteFooter />
		</Box>
	)
}
export default Dashboard
