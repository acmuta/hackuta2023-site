import { FaqSection, getFaqs } from './utils'

export const revalidate = 10

export default async function faq() {
	const faqs = await getFaqs()
	return FaqSection({ faqs })
}
