import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { IListParams } from '../common/interface.common'
import { ITrip } from './trip.interfaces'

declare module 'fastify' {
  interface FastifyInstance {
    tripService: {
      list(params: IListTripsParams): Promise<ITrip[]>
      read(params: { id: string }): Promise<ITrip | null>
    }
  }
}

export interface IListTripsParams extends IListParams {}

async function tripService(fastify: FastifyInstance): Promise<void> {
  const { prisma, commonClientErrors } = fastify

  async function list(params: IListTripsParams): Promise<ITrip[]> {
    const { pagination } = params

    const trips = await prisma.trip.findMany({
      skip: pagination.offset,
      take: pagination.limit,
    })

    return trips
  }

  async function read(params: { id: string }): Promise<ITrip | null> {
    const { id } = params

    const trip = await prisma.trip.findFirst({ where: { id } })

    if (!trip) {
      commonClientErrors.throwNotFoundError({ id, name: 'Trip' })
    }

    return trip
  }

  fastify.decorate('tripService', {
    list,
    read,
  })
}

export default fp(tripService)
