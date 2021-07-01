# node-logger

Logger for Node.js

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
```

Output

```log
2021-07-01 14:06:33.588 +07:00 [node] ⬛️ SILLY   [DEMO] [src/example/demo.ts:21:17 new MyClass] I am a silly log +0ms
2021-07-01 14:06:33.592 +07:00 [node] 🟪 DEBUG   [DEMO] [src/example/demo.ts:37:17 MyClass.myMethod] I am a debug log +4ms
2021-07-01 14:06:33.592 +07:00 [node] 🟦 VERBOSE [DEMO] [src/example/demo.ts:38:17 MyClass.myMethod] I am a verbose log +0ms
2021-07-01 14:06:33.593 +07:00 [node] 🟫 HTTP    [DEMO] [src/example/demo.ts:39:17 MyClass.myMethod] I am a http log +1ms
2021-07-01 14:06:33.594 +07:00 [node] 🟩 SUCCESS [DEMO] [src/example/demo.ts:40:17 MyClass.myMethod] I am a success log +1ms
2021-07-01 14:06:33.594 +07:00 [node] ⬜️ INFO    [DEMO] [src/example/demo.ts:41:17 MyClass.myMethod] I am an info log with name: Lupin and age: 32 +0ms
2021-07-01 14:06:33.596 +07:00 [node] ⬜️ INFO    [DEMO] [src/example/demo.ts:42:17 MyClass.myMethod] I am an log log with cars: { car1: 'Tesla', car2: 'BMW' } +2ms
2021-07-01 14:06:33.598 +07:00 [node] 🟧 WARN    [DEMO] [src/example/demo.ts:43:17 MyClass.myMethod] Found error at 2021-07-01T07:06:33.598Z +2ms
2021-07-01 14:06:33.604 +07:00 [node] 🟥 ERROR   [DEMO] [src/example/demo.ts:44:17 MyClass.myMethod] Error Passed as meta - `"[Error: Passed as meta]"` +6ms
2021-07-01 14:06:33.606 +07:00 [node] 🟥 ERROR   [DEMO] [src/example/demo.ts:45:17 MyClass.myMethod] { [Error: [ { failed: 'cars' } ]] code: 'INTERNAL_ERROR' } +2ms
2021-07-01 14:06:33.607 +07:00 [node] ⬜️ INFO    [TEST] Circular - `{"abc":"Hello","circular":"[Circular]"}`
2021-07-01 14:06:33.608 +07:00 [node] 🟪 DEBUG   [TEST] {"abc":"Hello","circular":"[Circular]"}
```

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Author

Dollarsign

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
