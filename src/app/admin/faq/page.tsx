import { getFaqs } from '../../faq/utils'
import FaqEditor from './FaqEditor'

export default async function Events() {
	const faqs = await getFaqs()
	return faqs
		? (
			<FaqEditor
				faqs={faqs.map((f) => ({
					_id: f._id.toString(),
					q: f.q,
					a: f.a,
					next: f.next?.toString() ?? null,
				}))}
			/>
		)
		: 'Error'
}
