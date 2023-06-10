import { Accordion } from '@/components/Accordion'
import { FaqModel } from '@/lib/db/models/Faq'

import PageSection from '../PageSection'
import { queryDbForItems } from '../utils'

export function FaqSection({
	faqs,
}: {
	faqs: readonly FaqModel[] | undefined
}) {
	const content = !faqs ? (
		<>Failed loading FAQs. Please try again later.</>
	) : (
		<>
			{
				// order by _id
				[...faqs]
					.sort((a, b) => a._id - b._id)
					.map((faq) => (
						<Accordion
							key={`${faq.q}-${faq.a}`}
							summary={faq.q}
							dangerouslySetInnerHTMLOnChildren={{ __html: faq.a }}
						/>
					))
			}
		</>
	)

	return <PageSection heading="FAQ">{content}</PageSection>
}

export async function getFaqs(): Promise<FaqModel[] | undefined> {
	return queryDbForItems<FaqModel>('faqs', '[@/app/faq/page.tsx#getFaqs]')
}
