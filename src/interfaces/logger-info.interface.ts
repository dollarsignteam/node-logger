import { TransformableInfo } from 'logform';

import { Info } from '@/constants';
export interface LoggerInfo {
  level: string;
  name: string;
  platform: string;
  timestamp: string;
}

export type LoggerInfoFactory = TransformableInfo & {
  [Info]: LoggerInfo;
};
