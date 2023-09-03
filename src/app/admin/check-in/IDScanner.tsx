'use client'

import { FormEvent, useState } from 'react'
import { QrReader } from 'react-qr-reader'

import { Button } from '@/components/Button'
import { TextInput } from '@/components/Form'

export interface IDScannerProps {
	onScanned?: (id: string) => void
}

const IDScanner: React.FC<IDScannerProps> = ({ onScanned }) => {
	const [inputValue, setInputValue] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string>('')

	const handleScan = (data: any) => {
		setErrorMessage('')

		if (data && data.text) {
			const match = data.text.match(/hackuta2023:[0-9a-f]{3}/i)

			if (match) {
				const id = data.text.slice('hackuta2023:'.length)
				setInputValue(`ID number: ${id}`)
				onScanned?.(id)
			} else {
				setErrorMessage('Scanned QR code is not a valid HackUTA ID hex.')
				setTimeout(() => {
					setErrorMessage('')
				}, 5000)
			}
		}
	}

	const handleError = (err: any) => {
		console.error(err)
		setErrorMessage('Error scanning QR code')
	}

	const handleManualInput = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setErrorMessage('')

		const fullMatch = inputValue.match(/hackuta2023:[0-9a-f]{3}/i)
		const partialMatch = inputValue.match(/^[0-9a-f]{3}$/i)

		let id = null

		if (fullMatch) {
			id = fullMatch[0].slice('hackuta2023:'.length)
		} else if (partialMatch) {
			id = partialMatch[0]
		}

		if (id) {
			onScanned?.(id)
		} else {
			setErrorMessage('Entered ID is not a valid HackUTA ID format.')
		}
	}

	return (
		<div className="max-w-[600px] mx-auto p-4 border-2 border-hackuta-black border-dashed">
			<div style={{ marginBottom: '5px', textAlign: 'center' }}>
				<QrReader
					// @ts-expect-error whatever man.
					delay={300}
					onError={handleError}
					onResult={handleScan}
					style={{
						maxWidth: '85%',
						borderRadius: '8px',
						margin: '0 auto',
						boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
					}}
				/>
			</div>
			<form
				className="flex flex-col gap-2 justify-start content-center"
				onSubmit={handleManualInput}
			>
				<TextInput
					type="text"
					placeholder="Enter ID"
					value={inputValue}
					onChange={(e) => setInputValue((e.target as HTMLInputElement).value)}
					errors={[errorMessage]}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</div>
	)
}

export default IDScanner
