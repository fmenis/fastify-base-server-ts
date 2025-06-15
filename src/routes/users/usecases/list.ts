import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RegisterOptions,
} from "fastify";

import {
  ListUsersQuerystringType,
  listUsersQuerystring,
  listTripsResponse,
} from "../user.schema.js";
import { IUser } from "../user.interfaces.js";
import { buildRouteFullDescription } from "../../../common/utils.js";

export default async function listUsers(
  fastify: FastifyInstance,
  opts: RegisterOptions,
) {
  const { userService } = fastify;

  fastify.route({
    url: "/",
    method: "GET",
    schema: {
      description: buildRouteFullDescription({
        api: "list",
        description: "List users.",
      }),
      querystring: listUsersQuerystring,
      response: {
        200: listTripsResponse,
      },
    },
    handler: onListUsers,
  });

  async function onListUsers(
    req: FastifyRequest<{ Querystring: ListUsersQuerystringType }>,
    reply: FastifyReply,
  ): Promise<Readonly<IUser[]>> {
    const { limit, offset } = req.query;

    const users = await userService.list({
      pagination: {
        limit,
        offset,
      },
    });

    return users;
  }
}
