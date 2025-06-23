## Initialize prisma

- `npx prisma init --datasource-provider postgresql`

## Validate schema

- `npx prisma validate`

## Format schema files

- `npx prisma format`

## Generate client

Generate prisma client with ts types according to prisma.schema

- `npx prisma generate`

## Run migration

Call also `prisma generate`

- `npx prisma migrate dev --name init`

If we want to update the db without create a migration, run the `npx prisma db push` command
