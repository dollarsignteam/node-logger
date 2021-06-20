import { Logger } from 'tslog';

import { debug } from './index';
import { createLogger } from './utils/logger';

const logger = createLogger();
const tsLogger = new Logger();

logger.info('DEMO information!');
tsLogger.info('DEMO information!');

function demo(): void {
  logger.debug({ foo: 'bar' });
  tsLogger.debug({ foo: 'bar' });
}

debug('AAAAAAAAAAAAAAAAAAAAAAAAAA', { foo: 'bar' });

demo();
