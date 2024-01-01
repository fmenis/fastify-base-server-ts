import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { seedTrips, deleteTrips } from "./trips";

export async function seedDb() {
  try {
    await seedTrips(prisma);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export async function resetDb() {
  try {
    await deleteTrips(prisma);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
