import { FastifyInstance } from "fastify";

import userRoutes from "./users/index.js";

export default async function index(fastify: FastifyInstance): Promise<void> {
  await fastify.register(userRoutes);
}
