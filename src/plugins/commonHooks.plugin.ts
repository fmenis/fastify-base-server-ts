import fp from "fastify-plugin";

import {
  // FastifyError,
  FastifyInstance,
  // FastifyRequest,
  // FastifyReply,
} from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    resource: any;
  }
  interface FastifyContextConfig {
    trimBodyFields?: string[] | undefined;
    public?: boolean;
  }
}

//##TODO!! complete

async function commonHooks(fastify: FastifyInstance) {
  /**
   * Empty object that can be utilized to pass data between hooks
   */
  fastify.addHook("onRequest", async req => {
    req.resource = {};
  });

  /**
   * Additional request logs and trim target body fields
   */
  // fastify.addHook(
  //   'preValidation',
  //   async (req: FastifyRequest, reply: FastifyReply) => {
  //     // const { body, log, user } = req
  //     // if (user) {
  //     //   log.debug(
  //     //     {
  //     //       id: user.id,
  //     //       email: user.email,
  //     //     },
  //     //     'user'
  //     //   )
  //     // }
  //     // if (env.ENABLE_BODY_LOG && body) {
  //     //   log.debug(body, 'parsed body')
  //     // }

  //     if (req.routeOptions.config.trimBodyFields && req.body) {
  //       req.body = trimObjectFields(
  //         req.routeOptions.config.trimBodyFields,
  //         req.body,
  //       )
  //     }
  //   },
  // )

  /**
   * Set common routes stuff
   */
  fastify.addHook("onRoute", options => {
    options.schema = {
      ...options.schema,
      response: {
        ...options!.schema!.response!,
        400: fastify.getSchema("sBadRequest"),
        500: fastify.getSchema("sInternalServerError"),
      },
    };
  });

  /**
   * Log validation errors
   */
  // fastify.addHook(
  //   'onError',
  //   async (req: FastifyRequest, reply: FastifyReply, error: FastifyError) => {
  //     // const clientError: Partial<IClientHttpError> = { ...error };
  //     // clientError.internalCode = clientError.internalCode || "0000";
  //     // clientError.details = clientError.details || {};
  //     // clientError.message =
  //     //   reply.statusCode === 500
  //     //     ? "Something went wrong..."
  //     //     : clientError.message;
  //     // if (clientError.validation) {
  //     //   clientError.details.validation = error.validation;
  //     // }
  //     // delete clientError.code;
  //     // delete clientError.validationContext;
  //     // emitter.emit("CLIENT_ERROR", error);
  //     // return clientError;
  //   },
  // )
}

export default fp(commonHooks);
