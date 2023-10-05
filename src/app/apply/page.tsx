// export default async function Home() {
// 	const { user } = getEnhancedSession(headers())

// 	if (!user) {
// 		redirect('/api/auth/signin?callbackUrl=%2Fapply')
// 	} else if (user.application) {
// 		redirect('/dashboard')
// 	}

// 	return <ApplicationForm />
// }
function ApplicationClosedMessage() {
	return (
		<div>
			<p>
				Thank you for your interest in joining us at HackUTA 2023.
				Unfortunately, we&apos;ve hit our registration capacity and can no
				longer accept applications.
			</p>
			<p>
				We will have <strong>walk-in registrations</strong>{' '}
				starting at 11:00am on Saturday, October 7th as space becomes
				available.
			</p>
		</div>
	)
}

export default ApplicationClosedMessage
