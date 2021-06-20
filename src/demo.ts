import { Logger } from 'tslog';

import { Logger as DLSLogger } from './index';

const tsLogger = new Logger();
const dlsLogger = new DLSLogger();

tsLogger.info('DEMO information!');
dlsLogger.debug('DEMO information!');

class Demo {
  run(): void {
    tsLogger.debug({ foo: 'bar', label: 'xxx' });
    dlsLogger.debug({ foo: 'bar', label: 'xxx' });
    dlsLogger.debug();
  }
}

const d = new Demo();
d.run();
