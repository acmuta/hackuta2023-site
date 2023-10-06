import { ObjectId, WithId } from 'mongodb'
import validator from 'validator'
import z from 'zod'

import countries from '@/data/countries.json'
import universities from '@/data/universities.json'
import type { ToJsonValue } from '@/lib/utils/shared'

export default interface User {
	email: string
	image: string
	roles?: string[]
	/**
	 * Exists iff the current user is viewing the website as another role.
	 * `roles` would store the viewing-as roles,
	 * and `rolesActual` would store the actual roles of the user.
	 */
	rolesActual?: string[]
	emailVerified: Date | null
	applied?: Date
	application?: Application
	applicationStatus?: 'accepted' | 'rejected' | 'waitlisted'
	applicationDecided?: Date
	receivedEmailTags?: string[]
	checkInPin?: number
	checkedIn?: Date
	/** In the form of `A00` */
	hexId?: string
	attendedEvents?: string[]
}

export type JsonUser = ToJsonValue<WithId<User>>

export const LevelOfStudySchema = z.enum([
	'Less than Secondary / High School',
	'Secondary / High School',
	'Undergraduate University (2 year - community college or similar)',
	'Undergraduate University (3+ year)',
	'Graduate University (Masters, Professional, Doctoral, etc)',
	'Code School / Bootcamp',
	'Other Vocational / Trade Program or Apprenticeship',
	'Post Doctorate',
	'Other',
	'I’m not currently a student',
	'Prefer not to answer',
])

export const CountrySchema = z.enum(
	Object.values(countries) as [string, ...string[]],
)

/**
 * Sort in alphabetical order, except:
 * 1. Certain universities are put at the top.
 * 2. If a string starts with "the " (case-insensitive), the substring following "the " will be used for sorting.
 */
const sortUniversity = (a: string, b: string) => {
	const Loves = new Map<string, number>([
		['The University of Texas at Arlington', 10],
		['The University of Texas at Dallas', 10],
		['Texas A&M University', 6],
	])
	const normalize = (s: string) =>
		s.toLowerCase().startsWith('the ') ? s.slice(4) : s
	const [loveForA, loveForB] = [Loves.get(a), Loves.get(b)]
	const [weightA, weightB] = [
		loveForA !== undefined ? loveForA : 0,
		loveForB !== undefined ? loveForB : 0,
	]

	return weightB - weightA || normalize(a).localeCompare(normalize(b))
}

export const KnownUniversitySchema = z.enum(
	(universities as [string, ...string[]]).sort(sortUniversity),
)

export const TShirtSizeSchema = z.enum(['S', 'M', 'L', 'XL'])

export const KnownDietaryRestrictionSchema = z.enum([
	'Allergies',
	'Celiac Disease',
	'Halal',
	'Kosher',
	'Vegan',
	'Vegetarian',
	'None',
])

export const KnownGenderSchema = z.enum([
	'Man',
	'Woman',
	'Non-Binary',
	'Prefer Not to Answer',
])

export const KnownPronounsSchema = z.enum([
	'She/Her',
	'He/Him',
	'They/Them',
	'Prefer Not to Answer',
])

export const KnownRaceEthnicitySchema = z.enum([
	'Asian Indian',
	'Black or African',
	'Chinese',
	'Filipino',
	'Guamanian or Chamorro',
	'Hispanic / Latino / Spanish Origin',
	'Japanese',
	'Korean',
	'Middle Eastern',
	'Native American or Alaskan Native',
	'Native Hawaiian',
	'Samoan',
	'Vietnamese',
	'White',
	'Other Asian (Thai, Cambodian, etc)',
	'Other Paciﬁc Islander',
	'Prefer Not to Answer',
])

export const TernarySchema = z.enum(['Yes', 'No', 'Unsure'])

export const KnownSexualitySchema = z.enum([
	'Heterosexual or straight',
	'Gay or lesbian',
	'Bisexual',
	'Asexual',
	'Prefer Not to Answer',
])

export const KnownMajorSchema = z.enum([
	'Computer science, computer engineering, or software engineering',
	'Another engineering discipline (such as civil, electrical, mechanical, etc.)',
	'Information systems, information technology, or system administration',
	'A natural science (such as biology, chemistry, physics, etc.)',
	'Mathematics or statistics',
	'Web development or web design',
	'Business discipline (such as accounting, finance, marketing, etc.)',
	'Humanities discipline (such as literature, history, philosophy, etc.)',
	'Social science (such as anthropology, psychology, political science, etc.)',
	'Fine arts or performing arts (such as graphic design, music, studio art, etc.)',
	'Health science (such as nursing, pharmacy, radiology, etc.)',
	'Undecided / No Declared Major',
	'My school does not offer majors / primary areas of study',
	'Prefer not to answer',
])

export const YesNoSchema = z.enum(['Yes', 'No'])

/**
 * https://guide.mlh.io/general-information/managing-registrations/registration-timelines#some-important-registration-fields
 */
export const ApplicationSchema = z.object({
	firstName: z.string().nonempty(),
	lastName: z.string().nonempty(),
	age: z.number().int().gte(1).lte(127),
	phoneNumber: z.string().refine(validator.isMobilePhone),
	school: KnownUniversitySchema.or(z.string().nonempty()),
	levelOfStudy: LevelOfStudySchema,
	countryOfResidence: CountrySchema,
	tShirtSize: TShirtSizeSchema,
	dietaryRestriction: KnownDietaryRestrictionSchema.or(
		z.string().nonempty(),
	).array(),

	// Optional information.
	underrepresentedGroup: TernarySchema.optional(),
	gender: KnownGenderSchema.or(z.string()).optional(),
	pronouns: KnownPronounsSchema.or(z.string().nonempty()).array().optional(),
	raceEthnicity: KnownRaceEthnicitySchema.or(z.string().nonempty())
		.array()
		.optional(),
	sexuality: KnownSexualitySchema.or(z.string()).optional(),
	highestLevelOfEducation: LevelOfStudySchema.optional(),
	fieldOfStudy: KnownMajorSchema.or(z.string().nonempty()).array().optional(),
	resume: z.string().describe('base64-encoded resume document').optional(),
	monthsCoding: z.number().int().optional(),
	hackathonsAttended: z.number().int().optional(),
	catchall: z.string().optional(),

	// MLH checkboxes.
	agreedMlhCoC: z.literal('Yes'),
	agreedMlhSharing: z.literal('Yes'),
	agreedMlhMarketing: YesNoSchema,
})

export type Application = z.infer<typeof ApplicationSchema>

export type IdentifieableUser = ObjectId | User | string

export function getFullName(user: User): string {
	return `${user.application?.firstName} ${user.application?.lastName}`
}
