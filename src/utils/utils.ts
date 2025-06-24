import { readFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { PaginationParams } from "../common/interface.js";

export function getServerVersion(): string {
  const { version } = JSON.parse(
    readFileSync(join(resolve(), "package.json"), { encoding: "utf-8" }),
  );
  return version;
}

export function buildRouteFullDescription(params: {
  api: string;
  description: string;
  errors?: [
    { code: string; description: string; apis: string; statusCode: number },
  ];
  permission?: string;
}): string {
  const { description, errors = [], api, permission } = params;

  let fullDescription = `${description} \n\n `;
  const apiErrors = errors.filter(item => item.apis.includes(api));

  if (apiErrors.length > 0) {
    const formattedErrors = apiErrors
      .map(
        item => `- ${item.statusCode} - ${item.code}: ${item.description} \n\n`,
      )
      .sort();

    fullDescription += ` **Custom errors**: \n\n ${formattedErrors.join(" ")}`;
  } else {
    fullDescription += ` **This api doesn't expose custom errors.** \n\n`;
  }

  if (permission) {
    fullDescription += `**Required permission**: *${permission}*.`;
  } else {
    fullDescription += `**No permission required to consume the api**.`;
  }

  return fullDescription;
}

export function buildPaginationParams(paginationParams: PaginationParams): {
  take: number;
  skip: number;
} {
  const { limit, offset } = paginationParams;

  return {
    take: limit,
    skip: offset,
  };
}
