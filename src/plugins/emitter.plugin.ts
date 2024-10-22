import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { EventEmitter } from 'events'
import axios from 'axios'

declare module 'fastify' {
  interface FastifyInstance {
    emitter: EventEmitter
  }
}

enum Events {
  CLIENT_ERROR = 'CLIENT_ERROR',
}

async function emitter(fastify: FastifyInstance): Promise<void> {
  const emitter = new EventEmitter()

  emitter.on(Events.CLIENT_ERROR, async data => {
    console.log(data.NotFoundError)

    let params = {
      username: 'phil',
      content: JSON.stringify(data),
    }

    try {
      await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(params),
        url: 'https://discord.com/api/webhooks/1191403749164453939/VP_sKBAQH-wQIq2GFGebjIVZ1YmhEacB9H44gpKNiVOaFqReb1RVH_srBu86tP3xLUrm',
      })
    } catch (error) {
      fastify.log.error(error)
    }
  })

  fastify.decorate('emitter', emitter)

  // fastify.decorate("emitter", {
  //   emitter,
  //   events: Events,
  // });
}

export default fp(emitter)
