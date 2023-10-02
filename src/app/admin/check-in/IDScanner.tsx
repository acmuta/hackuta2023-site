'use client'

import { FormEvent, useEffect, useState } from 'react'
import useSWR from 'swr'

import { Button } from '@/components/Button'
import { TextInput } from '@/components/Form'
import { JsonEvents } from '@/lib/db/models/Event'
import { JsonUser } from '@/lib/db/models/User'
import { getGroupName, jsonFetcher } from '@/lib/utils/client'
import { useZxing } from 'react-zxing'
import { twJoin } from 'tailwind-merge'

export interface IDScannerProps {
	onSubmit?: (params: {
		checkInPin?: string
		hexId?: string
		eventName?: string
		id?: string
	}) => void
}

type checkInType = 'checkin' | 'event' | 'meal'

const IDScanner: React.FC<IDScannerProps> = ({ onSubmit }) => {
	const [hexIdValue, setHexIdValue] = useState<string>('')
	const [checkInPinValue, setCheckInPinValue] = useState<string>('')
	const [generalIdValue, setGeneralIdValue] = useState<string>('') // could be hex or pin
	const [eventNameValue, setEventNameValue] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [userData, setUserData] = useState<any>(null)
	const [isFormValid, setIsFormValid] = useState<boolean>(false)
	const [isEventFormValid, setIsEventFormValid] = useState<boolean>(false)
	const { data: stats } = useSWR('/admin/check-in/stats', jsonFetcher)
	const [cameraFacingMode, setCameraFacingMode] = useState<
		'user' | 'environment'
	>('environment')
	const [flashesCamera, setFlashesCamera] = useState<
		'no' | 'success' | 'error'
	>('no')
	const [checkinMode, setCheckinMode] = useState<checkInType>('event')
	const [enabledMealBtn, setEnabledMealBtn] = useState<boolean>(false)
	const [currDateTime, setCurrDateTime] = useState(
		new Date().getTime(), /*new Date(1696775700000).getTime()*/
	)
	const [currMeal, setCurrMeal] = useState<string>()
	const [currEvents, setCurrEvents] = useState<string[]>([''])
	const [minsAgo, setMinsAgo] = useState(0)
	const [eventSelected, setEventSelected] = useState<boolean>(false)

	useEffect(() => {
		const interval = setInterval(() => {
			const currentTime = new Date()
			const pastTime = new Date(currDateTime)
			const diffInMinutes = Math.floor(
				Math.abs(currentTime.getTime() - pastTime.getTime()) / 60000,
			)
			setMinsAgo(diffInMinutes)
		}, 60000)

		// Clean up the interval when the component unmounts
		return () => clearInterval(interval)
	}, [currDateTime, minsAgo])

	// if saturday morning, default to checkin between 7 and 11:30 Saturday October 7th, 2023
	useEffect(() => {
		if (currDateTime > 1696680000000 && currDateTime < 1696696200000) {
			setCheckinMode('checkin')
		}
	}, [currDateTime])

	const handleEvents = async () => {
		const response = await fetch(`/admin/check-in/events`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		})

		if (!response.ok) {
			alert('Network response was not ok')
		}

		const data: JsonEvents[] = await response.json()

		if (data.length === 0) {
			alert('No events found')
		} else {
			const filterEvents = (type: checkInType) => {
				if (type !== 'event') {
					return data.filter((event: any) => event.eventType === type)
				} else {
					return data.filter(
						(event: any) =>
							event.eventType === 'workshop'
							|| event.eventType === 'minievent'
							|| event.eventType === 'sponsor'
							|| event.eventType === 'event',
					)
				}
			}

			// MEALS: only allow meals during meal time (30 mins before — 1 hour after)
			setEnabledMealBtn(false)
			filterEvents('meal').forEach((event: any) => {
				if (
					currDateTime
						> new Date(new Date(event.date).toLocaleString()).getTime()
							- 1800000
					&& currDateTime
						< new Date(new Date(event.date).toLocaleString()).getTime()
							+ event.durationMins * 60000
							+ 3600000
				) {
					setEnabledMealBtn(true)
					setCurrMeal(event.title)
				}
			})

			setCurrEvents([])
			// EVENTS: only allow events during event time (10 mins before — 10 mins after)
			filterEvents('event').forEach((event: any) => {
				if (
					currDateTime
						> new Date(new Date(event.date).toLocaleString()).getTime()
							- 600000
					&& currDateTime
						< new Date(new Date(event.date).toLocaleString()).getTime()
							+ event.durationMins * 60000
							+ 600000
				) {
					setCurrEvents((prev) => [...(prev ?? ''), event.title])
				}
			})
		}
	}

	// load events then print
	useEffect(() => {
		handleEvents()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// set currentEvent default value
	useEffect(() => {
		setEventNameValue(currEvents[0])
	}, [currEvents])

	// set generalIdValue to hexIdValue or checkInPinValue
	useEffect(() => {
		setGeneralIdValue(hexIdValue ? hexIdValue : checkInPinValue)
	}, [hexIdValue, checkInPinValue])

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
		setCameraFacingMode((
			prev,
		) => (prev === 'environment' ? 'user' : 'environment'))

		// Clear any existing error message.
		setErrorMessage('')
	}

	const handleScan = (data: string) => {
		setErrorMessage('')
		const showFlashAnimation = (status: typeof flashesCamera = 'success') => {
			setFlashesCamera(status)
			setTimeout(() => setFlashesCamera('no'), 150)
		}
		// phys id ie: A00000
		// dig id: 123456
		const hexMatch = data.match(
			/^https:\/\/hackuta.org\/dashboard\?id=[ABCD][a-f0-9]{5}$/i,
		)
		const pinMatch = data.match(
			/^https:\/\/hackuta.org\/dashboard\?id=\d{6}$/i,
		)
		if (hexMatch) {
			const id = hexMatch[0]
				.slice('https://hackuta.org/dashboard?id='.length)
				.toLocaleUpperCase()
			setHexIdValue(id)
			showFlashAnimation()
		} else if (pinMatch) {
			setCheckInPinValue(
				pinMatch[0].slice('https://hackuta.org/dashboard?id='.length)
					.toLocaleUpperCase(),
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

	// reset is valid field when switching modes
	useEffect(() => {
		setIsEventFormValid(
			(isValidHexID(generalIdValue) || isValidPin(generalIdValue))
				&& !(
					(currEvents[0] ?? currMeal) === null
					|| (currEvents[0] ?? currMeal) === ''
					|| (currEvents[0] ?? currMeal) === undefined
				)
				&& (eventSelected && checkinMode === 'event'),
		)
		console.log(currEvents)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [generalIdValue, checkinMode, hexIdValue, checkInPinValue, eventSelected])

	const isValidHexID = (id: string) =>
		id.length === 6 && !!id.match(/^[ABCD][a-f0-9]{5}$/i)
	const isValidPin = (pin: string) =>
		pin.length === 6 && !!pin.match(/^\d{6}$/i)

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
		setGeneralIdValue('')
		setEventNameValue(currEvents[0] ?? currMeal)
	}

	const handleConfirmCheckIn = () => {
		onSubmit?.({ checkInPin: checkInPinValue, hexId: hexIdValue })
		clearInputs()
		setUserData(null) // clear user data
	}

	const handleEventCheckIn = (genidVal: string, eName: string) => {
		onSubmit?.({ id: genidVal, eventName: eName })
		clearInputs() // clear inputs doesnt work
		setUserData(null) // clear user data
	}

	const backToForm = () => setUserData(null)

	return (
		<div className="max-w-xs m-auto p-4 border-2 border-dashed border-black flex justify-center items-center flex-col">
			<div className="flex items-center justify-center gap-4 pb-4">
				<button
					className={`${
						checkinMode === 'checkin'
							? 'text-hackuta-beige bg-hackuta-black'
							: 'text-hackuta-black bg-hackuta-beige'
					} font-heading border-2 p-2 opacity-95 hover:opacity-85 rounded-lg border-hackuta-black no-underline transition-all`}
					onClick={() => {
						setCheckinMode('checkin')
					}}
				>
					Check&#8209;in
				</button>
				<button
					className={`${
						checkinMode === 'event'
							? 'text-hackuta-beige bg-hackuta-black'
							: 'text-hackuta-black bg-hackuta-beige'
					} font-heading border-2 p-2 opacity-95 hover:opacity-85 rounded-lg border-hackuta-black no-underline transition-all`}
					onClick={() => {
						setCheckinMode('event')
					}}
				>
					Events
				</button>
				<button
					className={`${
						checkinMode === 'meal'
							? 'text-hackuta-beige bg-hackuta-black'
							: 'text-hackuta-black bg-hackuta-beige'
					} ${
						enabledMealBtn ? '' : 'border-opacity-40 text-opacity-40'
					} disabled font-heading border-2 p-2 opacity-95 hover:opacity-85 rounded-lg border-hackuta-black no-underline transition-all`}
					onClick={() => {
						setCheckinMode('meal')
					}}
					disabled={!enabledMealBtn}
				>
					Meals
				</button>
			</div>

			{/* display userdata for checkin */}
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
							<Button kind="secondary" onClick={backToForm}>
								Back
							</Button>
							<Button onClick={handleConfirmCheckIn}>Submit</Button>
						</div>
					</div>
				)
				: (
					<form
						onSubmit={handleVerifyInput}
						className="flex flex-col justify-center items-center"
					>
						<div
							className={twJoin(
								'relative w-[250px]',
								'flex flex-col justify-center items-center',
								'border-2 border-[black] bg-[black] overflow-hidden',
							)}
						>
							<video ref={qrReaderRef} className="w-full" />
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
								className="absolute top-1 right-1 bg-hackuta-blue text-white p-1 cursor-pointer rounded hover:opacity-90 border-hackuta-darkblue hover:border-2 transition-all"
							>
								Switch Camera
							</button>
							<span
								className={`${
									minsAgo >= 10 ? 'text-red-600' : 'text-white'
								} flex justify-between items-center inherit gap-4 py-1 px-1 text-sm`}
							>
								<div className="flex flex-col gap-0 items-center justify-center">
									<p>{`Last updated: ${minsAgo} mins ago `}</p>
									<p>
										{`(${
											new Date(currDateTime).toLocaleTimeString(
												'en-US',
												{
													month: 'short',
													day: 'numeric',
													hour12: true,
													hour: 'numeric',
													minute: '2-digit',
												},
											)
										})`}
									</p>
								</div>
								<div
									onClick={() => {
										setCurrDateTime(new Date().getTime())
										setMinsAgo(0)
									}}
									className="bg-hackuta-blue text-white font-heading hover:opacity-80 rounded text-lg text-center px-3 pb-1 cursor-pointer z-10"
								>
									{`⟳`}
								</div>
							</span>
						</div>

						{/* START OF DAY CHECKIN MODE */}
						{checkinMode === 'checkin' && (
							<>
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
								<div style={{ marginTop: '10px' }}>
									<TextInput
										type="text"
										placeholder="Physical ID"
										value={hexIdValue}
										onChange={(e) =>
											setHexIdValue(
												(e.target as HTMLInputElement).value,
											)}
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
							</>
						)}

						{/* EVENT CHECKIN MODE */}
						{checkinMode === 'event' && (
							<>
								{/* Dropdown for selecting events */}
								<div className="text-center mt-3">
									<select
										className="font-heading text-center mt-2 text-lg pl-4 pr-8 py-2 rounded-lg form-select appearance-none bg-no-repeat bg-hackuta-red text-white"
										onChange={(e) => {
											setEventNameValue(e.target.value)
											setEventSelected(true)
										}}
										defaultValue={'unselected'}
										defaultChecked={true}
									>
										{!eventSelected
											&& (
												<option
													key={'unselected'}
													value={'unselected'}
													disabled
													defaultValue={' '}
												>
													{'— SELECT EVENT —'}
												</option>
											)}
										{currEvents.map((event) => (
											<option key={event} value={event}>
												{event}
											</option>
										))}
									</select>
								</div>
								<div style={{ marginTop: '10px' }}>
									<TextInput
										type="text"
										placeholder="Attendee ID"
										value={generalIdValue}
										onChange={(e) =>
											setGeneralIdValue(
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
									<Button
										onClick={() => {
											handleEventCheckIn(
												generalIdValue,
												eventNameValue,
											)
										}}
										disabled={!isEventFormValid}
									>
										Submit
									</Button>
								</div>
							</>
						)}
						{/* EVENT CHECKIN MODE */}
						{checkinMode === 'meal' && (
							<>
								<div className="font-heading text-center mt-3 text-lg px-4 py-2 rounded-lg bg-hackuta-red text-white">
									{`${currMeal} Checkin`}
								</div>
								<div style={{ marginTop: '10px' }}>
									<TextInput
										type="text"
										placeholder="Attendee ID"
										value={generalIdValue}
										onChange={(e) =>
											setGeneralIdValue(
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
									<Button
										onClick={() => {
											handleEventCheckIn(
												generalIdValue,
												currMeal ?? '',
											)
										}}
										disabled={!isEventFormValid}
									>
										Submit
									</Button>
								</div>
							</>
						)}
					</form>
				)}
		</div>
	)
}

export default IDScanner
