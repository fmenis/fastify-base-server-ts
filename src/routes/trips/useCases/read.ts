import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RegisterOptions,
} from 'fastify'

import {
  ListTripsParamsType,
  tripsResponse,
  listTripsParams,
} from '../trip.schema'
import { buildRouteFullDescription } from '../../../common/utils'
import { ITrip } from '../trip.interfaces'

export default async function readTrip(
  fastify: FastifyInstance,
  opts: RegisterOptions,
) {
  const { tripService, commonClientErrors } = fastify

  fastify.route({
    url: '/:id',
    method: 'GET',
    schema: {
      description: buildRouteFullDescription({
        api: 'read',
        description: 'Read trip.',
        errors: commonClientErrors.errors,
      }),
      params: listTripsParams,
      response: {
        200: tripsResponse,
        404: fastify.getSchema('sNotFound'),
      },
    },
    handler: onReadTrip,
  })

  async function onReadTrip(
    req: FastifyRequest<{ Params: ListTripsParamsType }>,
    reply: FastifyReply,
  ): Promise<ITrip | null> {
    const { id } = req.params

    const trip = await tripService.read({
      id,
    })

    return trip
  }
}
