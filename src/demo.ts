import { Logger } from 'tslog';

import { Logger as DLSLogger } from './index';

const tsLogger = new Logger();
const dlsLogger = new DLSLogger({ level: 'silly', name: 'DEMO' });

// tsLogger.info('DEMO information!');
// dlsLogger.debug('DEMO information!');

class Demo {
  run(): void {
    tsLogger.debug('http', 'http logger', 'ERROR');
    dlsLogger.debug('http %s', { foo: 'bar' }, 'TEST');
  }
}

const d = new Demo();
d.run();
