// export default IDScanner
'use client'
import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader'

interface IDScannerProps {
	onScanned: (id: string) => void
}

const IDScanner: React.FC<IDScannerProps> = ({ onScanned }) => {
	const [inputValue, setInputValue] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [successMessage, setSuccessMessage] = useState<string>('')

	const handleScan = (data: any) => {
		setErrorMessage('')
		setSuccessMessage('')

		if (data && data.text) {
			const match = data.text.match(/hackuta2023:[0-9a-f]{3}/i)

			if (match) {
				const id = data.text.slice('hackuta2023:'.length)
				alert(`ID number: ${id}`)
				setSuccessMessage(`ID number: ${id}`)
				onScanned(id)
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

	const handleManualInput = () => {
		setErrorMessage('')
		setSuccessMessage('')

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
			alert(`ID number: ${id}`)
			onScanned(id)
		} else {
			setErrorMessage('Entered ID is not a valid HackUTA ID format.')
		}
	}

	return (
		<div
			style={{
				maxWidth: '600px',
				margin: '20px auto',
				fontFamily: 'Arial, sans-serif',
				padding: '20px',
				borderRadius: '15px',
				boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
				backgroundColor: 'transparent',
				border: '1px solid #921F05', // Added border line here
			}}
		>
			<h2
				style={{
					borderBottom: '2px solid #921F05',
					paddingBottom: '10px',
					marginBottom: '20px',
					textAlign: 'center',
					fontSize: '1.6rem',
					color: '#921F05',
				}}
			>
				HACKUTA 2023 CHECK-IN
			</h2>
			<h3
				style={{
					color: '#921F05',
					marginBottom: '15px',
					textAlign: 'center',
					fontWeight: '500',
				}}
			>
				Scan QR Code
			</h3>
			<div style={{ marginBottom: '5px', textAlign: 'center' }}>
				<QrReader
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
			{errorMessage && (
				<p
					style={{
						color: 'red',
						marginBottom: '15px',
						textAlign: 'center',
						fontWeight: '500',
					}}
				>
					{errorMessage}
				</p>
			)}
			<h3
				style={{
					color: '#921F05',
					marginBottom: '15px',
					textAlign: 'center',
					fontWeight: '500',
				}}
			>
				Or Enter ID Manually
			</h3>
			<div style={{ marginBottom: '5px', textAlign: 'center' }}>
				<input
					type="text"
					placeholder="Enter ID"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					style={{
						width: '85%',
						padding: '12px',
						marginBottom: '15px',
						borderRadius: '8px',
						border: '1px solid #ccc',
						boxSizing: 'border-box',
						fontSize: '1rem',
					}}
				/>
				<button
					onClick={handleManualInput}
					style={{
						display: 'block',
						width: '85%',
						padding: '12px',
						backgroundColor: '#921F05',
						color: '#ebdf98',
						cursor: 'pointer',
						border: 'none',
						borderRadius: '8px',
						fontSize: '1rem',
						fontWeight: '500',
						transition: 'background-color 0.3s',
						boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
						margin: '0 auto',
						textAlign: 'center',
					}}
					onMouseOver={(e) => {
						e.currentTarget.style.backgroundColor = '#7a1904'
					}}
					onMouseOut={(e) => {
						e.currentTarget.style.backgroundColor = '#921F05'
					}}
				>
					Submit
				</button>
			</div>
			{successMessage && (
				<div
					style={{
						marginTop: '20px',
						padding: '15px',
						borderRadius: '8px',
						border: '1px solid green',
						backgroundColor: 'rgba(0,255,0,0.1)',
						color: 'green',
						textAlign: 'center',
						fontWeight: '500',
					}}
				>
					{successMessage}
					<button
						onClick={() => setSuccessMessage('')}
						style={{
							marginLeft: '10px',
							backgroundColor: 'transparent',
							border: '1px solid #921F05',
							cursor: 'pointer',
							color: '#921F05',
							borderRadius: '5px',
							padding: '5px 10px',
							fontSize: '0.9rem',
						}}
					>
						Close
					</button>
				</div>
			)}
		</div>
	)
}

export default IDScanner
