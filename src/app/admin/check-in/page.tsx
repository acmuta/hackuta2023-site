'use client'

import { stringifyError } from '@/lib/utils/client'

import IDScanner from './IDScanner'

export default function CheckIn() {
	return (
		<IDScanner
			onSubmit={async ({ checkInPin, hexId, id, eventName }) => {
				try {
					const response = await fetch(
						`/admin/check-in/link?checkInPin=${checkInPin}&hexId=${hexId}&eventName=${eventName}&id=${id}`,
						{
							method: 'POST',
							headers: {
								Accept: 'application/json',
							},
						},
					)
					const data = await response.json()
					if (data.status !== 'success') {
						throw new Error(data.message)
					}
				} catch (e) {
					alert(stringifyError(e))
				}
			}}
		/>
	)
}
