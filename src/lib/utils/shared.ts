import type { ObjectId } from 'mongodb'
import { z } from 'zod'

import { JSend } from '@/lib/api/jsend'

export function range(start: number, end: number) {
	return new Array(end - start).fill(undefined).map((_, i) => i + start)
}

export function stringifyError(e: unknown) {
	return e instanceof Error ? e.message : JSON.stringify(e)
}

export function dedupe<T>(arr: readonly T[]): T[] {
	return [...new Set(arr)]
}

export function intersection<T>(a: readonly T[], b: readonly T[]): T[] {
	return [...new Set(a.filter((x) => b.includes(x)))]
}

export const toOption = (v: string | number) => ({
	label: v.toString(),
	value: v.toString(),
})
export const zodEnumToOptions = (zodEnum: z.ZodEnum<[string, ...string[]]>) =>
	Object.values(zodEnum.Values).map(toOption)

export async function fetchPost<TJSend>(
	postUrl: URL | RequestInfo,
	body?: BodyInit | null | undefined,
) {
	const response = (await (
		await fetch(postUrl, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: body,
		})
	).json()) as JSend<TJSend>
	if (response.status === 'success') {
		window.location.reload()
	} else {
		throw new Error(stringifyError(response))
	}
}

export function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Convert all `Date` and `ObjectId` fields in an object to `string`s.
 */
export type ToJsonValue<T> = T extends Date | ObjectId
	? string
	: T extends object
	? {
			[K in keyof T]: ToJsonValue<T[K]>
	  }
	: T
