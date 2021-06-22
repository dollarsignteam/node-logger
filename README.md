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
    this.logger.silly('I am a silly log.');
  }

  public myMethod(): void {
    const data = {
      name: 'John Doe',
      age: 30,
      cars: {
        car1: 'Audi',
        car2: 'BMW',
        car3: 'Tesla',
      },
    };

    this.logger.debug('I am a debug log.');
    this.logger.verbose('I am a debug log.');
    this.logger.http({ foo: 'bar', http: true });
    this.logger.info('I am an info log with car: %j', data.cars);
    this.logger.log('I am same info log with age: %d', data.age);
    this.logger.warn('I am a warn log with a json object:', data);
    this.logger.error('Found %s at %s', 'error', new Date());
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
logger.debug(foo);
```

output

```log
2021-06-22T22:38:50.323Z [node][DEMO] SILLY (src/example/demo.ts:11:17 new MyClass) I am a silly log.
2021-06-22T22:38:50.325Z [node][DEMO] DEBUG (src/example/demo.ts:25:17 MyClass.myMethod) I am a debug log.
2021-06-22T22:38:50.326Z [node][DEMO] VERBOSE (src/example/demo.ts:26:17 MyClass.myMethod) I am a debug log.
2021-06-22T22:38:50.327Z [node][DEMO] HTTP (src/example/demo.ts:27:17 MyClass.myMethod) - `[{"foo":"bar","http":true}]`
2021-06-22T22:38:50.328Z [node][DEMO] INFO (src/example/demo.ts:28:17 MyClass.myMethod) I am an info log with car: {"car1":"Audi","car2":"BMW","car3":"Tesla"}
2021-06-22T22:38:50.329Z [node][DEMO] INFO (src/example/demo.ts:29:17 MyClass.myMethod) I am same info log with age: 30
2021-06-22T22:38:50.330Z [node][DEMO] WARN (src/example/demo.ts:30:17 MyClass.myMethod) I am a warn log with a json object: - `[{"name":"John Doe","age":30,"cars":{"car1":"Audi","car2":"BMW","car3":"Tesla"}}]`
2021-06-22T22:38:50.331Z [node][DEMO] ERROR (src/example/demo.ts:31:17 MyClass.myMethod) Found error at 2021-06-22T22:38:50.330Z
2021-06-22T22:38:50.333Z [node][TEST] DEBUG (src/example/demo.ts:48:8 Object.<anonymous>) - `[{"abc":"Hello","circular":{"$ref":"$[0]"}}]`
```

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Author

Dollarsign

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
