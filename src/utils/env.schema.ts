import { APP_ENV } from "../common/enum.js";

import { Static, Type } from "@sinclair/typebox";
import { levels } from "pino";

function StringEnum<T extends string[]>(values: [...T]) {
  return Type.Unsafe<T[number]>({ type: "string", enum: values });
}

export const configSchema = Type.Object(
  {
    NODE_ENV: Type.String({ default: APP_ENV.PRODUCTION }),
    APP_ENV: StringEnum([
      APP_ENV.LOCAL,
      APP_ENV.TEST,
      APP_ENV.DEVELOPMENT,
      APP_ENV.STAGING,
      APP_ENV.PRODUCTION,
    ]),
    SERVER_ADDRESS: Type.String({ default: "127.0.0.1" }),
    SERVER_PORT: Type.Number({ default: 3000 }),
    LOG_LEVEL: StringEnum(Object.values(levels.labels)),
  },
  { additionalProperties: false },
);

export type ConfigSchemaType = Static<typeof configSchema>;
