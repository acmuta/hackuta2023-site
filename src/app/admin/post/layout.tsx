export default async function PostLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<h1>Posts</h1>
			{children}
		</>
	)
}
