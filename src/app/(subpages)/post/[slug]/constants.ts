import doT from 'dot'

import { JsonUser } from '@/lib/db/models/User'

export const doTSettings: doT.TemplateSettings = {
	...doT.templateSettings,
	strip: false,
}

export interface RenderContext {
	user: JsonUser | null
	linkedDiscordAccount: boolean
}
