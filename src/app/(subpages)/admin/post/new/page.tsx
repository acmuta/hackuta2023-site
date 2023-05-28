import { Box } from '@/components/Box'

import PostEditor from '../PostEditor'

export default function NewPost() {
	return (
		<Box direction="column" gap="0.5rem">
			<h2>New Post</h2>
			<PostEditor />
		</Box>
	)
}
