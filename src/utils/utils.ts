import { stringify } from 'json-cycle';
import { attempt, isError } from 'lodash';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const toJSON = (data: unknown) => {
  const str = stringify(data);
  const json = parseJSON(str);
  return json;
};

export function parseJSON<T>(data: unknown): T {
  const result = attempt<T>(JSON.parse.bind(null, data));
  return !isError(result) ? result : null;
}
