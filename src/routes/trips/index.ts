import { FastifyInstance } from "fastify";
import tripService from "./trip.service";

import listTrips from "./useCases/list";
import readTrip from "./useCases/read";

export default async function index(fastify: FastifyInstance) {
  fastify.addHook("onRoute", (options) => {
    options.schema = {
      ...options.schema,
      tags: ["trips"],
    };
  });

  await fastify.register(tripService);

  const prefix = "/v1/trips";
  fastify.register(listTrips, { prefix });
  fastify.register(readTrip, { prefix });
}
