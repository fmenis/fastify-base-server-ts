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
  // const { prisma, commonClientErrors } = fastify

  async function list(params: IListUsersParams): Promise<Readonly<IUser[]>> {
    return [];
  }

  fastify.decorate("userService", {
    list,
  });
}

export default fp(userService);
