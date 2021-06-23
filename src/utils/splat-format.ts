import { format } from 'util';

import { DATA, SPLAT } from '@/constants';
import { ChangeableInfo, SplatterOptions } from '@/interfaces';

const formatRegExp = /%[scdjifoO%]/g;
const escapedPercent = /%%/g;

export class Splatter {
  private displayData: boolean;

  constructor(opts?: SplatterOptions) {
    this.displayData = opts?.displayData ?? true;
  }

  /**
   * @param {ChangeableInfo} info Logform info message
   * @param {String[]} tokens set of string interpolation tokens
   * @returns {ChangeableInfo} modified info message
   */
  splat(info: ChangeableInfo, tokens: string[]): ChangeableInfo {
    const msg = info.message;
    const splat = info[SPLAT] || [];
    const percents = msg.match(escapedPercent);
    const escapes = (percents && percents.length) || 0;
    const expectedSplat = tokens.length - escapes;
    const extraSplat = expectedSplat - splat.length;
    const metas = extraSplat < 0 ? splat.splice(extraSplat, -1 * extraSplat) : [];
    if (this.displayData && metas.length) {
      Object.assign(info, { data: metas });
    }
    info[DATA] = metas;
    info.message = format(msg, ...splat);
    return info;
  }

  /**
   * @param {ChangeableInfo} info Logform info message
   * @param {Object} opts options for this instance
   * @returns {ChangeableInfo} modified info message
   */
  transform(info: ChangeableInfo): ChangeableInfo {
    const msg = info.message;
    const splat = info[SPLAT] || [];
    if (!splat.length) {
      return info;
    }
    const tokens = msg && msg.match && msg.match(formatRegExp);
    if (!tokens) {
      const metas = splat.length > 1 ? splat.splice(0) : splat;
      if (this.displayData && metas.length) {
        Object.assign(info, { data: metas });
      }
      info[DATA] = metas;
      return info;
    }
    return this.splat(info, tokens);
  }
}

/**
 * @param {SplatterOptions} opts splat format options
 * @returns {Splatter} a new instance of the splat format
 */
export function splatFormat(opts?: SplatterOptions): Splatter {
  return new Splatter(opts);
}
