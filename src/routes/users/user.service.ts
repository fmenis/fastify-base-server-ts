import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import { User } from "./user.interfaces.js";
import { PaginationParams } from "../../common/interface.js";
import { buildPaginationParams } from "../../utils/utils.js";

declare module "fastify" {
  interface FastifyInstance {
    userService: {
      list(params: {
        filters: ListUsersFilters;
        pagination: PaginationParams;
      }): Promise<Readonly<User[]>>;
    };
  }
}

export interface ListUsersFilters {
  email?: string;
}

async function userService(fastify: FastifyInstance): Promise<void> {
  const { prisma, commonClientErrors } = fastify;

  async function list(params: {
    filters: ListUsersFilters;
    pagination: PaginationParams;
  }): Promise<Readonly<User[]>> {
    const { filters, pagination } = params;

    commonClientErrors.throwNotFoundError({ id: "fgfdsgsfg", name: "user" });

    const users = await prisma.user.findMany({
      ...buildPaginationParams(pagination),
      where: {
        AND: {
          email: {
            contains: filters.email,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return users;
  }

  fastify.decorate("userService", {
    list,
  });
}

export default fp(userService);
