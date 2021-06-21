import { Logger } from '@/index';

class MyClass {
  private readonly _logger: Logger = new Logger({
    name: 'DEMO',
  });

  public constructor() {
    this._logger.silly('I am a silly log.');
  }

  public myMethod(): void {
    const jsonObj: Record<string, unknown> = {
      name: 'John Doe',
      age: 30,
      cars: {
        car1: 'Audi',
        car2: 'BMW',
        car3: 'Tesla',
      },
      obj: undefined,
    };

    jsonObj.obj = jsonObj;

    this._logger.debug('I am a debug log.');
    this._logger.info('I am an info log.');
    this._logger.warn('I am a warn log with a json object:', jsonObj);
    this._logger.error('I am an error log.');
    try {
      let log: Logger;
      log.debug();
    } catch (err) {
      this._logger.error(err);
    }
  }
}

const myClass: MyClass = new MyClass();
myClass.myMethod();

const log: Logger = new Logger({
  name: 'Test',
});

log.silly('I am a silly log.');
log.debug('I am a debug log.');
log.log('I am a log(info) log.');
log.http('I am a http log.');
log.info('I am an info log.');
log.warn('I am a warn log with a json object:', { foo: 'bar' });
log.error('I am an error log.');

/*
 * Circular example
 * */
function Foo(): void {
  this.abc = 'Hello';
  this.circular = this;
}
const foo = new Foo();
log.debug(foo);
