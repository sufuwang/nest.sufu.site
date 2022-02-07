// eslint-disable-next-line @typescript-eslint/no-var-requires
const Moment = require('moment');

interface TypeTime {
  day: number;
  hour: number;
  minute: number;
  second: number;
}
interface TypeGetDateArgs {
  time: string;
  delay: number;
}

const moment = {
  /**
   * 2022-02-04 02:19:16.709
   */
  now: () => {
    return new Date().toJSON().replace('T', ' ').replace('Z', '');
  },
  /**
   * 返回指定时间的日期部分
   * @param time 2022-02-04 02:19:16.709
   * @param delay number
   * @returns 2022-02-04
   */
  getDate: (args?: Partial<TypeGetDateArgs>) => {
    const { time, delay } = args || { time: null, delay: 0 };
    return Moment(time || moment.now())
      .subtract(delay, 'days')
      .format('YYYY-MM-DD');
  },
  /**
   * 返回指定时长的毫秒数
   */
  getMileSecond: ({
    day = 0,
    hour = 0,
    minute = 0,
    second = 0,
  }: Partial<TypeTime>) => {
    return (((day * 24 + hour) * 60 + minute) * 60 + second) * 1000;
  },
  /**
   * 返回指定时间的时间戳(毫秒)
   */
  getTimestamp: (time?: Partial<TypeTime>) => {
    if (!time) {
      return Date.now();
    }
    return Date.now() + moment.getMileSecond(time);
  },
};
export default moment;
