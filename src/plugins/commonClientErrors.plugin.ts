import { FastifyInstance } from 'fastify'
import Fp from 'fastify-plugin'

//##TODO
// interface IClientError {
//   code: string;
//   description: string;
//   apis: string[];
//   statusCode: number;
// }

declare module 'fastify' {
  interface FastifyInstance {
    commonClientErrors: {
      throwNotFoundError(data: { name: string; id: string }): void
      // errors: IClientError[];
      errors: any
    }
  }
}

async function commonErrors(fastify: FastifyInstance) {
  const { createError } = fastify.httpErrors

  function throwNotFoundError(data: { name: string; id: string }): void {
    const { name, id } = data
    const message = `Entity '${name}' with '${id}' not found.`
    throw createError(404, message, {
      internalCode: 'NOT_FOUND',
      details: { entityId: id, entityName: name },
    })
  }

  fastify.decorate('commonClientErrors', {
    throwNotFoundError,
    errors: [
      {
        code: '*NOT_FOUND*',
        description: 'occurs when the target entity is not present.',
        apis: ['read'],
        statusCode: 404,
      },
    ],
  })
}

export default Fp(commonErrors)
