import { environment } from '@/environments/environment';
import moment from 'moment-timezone';
import { Chart, Plugin, TooltipItem } from "chart.js";

export function splitName(label: string) {
    const regex = /\w+\s\w+(?=\s)|\w+/g;
    return label.toString().trim().match(regex);
}


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

// export const getTodayMoment = () => {
//   return moment().tz(environment.defaultTimezone);
// };

// export const convertTimeFormatAndTimezone = (dt_str:string, tz = 'Australia/Brisbane') => {
//   const utc_dt = moment_tz.utc(dt_str);
//   const aus_dt = utc_dt.clone().tz(tz);
//   return aus_dt.format('YYYY-MM-DD h:mm a');
// }


export function formatXLabel(label: string | number) {
  if (label && typeof label == 'string') {
      const names = splitName(label);
      const name = names[0].split(' ');
      if (names.length == 3) {
          return `${names[0]}`;
      } else if (names.length == 2) {
          if (name.length == 2) {
          return `${names[0][0]} ${name[1]}`;
          } else {
          return `${names[0][0]} ${names[1]}`;
          }
      } else {
          return `${names[0]}`;
      }
  }
  return label;
}

export function formatXTooltipLabel(tooltipItem: TooltipItem<any>){
  return tooltipItem.parsed.y < 0?'- $':`${tooltipItem.label}: $${tooltipItem.formattedValue}`;
}

export function chartPlugin(count: number, isCurrency?: boolean): Plugin {
      return {
        id: 'plugin-123',
        beforeDraw: (chart: Chart) => {
          const ctx = chart.ctx;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
          const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
          ctx.font = (count.toString().length > 4 ? 24 : 37) + 'px Gilroy-Bold';
          ctx.fillStyle = '#454649';
          // Draw text in center
          let perThousands = count
            .toFixed(0)
            .split(/(?=(?:...)*$)/)
            .join(','); //decimal numbers fixed to zero number of digits after decimal point

          if (isCurrency) {
            ctx.fillText('$ ' + perThousands, centerX, centerY);
          } else {
            ctx.fillText(perThousands, centerX, centerY);
          }
        }
      }
}

import { LineHoverOptions, LineOptions, ScriptableAndArrayOptions, ScriptableContext } from "chart.js";
import { _DeepPartialObject } from "chart.js/dist/types/utils";

export const JeeveLineFillOptions: _DeepPartialObject<ScriptableAndArrayOptions<LineOptions & LineHoverOptions, ScriptableContext<any>>> = {
    fill: true,
    backgroundColor: 'rgba(34,127,127, 0.5)',
    borderColor: '#00695C',
    borderCapStyle: 'round',
    tension: 0.3,
};