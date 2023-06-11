import { JSDOM } from 'jsdom'

import logger from '@/lib/logger'

export type ScraperOutput = {
	email: string
	points: number
}

const RevalidateSeconds = 15 * 60
const IndexEmail = 2

export const fetchTable = async (
	url: string,
	pointsIndex: number,
): Promise<ScraperOutput[]> => {
	const response = await fetch(url, {
		method: 'GET',
		next: { revalidate: RevalidateSeconds },
	})

	if (!response.ok) {
		logger.error('There was an error fetching a response')
		return []
	}

	const body = await response.text()
	const { document } = new JSDOM(body).window
	const table = findTable(document)

	if (table === undefined) {
		logger.error('Could not find a table inside the HTML document')
		return []
	}

	return scrapeTable(table, pointsIndex)
}

export const findTable = (doc: Document): HTMLTableElement | undefined => {
	const queryNodes = doc.querySelector('table')
	if (queryNodes) {
		return queryNodes
	}
	return undefined
}

export const scrapeTable = (
	table: HTMLTableElement,
	pointsIndex: number,
): ScraperOutput[] => {
	const rows = table.rows
	const output: ScraperOutput[] = []

	// don't parse the last row because that repeats the properties
	for (let i = 1; i < rows.length - 1; i++) {
		const row: HTMLTableRowElement = rows[i]
		const cells: HTMLCollectionOf<HTMLTableCellElement> = row.cells

		output.push({
			email: cells[IndexEmail].textContent as string,
			points: Number.parseInt(cells[pointsIndex].textContent as string),
		})
	}

	return output
}
