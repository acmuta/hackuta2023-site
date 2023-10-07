import clientPromise from '@/lib/db'
import { ShopSwag, ShopSwagCollection } from '@/lib/db/models/ShopSwap'
import JsonEditor from '../JsonEditor'

export default async function Shop() {
	const client = await clientPromise
	const swags = await client.db()
		.collection<ShopSwag>(ShopSwagCollection)
		.find()
		.sort({ price: 'ascending' })
		.toArray()
	return (
		<>
			{swags
				? (
					<JsonEditor
						text={JSON.stringify(
							swags.map((s) => ({ ...s, _id: undefined })),
							undefined,
							4,
						)}
						postUrl="/api/admin/shop"
						schema="shop"
					/>
				)
				: (
					'Error.'
				)}
		</>
	)
}
