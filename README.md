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
2021-06-23T15:49:04.409Z [node][DEMO] [src/example/demo.ts:11:17 new MyClass] SILLY: I am a silly log
2021-06-23T15:49:04.412Z [node][DEMO] [src/example/demo.ts:24:17 MyClass.myMethod] DEBUG: I am a debug log
2021-06-23T15:49:04.413Z [node][DEMO] [src/example/demo.ts:25:17 MyClass.myMethod] VERBOSE: I am a verbose log
2021-06-23T15:49:04.414Z [node][DEMO] [src/example/demo.ts:26:17 MyClass.myMethod] HTTP: I am a http log
2021-06-23T15:49:04.415Z [node][DEMO] [src/example/demo.ts:27:17 MyClass.myMethod] INFO: I am an info log with name: Lupin and age: 32
2021-06-23T15:49:04.416Z [node][DEMO] [src/example/demo.ts:28:17 MyClass.myMethod] INFO: I am an log log with cars: { car1: 'Tesla', car2: 'BMW' }
2021-06-23T15:49:04.419Z [node][DEMO] [src/example/demo.ts:29:17 MyClass.myMethod] WARN: Found error at 2021-06-23T15:49:04.418Z
2021-06-23T15:49:04.420Z [node][DEMO] [src/example/demo.ts:30:17 MyClass.myMethod] ERROR: {}
2021-06-23T15:49:04.421Z [node][DEMO] [src/example/demo.ts:31:17 MyClass.myMethod] ERROR: Error - `["Important error: ",{}]`
2021-06-23T15:49:04.422Z [node][TEST] [src/example/demo.ts:48:8 Object.<anonymous>] INFO: Circular - `{"abc":"Hello","circular":{"$ref":"$"}}`
2021-06-23T15:49:04.423Z [node][TEST] [src/example/demo.ts:49:8 Object.<anonymous>] DEBUG: {"abc":"Hello","circular":{"$ref":"$"}}
```

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Author

Dollarsign

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
