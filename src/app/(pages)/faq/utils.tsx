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
			{faqs.map(({ q, a }) => (
				<Accordion
					key={`${q}-${a}`}
					summary={q}
					// DANGER: Absolutely no unsanitized user input allowed!!! We deem admins trustworthy.
					dangerouslySetInnerHTMLOnChildren={{ __html: a }}
				/>
			))}
		</>
	)

	return <PageSection heading="FAQ">{content}</PageSection>
}

export async function getFaqs(): Promise<FaqModel[] | undefined> {
	return queryDbForItems<FaqModel>('faqs', '[@/app/faq/page.tsx#getFaqs]')
}
