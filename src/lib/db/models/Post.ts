import z from 'zod'

export const PostSlugPattern = /^[a-z0-9-]+$/

export const CardStyleSchema = z.enum([
	'blue',
	'green',
	'red',
	'yellow',
	'white',
])

export type CardStyle = z.infer<typeof CardStyleSchema>

export const PostSchema = z.object({
	name: z.string().nonempty(),
	slug: z.string().regex(PostSlugPattern),
	priority: z.number({
		description: 'Lower number, higher priority.',
	}),
	cardStyle: CardStyleSchema.optional(),
	briefSource: z
		.string({
			description: 'A brief over the post in MarkDown using doT template',
		})
		.optional(),
	contentSource: z
		.string({
			description:
				'The main content of the post in MarkDown using doT template',
		})
		.optional(),
	visibleCondition: z
		.string({
			description:
				'The visible condition using JavaScript expression; visible iff evaluates to true',
		})
		.optional(),
})

export type Post = z.infer<typeof PostSchema>
