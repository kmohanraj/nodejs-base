import { createLogger, format, transports } from 'winston';
import CONSTANTS from '../constant/constants';

const logFormat = format.printf(
  ({ level, message, timestamp, ...metaData }) => {
    let logMessge = `${timestamp} [${level}] : ${message}`;
    if (metaData) {
      logMessge += JSON.stringify(metaData);
    }
    return logMessge;
  }
);

let silent;
switch (process.env.NODE_ENV) {
  case CONSTANTS.ENVIRONMENTS.DEV:
    silent = false;
    break;
  case CONSTANTS.ENVIRONMENTS.PROD:
    silent = false;
    break;
  case CONSTANTS.ENVIRONMENTS.TEST:
    silent = true;
    break;
  default:
    break;
}

const logger = createLogger({
  level: 'debug',
  transports: [
    new transports.Console({
      level: 'info',
      silent,
      format: format.combine(
        format.colorize(),
        format.splat(),
        format.timestamp(),
        logFormat
      )
    }),
    new transports.File({
      filename: `${process.cwd()}/src/logs/app.log`,
      level: 'debug',
      maxsize: 10 * 1000000,
      maxFiles: 10
    })
  ]
});

const loginRecords = createLogger({
  level: 'debug',
  transports: [
    new transports.Console({
      level: 'info',
      silent,
      format: format.combine(
        format.colorize(),
        format.splat(),
        format.timestamp(),
        logFormat
      )
    }),
    new transports.File({
      filename: `${process.cwd()}/src/logs/login-attempts.log`,
      level: 'debug',
      maxsize: 10 * 1000000,
      maxFiles: 10
    })
  ]
});

const CSRFEvents = createLogger({
  level: 'debug',
  transports: [
    new transports.Console({
      level: 'info',
      silent,
      format: format.combine(
        format.colorize(),
        format.splat(),
        format.timestamp(),
        logFormat
      )
    }),
    new transports.File({
      filename: `${process.cwd()}/src/logs/login-attempts.log`,
      level: 'debug',
      maxsize: 10 * 1000000,
      maxFiles: 10
    })
  ]
});

export default logger;

export { loginRecords, CSRFEvents };
