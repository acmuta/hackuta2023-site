import { JsonUser } from '@/lib/db/models/User'

export interface RenderContext {
	user: JsonUser | null
	linkedDiscordAccount: boolean
}
