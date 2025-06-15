import { FastifyInstance } from "fastify";
import userService from "./user.service.js";
import listUsers from "./usecases/list.js";

export default async function index(fastify: FastifyInstance): Promise<void> {
  fastify.register(userService);

  const prefix = "/v1/users";
  fastify.register(listUsers, { prefix });
}
