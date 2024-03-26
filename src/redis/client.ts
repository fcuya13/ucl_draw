import { createClient } from 'redis';
// @ts-ignore
const client = createClient({
	socket: {
		host: process.env.REDIS_HOST,
		port: parseInt(process.env.REDIS_PORT? process.env.REDIS_PORT  : "6379")
	},
	password: process.env.REDIS_PW,
	/*
	scripts:{
		incrementView: defineScript({
			NUMBER_OF_KEYS: 3,
			SCRIPT: `
				local itemsViewsKey = KEYS[1]
				local itemsKey = KEYS[2]
				local itemsByViewsKey = KEYS[3]
				local itemId = ARGV[1]
				local userId = ARGV[2]

				local inserted = redis.call('PFADD', itemsViewsKey, userId)

				if inserted == 1 then
					redis.call('HINCRBY', itemsKey, 'views', 1)
					redis.call('ZINCRBY', itemsByViewsKey, 1, itemId)
				end
			`,
			transformArguments(itemId: string, userId: string){
				return[viewsKey(itemId), itemsKey(itemId), itemsByViewsKey(), itemId, userId]
			},
			transformReply() {}
		}),
		unlock: defineScript({
			NUMBER_OF_KEYS: 1,
			SCRIPT: `
				if redis.call('GET', KEYS[1]) == ARGV[1] then
					return redis.all('DEL', KEYS[1])
				end
			`,
			transformArguments(key: string, token: string){
				return [key, token]
			},
			transformReply() {}
		})
	}*/

});

client.on('error', (err) => console.error(err));
client.connect();

export { client };