import { TransformableInfo } from 'logform';

import { DATA, INFO, LEVEL, SPLAT } from '@/constants';
import { LoggerInfo } from '@/interfaces';

export type ChangeableInfo = TransformableInfo & {
  [DATA]?: unknown[];
  [INFO]?: LoggerInfo;
  [LEVEL]?: string;
  [SPLAT]?: unknown[];
};
