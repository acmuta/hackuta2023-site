import { Filter } from 'mongodb'
import z from 'zod'

import User from '@/lib/db/models/User'

export const PostBodySchema = z.object({
	recipients: z.array(z.string()),
	tag: z.string().nonempty(),
	subject: z.string().nonempty(),
	text: z.string(),
	html: z.string(),
})

export const RecipientFilters: Record<string, Filter<User>> = {
	'All Users': {},
	'Application - Applied': { application: { $exists: true } },
	'Application - Applied and Received no Decision': {
		application: { $exists: true },
		applicationStatus: { $exists: false },
	},
	'Application - Accepted': { applicationStatus: 'accepted' },
	'Application - Rejected': { applicationStatus: 'rejected' },
	'Application - Waitlisted': { applicationStatus: 'waitlisted' },
	// 'Checked-In Users': { checkedIn: { $exists: true } },
}

export const CooldownMs = 50
