import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RegisterOptions,
} from "fastify";

import {
  ListArticleParamsType,
  articlesResponse,
  listArticleParams,
} from "../article.schema";
import { buildRouteFullDescription } from "../../../common/utils";
import { IArticle } from "../article.interfaces";

export default async function readArticle(
  fastify: FastifyInstance,
  opts: RegisterOptions
) {
  const { articleService, commonClientErrors } = fastify;

  fastify.route({
    url: "/:id",
    method: "GET",
    schema: {
      description: buildRouteFullDescription({
        api: "read",
        description: "Read article.",
        errors: commonClientErrors.errors,
      }),
      params: listArticleParams,
      response: {
        200: articlesResponse,
        404: fastify.getSchema("sNotFound"),
      },
    },
    handler: onReadArticle,
  });

  async function onReadArticle(
    req: FastifyRequest<{ Params: ListArticleParamsType }>,
    reply: FastifyReply
  ): Promise<IArticle> {
    const { id } = req.params;

    const article = await articleService.read({
      id,
    });

    return article;
  }
}
