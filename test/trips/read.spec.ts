import { test } from 'tap'
import { build } from '../helpers/helper'
import { faker } from '@faker-js/faker'

test('Read trip API', async t => {
  t.plan(2)

  const { fastify, prisma } = await build(t)

  const trip = await prisma.trip.findFirst()

  const res = await fastify.inject({
    method: 'GET',
    path: `api/v1/trips/${trip!.id}`,
  })

  t.equal(res.statusCode, 200)
  t.match(res.json(), {
    ...trip,
    createdAt: trip?.createdAt.toISOString(),
    updatedAt: trip?.updatedAt?.toISOString(),
  })
})

test("Should throw error if target trip doesn't exists", async t => {
  t.plan(1)

  const { fastify } = await build(t)

  const res = await fastify.inject({
    method: 'GET',
    path: `api/v1/trips/${faker.string.uuid()}`,
  })

  t.equal(res.statusCode, 404)
  //##TODO check error object
})
