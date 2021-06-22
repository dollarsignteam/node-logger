import { isEmpty } from '@dollarsign/utils';
import { format } from 'fecha';

/**
 * @param {string} mask string `fecha` date formatting
 * @returns {string} timestamp default is `toISOString` format
 */
export function getTimestamp(mask?: string): string {
  return isEmpty(mask) ? new Date().toISOString() : format(new Date(), mask);
}
