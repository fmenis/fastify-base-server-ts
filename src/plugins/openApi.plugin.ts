import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import { getServerVersion } from "../utils/utils.js";

async function openApi(fastify: FastifyInstance): Promise<void> {
  const version = getServerVersion();

  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Fastify API docs",
        description: "OpenApi v3 documentation",
        version,
        contact: {
          name: "API Support",
          email: "filippomeniswork@gmail.com",
        },
      },
      externalDocs: {
        description: "Find more info here",
        url: "https://github.com/fmenis/fastify-base-server-ts",
      },
      servers: [
        {
          url: `http://{domain}:{port}`,
          description: "Service api",
          variables: {
            port: {
              default: process.env.SERVER_PORT!,
            },
            domain: {
              default: process.env.SERVER_ADDRESS!,
            },
          },
        },
      ],
      tags: [{ name: "users", description: "Users related end-points" }].sort(
        (a, b) => a.name.localeCompare(b.name),
      ),
    },
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: "/doc",
  });
}

export default fp(openApi);
