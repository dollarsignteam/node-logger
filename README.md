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

demo file: `src/example/demo.ts`

```typescript
import { Logger } from '@dollarsign/logger';

// disable default colorize with process env
process.env.LOGGER_COLORIZE = 'false';

class MyClass {
  private readonly logger = new Logger({
    level: 'silly',
    name: 'DEMO',
    platform: 'node',
    colorize: true,
  });

  public constructor() {
    this.logger.silly('I am a silly log');
  }

  public myMethod(): void {
    const data = {
      name: 'Lupin',
      age: 32,
      cars: {
        car1: 'Tesla',
        car2: 'BMW',
      },
    };

    this.logger.debug('I am a debug log');
    this.logger.verbose('I am a verbose log');
    this.logger.http('I am a http log');
    this.logger.success('I am a success log');
    this.logger.info('I am an info log with name: %s and age: %d', data.name, data.age);
    this.logger.log('I am an log log with cars: %s', data.cars);
    this.logger.warn('Found %s at %s', 'error', new Date());
    this.logger.error(new Error('Error passed as info'));
    this.logger.error('Error', 'Important error: ', new Error('Error passed as meta'));
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
2021-06-25 00:39:54.018 +07:00 [node] ⬛️ SILLY   [DEMO] [src/example/demo.ts:15:17 new MyClass] I am a silly log
2021-06-25 00:39:54.023 +07:00 [node] 🟪 DEBUG   [DEMO] [src/example/demo.ts:28:17 MyClass.myMethod] I am a debug log
2021-06-25 00:39:54.024 +07:00 [node] 🟦 VERBOSE [DEMO] [src/example/demo.ts:29:17 MyClass.myMethod] I am a verbose log
2021-06-25 00:39:54.024 +07:00 [node] 🟫 HTTP    [DEMO] [src/example/demo.ts:30:17 MyClass.myMethod] I am a http log
2021-06-25 00:39:54.025 +07:00 [node] 🟩 SUCCESS [DEMO] [src/example/demo.ts:31:17 MyClass.myMethod] I am a success log
2021-06-25 00:39:54.026 +07:00 [node] ️⬜️ INFO    [DEMO] [src/example/demo.ts:32:17 MyClass.myMethod] I am an info log with name: Lupin and age: 32
2021-06-25 00:39:54.027 +07:00 [node] ️⬜️ INFO    [DEMO] [src/example/demo.ts:33:17 MyClass.myMethod] I am an log log with cars: { car1: 'Tesla', car2: 'BMW' }
2021-06-25 00:39:54.030 +07:00 [node] 🟧 WARN    [DEMO] [src/example/demo.ts:34:17 MyClass.myMethod] Found error at 2021-06-24T17:39:54.029Z
2021-06-25 00:39:54.030 +07:00 [node] 🟥 ERROR   [DEMO] [src/example/demo.ts:35:17 MyClass.myMethod] Error: Error passed as info
2021-06-25 00:39:54.031 +07:00 [node] 🟥 ERROR   [DEMO] [src/example/demo.ts:36:17 MyClass.myMethod] Error - `["Important error: ",{}]`
2021-06-25 00:39:54.032 +07:00 [node] ️⬜️ INFO    [TEST] [src/example/demo.ts:54:8 Object.<anonymous>] Circular - `{"abc":"Hello","circular":{"$ref":"$"}}`
2021-06-25 00:39:54.032 +07:00 [node] 🟪 DEBUG   [TEST] [src/example/demo.ts:55:8 Object.<anonymous>] {"abc":"Hello","circular":{"$ref":"$"}}
```

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Author

Dollarsign

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
