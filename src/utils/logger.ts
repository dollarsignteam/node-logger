import winston from 'winston';
import ecsFormat from '@elastic/ecs-winston-format';
import { stringify } from 'json-cycle';

const logger = winston.createLogger({
  level: 'info',
  format: ecsFormat(),
  transports: [new winston.transports.Console()],
});

// Define log format
// const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

// const logger = winston.createLogger({
//   format: winston.format.combine(
//     winston.format.timestamp({
//       format: 'YYYY-MM-DD HH:mm:ss',
//     }),
//     logFormat,
//   ),
//   transports: [],
// });

// logger.add(
//   new winston.transports.Console({
//     format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
//   }),
// );

const a = { foo: 'bar', bar: null };
a.bar = a;

logger.debug('debug message');
logger.info('info message');
logger.warn('warn message', { foo: 'bar' });
logger.error('error message: ', { data: JSON.parse(stringify({ foo: a })) });
// logger.error(JSON.stringify(JSON.parse(stringify({ foo: a }))));

export { logger };
