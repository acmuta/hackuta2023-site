import 'client-only'

import useSWR from 'swr'

import { EnhancedSession } from '../auth/shared'

export * from './shared'

export const jsonFetcher = (...args: Parameters<typeof fetch>) =>
	fetch(...args).then((res) => res.json())

export function useEnhancedSession() {
	const { data, error, isLoading } = useSWR<EnhancedSession>(
		'/api/auth/enhanced-session',
		jsonFetcher,
	)
	return {
		user: data?.user,
		perms: data?.perms,
		isError: !!error,
		isLoading,
	}
}
