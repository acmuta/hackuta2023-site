import { getEvents } from '@/components/Schedule/getEvents'

import JsonEditor from '../JsonEditor'

export default async function Events() {
	const events = await getEvents()
	return (
		<>
			<h2 className="text-3xl drop-shadow-hackuta">Event Schedule</h2>
			{events
				? (
					<JsonEditor
						text={JSON.stringify(
							events.map((e) => ({ ...e, _id: undefined })),
							undefined,
							4,
						)}
						postUrl="/api/admin/schedule"
						schema="event"
					/>
				)
				: (
					'Error.'
				)}
		</>
	)
}
