-- CreateTable
CREATE TABLE "trip" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(50),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "trip_pkey" PRIMARY KEY ("id")
);
