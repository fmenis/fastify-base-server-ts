import Fastify from 'fastify'
import env from '@fastify/env'
import closeWithGrace from 'close-with-grace'

import { ConfigSchemaType, configSchema } from './utils/env.schema'
import { buildServerOptions } from './utils/serverOpts'

import app from './app'

declare module 'fastify' {
  interface FastifyInstance {
    env: ConfigSchemaType
  }
}

const fastify = Fastify(buildServerOptions())

closeWithGrace({ delay: 500 }, async ({ signal, err }) => {
  if (err) {
    fastify.log.error({ err }, 'server closing with error')
  } else {
    fastify.log.info(`${signal} received, server closing`)
  }
  await fastify.close()
})

async function run() {
  try {
    await fastify.register(env, {
      confKey: 'env',
      dotenv: true,
      schema: configSchema,
    })

    await fastify.register(app)
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

/**
 * ##TODO
 * - understand how to exec test in parallel
 * - understand how to apply migrations before tests
 * - remove tap and use node test runner
 * - use autoload
 * - implement cookie based auth
 * - add sentry
 * - add eslint
 * - add error handling
 */
