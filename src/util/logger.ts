import { createLogger, format, transports } from 'winston';

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
  case 'dev':
    silent = false;
  case 'prod':
    silent = false;
  case 'test':
    silent = true;
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
      filename: `${process.cwd()}/src/logs.app.log`,
      level: 'debug',
      maxsize: 10 * 1000000,
      maxFiles: 10
    })
  ]
});

export default logger;
