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
    const jsonObj = {
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
    this.logger.http('I am a debug log.');
    this.logger.info('I am an info log with car: %j', jsonObj.cars);
    this.logger.log('I am same info log with age: %d', jsonObj.age);
    this.logger.warn('I am a warn log with a json object:', jsonObj);
    this.logger.error('I am an error log.');
  }
}

const myClass: MyClass = new MyClass();
myClass.myMethod();

const logger = new Logger({
  name: 'TEST',
});

/**
 * Circular example
 */
function Foo(): void {
  this.abc = 'Hello';
  this.circular = this;
}
const foo = new Foo();
logger.debug(foo);
```

output

```log
2021-06-21 22:35:13.589 +07:00 [node] - [DEMO] silly: (src/example/demo.ts:11:17 new MyClass) I am a silly log. +0ms
2021-06-21 22:35:13.593 +07:00 [node] - [DEMO] debug: (src/example/demo.ts:25:17 MyClass.myMethod) I am a debug log. +4ms
2021-06-21 22:35:13.594 +07:00 [node] - [DEMO] verbose: (src/example/demo.ts:26:17 MyClass.myMethod) I am a debug log. +1ms
2021-06-21 22:35:13.594 +07:00 [node] - [DEMO] http: (src/example/demo.ts:27:17 MyClass.myMethod) I am a debug log. +0ms
2021-06-21 22:35:13.595 +07:00 [node] - [DEMO] info: (src/example/demo.ts:28:17 MyClass.myMethod) I am an info log with car: {"car1":"Audi","car2":"BMW","car3":"Tesla"} +1ms
2021-06-21 22:35:13.596 +07:00 [node] - [DEMO] info: (src/example/demo.ts:29:17 MyClass.myMethod) I am same info log with age: 30 +1ms
2021-06-21 22:35:13.597 +07:00 [node] - [DEMO] warn: (src/example/demo.ts:30:17 MyClass.myMethod) I am a warn log with a json object: - `{"name":"John Doe","age":30,"cars":{"car1":"Audi","car2":"BMW","car3":"Tesla"}}` +1ms
2021-06-21 22:35:13.597 +07:00 [node] - [DEMO] error: (src/example/demo.ts:31:17 MyClass.myMethod) I am an error log. +0ms
2021-06-21 22:35:13.598 +07:00 [node] - [TEST] debug: (src/example/demo.ts:50:8 Object.<anonymous>) - `{"abc":"Hello","circular":{"abc":"Hello","circular":{"$ref":"$[\"circular\"]"}}}` +1ms
```

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Author

Dollarsign

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
