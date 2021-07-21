# Logger for Node.js

Powerful, logging everything for Node.js

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/dollarsignteam/node-logger/Node.js%20Package?logo=github)][1]
[![npm (scoped)](https://img.shields.io/npm/v/@dollarsign/logger?logo=npm)][2]
[![GitHub license](https://img.shields.io/github/license/dollarsignteam/node-logger)][3]

It is based on the [winston][5] package and inspired by [tslog][6] package.

## Installation

### Yarn

```bash
yarn add @dollarsign/logger
```

### NPM

```bash
npm install --save @dollarsign/logger
```

### Example

Demo file: `src/example/demo.ts`

```typescript
import { Logger } from '@dollarsign/logger';

// disabled default options with environment variables
process.env.NODE_ENV = 'production';
process.env.LOGGER_COLORIZE = 'false';
process.env.LOGGER_DISPLAY_DIFFERENT_TIMESTAMP = 'false';
process.env.LOGGER_DISPLAY_FILE_PATH = 'false';
process.env.LOGGER_DISPLAY_FUNCTION_NAME = 'false';

class MyClass {
  private readonly logger = new Logger({
    level: 'silly',
    name: 'DEMO',
    platform: 'node',
    colorize: true,
    displayDifferentTimestamp: true,
    displayFilePath: true,
    displayFunctionName: true,
  });

  public constructor() {
    this.logger.silly('I am a silly log');
  }

  public myMethod(): void {
    const Lupin = function (): void {
      this.error = new Error('Internal error');
      this.error.code = 'INTERNAL_ERROR';
      this.error.message = [{ failed: 'cars' }];
      this.name = 'Lupin';
      this.age = 32;
      this.cars = {
        car1: 'Tesla',
        car2: 'BMW',
      };
    };
    const data = new Lupin();
    this.logger.trace('I am a trace log');
    this.logger.debug('I am a debug log');
    this.logger.verbose('I am a verbose log');
    this.logger.http('I am a http log');
    this.logger.success('I am a success log');
    this.logger.info('I am an info log with name: %s and age: %d', data.name, data.age);
    this.logger.log('I am an log log with cars: %s', data.cars);
    this.logger.warn('Found %s at %s', 'error', new Date());
    this.logger.error('Error', new Error('Passed as meta'));
    this.logger.error(data.error);
  }
}

const myClass: MyClass = new MyClass();
myClass.myMethod();

const logger = new Logger({
  name: 'TEST',
});

// circular
function Foo(): void {
  this.abc = 'Hello';
  this.circular = this;
}
const foo = new Foo();
logger.info('Circular', foo);
logger.debug(foo.circular);

// fatal logging and exit process with exit code 1
logger.fatal('Fatal error!');
```

Output

```shell
2021-07-21 21:27:56.468 +07:00 [node] ⬛️ SILLY   [DEMO] [src/example/demo.ts:22:17 new MyClass] I am a silly log +0ms
2021-07-21 21:27:56.472 +07:00 [node] 🟫 TRACE   [DEMO] [src/example/demo.ts:38:17 MyClass.myMethod] I am a trace log +4ms
2021-07-21 21:27:56.473 +07:00 [node] 🟪 DEBUG   [DEMO] [src/example/demo.ts:39:17 MyClass.myMethod] I am a debug log +1ms
2021-07-21 21:27:56.473 +07:00 [node] 🟦 VERBOSE [DEMO] [src/example/demo.ts:40:17 MyClass.myMethod] I am a verbose log +0ms
2021-07-21 21:27:56.474 +07:00 [node] 🟫 HTTP    [DEMO] [src/example/demo.ts:41:17 MyClass.myMethod] I am a http log +1ms
2021-07-21 21:27:56.474 +07:00 [node] 🟩 SUCCESS [DEMO] [src/example/demo.ts:42:17 MyClass.myMethod] I am a success log +0ms
2021-07-21 21:27:56.475 +07:00 [node] ⬜️ INFO    [DEMO] [src/example/demo.ts:43:17 MyClass.myMethod] I am an info log with name: Lupin and age: 32 +1ms
2021-07-21 21:27:56.476 +07:00 [node] ⬜️ INFO    [DEMO] [src/example/demo.ts:44:17 MyClass.myMethod] I am an log log with cars: { car1: 'Tesla', car2: 'BMW' } +1ms
2021-07-21 21:27:56.478 +07:00 [node] 🟧 WARN    [DEMO] [src/example/demo.ts:45:17 MyClass.myMethod] Found error at 2021-07-21T14:27:56.478Z +2ms
2021-07-21 21:27:56.486 +07:00 [node] 🟥 ERROR   [DEMO] [src/example/demo.ts:46:17 MyClass.myMethod] Error Passed as meta - `[Error: Passed as meta]` +8ms
2021-07-21 21:27:56.488 +07:00 [node] 🟥 ERROR   [DEMO] [src/example/demo.ts:47:17 MyClass.myMethod] { [Error: [ { failed: 'cars' } ]] code: 'INTERNAL_ERROR' } +2ms
2021-07-21 21:27:56.490 +07:00 [node] ⬜️ INFO    [TEST] Circular - `{"abc":"Hello","circular":"[Circular]"}`
2021-07-21 21:27:56.490 +07:00 [node] 🟪 DEBUG   [TEST] {"abc":"Hello","circular":"[Circular]"}
2021-07-21 21:27:56.491 +07:00 [node] 🟥 FATAL   [TEST] Fatal error!
```

## Documentation

<https://dollarsignteam.github.io/node-logger/>

## Contributing

Contributions welcome! See [Contributing][4].

## Author

Dollarsign

## License

Licensed under the MIT License - see the [LICENSE][3] file for details.

[1]: https://github.com/dollarsignteam/node-logger
[2]: https://www.npmjs.com/package/@dollarsign/logger
[3]: https://github.com/dollarsignteam/node-logger/blob/main/LICENSE
[4]: https://github.com/dollarsignteam/node-logger/blob/main/CONTRIBUTING.md
[5]: https://github.com/winstonjs/winston
[6]: https://github.com/fullstack-build/tslog
