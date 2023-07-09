import { environment } from '@/environments/environment';
import moment from 'moment-timezone';

export function correctTime(value: string) {
  const s = (value || '').split(':');

  let hh = s[0].replace(/\D/g, '');

  if (hh.length > 2 && s.length == 1) {
    while (hh.length < 4) {
      hh = '0' + hh;
    }
    hh = hh.substring(0, 4);
    return hh.replace(/^(\d{0,2})(\d{0,2})/, '$1:$2');
    //newVal = newVal.replace(/^(\d{0,2})(\d{0,2})/, '$1:$2');
  } else if (hh.length > 2 && s.length > 1) {
    hh = hh.substring(0, 2);
    let mm = s[1].replace(/\D/g, '');
    while (mm.length < 2) {
      mm = '0' + mm;
    }
    mm = mm.substring(0, 2);
    return `${hh}:${mm}`;
  } else if (hh.length <= 2 && s.length == 1) {
    while (hh.length < 4) {
      hh = '0' + hh;
    }
    return hh.replace(/^(\d{0,2})(\d{0,2})/, '$1:$2');
  } else {
    while (hh.length < 2) {
      hh = '0' + hh;
    }
    let mm = s[1].replace(/\D/g, '');
    while (mm.length < 2) {
      mm = '0' + mm;
    }
    mm = mm.substring(0, 2);
    return `${hh}:${mm}`;
  }
}

export const compare = (
  a: number | string | boolean | undefined,
  b: number | string | boolean | undefined,
  isAsc: boolean
) => {
  if (typeof a == 'number' && typeof b == 'number' && isNaN(a)) {
    return 1 - (isNaN(b) ? 1 : 0) * (isAsc ? 1 : -1);
  }

  if (a == null || a == undefined) {
    return 1 * (isAsc ? 1 : -1);
  }
  if (b == null || b == undefined) {
    return -1 * (isAsc ? 1 : -1);
  }
  return (a! < b! ? -1 : 1) * (isAsc ? 1 : -1);
};

export const getTodayMoment = () => {
  return moment().tz(environment.defaultTimezone);
};

// export const convertTimeFormatAndTimezone = (dt_str:string, tz = 'Australia/Brisbane') => {
//   const utc_dt = moment_tz.utc(dt_str);
//   const aus_dt = utc_dt.clone().tz(tz);
//   return aus_dt.format('YYYY-MM-DD h:mm a');
// }
