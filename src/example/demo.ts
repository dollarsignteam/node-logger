import { Logger } from '@/index';

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
