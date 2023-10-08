'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

import { Button } from '@/components/Button'
import { TextInput } from '@/components/Form'
import { hasPermission } from '@/lib/auth/shared'
import { AppPermissions } from '@/lib/db/models/Role'
import { ShopSwag } from '@/lib/db/models/ShopSwap'
import { JsonUser } from '@/lib/db/models/User'
import { getGroupName, jsonFetcher, stringifyError } from '@/lib/utils/client'
import { useZxing } from 'react-zxing'
import { twJoin } from 'tailwind-merge'
import { ScannerDataResponse } from './data/route'
import { Stats } from './stats/route'

export interface IDScannerProps {
	perms: AppPermissions
}

type ScanType = 'checkin' | 'event' | 'meal' | 'shop'

interface UserData {
	firstName: string
	lastName: string
	fullName: string
	school: string
	age: number
	group: string
}

const useData = (): {
	currEvents: string[]
	currMeal?: string | undefined
	swags: ShopSwag[]
	isLoading: boolean
	error?: unknown
} => {
	const { data, error, isLoading } = useSWR<ScannerDataResponse>(
		'/admin/scanner/data',
		jsonFetcher,
		{
			refreshInterval: 20_000,
		},
	)
	const currDateTime = new Date(
		new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }),
	).getTime()

	if (isLoading) {
		return { isLoading: true, currEvents: [], swags: [] }
	} else if (error || !data) {
		return { isLoading: false, error, currEvents: [], swags: [] }
	}

	let currMeal: string | undefined
	const currEvents: string[] = []

	if (data.events.length === 0) {
		return {
			isLoading: false,
			error: new Error('No events found'),
			currEvents: [],
			swags: data.swags,
		}
	}
	const filterEvents = (type: ScanType) => {
		if (type !== 'event') {
			return data.events.filter((event: any) => event.eventType === type)
		} else {
			return data.events.filter(
				(event: any) =>
					event.eventType === 'workshop'
					|| event.eventType === 'minievent'
					|| event.eventType === 'sponsor'
					|| event.eventType === 'event'
					|| event.eventType === 'general',
			)
		}
	}

	// MEALS: only allow meals during meal time (30 mins before — 1 hour after)
	filterEvents('meal').forEach((event: any) => {
		const eventTime = new Date(event.date).getTime()
		const eventEndTime = eventTime + event.durationMins * 60_000
		if (
			currDateTime > eventTime - 1800000
			&& currDateTime < eventEndTime + 3600000
		) {
			currMeal = event.title
		}
	})

	// EVENTS: only allow events during event time (10 mins before — 30 mins after)
	filterEvents('event').forEach((event: any) => {
		const eventTime = new Date(event.date).getTime()
		const eventEndTime = eventTime + event.durationMins * 60_000
		if (
			currDateTime > eventTime - 600000
			&& currDateTime < eventEndTime + 1800_000
		) {
			currEvents.push(event.title)
		}
	})

	return {
		isLoading: false,
		currMeal,
		currEvents,
		swags: data.swags,
	}
}

const IDScanner: React.FC<IDScannerProps> = ({ perms }) => {
	const hasLinkPerm = hasPermission(perms, {
		administration: { scanner: { link: true } },
	})
	const hasEventPerm = hasPermission(perms, {
		administration: { scanner: { event: true } },
	})
	const hasMealPerm = hasPermission(perms, {
		administration: { scanner: { meal: true } },
	})
	const hasShopPerm = hasPermission(perms, {
		administration: { scanner: { shop: true } },
	})

	const [hexIdValue, setHexIdValue] = useState<string>('')
	const [checkInPinValue, setCheckInPinValue] = useState<string>('')
	const [generalIdValue, setGeneralIdValue] = useState<string>('') // could be hex or pin
	const [selectedSwag, setSelectedSwag] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [userData, setUserData] = useState<UserData | null>(null)
	const [cameraFacingMode, setCameraFacingMode] = useState<
		'user' | 'environment'
	>('environment')
	const [cameraPreviewFlash, setCameraPreviewFlash] = useState<
		'no' | 'success' | 'error'
	>('no')
	const [scannerMode, setScannerMode] = useState<ScanType>(
		hasEventPerm
			? 'event'
			: hasLinkPerm
			? 'checkin'
			: hasMealPerm
			? 'meal'
			: 'shop',
	)
	const [eventSelected, setEventSelected] = useState<boolean>(false)
	const { currMeal, currEvents, swags, error: eventsFetchError } = useData()
	const { data: stats } = useSWR<Stats>(
		`/admin/scanner/stats?currMeal=${currMeal ?? ''}`,
		jsonFetcher,
	)
	const eventSelect = useRef<HTMLSelectElement>(null)
	const [message, setMessage] = useState<string>()
	const [messageIsError, setMessageIsError] = useState(false)

	const showMessage = (msg: string, isError = false) => {
		setMessage(msg)
		setMessageIsError(isError)
		setTimeout(() => {
			setMessage((prev) => prev === msg ? undefined : prev)
		}, 4_000)
	}

	const onSubmit = async ({ checkInPin, hexId, id, eventName, swagName }: {
		checkInPin?: string
		hexId?: string
		eventName?: string
		id?: string
		swagName?: string
	}) => {
		try {
			const response = await fetch(
				`/admin/scanner/submit?checkInPin=${checkInPin ?? ''}&hexId=${
					hexId ?? ''
				}&eventName=${eventName ?? ''}&id=${id ?? ''}&swagName=${
					swagName ?? ''
				}`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
					},
				},
			)
			const data = await response.json()
			if (data.status === 'success') {
				if (data.message) {
					showMessage(data.message)
				} else {
					window.location.reload()
				}
			} else {
				throw new Error(data.message)
			}
		} catch (e) {
			showMessage(stringifyError(e), true)
		}
	}

	useEffect(() => {
		if (eventsFetchError) {
			showMessage(
				'Failed fetching events: ' + stringifyError(eventsFetchError),
				true,
			)
		}
	}, [eventsFetchError])

	useEffect(() => {
		setSelectedSwag(swags[0]?.name ?? '')
	}, [swags])

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
		onDecodeResult: (res) => onQrDecode(res.getText()),
	})

	const toggleCameraFacing = () => {
		setCameraFacingMode((
			prev,
		) => (prev === 'environment' ? 'user' : 'environment'))
		setErrorMessage('')
	}

	const onQrDecode = (data: string) => {
		setErrorMessage('')
		const showFlashAnimation = (
			status: typeof cameraPreviewFlash = 'success',
		) => {
			setCameraPreviewFlash(status)
			setTimeout(() => setCameraPreviewFlash('no'), 600)
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

	const isValidHexID = (id: string) =>
		id.length === 6 && !!id.match(/^[ABCD][a-f0-9]{5}$/i)
	const isValidPin = (pin: string) =>
		pin.length === 6 && !!pin.match(/^\d{6}$/i)
	const isValidGeneralID = (id: string) => isValidHexID(id) || isValidPin(id)

	const verifyInput = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const response = await fetch(
			`/admin/scanner/users?pin=${checkInPinValue}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			},
		)
		const data: JsonUser[] = await response.json()
		if (data.length === 0) {
			showMessage('No user found with the provided check-in PIN.', true)
		} else if (data[0].checkedIn) {
			showMessage(
				`The user has already checked in with the hexID ${data[0].hexId}`,
				true,
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
		setHexIdValue('')
		setCheckInPinValue('')
		setGeneralIdValue('')
	}

	const submitCheckInScan = () => {
		onSubmit({ checkInPin: checkInPinValue, hexId: hexIdValue })
		clearInputs()
		setUserData(null)
	}

	const submitEventScan = (genidVal: string, eName: string) => {
		onSubmit({ id: genidVal, eventName: eName })
		clearInputs()
	}

	const submitSwagScan = (generalId: string, swagName: string) => {
		onSubmit({ id: generalId, swagName })
		clearInputs()
	}

	const cancelCheckIn = () => setUserData(null)

	return (
		<div className="max-w-xs m-auto p-4 border-2 border-dashed border-black flex justify-center items-center flex-col">
			<TabButtons
				checkinMode={scannerMode}
				currMeal={currMeal}
				hasEventPerm={hasEventPerm}
				hasLinkPerm={hasLinkPerm}
				hasMealPerm={hasMealPerm}
				hasShopPerm={hasShopPerm}
				setCheckinMode={setScannerMode}
			/>
			{userData
				? (
					<UserDataConfirm
						userData={userData}
						onCancel={cancelCheckIn}
						onSubmit={submitCheckInScan}
					/>
				)
				: (
					<form
						onSubmit={verifyInput}
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
									cameraPreviewFlash !== 'no'
										? 'opacity-100'
										: 'opacity-0',
									cameraPreviewFlash === 'error'
										? 'bg-hackuta-error'
										: 'bg-white',
								)}
							/>
							<button
								onClick={toggleCameraFacing}
								type="button"
								className="absolute top-1 right-1 bg-hackuta-blue text-white p-1 cursor-pointer rounded hover:opacity-90 border-hackuta-darkblue hover:border-2 transition-all z-100"
							>
								Switch Camera
							</button>
						</div>
						{message && (
							<div
								className={twJoin(
									'text-center',
									messageIsError
										? 'text-hackuta-error'
										: 'text-green-700',
								)}
							>
								{message}
							</div>
						)}

						{/* START OF DAY CHECK-IN MODE */}
						{scannerMode === 'checkin' && (
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
								<div className="mt-5 flex justify-center">
									<Button
										type="submit"
										disabled={!(isValidHexID(hexIdValue)
											&& isValidPin(checkInPinValue))}
									>
										Verify
									</Button>
								</div>
							</>
						)}

						{/* EVENT SCAN MODE */}
						{scannerMode === 'event' && (
							<>
								{/* Dropdown for selecting events */}
								<div className="text-center mt-3">
									<select
										ref={eventSelect}
										className="font-heading text-center mt-2 text-lg pl-4 pr-8 py-2 rounded-lg form-select appearance-none bg-no-repeat bg-hackuta-red text-white w-full"
										onChange={() => {
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
								<div className="mt-5 flex justify-center">
									<Button
										onClick={() => {
											submitEventScan(
												generalIdValue,
												eventSelect.current!.value,
											)
										}}
										disabled={!(isValidGeneralID(generalIdValue))}
									>
										Submit
									</Button>
								</div>
							</>
						)}

						{/* MEAL SCAN MODE */}
						{(scannerMode === 'meal' && currMeal) && (
							<>
								<div className="font-heading text-center mt-3 text-lg px-4 py-2 rounded-lg bg-hackuta-red text-white">
									{`${currMeal} Checkin`}
								</div>
								<div className="text-center mb-2 font-bold">
									{stats
										? `${stats.numEatenMeal} out of ${stats.numCheckedIn}`
										: 'Loading...'}
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
								<div className="mt-5 flex justify-center">
									<Button
										onClick={() => {
											submitEventScan(
												generalIdValue,
												currMeal ?? '',
											)
										}}
										disabled={!(isValidGeneralID(generalIdValue)
											&& currMeal)}
									>
										Submit
									</Button>
								</div>
							</>
						)}

						{/* SHOP SCAN MODE */}
						{scannerMode === 'shop' && (
							<>
								{/* Dropdown for selecting swags */}
								<div className="text-center mt-3">
									<select
										className="font-heading text-center mt-2 text-lg pl-4 pr-8 py-2 rounded-lg form-select appearance-none bg-no-repeat bg-hackuta-red text-white w-full"
										onChange={(e) => {
											setSelectedSwag(e.target.value)
										}}
									>
										{swags.map((s) => (
											<option key={s.name} value={s.name}>
												{s.name}{' '}
												{-s.price > 0 ? `+${-s.price}` : -s.price}
											</option>
										))}
									</select>
								</div>
								<div className="mt-2">
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
								<div className="mt-5 flex justify-center">
									<Button
										onClick={() => {
											submitSwagScan(generalIdValue, selectedSwag)
										}}
										disabled={!(isValidGeneralID(generalIdValue))}
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

interface TabButtonsProps {
	checkinMode: ScanType
	setCheckinMode: (v: ScanType) => void
	hasLinkPerm: boolean
	hasEventPerm: boolean
	hasMealPerm: boolean
	hasShopPerm: boolean
	currMeal: string | undefined
}
function TabButtons(
	{
		checkinMode,
		setCheckinMode,
		hasLinkPerm,
		hasEventPerm,
		hasMealPerm,
		hasShopPerm,
		currMeal,
	}: TabButtonsProps,
) {
	const commonClassName = twJoin(
		'disabled:border-opacity-40 disabled:text-opacity-40 disabled:cursor-not-allowed',
		'font-heading border-2 p-2 opacity-95 hover:opacity-85 rounded-lg border-hackuta-black no-underline transition-all',
	)
	const selectedClassName = 'text-hackuta-beige bg-hackuta-black'
	const unselectedClassName = 'text-hackuta-black bg-hackuta-beige'
	return (
		<div className="flex items-center justify-center gap-1 pb-2">
			<button
				className={twJoin(
					commonClassName,
					checkinMode === 'checkin'
						? selectedClassName
						: unselectedClassName,
				)}
				onClick={() => {
					setCheckinMode('checkin')
				}}
				hidden={!hasLinkPerm}
			>
				Check&#8209;In
			</button>
			<button
				className={twJoin(
					commonClassName,
					checkinMode === 'event'
						? selectedClassName
						: unselectedClassName,
				)}
				onClick={() => {
					setCheckinMode('event')
				}}
				hidden={!hasEventPerm}
			>
				Event
			</button>
			<button
				className={twJoin(
					commonClassName,
					checkinMode === 'meal' ? selectedClassName : unselectedClassName,
				)}
				onClick={() => {
					setCheckinMode('meal')
				}}
				hidden={!hasMealPerm}
				disabled={!currMeal}
			>
				Meal
			</button>
			<button
				className={twJoin(
					commonClassName,
					checkinMode === 'shop' ? selectedClassName : unselectedClassName,
				)}
				onClick={() => {
					setCheckinMode('shop')
				}}
				hidden={!hasShopPerm}
			>
				Shop
			</button>
		</div>
	)
}

interface UserDataConfirmProps {
	userData: UserData
	onCancel: () => void
	onSubmit: () => void
}
function UserDataConfirm(
	{ userData, onCancel, onSubmit }: UserDataConfirmProps,
) {
	return (
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
				<Button kind="secondary" onClick={onCancel}>
					Back
				</Button>
				<Button onClick={onSubmit}>Submit</Button>
			</div>
		</div>
	)
}
