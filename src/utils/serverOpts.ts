import { FastifyServerOptions } from 'fastify'
import { stdTimeFunctions, LoggerOptions } from 'pino'

export function buildServerOptions(): FastifyServerOptions {
  return {
    logger: buildLoggerOptions(),
    ajv: {
      customOptions: {
        allErrors: true,
        removeAdditional: false,
        useDefaults: true
      },
    },
  }
}

function buildLoggerOptions(): LoggerOptions {
  const options: LoggerOptions = {
    level: "debug",
    // level: process.env.LOG_LEVEL, ##TODO le env non vengono ancora caricate
    timestamp: () => stdTimeFunctions.isoTime(),
    formatters: {
      level(label) {
        return { level: label }
      },
    },
    base: undefined,
    redact: {
      paths: [
        'password',
        'oldPassword',
        'newPassword',
        'newPasswordConfirmation',
      ],
      censor: '**GDPR COMPLIANT**',
    }
  }

  return options
}
