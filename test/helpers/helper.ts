import Fastify, { FastifyInstance } from 'fastify'
import * as tap from 'tap'
import * as dotenv from 'dotenv'
dotenv.config({ path: 'test/.env' })

import app from '../../src/app'
import { seedDb, resetDb } from './seeding/index'
import { PrismaClient } from '@prisma/client'

/**
 * ##TODO
 * - understand how apply the migrations
 */

export type Test = (typeof tap)['Test']['prototype']

export async function build(
  t: Test,
): Promise<{ fastify: FastifyInstance; prisma: PrismaClient }> {
  const prisma = new PrismaClient({
    log: ['error', 'query', 'info', 'query'],
  })

  const fastify = Fastify({
    logger: {
      level: 'debug',
    },
  })

  await fastify.register(app)
  await fastify.ready()

  await seedDb()

  t.teardown(async () => {
    await resetDb()
    fastify.close()
  })

  return {
    fastify,
    prisma,
  }
}
