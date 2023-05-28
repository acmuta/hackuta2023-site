'use client'

import { useState } from 'react'

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
} from '@/lib/db/models/User'
import { range, stringifyError } from '@/lib/utils/client'
import { fetchPost,toOption, zodEnumToOptions } from '@/lib/utils/shared'

import { Box } from '../Box'
import { Button } from '../Button'
import { Dropdown, TextInput } from '../Form'
import ErrorMessage from '../Form/ErrorMessage'
import { Heading } from '../Heading'
import styles from './styles.module.css'

export function ApplicationForm() {
	const [formErrors, setFormMessages] = useState<string[]>([])
	const [errors, setErrors] = useState<Record<string, string[]>>({})
	async function submit() {
		const formData = new FormData(
			document.getElementById('applicationForm') as HTMLFormElement,
		)
		const jsonData: Record<string, string | string[] | number> =
			Object.create(null)
		formData.forEach((v, k) => {
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
				jsonData[k] = v.toString()
			}
		})
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
			gap="1rem"
			className={styles.applicationForm}
		>
			<Heading level={2}>Application</Heading>
			<Heading level={3}>General Information</Heading>
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

			<Heading level={3}>Optional Demographic Information</Heading>
			<Dropdown
				id="underrepresentedGroup"
				text="Do you identify as part of an underrepresented group in the technology industry?"
				errors={errors['underrepresentedGroup']}
				selectProps={{ form: 'applicationForm' }}
				options={zodEnumToOptions(TernarySchema)}
				isClearable
			/>
			<Dropdown
				id="gender"
				text="Gender"
				description='You may type freely and select "Create" to add custom options.'
				errors={errors['gender']}
				selectProps={{ form: 'applicationForm' }}
				options={zodEnumToOptions(KnownGenderSchema)}
				isClearable
				isCreatable
			/>
			<Dropdown
				id="pronouns"
				text="Pronouns"
				description='You may type freely and select "Create" to add custom options.'
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
				description='You may type freely and select "Create" to add custom options.'
				errors={errors['raceEthnicity']}
				selectProps={{ form: 'applicationForm' }}
				options={zodEnumToOptions(KnownRaceEthnicitySchema)}
				isClearable
				isCreatable
				isMulti
			/>
			<Dropdown
				id="sexuality"
				text="Do you consider yourself to be any of the following?"
				description='You may type freely and select "Create" to add custom options.'
				errors={errors['sexuality']}
				selectProps={{ form: 'applicationForm' }}
				options={zodEnumToOptions(KnownSexualitySchema)}
				isClearable
				isCreatable
			/>
			<Dropdown
				id="highestLevelOfEducation"
				text="What is the highest level of formal education that you have completed?"
				errors={errors['highestLevelOfEducation']}
				selectProps={{ form: 'applicationForm' }}
				options={zodEnumToOptions(LevelOfStudySchema)}
				isClearable
			/>
			<Dropdown
				id="fieldOfStudy"
				text="Major/Field of Study"
				description='You may type freely and select "Create" to add custom options.'
				errors={errors['fieldOfStudy']}
				selectProps={{ form: 'applicationForm' }}
				options={zodEnumToOptions(KnownMajorSchema)}
				isClearable
				isCreatable
				isMulti
			/>

			{formErrors.length ? <ErrorMessage errors={formErrors} /> : undefined}
			<span>
				<Button onClick={submit}>Submit</Button>
			</span>
		</Box>
	)
}
