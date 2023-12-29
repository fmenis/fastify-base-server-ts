import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RegisterOptions,
} from "fastify";

import {
  ListArticlesQuerystringType,
  listArticlesQuerystring,
  listArticlesResponse,
} from "../article.schema";
import { buildRouteFullDescription } from "../../../common/utils";
import { IArticle } from "../article.interfaces";

export default async function listArticles(
  fastify: FastifyInstance,
  opts: RegisterOptions
) {
  const { articleService } = fastify;

  fastify.route({
    url: "/",
    method: "GET",
    schema: {
      description: buildRouteFullDescription({
        api: "list",
        description: "List articles.",
      }),
      querystring: listArticlesQuerystring,
      response: {
        200: listArticlesResponse,
      },
    },
    handler: onListArticles,
  });

  async function onListArticles(
    req: FastifyRequest<{ Querystring: ListArticlesQuerystringType }>,
    reply: FastifyReply
  ): Promise<IArticle[]> {
    const { limit, offset } = req.query;

    const articles = await articleService.list({
      pagination: {
        limit,
        offset,
      },
    });

    return articles;
  }
}
