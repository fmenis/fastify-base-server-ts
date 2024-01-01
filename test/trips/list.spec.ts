import { test } from "tap";
import { build } from "../helpers/helper";

test("List trips API", async (t) => {
  t.plan(2);

  const { fastify } = await build(t);

  const res = await fastify.inject({
    method: "GET",
    path: "api/v1/trips",
  });

  const trips = res.json();

  t.equal(res.statusCode, 200);
  t.equal(trips.length, 5);
});
