import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RegisterOptions,
} from "fastify";

import {
  ListTripsQuerystringType,
  listTripsQuerystring,
  listTripsResponse,
} from "../trip.schema";
import { buildRouteFullDescription } from "../../../common/utils";
import { ITrip } from "../trip.interfaces";

export default async function listTrips(
  fastify: FastifyInstance,
  opts: RegisterOptions
) {
  const { tripService } = fastify;

  fastify.route({
    url: "/",
    method: "GET",
    schema: {
      description: buildRouteFullDescription({
        api: "list",
        description: "List trips.",
      }),
      querystring: listTripsQuerystring,
      response: {
        200: listTripsResponse,
      },
    },
    handler: onListTrips,
  });

  async function onListTrips(
    req: FastifyRequest<{ Querystring: ListTripsQuerystringType }>,
    reply: FastifyReply
  ): Promise<ITrip[]> {
    const { limit, offset } = req.query;

    const trips = await tripService.list({
      pagination: {
        limit,
        offset,
      },
    });

    return trips;
  }
}
