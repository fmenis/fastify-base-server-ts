import { Static, Type } from "@sinclair/typebox";

export const listTripsQuerystring = Type.Object(
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
export type ListTripsQuerystringType = Static<typeof listTripsQuerystring>;

export const listTripsParams = Type.Object(
  {
    id: Type.String({
      format: "uuid",
      description: "Trip id.",
    }),
  },
  { additionalProperties: false }
);
export type ListTripsParamsType = Static<typeof listTripsParams>;

export const SlistTrips = Type.Object(
  {
    id: Type.String({ format: "uuid", description: "##TODO" }),
    title: Type.String({ minLength: 3, description: "##TODO" }),
  },
  { additionalProperties: false }
);
export type ListTripType = Static<typeof SlistTrips>;

//##TODO improve this mess

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
      description: Type.String({
        description: "Trip description.",
      }),
      createdAt: Type.Optional(
        Type.Any({
          //##TODO fix dates
          description: "Trip creation date.",
        })
      ),
      updatedAt: Type.Optional(
        Type.Any({
          //##TODO fix dates
          description: "Trip creation date.",
        })
      ),
    },
    { additionalProperties: false }
  )
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
    description: Type.String({
      description: "Trip description.",
    }),
    createdAt: Type.Any({
      description: "Trip creation date.",
    }),
    updatedAt: Type.Any({
      description: "Trip creation date.",
    }),
  },
  { additionalProperties: false }
);
