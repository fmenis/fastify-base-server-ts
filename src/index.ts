import Fastify from 'fastify';
import env from '@fastify/env'

import { configSchema } from './utils/env.schema.js';

declare module 'fastify' {
	interface FastifyInstance {
		env: any
	}
}


const fastify = Fastify({
	logger: {
		level: "debug"
	}
})
//##TODO
// const fastify = Fastify(buildServerOptions())


async function run() {
	try {
		await fastify.register(env, {
			confKey: 'env',
			dotenv: true,
			schema: configSchema,
		})

		// await fastify.register(app)
		await fastify.ready()

		await fastify.listen({
			port: fastify.env.SERVER_PORT,
			host: fastify.env.SERVER_ADDRESS,
		})

		fastify.log.debug(
			`Server launched in '${fastify.env.NODE_ENV}' environment`,
		)
	} catch (error) {
		fastify.log.fatal(error)
		process.exit(1)
	}
}

run()