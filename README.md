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

class MyClass {
  private readonly logger = new Logger({
    level: 'silly',
    name: 'DEMO',
    platform: 'node',
    colorize: true,
    displayDifferentTimestamp: true,
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
2021-06-30 17:29:37.852 +07:00 [node] ⬛️ SILLY   [DEMO] [src/example/demo.ts:17:17 new MyClass] I am a silly log +0ms
2021-06-30 17:29:37.856 +07:00 [node] 🟪 DEBUG   [DEMO] [src/example/demo.ts:33:17 MyClass.myMethod] I am a debug log +4ms
2021-06-30 17:29:37.856 +07:00 [node] 🟦 VERBOSE [DEMO] [src/example/demo.ts:34:17 MyClass.myMethod] I am a verbose log +0ms
2021-06-30 17:29:37.857 +07:00 [node] 🟫 HTTP    [DEMO] [src/example/demo.ts:35:17 MyClass.myMethod] I am a http log +1ms
2021-06-30 17:29:37.858 +07:00 [node] 🟩 SUCCESS [DEMO] [src/example/demo.ts:36:17 MyClass.myMethod] I am a success log +1ms
2021-06-30 17:29:37.858 +07:00 [node] ⬜️ INFO    [DEMO] [src/example/demo.ts:37:17 MyClass.myMethod] I am an info log with name: Lupin and age: 32 +0ms
2021-06-30 17:29:37.860 +07:00 [node] ⬜️ INFO    [DEMO] [src/example/demo.ts:38:17 MyClass.myMethod] I am an log log with cars: { car1: 'Tesla', car2: 'BMW' } +2ms
2021-06-30 17:29:37.862 +07:00 [node] 🟧 WARN    [DEMO] [src/example/demo.ts:39:17 MyClass.myMethod] Found error at 2021-06-30T10:29:37.862Z +2ms
2021-06-30 17:29:37.869 +07:00 [node] 🟥 ERROR   [DEMO] [src/example/demo.ts:40:17 MyClass.myMethod] Error Passed as meta - `"[Error: Passed as meta]"` +7ms
2021-06-30 17:29:37.871 +07:00 [node] 🟥 ERROR   [DEMO] [src/example/demo.ts:41:17 MyClass.myMethod] { [Error: [ { failed: 'cars' } ]] code: 'INTERNAL_ERROR' } +2ms
2021-06-30 17:29:37.872 +07:00 [node] ⬜️ INFO    [TEST] [src/example/demo.ts:58:8 Object.<anonymous>] Circular - `{"abc":"Hello","circular":"[Circular]"}`
2021-06-30 17:29:37.873 +07:00 [node] 🟪 DEBUG   [TEST] [src/example/demo.ts:59:8 Object.<anonymous>] {"abc":"Hello","circular":"[Circular]"}
```

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Author

Dollarsign

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
