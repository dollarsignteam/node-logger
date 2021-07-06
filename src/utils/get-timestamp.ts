import { format } from 'fecha';

/**
 * @param mask - string `fecha` date formatting
 * @returns timestamp default is `YYYY-MM-DD HH:mm:ss.SSS Z` format
 */
export function getTimestamp(mask?: string): string {
  return format(new Date(), mask || 'YYYY-MM-DD HH:mm:ss.SSS Z');
}
