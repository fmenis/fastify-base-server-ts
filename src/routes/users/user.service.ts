import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import { IUser } from "./user.interfaces.js";
import { IListParams } from "../../common/interface.common.js";

declare module "fastify" {
  interface FastifyInstance {
    userService: {
      list(params: IListUsersParams): Promise<Readonly<IUser[]>>;
      // read(params: { id: string }): Promise<ITrip | null>
    };
  }
}

export interface IListUsersParams extends IListParams {}

async function userService(fastify: FastifyInstance): Promise<void> {
  const { prisma } = fastify;

  async function list(params: IListUsersParams): Promise<Readonly<IUser[]>> {
    const { limit, offset } = params.pagination;

    const users = await prisma.user.findMany({
      take: limit,
      skip: offset,
    });

    return users;
  }

  fastify.decorate("userService", {
    list,
  });
}

export default fp(userService);
