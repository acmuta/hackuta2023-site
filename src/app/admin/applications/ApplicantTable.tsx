'use client'

import { useState } from 'react'

import { Button } from '@/components/Button'
import { JSend } from '@/lib/api/jsend'
import { Application, JsonUser } from '@/lib/db/models/User'

import styles from './ApplicantTable.module.css'

interface TableProps {
	hasBasicWritePerm: boolean
	hasDemographicsReadPerm: boolean
	user: JsonUser
}

function isAcceptable(application: Application): boolean {
	return application.age >= 18
}

export default function ApplicantTable({
	hasBasicWritePerm,
	hasDemographicsReadPerm,
	user,
}: TableProps) {
	const [decision, setDecision] = useState<string>()

	const submit = async (decision: 'accepted' | 'rejected' | 'waitlisted') => {
		user.applicationStatus = decision
		console.log(JSON.stringify(user))
		const result = (await (
			await fetch('/api/admin/user', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			})
		).json()) as JSend<boolean>

		if (result.status !== 'success') {
			throw result
		}

		setDecision(decision)
	}
	const application = user.application
	const acceptable = application ? isAcceptable(application) : false

	return (
		<>
			<table className="border border-collapse">
				<tbody>
					<tr>
						<td className="border">name</td>{' '}
						<td className="border">
							{application?.firstName + ' ' + application?.lastName}
						</td>
					</tr>
					<tr>
						<td className="border">age</td>{' '}
						<td className="border">{application?.age}</td>
					</tr>
					<tr>
						<td className="border">phone number</td>{' '}
						<td className="border">{application?.phoneNumber}</td>
					</tr>
					<tr>
						<td className="border">school</td>{' '}
						<td className="border">{application?.school}</td>
					</tr>
					<tr>
						<td className="border">level of study</td>{' '}
						<td className="border">{application?.levelOfStudy}</td>
					</tr>
					<tr>
						<td className="border">country of residence</td>{' '}
						<td className="border">{application?.countryOfResidence}</td>
					</tr>
					<tr>
						<td className="border">t-shirt size</td>{' '}
						<td className="border">{application?.tShirtSize}</td>
					</tr>
					<tr>
						<td className="border">dietary restriction</td>{' '}
						<td className="border">
							{application?.dietaryRestriction?.join(',')}
						</td>
					</tr>
					<tr>
						<td className="border">other information</td>{' '}
						<td className="border">{application?.catchall}</td>
					</tr>
					<tr>
						<td colSpan={2}>
							{hasDemographicsReadPerm ? (
								<details>
									<summary>Demographics Information</summary>
									<h4>
										{' '}
										under represented group:{' '}
										{application?.underrepresentedGroup}
									</h4>
									<h4> gender: {application?.gender}</h4>
									<h4> pronouns: {application?.pronouns?.join(',')}</h4>
									<h4>
										{' '}
										race/ethnicity: {application?.raceEthnicity?.join(',')}
									</h4>
									<h4> sexuality: {application?.sexuality}</h4>
									<h4>
										{' '}
										highest level of eductation:{' '}
										{application?.highestLevelOfEducation}
									</h4>
									<h4>
										{' '}
										field of study {application?.fieldOfStudy?.join(',')}
									</h4>
								</details>
							) : undefined}
						</td>
					</tr>
					<tr>
						<td colSpan={2}>
							{decision ? (
								<div className={styles[decision]}>{decision}</div>
							) : (
								<div>undecided</div>
							)}
							<div className="flex flex-row gap-2">
								{hasBasicWritePerm ? (
									<>
										<Button
											onClick={() => submit('accepted')}
											disabled={!acceptable}
										>
											Accept
										</Button>
										<Button
											kind="secondary"
											className="bg-hackuta-red"
											onClick={() => submit('rejected')}
										>
											Reject
										</Button>
									</>
								) : undefined}
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<hr />
		</>
	)
}
