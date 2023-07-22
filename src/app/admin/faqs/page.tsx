import { getFaqs } from '../../faq/utils'
import JsonEditor from '../JsonEditor'

export default async function Events() {
	const faqs = await getFaqs()
	return (
		<>
			<h2>FAQs</h2>
			{faqs ? (
				<JsonEditor
					text={JSON.stringify(faqs, undefined, 4)}
					postUrl="/api/admin/faq"
					schema="faq"
				/>
			) : (
				'Error.'
			)}
		</>
	)
}
