import z from 'zod'

export const BlockedHackerCollection = 'blocked_hackers'

export const BlockedHackerSchema = z.object({
	first_name: z.string(),
	last_name: z.string(),
})

export type BlockedHacker = z.infer<typeof BlockedHackerSchema>
