import { Static, Type } from "@sinclair/typebox";
import { Nullable } from "../../common/schema.js";

//##TODO deep dive into additionalProperties when using Type.Intersect
// export const listUsersQuerystring = Type.Intersect([
//   paginationSchema,
//   Type.Object(
//     {
//       email: Type.Optional(
//         Type.String({
//           minLength: 3,
//           maxLength: 100,
//           description: "User email.",
//         }),
//       ),
//     },
//     { additionalProperties: true },
//   ),
// ]);

export const listUsersQuerySchema = Type.Object(
  {
    email: Type.Optional(
      Type.String({
        minLength: 3,
        maxLength: 100,
        description: "User email.",
      }),
    ),
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

export type ListUsersQuerystringType = Static<typeof listUsersQuerySchema>;

export const userSchema = Type.Object(
  {
    id: Type.String({
      format: "uuid",
      description: "User id.",
    }),
    firstName: Type.String({
      minLength: 3,
      maxLength: 100,
      description: "User first name.",
    }),
    lastName: Type.String({
      minLength: 3,
      maxLength: 100,
      description: "User last name.",
    }),
    email: Type.String({
      minLength: 5,
      format: "email",
      maxLength: 100,
      description: "User email.",
    }),
    password: Type.String({
      minLength: 60,
      maxLength: 60,
      description: "User password.",
    }),
    createdAt: Type.String({
      format: "date-time",
      description: "User creation date.",
    }),
    updatedAt: Nullable(
      Type.String({
        format: "date-time",
        description: "User update date.",
      }),
    ),
  },
  {
    additionalProperties: false,
  },
);
