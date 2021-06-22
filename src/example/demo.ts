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

const logger = new Logger('TEST');

/**
 * Circular example
 */
function Foo(): void {
  this.abc = 'Hello';
  this.circular = this;
}
const foo = new Foo();
logger.debug(foo);

/**
 * Multiple args
 */
logger.verbose('message', 'args1', 'args2', 'args3', { demo: true });
