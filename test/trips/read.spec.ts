import { test } from "tap";
import { build } from "../helpers/helper";

test("Read trip API", async (t) => {
  t.plan(2);

  const { fastify, prisma } = await build(t);

  const trip = await prisma.trip.findFirst();

  const res = await fastify.inject({
    method: "GET",
    path: `api/v1/trips/${trip!.id}`,
  });

  t.equal(res.statusCode, 200);
  t.match(res.json(), trip);
  // t.match(res.json(), {
  //   id: "string",
  //   title: "string",
  //   description: "string",
  //   createdAt: "string",
  //   updatedAt: "string",
  // });
});
