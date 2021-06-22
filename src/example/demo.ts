// import { Logger } from '@/index';

import { createLogger, format, transports } from 'winston';
const { combine, printf, prettyPrint, simple, json } = format;
import jsonStringify from 'fast-safe-stringify';
import util from 'util';

import { splatFormat } from '@/utils/splat-format';

// class MyClass {
//   private readonly logger = new Logger({
//     level: 'silly',
//     name: 'DEMO',
//     platform: 'node',
//   });

//   public constructor() {
//     this.logger.silly('I am a silly log.');
//   }

//   public myMethod(): void {
//     const jsonObj = {
//       name: 'John Doe',
//       age: 30,
//       cars: {
//         car1: 'Audi',
//         car2: 'BMW',
//         car3: 'Tesla',
//       },
//     };

//     this.logger.debug('I am a debug log.');
//     this.logger.verbose('I am a debug log.');
//     this.logger.http('I am a debug log.');
//     this.logger.info('I am an info log with car: %j', jsonObj.cars);
//     this.logger.log('I am same info log with age: %d', jsonObj.age);
//     this.logger.warn('I am a warn log with a json object:', jsonObj);
//     this.logger.error('I am an error log.');
//   }
// }

// const myClass: MyClass = new MyClass();
// myClass.myMethod();

// const logger = new Logger('TEST');

/**
 * Circular example
 */
function Foo(): void {
  this.abc = 'Hello';
  this.circular = this;
}
const foo = new Foo();
// logger.debug(foo);

/**
 * Multiple args
 */
// const data = { label: 'Demo label', level: 'Demo level', timestamp: 'Tue Jun 22 17:27:01 +07 2021' };

const logLikeFormat = {
  transform(info) {
    const { timestamp, label, message } = info;
    const level = info[Symbol.for('level')];
    const args = info[Symbol.for('splat')] || [];
    console.log();
    console.log({ message, args });
    const output = util.formatWithOptions({ colors: false }, ...[message, ...args]);
    console.log({ output });
    info[Symbol.for('message')] = `${timestamp} [${label}] ${level}: ${output}`;
    return info;
  },
};

const debugFormat = {
  transform(info) {
    console.log(info);
    return info;
  },
};
const logger = createLogger({
  format: format.combine(
    splatFormat({ displayData: false }),
    // debugFormat, // uncomment to see the internal log structure
    // format.timestamp(),
    // format.label({ label: 'myLabel' }),
    // splatFormat(null),
    // prettyPrint(),
    // logLikeFormat,
    simple(),
    debugFormat, // uncomment to see the internal log structure
  ),
  transports: [new transports.Console()],
});

// logger.info('Found %s at %s', 'error', new Date());
// logger.info('Found %s at %s', 'error', /WUT/);
// logger.info('Found %s at %s', 'error', true);
// logger.info('Found %s at %s', 'error', 100.0);
// logger.info('Found %s at %s', 'error', ['1, 2, 3']);
// logger.warn('data: %s =', 'foo', 'bar', { foo }, 'TEST', 'DEMO');
logger.warn('foo 100%% %s %j', 'bar', 1, 'DEMO', null, true, 'TEST', [1, 2, 3], { foo: 'bar' });
// logger.warn({ data: 'foo' });
// logger.warn('foo %s', 'bar', new Error('INTERNAL ERROR'));
// logger.warn('error:', new Error('INTERNAL ERROR'));
