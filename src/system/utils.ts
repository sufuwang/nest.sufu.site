import { v4 as uuid } from 'uuid';
import moment from '../utils/moment';

export const session = {
  get: () => {
    // const endTime = Date.now() + 1000 * 60 * 60 * 24;
    // const session = `${endTime}-${uuid()}`;
    return uuid();
  },
  /**
   * @param timestampStr 修改数据的时间戳
   * @param max_age 有效周期
   * @returns 是否有效
   */
  isValid: (timestampStr: string, max_age: number): boolean => {
    const timestamp = parseInt(timestampStr, 10);
    console.info(moment.getTimestamp(), timestamp + max_age);
    return moment.getTimestamp() < timestamp + max_age;
  },
};
