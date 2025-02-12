import type { Env } from 'wildebeest/backend/src/types/env'
import { DEFAULT_THUMBNAIL } from 'wildebeest/backend/src/config'
import type { InstanceConfigV2 } from 'wildebeest/backend/src/types/configs'

const INSTANCE_VERSION = '4.0.2'

export const onRequest: PagesFunction<Env, any> = async ({ env, request }) => {
	const domain = new URL(request.url).hostname
	return handleRequest(domain, env.DATABASE, env)
}

export async function handleRequest(domain: string, db: D1Database, env: Env) {
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'content-type, authorization',
		'content-type': 'application/json; charset=utf-8',
	}

	const res: InstanceConfigV2 = {
		domain,
		title: env.INSTANCE_TITLE,
		version: INSTANCE_VERSION,
		source_url: 'https://github.com/cloudflare/wildebeest',
		description: env.INSTANCE_DESCR,
		thumbnail: {
			url: DEFAULT_THUMBNAIL,
		},
		languages: ['en'],
		registrations: {
			// Registration is disabled because unsupported by Wildebeest. Users
			// should go through the login flow and authenticate with Access.
			enabled: false,
		},
		contact: {
			email: env.ADMIN_EMAIL,
		},
		rules: [],
	}

	return new Response(JSON.stringify(res), { headers })
}
