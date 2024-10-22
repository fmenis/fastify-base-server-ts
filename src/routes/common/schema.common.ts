import { Type } from '@sinclair/typebox'

export const noContentSchema = Type.Null({
  $id: 'sNoContent',
  description: 'No Content.',
})

export const acceptedSchema = Type.Null({
  $id: 'sAccepted',
  description: 'Accepted.',
})

export const notFoundSchema = Type.Object(
  {
    statusCode: Type.Integer({
      default: 404,
      description: 'Http status code.',
    }),
    error: Type.String({
      default: 'Not found.',
      description: 'Http error.',
    }),
    message: Type.String({
      description: 'Message.',
    }),
    internalCode: Type.String({
      description: 'Internal code.',
    }),
    details: Type.Object(
      {
        validation: Type.Optional(
          Type.Array(
            Type.Object({
              message: Type.String({
                description: 'Validation message.',
              }),
            }),
          ),
        ),
      },
      {
        additionalProperties: true,
        description: 'Error details (unstructured data).',
      },
    ),
  },
  {
    additionalProperties: false,
    $id: 'sNotFound',
    description: 'Not found.',
  },
)

export const badRequestSchema = Type.Object(
  {
    statusCode: Type.Integer({
      default: 400,
      description: 'Http status code.',
    }),
    error: Type.String({
      default: 'Bad Request.',
      description: 'Http error.',
    }),
    message: Type.String({
      description: 'Message.',
    }),
    internalCode: Type.String({
      description: 'Internal code.',
    }),
    details: Type.Object(
      {
        validation: Type.Optional(
          Type.Array(
            Type.Object({
              message: Type.String({
                description: 'Validation message.',
              }),
            }),
          ),
        ),
      },
      {
        additionalProperties: true,
        description: 'Error details (unstructured data).',
      },
    ),
  },
  {
    additionalProperties: false,
    $id: 'sBadRequest',
    description: 'Bad request.',
  },
)

export const unauthorizedSchema = Type.Object(
  {
    statusCode: Type.Integer({
      default: 401,
      description: 'Http status code.',
    }),
    error: Type.String({
      default: 'Unauthorized.',
      description: 'Http error.',
    }),
    message: Type.String({
      description: 'Message.',
    }),
    internalCode: Type.String({
      description: 'Internal code.',
    }),
    details: Type.Object(
      {
        validation: Type.Optional(
          Type.Array(
            Type.Object({
              message: Type.String({
                description: 'Validation message.',
              }),
            }),
          ),
        ),
      },
      {
        additionalProperties: true,
        description: 'Error details (unstructured data).',
      },
    ),
  },
  {
    additionalProperties: false,
    $id: 'sUnauthorized',
    description: 'Unauthorized.',
  },
)

export const forbiddenSchema = Type.Object(
  {
    statusCode: Type.Integer({
      default: 403,
      description: 'Http status code.',
    }),
    error: Type.String({
      default: 'Forbidden.',
      description: 'Http error.',
    }),
    message: Type.String({
      description: 'Message.',
    }),
    internalCode: Type.String({
      description: 'Internal code.',
    }),
    details: Type.Object(
      {
        validation: Type.Optional(
          Type.Array(
            Type.Object({
              message: Type.String({
                description: 'Validation message.',
              }),
            }),
          ),
        ),
      },
      {
        additionalProperties: true,
        description: 'Error details (unstructured data).',
      },
    ),
  },
  {
    additionalProperties: false,
    $id: 'sForbidden',
    description: 'Forbidden.',
  },
)

export const conflictSchema = Type.Object(
  {
    statusCode: Type.Integer({
      default: 409,
      description: 'Http status code.',
    }),
    error: Type.String({
      default: 'Conflict.',
      description: 'Http error.',
    }),
    message: Type.String({
      description: 'Message.',
    }),
    internalCode: Type.String({
      description: 'Internal code.',
    }),
    details: Type.Object(
      {
        validation: Type.Optional(
          Type.Array(
            Type.Object({
              message: Type.String({
                description: 'Validation message.',
              }),
            }),
          ),
        ),
      },
      {
        additionalProperties: true,
        description: 'Error details (unstructured data).',
      },
    ),
  },
  {
    additionalProperties: false,
    $id: 'sConflict',
    description: 'Conflict.',
  },
)

export const internalServerErrorSchema = Type.Object(
  {
    statusCode: Type.Integer({
      default: 500,
      description: 'Http status code.',
    }),
    error: Type.String({
      default: 'Internal Server Error.',
      description: 'Http error.',
    }),
    message: Type.String({
      description: 'Message.',
    }),
    internalCode: Type.String({
      description: 'Internal code.',
    }),
  },
  {
    additionalProperties: false,
    $id: 'sInternalServerError',
    description: 'Internal Server Error.',
  },
)
