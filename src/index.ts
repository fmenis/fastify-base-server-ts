import Fastify, { FastifyInstance } from "fastify";
import env from "@fastify/env";
import fastifyPrisma from "@joggr/fastify-prisma";
import { PrismaClient } from "./generated/prisma/client.js";

import { configSchema, ConfigSchemaType } from "./utils/env.schema.js";
import { buildServerOptions } from "./utils/server.options.js";
import app from "./app.js";

declare module "fastify" {
  interface FastifyInstance {
    env: ConfigSchemaType;
    prisma: PrismaClient;
  }
}

const fastify: FastifyInstance = Fastify(buildServerOptions());

async function run() {
  try {
    await fastify.register(env, {
      confKey: "env",
      dotenv: true,
      schema: configSchema,
    });

    await fastify.register(fastifyPrisma, {
      client: new PrismaClient({
        log: ["query", "info", "warn", "error"],
      }),
    });

    await fastify.register(app);
    await fastify.ready();

    await fastify.listen({
      port: fastify.env.SERVER_PORT,
      host: fastify.env.SERVER_ADDRESS,
    });

    fastify.log.debug(
      `Server launched in '${fastify.env.APP_ENV}' environment`,
    );
  } catch (error) {
    fastify.log.fatal(error);
    process.exit(1);
  }
}

run();
