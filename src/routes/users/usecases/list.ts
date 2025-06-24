import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RegisterOptions,
} from "fastify";

import {
  ListUsersQuerystringType,
  listUsersQuerystring,
  listUsersResponse,
} from "../user.schema.js";
import { User } from "../user.interfaces.js";
import { buildRouteFullDescription } from "../../../utils/utils.js";
import { ListUsersFilters } from "../user.service.js";
import { PaginationParams } from "../../../common/interface.js";

export default async function listUsers(
  fastify: FastifyInstance,
  opts: RegisterOptions, //##TODO add eslint rule for unused variables
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
        200: listUsersResponse,
      },
    },
    handler: onListUsers,
  });

  async function onListUsers(
    req: FastifyRequest<{ Querystring: ListUsersQuerystringType }>,
    reply: FastifyReply,
  ): Promise<Readonly<User[]>> {
    const { email, limit, offset } = req.query;

    const filters: ListUsersFilters = {
      email,
    };

    const pagination: PaginationParams = {
      limit,
      offset,
    };

    const users = await userService.list({
      filters,
      pagination,
    });

    return users;
  }
}
