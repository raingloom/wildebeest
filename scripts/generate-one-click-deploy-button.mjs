const PROJECT_URL = 'https://github.com/cloudflare/wildebeest'
const ONE_CLICK_BASE_URL = 'https://deploy.workers.cloudflare.com'
const FIELDS = [
	{
		name: 'Zone ID',
		secret: 'CF_ZONE_ID',
		descr: 'Get your Zone ID from the Cloudflare Dashboard',
	},
	{
		name: 'Domain',
		secret: 'CF_DEPLOY_DOMAIN',
		descr: 'Domain on which your instance will be running',
	},
	{
		name: 'Instance title',
		secret: 'INSTANCE_TITLE',
		descr: 'Title of your instance',
	},
	{
		name: 'Administrator Email',
		secret: 'ADMIN_EMAIL',
		descr: 'An Email address that can be messaged regarding inquiries or issues',
	},
	{
		name: 'Instance description',
		secret: 'INSTANCE_DESCR',
		descr: 'A short, plain-text description of your instance',
	},
]

const fields = FIELDS.map((x) => JSON.stringify(x))
	.map((v) => `fields=${v}`)
	.join('&')
const url = new URL(`/?url=${PROJECT_URL}&authed=true&${fields}`, ONE_CLICK_BASE_URL)
console.log(url.href)
