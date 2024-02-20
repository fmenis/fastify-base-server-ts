import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import helmet from "@fastify/helmet";

import apiPlugin from "./routes/index";
import emitterPlugin from "./plugins/emitter.plugin";

export default async function app(fastify: FastifyInstance): Promise<void> {
  fastify.register(cors, {
    methods: ["POST", "PUT", "PATCH", "DELETE"],
    origin: true,
    credentials: true,
  });

  fastify.register(sensible);

  fastify.register(helmet);
  fastify.register(emitterPlugin);

  await fastify.register(apiPlugin, { prefix: "/api" });
}
