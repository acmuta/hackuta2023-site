import { z } from 'zod'

export const ShopSwagCollection = 'shop'

export const ShopSwapSchema = z.object({
	name: z.string(),
	price: z.number(),
})

export type ShopSwag = z.infer<typeof ShopSwapSchema>
