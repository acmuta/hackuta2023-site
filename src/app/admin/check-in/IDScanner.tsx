import { FormEvent, useEffect, useState } from 'react'
import { QrReader } from 'react-qr-reader'
import useSWR from 'swr'

import { Button } from '@/components/Button'
import { TextInput } from '@/components/Form'
import { JsonUser } from '@/lib/db/models/User'
import { jsonFetcher } from '@/lib/utils/client'

export interface IDScannerProps {
	onSubmit?: (params: { checkInPin?: string; hexId?: string }) => void
}

const IDScanner: React.FC<IDScannerProps> = ({ onSubmit }) => {
	const [hexIdValue, setHexIdValue] = useState<string>('')
	const [checkInPinValue, setCheckInPinValue] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [userData, setUserData] = useState<any>(null)
	const [isFormValid, setIsFormValid] = useState<boolean>(false)
	const { data: stats } = useSWR('/admin/check-in/stats', jsonFetcher)

	const handleScan = (data: any) => {
		setErrorMessage('')
		if (data && data.text) {
			const hexMatch = data.text.match(/hackuta2023:[0-9a-f]{3}/i)
			const pinMatch = data.text.match(/^\d{4,6}$/)
			if (hexMatch) {
				const id = hexMatch[0].slice('hackuta2023:'.length)
				setHexIdValue(id)
			} else if (pinMatch) {
				setCheckInPinValue(pinMatch[0])
			} else {
				setErrorMessage(
					'Scanned QR code is not a valid HackUTA ID hex or 6-digit PIN.',
				)
			}
		}
	}

	const assignGroupName = (hexId: string): string => {
		const firstLetter = hexId.charAt(0).toUpperCase()

		switch (firstLetter) {
			case 'A':
				return 'Alpha Group'
			case 'B':
				return 'Bravo Group'
			case 'C':
				return 'Charlie Group'
			case 'D':
				return 'Delta Group'
			default:
				return 'Unknown Group' // Handle other cases if needed
		}
	}

	useEffect(() => {
		setIsFormValid(isValidHexID(hexIdValue) && isValidPin(checkInPinValue))
	}, [hexIdValue, checkInPinValue])

	const isValidHexID = (id: string) =>
		id.length === 3 && !!id.match(/[0-9a-f]{3}/i)
	const isValidPin = (pin: string) =>
		pin.length === 6 && !!pin.match(/^\d{6}$/)

	const handleVerifyInput = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const response = await fetch(
			`/admin/check-in/users?pin=${checkInPinValue}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			},
		)
		const data: JsonUser[] = await response.json()
		if (data.length === 0) {
			alert('No user found with the provided check-in PIN.')
			clearInputs()
		} else if (data[0].checkedIn) {
			alert(
				`The user has already checked in with the hexID ${data[0].hexId}`,
			)
			clearInputs()
		} else {
			setUserData({
				firstName: data[0].application?.firstName ?? 'undefined',
				lastName: data[0].application?.lastName ?? 'undefined', // Fixed typo here
				fullName: `${data[0].application?.firstName ?? 'undefined'} ${
					data[0].application?.lastName ?? 'undefined'
				}`, // Added this line
				school: data[0].application?.school ?? 'undefined',
				age: data[0].application?.age ?? NaN,
				group: assignGroupName(hexIdValue), // <--- Assign the group name here
			})
		}
	}

	const clearInputs = () => {
		setHexIdValue('') // clear HexID input
		setCheckInPinValue('') // clear PIN input
	}

	const handleConfirmCheckin = () => {
		onSubmit?.({ checkInPin: checkInPinValue, hexId: hexIdValue })
		clearInputs()
		setUserData(null) // clear user data
	}

	const backToForm = () => setUserData(null)

	return (
		<div
			style={{
				maxWidth: '600px',
				margin: 'auto',
				padding: '16px',
				border: '2px dashed black',
			}}
		>
			<div
				style={{
					textAlign: 'center',
					marginBottom: '16px',
					fontWeight: 'bold',
				}}
			>
				Checked in: {stats
					? `${stats.numCheckedIn} out of ${stats.numAccepted} accepted`
					: 'Loading...'}
			</div>

			{userData
				? (
					<div style={{ textAlign: 'left', fontSize: '1.2rem' }}>
						<p>
							<strong>Full Name:</strong> {userData.fullName}
						</p>
						<p>
							<strong>University:</strong> {userData.school}
						</p>
						<p>
							<strong>Age:</strong> {userData.age}
						</p>
						<p>
							<strong>Group:</strong> {userData.group}{' '}
							{/* <-- Display the group name here */}
						</p>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								gap: '16px',
								marginTop: '20px',
							}}
						>
							<Button onClick={backToForm}>Back</Button>
							<Button onClick={handleConfirmCheckin}>Submit</Button>
						</div>
					</div>
				)
				: (
					<form onSubmit={handleVerifyInput}>
						<QrReader
							// @ts-expect-error whatever man.
							delay={300}
							onError={() => setErrorMessage('Error scanning QR code')}
							onResult={handleScan}
							style={{
								maxWidth: '85%',
								borderRadius: '8px',
								margin: 'auto',
								boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
							}}
						/>
						<div style={{ marginTop: '10px' }}>
							<TextInput
								type="text"
								placeholder="Physical ID"
								value={hexIdValue}
								onChange={(e) =>
									setHexIdValue((e.target as HTMLInputElement).value)}
							/>
						</div>
						<div style={{ marginTop: '10px' }}>
							<TextInput
								type="text"
								placeholder="Digital ID"
								value={checkInPinValue}
								errors={[errorMessage]}
								onChange={(e) =>
									setCheckInPinValue(
										(e.target as HTMLInputElement).value,
									)}
							/>
						</div>
						<div
							style={{
								marginTop: '20px',
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<Button type="submit" disabled={!isFormValid}>
								Verify
							</Button>
						</div>
					</form>
				)}
		</div>
	)
}

export default IDScanner
