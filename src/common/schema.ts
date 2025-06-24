import { Type, TSchema } from "@sinclair/typebox";

export function StringEnum<T extends string[]>(values: [...T]) {
  return Type.Unsafe<T[number]>({ type: "string", enum: values });
}

export const Nullable = <T extends TSchema>(schema: T) =>
  Type.Union([schema, Type.Null()]);

export const paginationSchema = Type.Object(
  {
    limit: Type.Integer({
      maximum: 100,
      default: 10,
      description: "Number of  (pagination).",
    }),
    offset: Type.Integer({
      maximum: 100,
      default: 0,
      description: "Items to skip (pagination).",
    }),
  },
  { additionalProperties: false },
);

export const noContentSchema = Type.Null({
  $id: "sNoContent",
  description: "No Content.",
});

export const acceptedSchema = Type.Null({
  $id: "sAccepted",
  description: "Accepted.",
});

//##TODO complete the details part when work on error handling

export const notFoundSchema = Type.Object(
  {
    statusCode: Type.Integer({
      default: 404,
      description: "Http status code.",
    }),
    error: Type.String({
      default: "Not found.",
      description: "Http error.",
    }),
    message: Type.String({
      description: "Message.",
    }),
    internalCode: Type.String({
      description: "Internal code.",
    }),
    // details: Type.Object(
    //   {
    //     validation: Type.Optional(
    //       Type.Array(
    //         Type.Object({
    //           message: Type.String({
    //             description: "Validation message.",
    //           }),
    //         }),
    //       ),
    //     ),
    //   },
    //   {
    //     additionalProperties: true,
    //     description: "Error details (unstructured data).",
    //   },
    // ),
  },
  {
    additionalProperties: false,
    $id: "sNotFound",
    description: "Not found.",
  },
);

export const badRequestSchema = Type.Object(
  {
    statusCode: Type.Integer({
      default: 400,
      description: "Http status code.",
    }),
    error: Type.String({
      default: "Bad Request.",
      description: "Http error.",
    }),
    message: Type.String({
      description: "Message.",
    }),
    internalCode: Type.String({
      description: "Internal code.",
    }),
    // details: Type.Object(
    //   {
    //     validation: Type.Optional(
    //       Type.Array(
    //         Type.Object({
    //           message: Type.String({
    //             description: "Validation message.",
    //           }),
    //         }),
    //       ),
    //     ),
    //   },
    //   {
    //     additionalProperties: true,
    //     description: "Error details (unstructured data).",
    //   },
    // ),
  },
  {
    additionalProperties: false,
    $id: "sBadRequest",
    description: "Bad request.",
  },
);

export const unauthorizedSchema = Type.Object(
  {
    statusCode: Type.Integer({
      default: 401,
      description: "Http status code.",
    }),
    error: Type.String({
      default: "Unauthorized.",
      description: "Http error.",
    }),
    message: Type.String({
      description: "Message.",
    }),
    internalCode: Type.String({
      description: "Internal code.",
    }),
    // details: Type.Object(
    //   {
    //     validation: Type.Optional(
    //       Type.Array(
    //         Type.Object({
    //           message: Type.String({
    //             description: "Validation message.",
    //           }),
    //         }),
    //       ),
    //     ),
    //   },
    //   {
    //     additionalProperties: true,
    //     description: "Error details (unstructured data).",
    //   },
    // ),
  },
  {
    additionalProperties: false,
    $id: "sUnauthorized",
    description: "Unauthorized.",
  },
);

export const forbiddenSchema = Type.Object(
  {
    statusCode: Type.Integer({
      default: 403,
      description: "Http status code.",
    }),
    error: Type.String({
      default: "Forbidden.",
      description: "Http error.",
    }),
    message: Type.String({
      description: "Message.",
    }),
    internalCode: Type.String({
      description: "Internal code.",
    }),
    // details: Type.Object(
    //   {
    //     validation: Type.Optional(
    //       Type.Array(
    //         Type.Object({
    //           message: Type.String({
    //             description: "Validation message.",
    //           }),
    //         }),
    //       ),
    //     ),
    //   },
    //   {
    //     additionalProperties: true,
    //     description: "Error details (unstructured data).",
    //   },
    // ),
  },
  {
    additionalProperties: false,
    $id: "sForbidden",
    description: "Forbidden.",
  },
);

export const conflictSchema = Type.Object(
  {
    statusCode: Type.Integer({
      default: 409,
      description: "Http status code.",
    }),
    error: Type.String({
      default: "Conflict.",
      description: "Http error.",
    }),
    message: Type.String({
      description: "Message.",
    }),
    internalCode: Type.String({
      description: "Internal code.",
    }),
    // details: Type.Object(
    //   {
    //     validation: Type.Optional(
    //       Type.Array(
    //         Type.Object({
    //           message: Type.String({
    //             description: "Validation message.",
    //           }),
    //         }),
    //       ),
    //     ),
    //   },
    //   {
    //     additionalProperties: true,
    //     description: "Error details (unstructured data).",
    //   },
    // ),
  },
  {
    additionalProperties: false,
    $id: "sConflict",
    description: "Conflict.",
  },
);

export const internalServerErrorSchema = Type.Object(
  {
    statusCode: Type.Integer({
      default: 500,
      description: "Http status code.",
    }),
    error: Type.String({
      default: "Internal Server Error.",
      description: "Http error.",
    }),
    message: Type.String({
      description: "Message.",
    }),
    internalCode: Type.String({
      description: "Internal code.",
    }),
  },
  {
    additionalProperties: false,
    $id: "sInternalServerError",
    description: "Internal Server Error.",
  },
);
