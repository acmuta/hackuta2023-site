'use client'

import { useState } from 'react'

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
			<table>
				<tbody>
					<tr>
						<td>name</td>{' '}
						<td>{application?.firstName + ' ' + application?.lastName}</td>
					</tr>
					<tr>
						<td>age</td> <td>{application?.age}</td>
					</tr>
					<tr>
						<td>phone number</td> <td>{application?.phoneNumber}</td>
					</tr>
					<tr>
						<td>school</td> <td>{application?.school}</td>
					</tr>
					<tr>
						<td>level of study</td> <td>{application?.levelOfStudy}</td>
					</tr>
					<tr>
						<td>country of residence</td>{' '}
						<td>{application?.countryOfResidence}</td>
					</tr>
					<tr>
						<td>t-shirt size</td> <td>{application?.tShirtSize}</td>
					</tr>
					<tr>
						<td>dietary restriction</td>{' '}
						<td>{application?.dietaryRestriction?.join(',')}</td>
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
							{hasBasicWritePerm ? (
								<>
									<button
										onClick={() => submit('accepted')}
										disabled={!acceptable}
									>
										Accept
									</button>
									<button onClick={() => submit('rejected')}>Reject</button>
								</>
							) : undefined}
						</td>
					</tr>
				</tbody>
			</table>
			<hr />
		</>
	)
}
