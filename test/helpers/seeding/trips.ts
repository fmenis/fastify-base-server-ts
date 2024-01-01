import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { ITrip } from "../../../src/routes/trips/trip.interfaces";

export async function seedTrips(prisma: PrismaClient): Promise<void> {
  const data: ITrip[] = [];

  for (let i = 0; i < 5; i++) {
    data.push({
      id: faker.string.uuid(),
      title: faker.lorem.words(2),
      description: faker.helpers.arrayElement([faker.lorem.words(2), null]),
      createdAt: faker.date.recent(),
      updatedAt: faker.helpers.arrayElement([faker.date.recent(), null]),
    });
  }

  await prisma.trip.createMany({
    data,
  });
}

export async function deleteTrips(prisma: PrismaClient): Promise<void> {
  await prisma.trip.deleteMany();
}
