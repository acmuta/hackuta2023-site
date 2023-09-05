'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { Dropdown, TextInput } from '@/components/Form'
import ErrorMessage from '@/components/Form/ErrorMessage'
import { FileInput } from '@/components/Form/FileInput'
import {
	Application,
	ApplicationSchema,
	CountrySchema,
	KnownDietaryRestrictionSchema,
	KnownGenderSchema,
	KnownMajorSchema,
	KnownPronounsSchema,
	KnownRaceEthnicitySchema,
	KnownSexualitySchema,
	KnownUniversitySchema,
	LevelOfStudySchema,
	TernarySchema,
	TShirtSizeSchema,
	YesNoSchema
} from '@/lib/db/models/User'
import { range, stringifyError } from '@/lib/utils/client'
import { fetchPost, toOption, zodEnumToOptions } from '@/lib/utils/shared'

import styles from './ApplicationForm.module.css'

export function ApplicationForm() {
	const [formErrors, setFormMessages] = useState<string[]>([])
	const [errors, setErrors] = useState<Record<string, string[]>>({})
	async function submit() {
		const formData = new FormData(
			document.getElementById('applicationForm') as HTMLFormElement,
		)
		const jsonData: Record<string, string | string[] | number> =
			Object.create(null)
		await Promise.all(
			[...formData].map(async ([k, v]) => {
				if (v === '') {
					return
				}
				const zodFieldType = ApplicationSchema.shape[k as keyof Application]
				const typeName =
					zodFieldType._def.typeName === 'ZodOptional'
						? zodFieldType._def.innerType._def.typeName
						: zodFieldType._def.typeName
				if (typeName === 'ZodArray') {
					;((jsonData[k] ??= []) as string[]).push(v.toString())
				} else if (typeName === 'ZodNumber') {
					jsonData[k] = parseFloat(v.toString())
				} else {
					if (k === 'resume') {
						if (!(v instanceof File)) {
							console.error('resume', v)
							throw 'resume is not File'
						}
						if (v.size > 1 * 1024 * 1024) {
							throw 'resume must be smaller than 1 MB'
						}
						jsonData[k] = await getBase64(v as File)
					} else {
						jsonData[k] = v.toString()
					}
				}
			}),
		)
		const validateResult = ApplicationSchema.safeParse(jsonData)
		if (validateResult.success) {
			setFormMessages([])
			setErrors({})
			try {
				await fetchPost<boolean>('/api/apply', JSON.stringify(jsonData))
			} catch (e) {
				setFormMessages(['Submission failed', stringifyError(e)])
			}
		} else {
			const { formErrors, fieldErrors } = validateResult.error.formErrors
			setFormMessages([
				'Form validation failed, please double-check your submission',
				...formErrors,
			])
			setErrors(fieldErrors)
		}
	}

	return (
		<Box
			id="applicationForm"
			as="form"
			direction="column"
			gap="1.25rem"
			className={styles.applicationForm}
		>
			<h2 className="font-heading text-4xl">Application</h2>
			<h3 className="font-heading text-2xl">General Information</h3>
			<TextInput
				id="firstName"
				text="First Name"
				autoComplete="given-name"
				errors={errors['firstName']}
				required
				minLength={1}
			/>
			<TextInput
				id="lastName"
				text="Last Name"
				autoComplete="family-name"
				errors={errors['lastName']}
				required
				minLength={1}
			/>
			<Dropdown
				id="age"
				text="Age"
				errors={errors['age']}
				selectProps={{ form: 'applicationForm' }}
				options={range(13, 128).map(toOption)}
			/>
			<TextInput
				id="phoneNumber"
				text="Phone Number"
				errors={errors['phoneNumber']}
				required
			/>
			<Dropdown
				id="school"
				text="School"
				errors={errors['school']}
				selectProps={{ form: 'applicationForm' }}
				options={zodEnumToOptions(KnownUniversitySchema)}
				isCreatable
			/>
			<Dropdown
				id="levelOfStudy"
				text="Level of Study"
				errors={errors['levelOfStudy']}
				selectProps={{ form: 'applicationForm' }}
				options={zodEnumToOptions(LevelOfStudySchema)}
			/>
			<Dropdown
				id="countryOfResidence"
				text="Country of Residence"
				errors={errors['countryOfResidence']}
				selectProps={{ form: 'applicationForm' }}
				options={zodEnumToOptions(CountrySchema)}
			/>
			<Dropdown
				id="tShirtSize"
				text="T-Shirt Size"
				errors={errors['tShirtSize']}
				selectProps={{ form: 'applicationForm' }}
				options={zodEnumToOptions(TShirtSizeSchema)}
			/>
			<Dropdown
				id="dietaryRestriction"
				text="Dietary Restriction"
				description='You may type freely and select "Create" to add custom options.'
				errors={errors['dietaryRestriction']}
				selectProps={{ form: 'applicationForm' }}
				options={zodEnumToOptions(KnownDietaryRestrictionSchema)}
				isClearable
				isCreatable
				isMulti
			/>

			<h3 className="font-heading text-2xl">Optional Information</h3>
			<Dropdown
				id="underrepresentedGroup"
				text="Do you identify as part of an underrepresented group in the technology industry?"
				description="(Optional)"
				errors={errors['underrepresentedGroup']}
				selectProps={{ form: 'applicationForm' }}
				options={zodEnumToOptions(TernarySchema)}
				isClearable
			/>
			<Dropdown
				id="gender"
				text="Gender"
				description='(Optional) You may type freely and select "Create" to add custom options.'
				errors={errors['gender']}
				selectProps={{ form: 'applicationForm' }}
				options={zodEnumToOptions(KnownGenderSchema)}
				isClearable
				isCreatable
			/>
			<Dropdown
				id="pronouns"
				text="Pronouns"
				description='(Optional) You may type freely and select "Create" to add custom options.'
				errors={errors['pronouns']}
				selectProps={{ form: 'applicationForm' }}
				options={zodEnumToOptions(KnownPronounsSchema)}
				isClearable
				isCreatable
				isMulti
			/>
			<Dropdown
				id="raceEthnicity"
				text="Race/Ethnicity"
				description='(Optional) You may type freely and select "Create" to add custom options.'
				errors={errors['raceEthnicity']}
				selectProps={{ form: 'applicationForm' }}
				options={zodEnumToOptions(KnownRaceEthnicitySchema)}
				isClearable
				isCreatable
				isMulti
			/>
			<Dropdown
				id="sexuality"
				text="Sexuality"
				description='(Optional) You may type freely and select "Create" to add custom options.'
				errors={errors['sexuality']}
				selectProps={{ form: 'applicationForm' }}
				options={zodEnumToOptions(KnownSexualitySchema)}
				isClearable
				isCreatable
			/>
			<Dropdown
				id="highestLevelOfEducation"
				text="What is the highest level of formal education that you have completed?"
				description="(Optional)"
				errors={errors['highestLevelOfEducation']}
				selectProps={{ form: 'applicationForm' }}
				options={zodEnumToOptions(LevelOfStudySchema)}
				isClearable
			/>
			<Dropdown
				id="fieldOfStudy"
				text="Major/Field of Study"
				description='(Optional) You may type freely and select "Create" to add custom options.'
				errors={errors['fieldOfStudy']}
				selectProps={{ form: 'applicationForm' }}
				options={zodEnumToOptions(KnownMajorSchema)}
				isClearable
				isCreatable
				isMulti
			/>
			<FileInput
				id="resume"
				text="Resume"
				description="(Optional) Only PDFs less than 1 MB are allowed. The resume may be shared with our sponsors and partners."
				accept="application/pdf"
			/>
			<TextInput
				id="monthsCoding"
				text="How many months have you been coding?"
				description="(Optional) Input an integer."
				errors={errors['monthsCoding']}
			/>
			<TextInput
				id="hackathonsAttended"
				text="How many hackathons have you attended?"
				description="(Optional) Input an integer."
				errors={errors['hackathonsAttended']}
			/>
			<TextInput
				id="catchall"
				text="Any additional information you'd like us to know?"
				description="(Optional)"
				errors={errors['catchall']}
			/>

			<h3 className="font-heading text-2xl">MLH Checkboxes</h3>
			<Dropdown
				id="agreedMlhCoC"
				text={
					<>
						I have read and agree to the{' '}
						<Link href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">
							MLH Code of Conduct
						</Link>
						.
					</>
				}
				errors={errors['agreedMlhCoC']}
				selectProps={{ form: 'applicationForm' }}
				options={[{ label: 'Yes', value: 'Yes' }]}
			/>
			<Dropdown
				id="agreedMlhSharing"
				text={
					<>
						I authorize you to share my application/registration information
						with Major League Hacking for event administration, ranking, and MLH
						administration in-line with the{' '}
						<Link href="https://mlh.io/privacy">MLH Privacy Policy</Link>. I
						further agree to the terms of both the{' '}
						<Link href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md">
							MLH Contest Terms and Conditions
						</Link>{' '}
						and the{' '}
						<Link href="https://mlh.io/privacy">MLH Privacy Policy</Link>.
					</>
				}
				errors={errors['agreedMlhSharing']}
				selectProps={{ form: 'applicationForm' }}
				options={[{ label: 'Yes', value: 'Yes' }]}
			/>
			<Dropdown
				id="agreedMlhMarketing"
				text="I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements."
				errors={errors['agreedMlhMarketing']}
				selectProps={{ form: 'applicationForm' }}
				options={zodEnumToOptions(YesNoSchema)}
			/>

			{formErrors.length ? <ErrorMessage errors={formErrors} /> : undefined}
			<span>
				<Button onClick={submit}>Submit</Button>
			</span>
		</Box>
	)
}

function getBase64(file: Blob): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result as string)
		reader.onerror = (e) => reject(e)
	})
}
