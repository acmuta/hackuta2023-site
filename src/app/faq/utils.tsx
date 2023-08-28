import { WithId } from 'mongodb'

import { Accordion } from '@/components/Accordion'
import { FaqModel } from '@/lib/db/models/Faq'

import { queryDbForItems } from '../utils'
import { WavyPattern } from '../WavyPattern'

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
					// .sort((a, b) => a._id - b._id)
					.map((faq) => (
						<Accordion
							className='drop-shadow-hackuta border-l-4 border-hackuta-yellow pl-4'
							arrowClassName='text-hackuta-red drop-shadow-hackuta'
							summaryClassName='text-xl font-body'
							contentClassName='font-body mb-4'
							key={`${faq.q}-${faq.a}`}
							summary={faq.q}
							dangerouslySetInnerHTMLOnChildren={{ __html: faq.a }}
						/>
					))
			}
		</>
	)

	// return <PageSection heading="FAQ">{content}</PageSection>
	return (
		<div className="flex flex-col items-start justify-start gap-8 bg-hackuta-blue p-16 w-full">
			<h2 className='flex flex-col items-start gap-2 font-heading drop-shadow-hackuta text-white text-4xl'>
				Frequently Asked
				<WavyPattern className='w-32' />
			</h2>
			<div className='flex flex-col gap-4 w-1/2'>{content}</div>
		</div>
	)
}

export async function getFaqs(): Promise<WithId<FaqModel>[] | undefined> {
	return queryDbForItems<FaqModel>('faqs', '[@/app/faq/page.tsx#getFaqs]') as Promise<WithId<FaqModel>[]>
}
