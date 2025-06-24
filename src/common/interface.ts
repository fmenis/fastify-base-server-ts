import { FastifyError } from "fastify";

export interface PaginationParams {
  limit: number;
  offset: number;
}

export interface ListParams {
  pagination: PaginationParams;
}

export interface ClientHttpError extends FastifyError {
  internalCode: string;
  details: any;
}
