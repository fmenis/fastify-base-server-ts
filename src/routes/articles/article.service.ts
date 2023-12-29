import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { IListParams } from "../common/interface.common";
import { IArticle } from "./article.interfaces";

declare module "fastify" {
  interface FastifyInstance {
    articleService: {
      list(params: IListArticlesParams): Promise<IArticle[]>;
      read(params: { id: string }): Promise<IArticle>;
    };
  }
}

export interface IListArticlesParams extends IListParams {}

async function articleService(fastify: FastifyInstance): Promise<void> {
  const { commonClientErrors } = fastify;

  async function list(params: IListArticlesParams): Promise<IArticle[]> {
    const { pagination } = params;
    console.log(pagination);

    return [
      {
        id: "sdfasdgd",
        status: "CREATED",
        title: "foo",
        category: "boo",
        createdAt: new Date(),
      },
    ];
  }

  async function read(params: { id: string }): Promise<IArticle> {
    const { id } = params;

    if (id === "ciao") {
      commonClientErrors.throwNotFoundError({ id, name: "article" });
    }

    return {
      id: "sdfasdgd",
      status: "CREATED",
      title: "foo",
      category: "boo",
      createdAt: new Date(),
    };
  }

  fastify.decorate("articleService", {
    list,
    read,
  });
}

export default fp(articleService);
