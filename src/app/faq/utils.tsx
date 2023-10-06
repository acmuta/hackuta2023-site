import { WithId } from 'mongodb'

import { Accordion } from '@/components/Accordion'
import { WavyPattern } from '@/components/WavyPattern'
import clientPromise from '@/lib/db'
import { FaqModel } from '@/lib/db/models/Faq'
import logger from '@/lib/logger'

import { MarkDownRenderer } from '../admin/post/MarkDownRenderer'

export function FaqSection({
	faqs,
}: {
	faqs: readonly FaqModel[] | undefined
}) {
	const content = !faqs ? <>Failed loading FAQs. Please try again later.</> : (
		<>
			{
				// order by _id
				[...faqs]
					// .sort((a, b) => a._id - b._id)
					.map((faq) => (
						<Accordion
							className="drop-shadow-hackuta border-l-4 border-hackuta-darkred pl-4 w-full max-w-md transition-all hover:drop-shadow-none"
							arrowClassName="text-hackuta-red drop-shadow-hackuta"
							summaryClassName="text-xl font-body"
							contentClassName="font-body mb-4"
							key={`${faq.q}-${faq.a}`}
							summary={faq.q}
						>
							<MarkDownRenderer>{faq.a}</MarkDownRenderer>
						</Accordion>
					))
			}
		</>
	)

	// return <PageSection heading="FAQ">{content}</PageSection>
	return (
		<div className="flex flex-col items-center justify-start gap-8 bg-hackuta-red bg-hackuta-pattern-transparent p-8 md:p-16 w-full">
			<h2 className="flex flex-col items-center gap-2 font-heading drop-shadow-hackuta text-white text-4xl">
				Frequently Asked
				<WavyPattern className="w-32" />
			</h2>
			<div className="flex flex-row flex-wrap gap-4 items-start justify-center">
				{content}
			</div>
		</div>
	)
}

export async function getFaqs(): Promise<WithId<FaqModel>[] | undefined> {
	try {
		const client = await clientPromise
		const faqs = await client.db().collection<FaqModel>('faqs').find()
			.toArray()

		// Convert the linked list into an array.

		// I have discovered a truly marvelous O(N) solution for this,
		// which the space between the comments is too small to contain.

		// O(N^2) brute force:
		const head = faqs.find(
			(head) =>
				!faqs.find((v) => v.next?.toString() === head._id.toString()),
		)
		const ans: typeof faqs = []
		let node = head
		while (node) {
			ans.push(node)
			node = faqs.find((v) => v._id.toString() === node!.next?.toString())
		}
		return ans
	} catch (e) {
		logger.error(e, 'getFaqs')
		return undefined
	}
}
