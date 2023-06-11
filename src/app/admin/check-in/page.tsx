'use client'

import { useState } from 'react'
import useSWR from 'swr'

import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { TextInput } from '@/components/Form'
import { JsonUser } from '@/lib/db/models/User'
import { jsonFetcher } from '@/lib/utils/client'

import { Stats } from './(backend)/stats/route'

export default function CheckIn() {
	const { numAccepted, numCheckedIn } = useStats()
	const [loadCounter, setLoadCounter] = useState(0)
	const [pinStr, setPinStr] = useState('')
	const [users, setUsers] = useState<readonly JsonUser[]>([])

	return (
		<Box direction="column" gap="1rem">
			<span>
				Accepted: {numAccepted ?? 'N/A'}; Checked-In: {numCheckedIn ?? 'N/A'}
			</span>
			<Box direction="row">
				<TextInput
					text="Check-In PIN"
					id="pin"
					required
					value={pinStr}
					onChange={async (e) => {
						const newPinStr = (e.target as HTMLInputElement).value.replace(
							/[^0-9]/g,
							'',
						)
						if (pinStr !== newPinStr) {
							setPinStr(newPinStr)
							setLoadCounter(loadCounter + 1)
							try {
								setUsers(
									await (
										await fetch(`/admin/check-in/users?pin=${newPinStr}`)
									).json(),
								)
							} catch (e) {
								console.error('[users]', e)
							} finally {
								setLoadCounter(loadCounter - 1)
							}
						}
					}}
				/>
			</Box>
			{loadCounter > 0 ? 'Loading...' : undefined}
			{...users.map((user) => (
				<div key={user._id}>
					{user.application?.firstName} {user.application?.lastName}{' '}
					<Button
						onClick={async () => {
							setLoadCounter(loadCounter + 1)
							try {
								await fetch(`/admin/check-in/submit?uid=${user._id}`, {
									method: 'POST',
								})
							} catch (e) {
								console.error('[submit]', e)
							} finally {
								setLoadCounter(loadCounter - 1)
							}
							setLoadCounter(loadCounter - 1)
							setPinStr('')
							setUsers([])
						}}
					>
						Check In
					</Button>
				</div>
			))}
		</Box>
	)
}

function useStats() {
	const { data, error, isLoading } = useSWR<Stats>(
		'/admin/check-in/stats',
		jsonFetcher,
		{
			refreshInterval: 10_000,
		},
	)
	return {
		...data,
		isError: !!error,
		isLoading,
	}
}
