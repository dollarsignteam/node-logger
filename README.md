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

class MyClass {
  private readonly logger = new Logger({
    level: 'silly',
    name: 'DEMO',
    platform: 'node',
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

output

```log
2021-06-24 19:16:45.104 +07:00 [node] ⬜️ SILLY   [DEMO] [src/example/demo.ts:11:17 new MyClass] I am a silly log
2021-06-24 19:16:45.108 +07:00 [node] 🟪 DEBUG   [DEMO] [src/example/demo.ts:24:17 MyClass.myMethod] I am a debug log
2021-06-24 19:16:45.108 +07:00 [node] 🟦 VERBOSE [DEMO] [src/example/demo.ts:25:17 MyClass.myMethod] I am a verbose log
2021-06-24 19:16:45.109 +07:00 [node] 🟫 HTTP    [DEMO] [src/example/demo.ts:26:17 MyClass.myMethod] I am a http log
2021-06-24 19:16:45.110 +07:00 [node] 🟩 INFO    [DEMO] [src/example/demo.ts:27:17 MyClass.myMethod] I am an info log with name: Lupin and age: 32
2021-06-24 19:16:45.111 +07:00 [node] 🟩 INFO    [DEMO] [src/example/demo.ts:28:17 MyClass.myMethod] I am an log log with cars: { car1: 'Tesla', car2: 'BMW' }
2021-06-24 19:16:45.113 +07:00 [node] 🟧 WARN    [DEMO] [src/example/demo.ts:29:17 MyClass.myMethod] Found error at 2021-06-24T12:16:45.112Z
2021-06-24 19:16:45.114 +07:00 [node] 🟥 ERROR   [DEMO] [src/example/demo.ts:30:17 MyClass.myMethod] Error: Error passed as info
2021-06-24 19:16:45.114 +07:00 [node] 🟥 ERROR   [DEMO] [src/example/demo.ts:31:17 MyClass.myMethod] Error - `["Important error: ",{}]`
2021-06-24 19:16:45.116 +07:00 [node] 🟩 INFO    [TEST] [src/example/demo.ts:48:8 Object.<anonymous>] Circular - `{"abc":"Hello","circular":{"$ref":"$"}}`
2021-06-24 19:16:45.117 +07:00 [node] 🟪 DEBUG   [TEST] [src/example/demo.ts:49:8 Object.<anonymous>] {"abc":"Hello","circular":{"$ref":"$"}}
```

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Author

Dollarsign

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
