'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useZxing } from 'react-zxing'
import useSWR from 'swr'

import { Button } from '@/components/Button'
import { TextInput } from '@/components/Form'
import { JsonUser } from '@/lib/db/models/User'
import { getGroupName, jsonFetcher } from '@/lib/utils/client'
import { twJoin } from 'tailwind-merge'

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
	const [cameraFacingMode, setCameraFacingMode] = useState<
		'user' | 'environment'
	>('environment')
	const [flashesCamera, setFlashesCamera] = useState<
		'no' | 'success' | 'error'
	>('no')

	const { ref: qrReaderRef } = useZxing({
		constraints: {
			video: {
				facingMode: { ideal: cameraFacingMode },
			},
		},
		timeBetweenDecodingAttempts: 1000,
		onDecodeResult: (res) => handleScan(res.getText()),
	})

	const toggleCamera = () => {
		setCameraFacingMode(
			(prev) => (prev === 'environment' ? 'user' : 'environment'),
		)

		// Clear any existing error message.
		setErrorMessage('')
	}

	const handleScan = (data: string) => {
		setErrorMessage('')
		const showFlashAnimation = (status: typeof flashesCamera = 'success') => {
			setFlashesCamera(status)
			setTimeout(() => setFlashesCamera('no'), 150)
		}
		// phys id ie: A000
		// dig id: 123456
		const hexMatch = data.match(
			/^https:\/\/hackuta.org\/dashboard\?id=[ABCD]\d{3}$/i,
		)
		const pinMatch = data.match(
			/^https:\/\/hackuta.org\/dashboard\?id=\d{6}$/i,
		)
		if (hexMatch) {
			const id = hexMatch[0].slice(
				'https://hackuta.org/dashboard?id='.length,
			)
			setHexIdValue(id)
			showFlashAnimation()
		} else if (pinMatch) {
			setCheckInPinValue(
				pinMatch[0].slice('https://hackuta.org/dashboard?id='.length),
			)
			showFlashAnimation()
		} else {
			setErrorMessage(
				'Scanned QR code is not a valid hex ID or 6-digit check-in PIN.',
			)
			showFlashAnimation('error')
		}
	}

	useEffect(() => {
		setIsFormValid(isValidHexID(hexIdValue) && isValidPin(checkInPinValue))
	}, [hexIdValue, checkInPinValue])

	const isValidHexID = (id: string) =>
		id.length === 4 && !!id.match(/^[ABCD]\d{3}$/i)
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
		} else if (data[0].checkedIn) {
			alert(
				`The user has already checked in with the hexID ${data[0].hexId}`,
			)
		} else {
			setUserData({
				firstName: data[0].application?.firstName ?? 'undefined',
				lastName: data[0].application?.lastName ?? 'undefined',
				fullName: `${data[0].application?.firstName ?? 'undefined'} ${
					data[0].application?.lastName ?? 'undefined'
				}`,
				school: data[0].application?.school ?? 'undefined',
				age: data[0].application?.age ?? NaN,
				group: getGroupName(hexIdValue),
			})
		}
	}

	const clearInputs = () => {
		setHexIdValue('') // clear HexID input
		setCheckInPinValue('') // clear PIN input
	}

	const handleConfirmCheckIn = () => {
		onSubmit?.({ checkInPin: checkInPinValue, hexId: hexIdValue })
		clearInputs()
		setUserData(null) // clear user data
	}

	const backToForm = () => setUserData(null)

	return (
		<div className="max-w-[282px] m-auto p-4 border-2 border-dashed border-black">
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
							<strong>Group:</strong> {userData.group}
						</p>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								gap: '16px',
								marginTop: '20px',
							}}
						>
							<Button kind="secondary" onClick={backToForm}>Back</Button>
							<Button onClick={handleConfirmCheckIn}>Submit</Button>
						</div>
					</div>
				)
				: (
					<form onSubmit={handleVerifyInput}>
						<div
							className={twJoin(
								'relative w-[250px] h-[250px]',
								'flex flex-col justify-center items-center',
								'border-2 border-[black] bg-[black] overflow-hidden',
							)}
						>
							<video
								ref={qrReaderRef}
								className="w-full"
							/>
							<div
								className={twJoin(
									'absolute top-0 left-0 w-full h-full transition-opacity',
									flashesCamera !== 'no' ? 'opacity-50' : 'opacity-0',
									flashesCamera === 'error'
										? 'bg-hackuta-error'
										: 'bg-white',
								)}
							/>
							<button
								onClick={toggleCamera}
								type="button"
								className="absolute top-1 right-1 bg-white p-1 cursor-pointer"
							>
								Switch Camera
							</button>
						</div>
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
