import { Static, TSchema, Type } from "@sinclair/typebox";

const Nullable = <T extends TSchema>(schema: T) =>
  Type.Union([schema, Type.Null()]);

export const listUsersQuerystring = Type.Object(
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
export type ListUsersQuerystringType = Static<typeof listUsersQuerystring>;

export const listTripsParams = Type.Object(
  {
    id: Type.String({
      format: "uuid",
      description: "Trip id.",
    }),
  },
  { additionalProperties: false },
);
export type ListTripsParamsType = Static<typeof listTripsParams>;

export const SlistTrips = Type.Object(
  {
    id: Type.String({ format: "uuid", description: "Trip id." }),
    title: Type.String({ minLength: 3, description: "Trip title." }),
  },
  { additionalProperties: false },
);
export type ListTripType = Static<typeof SlistTrips>;

export const listTripsResponse = Type.Array(
  Type.Object(
    {
      id: Type.String({
        format: "uuid",
        description: "Trip id.",
      }),
      title: Type.String({
        description: "Trip title.",
      }),
      description: Nullable(
        Type.String({
          description: "Trip description.",
        }),
      ),
      createdAt: Type.String({
        format: "date-time",
        description: "Trip creation date.",
      }),
      updatedAt: Nullable(
        Type.String({
          format: "date-time",
          description: "Trip update date.",
        }),
      ),
    },
    { additionalProperties: false },
  ),
);

export const tripsResponse = Type.Object(
  {
    id: Type.String({
      format: "uuid",
      description: "Trip id.",
    }),
    title: Type.String({
      description: "Trip title.",
    }),
    description: Nullable(
      Type.String({
        description: "Trip description.",
      }),
    ),
    createdAt: Type.String({
      format: "date-time",
      description: "Trip creation date.",
    }),
    updatedAt: Nullable(
      Type.String({
        format: "date-time",
        description: "Trip creation date.",
      }),
    ),
  },
  { additionalProperties: false },
);
