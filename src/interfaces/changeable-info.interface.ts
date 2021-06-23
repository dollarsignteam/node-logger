import { TransformableInfo } from 'logform';

import { DATA, INFO, LEVEL, SPLAT } from '@/constants';
import { CallerInfo, LoggerInfo } from '@/interfaces';

import { CALLER } from '../constants/triple-beam';

export type ChangeableInfo = TransformableInfo & {
  [CALLER]?: CallerInfo;
  [DATA]?: unknown[];
  [INFO]?: LoggerInfo;
  [LEVEL]?: string;
  [SPLAT]?: unknown[];
};
