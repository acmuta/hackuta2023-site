// JSend is a specification for JSON-based application-level communication.
// https://github.com/omniti-labs/jsend

import type { NextApiResponse } from 'next'

import { stringifyError } from '@/lib/utils/shared'

const jsend = Object.freeze({
	error: <E = unknown>(message: unknown, data?: E): JSendError<E> => ({
		status: 'error',
		data,
		message: stringifyError(message),
	}),
	fail: <F = unknown>(data: F): JSendFail<F> => ({
		status: 'fail',
		data,
	}),
	success: <T>(data: T): JSendSuccess<T> => ({
		status: 'success',
		data,
	}),
})

export default jsend

export type NextJSendResponse<T, E = unknown, F = unknown> = NextApiResponse<
	JSend<T, E, F>
>

export type JSend<T, E = unknown, F = unknown> =
	| JSendSuccess<T>
	| JSendError<E>
	| JSendFail<F>

export interface JSendError<E = unknown> {
	status: 'error'
	code?: number
	data?: E
	message: string
}

export interface JSendFail<F> {
	status: 'fail'
	data: F
}

export interface JSendSuccess<T> {
	status: 'success'
	data: T
}
