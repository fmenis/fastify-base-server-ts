import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import helmet from "@fastify/helmet";

import apiPlugin from "./routes/index.js";

export default async function app(fastify: FastifyInstance): Promise<void> {
  fastify.register(cors, {
    methods: ["POST", "PUT", "PATCH", "DELETE"],
    // origin: true, //##TODO choose auth system
    // credentials: true,
  });

  fastify.register(sensible);
  fastify.register(helmet);

  await fastify.register(apiPlugin, { prefix: "/api" });
}
