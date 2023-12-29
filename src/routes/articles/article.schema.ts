import { Static, Type } from "@sinclair/typebox";

export const listArticlesQuerystring = Type.Object(
  {
    limit: Type.Integer({
      maximum: 100,
      default: 10,
      description: "Number of results (pagination).",
    }),
    offset: Type.Integer({
      maximum: 100,
      default: 0,
      description: "Items to skip (pagination).",
    }),
  },
  { additionalProperties: false }
);
export type ListArticlesQuerystringType = Static<
  typeof listArticlesQuerystring
>;

export const listArticleParams = Type.Object(
  {
    id: Type.String({
      format: "uuid",
      description: "Article id.",
    }),
  },
  { additionalProperties: false }
);
export type ListArticleParamsType = Static<typeof listArticleParams>;

export const SlistArticles = Type.Object(
  {
    id: Type.String({ format: "uuid", description: "##TODO" }),
    title: Type.String({ minLength: 3, description: "##TODO" }),
  },
  { additionalProperties: false }
);
export type ListArticlesType = Static<typeof SlistArticles>;

//##TODO improve this mess

export const listArticlesResponse = Type.Array(
  Type.Object(
    {
      id: Type.String({
        format: "uuid",
        description: "Article id.",
      }),
      title: Type.String({
        description: "Article title.",
      }),
      status: Type.String({
        description: "Article status.",
      }),
      category: Type.String({
        description: "Article category.",
      }),
      createdAt: Type.Any({
        description: "Article creation date.",
      }),
    },
    { additionalProperties: false }
  )
);

export const articlesResponse = Type.Object(
  {
    id: Type.String({
      format: "uuid",
      description: "Article id.",
    }),
    title: Type.String({
      description: "Article title.",
    }),
    status: Type.String({
      description: "Article status.",
    }),
    category: Type.String({
      description: "Article category.",
    }),
    createdAt: Type.Any({
      description: "Article creation date.",
    }),
  },
  { additionalProperties: false }
);
