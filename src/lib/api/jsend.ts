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
	success: <T>(data: T): JSendSuccess<T> => ({
		status: 'success',
		data,
	}),
})

export default jsend

export type NextJSendResponse<T, E = unknown> = NextApiResponse<JSend<T, E>>

export type JSend<T, E = unknown> = JSendSuccess<T> | JSendError<E>

export interface JSendError<E = unknown> {
	status: 'error'
	code?: number
	data?: E
	message: string
}

export interface JSendSuccess<T> {
	status: 'success'
	data: T
}
