import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import { User } from "./user.interfaces.js";
import { PaginationParams } from "../../common/interface.js";
import { buildPaginationParams } from "../../common/utils.js";

declare module "fastify" {
  interface FastifyInstance {
    userService: {
      list(params: {
        filters: ListUsersFilters;
        pagination: PaginationParams;
      }): Promise<Readonly<User[]>>;
      // read(params: { id: string }): Promise<ITrip | null>
    };
  }
}

export interface ListUsersFilters {
  email?: string;
}

async function userService(fastify: FastifyInstance): Promise<void> {
  const { prisma } = fastify;

  async function list(params: {
    filters: ListUsersFilters;
    pagination: PaginationParams;
  }): Promise<Readonly<User[]>> {
    const { filters, pagination } = params;

    const users = await prisma.user.findMany({
      ...buildPaginationParams(pagination),
      where: {
        AND: {
          email: {
            contains: filters.email,
          },
        },
      },
    });

    return users;
  }

  fastify.decorate("userService", {
    list,
  });
}

export default fp(userService);
