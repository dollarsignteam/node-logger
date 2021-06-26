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
2021-06-26 19:28:47.067 +07:00 [node] ⬛️ SILLY   [DEMO] [src/example/demo.ts:17:17 new MyClass] I am a silly log +0ms
2021-06-26 19:28:47.074 +07:00 [node] 🟪 DEBUG   [DEMO] [src/example/demo.ts:32:17 MyClass.myMethod] I am a debug log +8ms
2021-06-26 19:28:47.076 +07:00 [node] 🟦 VERBOSE [DEMO] [src/example/demo.ts:33:17 MyClass.myMethod] I am a verbose log +2ms
2021-06-26 19:28:47.087 +07:00 [node] 🟫 HTTP    [DEMO] [src/example/demo.ts:34:17 MyClass.myMethod] I am a http log +11ms
2021-06-26 19:28:47.090 +07:00 [node] 🟩 SUCCESS [DEMO] [src/example/demo.ts:35:17 MyClass.myMethod] I am a success log +3ms
2021-06-26 19:28:47.092 +07:00 [node] ️⬜️ INFO    [DEMO] [src/example/demo.ts:36:17 MyClass.myMethod] I am an info log with name: Lupin and age: 32 +2ms
2021-06-26 19:28:47.102 +07:00 [node] ️⬜️ INFO    [DEMO] [src/example/demo.ts:37:17 MyClass.myMethod] I am an log log with cars: { car1: 'Tesla', car2: 'BMW' } +10ms
2021-06-26 19:28:47.111 +07:00 [node] 🟧 WARN    [DEMO] [src/example/demo.ts:38:17 MyClass.myMethod] Found error at 2021-06-26T12:28:47.110Z +9ms
2021-06-26 19:28:47.139 +07:00 [node] 🟥 ERROR   [DEMO] [src/example/demo.ts:39:17 MyClass.myMethod] Error Passed as meta - `"[Error: Passed as meta]"` +28ms
2021-06-26 19:28:47.141 +07:00 [node] 🟥 ERROR   [DEMO] [src/example/demo.ts:40:17 MyClass.myMethod] [Error: Internal error] { code: 'INTERNAL_ERROR' } +2ms
2021-06-26 19:28:47.145 +07:00 [node] ️⬜️ INFO    [TEST] [src/example/demo.ts:57:8 Object.<anonymous>] Circular - `{"abc":"Hello","circular":"[Circular]"}`
2021-06-26 19:28:47.146 +07:00 [node] 🟪 DEBUG   [TEST] [src/example/demo.ts:58:8 Object.<anonymous>] {"abc":"Hello","circular":"[Circular]"}
```

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Author

Dollarsign

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
