import * as winston from 'winston';
import { TransformableInfo } from 'logform';

const { createLogger, format, transports } = winston;
const { combine, splat, printf } = format;

const myFormat = printf(({ level, message, timestamp, ...metadata }: TransformableInfo): string => {
  let msg = `${timestamp as string} [${level}] : ${message} `;
  if (metadata && Object.keys(metadata).length !== 0) {
    msg += JSON.stringify(metadata);
  }
  return msg;
});

const logger: winston.Logger = createLogger({
  level: 'debug',
  format: combine(format.colorize(), splat(), format.timestamp(), myFormat),
  transports: [new transports.Console({ level: 'info' })]
});

export default logger;
