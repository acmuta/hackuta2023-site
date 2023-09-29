"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";

import { Button } from "@/components/Button";
import { TextInput } from "@/components/Form";
import { JsonEvents } from "@/lib/db/models/Event";
import { JsonUser } from "@/lib/db/models/User";
import { getGroupName, jsonFetcher } from "@/lib/utils/client";
import { useZxing } from "react-zxing";
import { twJoin } from "tailwind-merge";

export interface IDScannerProps {
	onSubmit?: (params: { checkInPin?: string; hexId?: string }) => void;
}

type checkInType = "checkin" | "event" | "meal";

const IDScanner: React.FC<IDScannerProps> = ({ onSubmit }) => {
	const [hexIdValue, setHexIdValue] = useState<string>("");
	const [checkInPinValue, setCheckInPinValue] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [userData, setUserData] = useState<any>(null);
	const [isFormValid, setIsFormValid] = useState<boolean>(false);
	const { data: stats } = useSWR("/admin/check-in/stats", jsonFetcher);
	const [cameraFacingMode, setCameraFacingMode] = useState<"user" | "environment">("environment");
	const [flashesCamera, setFlashesCamera] = useState<"no" | "success" | "error">("no");
	const [checkinMode, setCheckinMode] = useState<checkInType>("event");
	const [enabledMealBtn, setEnabledMealBtn] = useState<boolean>(false);
	const [currDateTime] = useState(/*new Date().getTime()*/ new Date(1696775700000).getTime());
	const [currMeal, setCurrMeal] = useState<string>();
	const [currEvents, setCurrEvents] = useState<string[]>([""]);

	// if saturday morning, default to checkin between 7 and 11:30 Saturday October 7th, 2023
	useEffect(() => {
		if (currDateTime > 1696680000000 && currDateTime < 1696696200000) {
			setCheckinMode("checkin");
		}
	}, [currDateTime]);

	const handleEvents = async () => {
		const response = await fetch(`/admin/check-in/events`, {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			alert("Network response was not ok");
		}

		const data: JsonEvents[] = await response.json();

		if (data.length === 0) {
			alert("No events found");
		} else {
			const filterEvents = (type: checkInType) => {
				if (type !== "event") {
					return data.filter((event: any) => event.eventType === type);
				} else {
					return data.filter(
						(event: any) =>
							event.eventType === "workshop" ||
							event.eventType === "minievent" ||
							event.eventType === "sponsor" ||
							event.eventType === "event"
					);
				}
			};

			// MEALS: only allow meals during meal time (30 mins before — 1 hour after)
			setEnabledMealBtn(false);
			filterEvents("meal").forEach((event: any) => {
				if (
					currDateTime >
						new Date(new Date(event.date).toLocaleString()).getTime() - 1800000 &&
					currDateTime <
						new Date(new Date(event.date).toLocaleString()).getTime() +
							event.durationMins * 60000 +
							3600000
				) {
					setEnabledMealBtn(true);
					setCurrMeal(event.title);
				}
			});

			setCurrEvents([])
			// EVENTS: only allow events during event time (10 mins before — 10 mins after)
			filterEvents("event").forEach((event: any) => {
				if (
					currDateTime >
						new Date(new Date(event.date).toLocaleString()).getTime() - 600000 &&
					currDateTime <
						new Date(new Date(event.date).toLocaleString()).getTime() +
							event.durationMins * 60000 +
							600000
				) {
					console.log(event.title)
					setCurrEvents((prev) => [...(prev ?? ""), event.title]);
				}
			});
		}
	};

	// load events then print
	useEffect(() => {
		handleEvents();
	}, []);

	const { ref: qrReaderRef } = useZxing({
		constraints: {
			video: {
				facingMode: { ideal: cameraFacingMode },
			},
		},
		timeBetweenDecodingAttempts: 1000,
		onDecodeResult: (res) => handleScan(res.getText()),
	});

	const toggleCamera = () => {
		setCameraFacingMode((prev) => (prev === "environment" ? "user" : "environment"));

		// Clear any existing error message.
		setErrorMessage("");
	};

	const handleScan = (data: string) => {
		setErrorMessage("");
		const showFlashAnimation = (status: typeof flashesCamera = "success") => {
			setFlashesCamera(status);
			setTimeout(() => setFlashesCamera("no"), 150);
		};
		// phys id ie: A000
		// dig id: 123456
		const hexMatch = data.match(/^https:\/\/hackuta.org\/dashboard\?id=[ABCD][a-f0-9]{5}$/i);
		const pinMatch = data.match(/^https:\/\/hackuta.org\/dashboard\?id=\d{6}$/i);
		if (hexMatch) {
			const id = hexMatch[0]
				.slice("https://hackuta.org/dashboard?id=".length)
				.toLocaleUpperCase();
			setHexIdValue(id);
			showFlashAnimation();
		} else if (pinMatch) {
			setCheckInPinValue(
				pinMatch[0].slice("https://hackuta.org/dashboard?id=".length).toLocaleUpperCase()
			);
			showFlashAnimation();
		} else {
			setErrorMessage("Scanned QR code is not a valid hex ID or 6-digit check-in PIN.");
			showFlashAnimation("error");
		}
	};

	useEffect(() => {
		setIsFormValid(isValidHexID(hexIdValue) && isValidPin(checkInPinValue));
	}, [hexIdValue, checkInPinValue]);

	const isValidHexID = (id: string) => id.length === 6 && !!id.match(/^[ABCD][a-f0-9]{5}$/i);
	const isValidPin = (pin: string) => pin.length === 6 && !!pin.match(/^\d{6}$/i);

	const handleVerifyInput = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await fetch(`/admin/check-in/users?pin=${checkInPinValue}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		});
		const data: JsonUser[] = await response.json();
		if (data.length === 0) {
			alert("No user found with the provided check-in PIN.");
		} else if (data[0].checkedIn) {
			alert(`The user has already checked in with the hexID ${data[0].hexId}`);
		} else {
			setUserData({
				firstName: data[0].application?.firstName ?? "undefined",
				lastName: data[0].application?.lastName ?? "undefined",
				fullName: `${data[0].application?.firstName ?? "undefined"} ${
					data[0].application?.lastName ?? "undefined"
				}`,
				school: data[0].application?.school ?? "undefined",
				age: data[0].application?.age ?? NaN,
				group: getGroupName(hexIdValue),
			});
		}
	};

	const clearInputs = () => {
		setHexIdValue(""); // clear HexID input
		setCheckInPinValue(""); // clear PIN input
	};

	const handleConfirmCheckIn = () => {
		onSubmit?.({ checkInPin: checkInPinValue, hexId: hexIdValue });
		clearInputs();
		setUserData(null); // clear user data
	};

	const backToForm = () => setUserData(null);

	return (
		<div className="max-w-[282px] m-auto p-4 border-2 border-dashed border-black">
			<div className="flex items-center justify-center gap-4 pb-4">
				{/* <button className="font-heading text-hackuta-beige border-2 p-2 opacity-95 hover:opacity-85 bg-hackuta-black rounded-lg border-hackuta-black no-underline transition-all">Checkin</button>
				<button className="font-heading text-hackuta-black border-2 p-2 opacity-95 hover:opacity-85 rounded-lg border-hackuta-black no-underline transition-all">Events</button>
				<button className="font-heading text-hackuta-black border-2 p-2 opacity-95 hover:opacity-85 rounded-lg border-hackuta-black no-underline transition-all">Meal</button> */}
				<button
					className={`${
						checkinMode === "checkin"
							? "text-hackuta-beige bg-hackuta-black"
							: "text-hackuta-black bg-hackuta-beige"
					} font-heading border-2 p-2 opacity-95 hover:opacity-85 rounded-lg border-hackuta-black no-underline transition-all`}
					onClick={() => {
						setCheckinMode("checkin");
					}}
				>
					Check&#8209;in
				</button>
				<button
					className={`${
						checkinMode === "event"
							? "text-hackuta-beige bg-hackuta-black"
							: "text-hackuta-black bg-hackuta-beige"
					} font-heading border-2 p-2 opacity-95 hover:opacity-85 rounded-lg border-hackuta-black no-underline transition-all`}
					onClick={() => {
						setCheckinMode("event");
					}}
				>
					Events
				</button>
				<button
					className={`${
						checkinMode === "meal"
							? "text-hackuta-beige bg-hackuta-black"
							: "text-hackuta-black bg-hackuta-beige"
					} ${
						enabledMealBtn ? "" : "border-opacity-40 text-opacity-40"
					} disabled font-heading border-2 p-2 opacity-95 hover:opacity-85 rounded-lg border-hackuta-black no-underline transition-all`}
					onClick={() => {
						setCheckinMode("meal");
					}}
					disabled={!enabledMealBtn}
				>
					Meals
				</button>
			</div>

			{/* display userdata for checkin */}
			{userData ? (
				<div style={{ textAlign: "left", fontSize: "1.2rem" }}>
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
							display: "flex",
							justifyContent: "center",
							gap: "16px",
							marginTop: "20px",
						}}
					>
						<Button kind="secondary" onClick={backToForm}>
							Back
						</Button>
						<Button onClick={handleConfirmCheckIn}>Submit</Button>
					</div>
				</div>
			) : (
				<form onSubmit={handleVerifyInput}>
					<div
						className={twJoin(
							"relative w-[250px] h-[250px]",
							"flex flex-col justify-center items-center",
							"border-2 border-[black] bg-[black] overflow-hidden"
						)}
					>
						<video ref={qrReaderRef} className="w-full" />
						<div
							className={twJoin(
								"absolute top-0 left-0 w-full h-full transition-opacity",
								flashesCamera !== "no" ? "opacity-50" : "opacity-0",
								flashesCamera === "error" ? "bg-hackuta-error" : "bg-white"
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

					{/* START OF DAY CHECKIN MODE */}
					{checkinMode === "checkin" && (
						<>
							<div
								style={{
									textAlign: "center",
									marginBottom: "16px",
									fontWeight: "bold",
								}}
							>
								Checked in:{" "}
								{stats
									? `${stats.numCheckedIn} out of ${stats.numAccepted} accepted`
									: "Loading..."}
							</div>
							<div style={{ marginTop: "10px" }}>
								<TextInput
									type="text"
									placeholder="Physical ID"
									value={hexIdValue}
									onChange={(e) =>
										setHexIdValue((e.target as HTMLInputElement).value)
									}
								/>
							</div>
							<div style={{ marginTop: "10px" }}>
								<TextInput
									type="text"
									placeholder="Digital ID"
									value={checkInPinValue}
									errors={[errorMessage]}
									onChange={(e) =>
										setCheckInPinValue((e.target as HTMLInputElement).value)
									}
								/>
							</div>
							<div
								style={{
									marginTop: "20px",
									display: "flex",
									justifyContent: "center",
								}}
							>
								<Button type="submit" disabled={!isFormValid}>
									Verify
								</Button>
							</div>
						</>
					)}

					{/* EVENT CHECKIN MODE */}
					{checkinMode === "event" && (
						<>
							{/* Dropdown for selecting events */}
							<div className="text-center mt-3">
								<select>{
									currEvents.map((event) => (
										<option key={event} value={event}>{event}</option>
									))}
								</select>
							</div>
							<div style={{ marginTop: "10px" }}>
								<TextInput
									type="text"
									placeholder="Enter your ID"
									value={hexIdValue}
									onChange={(e) =>
										setHexIdValue((e.target as HTMLInputElement).value)
									}
								/>
							</div>
							{/* <div style={{ marginTop: '10px' }}>
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
							</div> */}
							<div
								style={{
									marginTop: "20px",
									display: "flex",
									justifyContent: "center",
								}}
							>
								<Button type="submit" disabled={!isFormValid}>
									Submit
								</Button>
							</div>
						</>
					)}
					{/* EVENT CHECKIN MODE */}
					{checkinMode === "meal" && (
						<>
							<div className="font-heading text-center mt-3 text-lg px-4 py-2 rounded-lg bg-hackuta-red text-white">{`${currMeal} Checkin`}</div>
							<div style={{ marginTop: "10px" }}>
								<TextInput
									type="text"
									placeholder="Enter Attendee ID"
									value={hexIdValue}
									onChange={(e) =>
										setHexIdValue((e.target as HTMLInputElement).value)
									}
								/>
							</div>
							{/* <div style={{ marginTop: '10px' }}>
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
							</div> */}
							<div
								style={{
									marginTop: "20px",
									display: "flex",
									justifyContent: "center",
								}}
							>
								<Button type="submit" disabled={!isFormValid}>
									Submit
								</Button>
							</div>
						</>
					)}
				</form>
			)}
		</div>
	);
};

export default IDScanner;
