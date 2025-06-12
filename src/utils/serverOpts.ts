import { FastifyServerOptions } from 'fastify'
// import pino, { stdTimeFunctions, LoggerOptions, Logger } from 'pino'

export function buildServerOptions(): FastifyServerOptions {
  return {
    // loggerInstance: {
    //   level: "debug"
    // },
    ajv: {
      customOptions: {
        allErrors: true,
        removeAdditional: false,
        // coerceTypes: 'array',
        // useDefaults ##TODO see if useful https://ajv.js.org/options.html#usedefaults
      },
    },
  }
}

// function buildLoggerInstance(): Logger {
//   const loggerOptions: LoggerOptions = {
//     level: process.env.LOG_LEVEL,
//     timestamp: () => stdTimeFunctions.isoTime(),
//     formatters: {
//       level(label) {
//         return { level: label }
//       },
//       bindings() {
//         return { pid: undefined, hostname: undefined }
//       },
//     },
//     redact: {
//       paths: [
//         'password',
//         'oldPassword',
//         'newPassword',
//         'newPasswordConfirmation',
//       ],
//       censor: '**GDPR COMPLIANT**',
//     },
//   }

//   return pino(loggerOptions)
// }
