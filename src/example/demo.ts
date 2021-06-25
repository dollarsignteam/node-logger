import { Logger } from '@/index';

// disable default colorize with process env
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
  colorize: true,
  displayDifferentTimestamp: true,
});

// circular
function Foo(): void {
  this.abc = 'Hello';
  this.circular = this;
}
const foo = new Foo();
logger.info('Circular', foo);
logger.debug(foo.circular);
