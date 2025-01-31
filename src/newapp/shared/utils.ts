import {
  Chart,
  ChartType,
  LegendOptions,
  Plugin,
  TooltipItem,
  TooltipModel,
} from 'chart.js';
import moment, { Moment } from 'moment-timezone';
import {
  LineHoverOptions,
  LineOptions,
  ScriptableAndArrayOptions,
  ScriptableContext,
} from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { HttpErrorResponse } from '@angular/common/http';
import { COLORS } from '../constants';
import { Clinic } from '../models/clinic';
import { DecimalPipe } from '@angular/common';
import { DEFAULT_TIMEZONE } from './constants';
import _ from 'lodash';

export function convertEndpointToDataKey(endpoint: string) {
  let key = endpoint.slice(2)
  return key.charAt(0).toLowerCase() + key.slice(1) + 'Data';
}

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

export const getTodayMoment = (tz = 'Australia/Brisbane') => {
  return moment().tz(tz);
};

export function formatXName(tickValue: string, index: number) {
  let value = this.getLabelForValue(index);
  if (value && value.toString().includes('--')) {
    let lbl = value.toString().split('--');
    value = lbl[0];
  }
  return value;
}

export function formatXNameWithInitialChar(tickValue: string, index: number) {
  let value = this.getLabelForValue(index);
  if (value && value.toString().includes('--')) {
    let lbl = value.toString().split('--');
    value = lbl[0];
  }
  return formatXLabel(value);
}

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

export function formatXTooltipLabel(tooltipItem: TooltipItem<any>) {
  return tooltipItem.parsed.y < 0
    ? `${tooltipItem.label}:- $${tooltipItem.formattedValue.replace('-', '')}`
    : `${tooltipItem.label}: $${tooltipItem.formattedValue}`;
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
      const digitCnt = Math.floor(count).toString().length;
      let px = 30;
      if (digitCnt > 8) {
        px = 12;
      } else if (digitCnt > 6) {
        px = 18;
      } else if (digitCnt == 6) {
        px = 20;
      } else if (digitCnt == 5) {
        px = 24;
      }
      ctx.font = px + 'px Gilroy-Bold';
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
    },
  };
}

export const JeeveLineFillOptions: _DeepPartialObject<
  ScriptableAndArrayOptions<
    LineOptions & LineHoverOptions,
    ScriptableContext<any>
  >
> = {
  fill: true,
  backgroundColor: 'rgba(34,127,127, 0.5)',
  borderColor: '#00695C',
  borderCapStyle: 'round',
  tension: 0.3,
};

export function getApiErrorMesssage(error: HttpErrorResponse) {
  let errorMsg = '';
  if (error && error.error && error.error.jeeveError) {
    errorMsg = error.error.jeeveError.message;
  } else {
    errorMsg = error && error.message;
  }
  return errorMsg ?? 'Unknown Error!';
}

const getOrCreateTooltip = chart => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
    tooltipEl.style.borderRadius = '3px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';
    tooltipEl.style.zIndex = 100;

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const externalTooltipHandler = <T extends ChartType>(
  args: {
    chart: Chart;
    tooltip: TooltipModel<T>;
  },
  pointerStyle = 'default'
) => {
  // Tooltip Element
  const { chart, tooltip } = args;
  if (pointerStyle === 'pointer') {
    chart.canvas.style.cursor =
      tooltip.opacity === 0 ? 'default' : pointerStyle;
  }

  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map(b => b.lines);
    const tableHead = document.createElement('thead');
    // bodyLines[0] = [
    //   'long text long text long text long text long text long text',
    // ];

    titleLines.forEach(title => {
      const tr = document.createElement('tr');
      tr.style.borderWidth = '0px';

      const th = document.createElement('th');
      th.style.borderWidth = '0px';
      th.style.textAlign = 'left';
      th.style.whiteSpace = 'nowrap';
      const text = document.createTextNode(title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement('tbody');
    bodyLines.forEach((body, i) => {
      if (body?.length) {
        for (const item of body) {
          const colors = tooltip.labelColors[i];

          const span = document.createElement('span');
          span.style.background = colors.backgroundColor.toString();
          span.style.borderColor = colors.borderColor.toString();
          span.style.borderWidth = '2px';
          span.style.marginRight = '10px';
          span.style.height = '10px';
          span.style.width = '10px';
          span.style.display = 'inline-block';

          const text = document.createTextNode(item);

          const tr = document.createElement('tr');
          tr.style.backgroundColor = 'inherit';
          tr.style.borderWidth = '0px';

          const td = document.createElement('td');
          td.style.borderWidth = '0px';
          td.style.whiteSpace = 'nowrap';
          td.appendChild(span);
          td.appendChild(text);
          tr.appendChild(td);
          tableBody.appendChild(tr);
        }
      }
    });

    const tableRoot = tooltipEl.querySelector('table');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.position = 'absolute';

  if (tooltip.caretX - positionX <= chart.canvas.width / 3) {
    tooltipEl.style.left =
      positionX +
      tooltip.caretX +
      tooltipEl.getBoundingClientRect().width / 2 +
      'px';
  } else if (
    tooltip.caretX - positionX > chart.canvas.width / 3 &&
    tooltip.caretX - positionX <= (chart.canvas.width * 2) / 3
  ) {
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  } else {
    tooltipEl.style.left =
      positionX +
      tooltip.caretX -
      tooltipEl.getBoundingClientRect().width / 2 +
      'px';
  }

  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.fontStyle = 'Gilroy-Regular';
  tooltipEl.style.padding =
    tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  tooltipEl.style.pointerEvents = 'none';
};

export const externalTooltipHandlerHiddenColorBoxes = <T extends ChartType>(
  args: {
    chart: Chart;
    tooltip: TooltipModel<T>;
  }
  // isEachColorBoxVisible: boolean
) => {
  // Tooltip Element
  const { chart, tooltip } = args;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map(b => b.lines);

    const tableHead = document.createElement('thead');

    titleLines.forEach(title => {
      const tr = document.createElement('tr');
      tr.style.borderWidth = '0px';

      const th = document.createElement('th');
      th.style.borderWidth = '0px';
      th.style.textAlign = 'left';
      th.style.whiteSpace = 'nowrap';
      const text = document.createTextNode(title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement('tbody');
    bodyLines.forEach((body, i) => {
      if (body?.length) {
        for (const item of body) {
          const text = document.createTextNode(item);

          const tr = document.createElement('tr');
          tr.style.backgroundColor = 'inherit';
          tr.style.borderWidth = '0px';

          const td = document.createElement('td');
          td.style.borderWidth = '0px';
          td.style.whiteSpace = 'nowrap';
          td.appendChild(text);
          tr.appendChild(td);
          tableBody.appendChild(tr);
        }
      }
    });

    const tableRoot = tooltipEl.querySelector('table');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.position = 'absolute';
  if (tooltip.caretX - positionX <= chart.canvas.width / 3) {
    tooltipEl.style.left =
      positionX +
      tooltip.caretX +
      tooltipEl.getBoundingClientRect().width / 2 +
      'px';
  } else if (
    tooltip.caretX - positionX > chart.canvas.width / 3 &&
    tooltip.caretX - positionX <= (chart.canvas.width * 2) / 3
  ) {
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  } else {
    tooltipEl.style.left =
      positionX +
      tooltip.caretX -
      tooltipEl.getBoundingClientRect().width / 2 +
      'px';
  }
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.fontStyle = 'Gilroy-Regular';
  tooltipEl.style.padding =
    tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

const legendBackgroundColor = [
  '#6edbbb',
  '#b0fffa',
  '#abb3ff',
  '#ffb4b5',
  '#fffcac',
  '#FFE4E4',
  '#FFD578',
  '#54D2FF',
  '#E58DD7',
  '#A9AABC',
  '#F2ECFF',
  '#5689C9',
  '#F9F871',
];

export function dynamicBarBackgroundColor(
  data: any[],
  labels: string[],
  isAllClinic: boolean,
  selectedClinics: Clinic[],
  averageToggle: boolean
) {
  let dynamicColors = [];
  if (isAllClinic) {
    dynamicColors = [];
    data.forEach(res => {
      selectedClinics.forEach((item, index) => {
        if (res.clinicId == item.id) {
          dynamicColors.push(legendBackgroundColor[index]);
        }
      });
    });
  } else {
    dynamicColors = [];
    labels.forEach((label, labelIndex) => {
      if (averageToggle) {
        dynamicColors.push(label != 'Anonymous' ? COLORS.odd : COLORS.even);
      } else {
        dynamicColors.push(labelIndex % 2 === 0 ? COLORS.odd : COLORS.even);
      }
    });
  }
  return dynamicColors;
}

export function generatingLegend(): _DeepPartialObject<LegendOptions<any>> {
  return {
    display: true,
    position: 'bottom',
    labels: {
      boxWidth: 8,
      usePointStyle: true,
      generateLabels: chart => {
        let bgColor = {};
        let labels = chart.data.labels.map((value: string, i) => {
          bgColor[value.split(' - ')[1]] =
            chart.data.datasets[0].backgroundColor[i];
          return value.split(' - ')[1];
        });
        labels = [...new Set(labels)];
        labels = labels.splice(0, 10);
        return labels.map((label, index) => ({
          text: label,
          strokeStyle: bgColor[label],
          fillStyle: bgColor[label],
        }));
      },
    },
    onClick: (event, legendItem, legend) => {
      return;
    },
    // align : 'start',
  };
}

export function generatingLegend_2(
  newpColors
): _DeepPartialObject<LegendOptions<any>> {
  return {
    display: true,
    position: 'bottom',
    labels: {
      usePointStyle: true,
      padding: 5,
      generateLabels: chart => {
        const data = chart.data;
        if (data.labels.length && data.datasets.length) {
          return data.labels.map((label: string, i) => ({
            text: <string>formatXLabel(label),
            fillStyle: newpColors[0].backgroundColor[i] ?? COLORS.even,
            strokeStyle: '#fff',
            index: i,
          }));
        }
        return [];
      },
    },
    onClick: function (e) {
      e.native.stopPropagation();
    },
  };
}

export function generatingLegend_3(): _DeepPartialObject<LegendOptions<any>> {
  return {
    position: 'top',
    onClick: function (e, legendItem) {
      var index = legendItem.datasetIndex;
      var ci = this.chart;
      if (index == 0) {
        ci.getDatasetMeta(1).hidden = true;
        ci.getDatasetMeta(index).hidden = false;
      } else if (index == 1) {
        ci.getDatasetMeta(0).hidden = true;
        ci.getDatasetMeta(index).hidden = false;
      }
      ci.update();
    },
  };
}

export function generatingLegend_4(): _DeepPartialObject<LegendOptions<any>> {
  return {
    display: true,
    position: 'bottom',
    labels: {
      boxWidth: 8,
      usePointStyle: true,
      generateLabels: chart => {
        let labels = [];
        let bg_color = {};
        chart.data.datasets.forEach(item => {
          item.data.forEach((val: number) => {
            if (val > 0) {
              labels.push(item.label);
              bg_color[item.label] = item.backgroundColor;
            }
          });
        });
        labels = [...new Set(labels)];
        labels = labels.splice(0, 10);
        return labels.map(item => ({
          text: item,
          strokeStyle: bg_color[item],
          fillStyle: bg_color[item],
        }));
      },
    },
    // onClick: (event: MouseEvent, legendItem: LegendItem) => {}
  };
}
export function calculateYAxisMaxLimit(maxVal: number) {
  // Calculate the order of magnitude of the max value
  let orderOfMagnitude = Math.floor(Math.log10(maxVal));

  // Calculate the divisor (i.e., 10 to the power of the order of magnitude)
  let divisor = Math.floor(Math.pow(10, orderOfMagnitude) / 10);

  // Calculate the first digit of the max value
  let firstDigit = Math.floor(maxVal / divisor);

  // Calculate the new max value for the Y-axis
  let yAxisMaxLimit = (firstDigit + 1) * divisor;

  return yAxisMaxLimit;
}

export function getSubValForGoal(maxVal: number) {
  const maxLimit = calculateYAxisMaxLimit(maxVal);
  return maxLimit / 200;
}

export function renderTooltipLabel(
  tooltipItem: TooltipItem<any>,
  sign = '',
  decimalPipe: DecimalPipe = null
) {
  // if (tooltipItem.label.includes('WE ')) {
  //   return tooltipItem.label + `: ${sign}` + tooltipItem.formattedValue;
  // }

  var Targetlable = '';
  const v = tooltipItem.parsed.y;
  let Tlable = tooltipItem.dataset.label;
  if (Tlable != '') {
    Tlable = Tlable + ': ';
    Targetlable = Tlable;
  }

  let ylable = tooltipItem.parsed._custom
    ? +(tooltipItem.parsed._custom.max + tooltipItem.parsed._custom.min) / 2
    : v;
  var tlab = 0;
  if (typeof tooltipItem.chart.data.datasets[1] !== 'undefined') {
    const tval = tooltipItem.chart.data.datasets[1].data[tooltipItem.dataIndex];
    if (Array.isArray(tval)) {
      tlab = Array.isArray(tval) ? +(tval[1] + tval[0]) / 2 : tval;
      if (tlab == 0) {
        Tlable = '';
      }
    }
  }

  if (tlab == 0 && Targetlable == 'Target: ') {
    return '';
  } else {
    const yV = decimalPipe ? decimalPipe.transform(<number>ylable) : ylable;
    if (sign === '%') {
      return `${Tlable}${splitName(tooltipItem.label).join(' ')} : ${yV}${sign}`;
    } else if (sign === '$') {
      return `${Tlable}${splitName(tooltipItem.label).join(' ')} : ${sign}${yV}`;
    } else {
      return `${Tlable}${splitName(tooltipItem.label).join(' ')} : ${yV}`;
    }
  }
}

export class CsvUtil {

  // Convert an array of objects to CSV
  public static convertToCsv(data: any[], columns: Record<string, string>): string {
    if (!data || data.length === 0) {
      return '';
    }


    // Map the data to CSV rows
    const rows = data.map(item => 
      Object.keys(columns).map(header => item[header]).join(',')
    );

    // Join the headers with the rows to form the full CSV content
    return [Object.values(columns).join(','), ...rows].join('\n');
  }

  // Trigger file download
  public static downloadCsv(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    // Ensure the link is not null or undefined
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

export function getUnitsInDurationRange(trend: TREND_MODE, startDate?: Moment, endDate?: Moment, format?: string) {
  return trend === 'current' ? ((!startDate || !endDate)?getAllMonthsInYear(format):getMonthsBetweenDates(startDate, endDate, format)) : get10Years(format);
}

export function getAllMonthsInYear(format?: string, clinicTimezone?: string): string[] {
  return _.range(12, 0, -1).map((m) =>
    getTimezoneToday(clinicTimezone)
      .subtract(m - 1, 'month')
      .format(format || 'YYYY-MM')
  );
}

export function get10Years(format?: string, clinicTimezone?: string): string[] {
  return _.range(10, 0, -1).map((y) =>
    getTimezoneToday(clinicTimezone)
      .subtract(y - 1, 'year')
      .format(format || 'YYYY')
  );
}

export function getMonthsBetweenDates(startDate: moment.Moment | string, endDate: moment.Moment | string, format?: string): string[] {
  if(!moment.isMoment(startDate)) startDate = moment(startDate);
  if(!moment.isMoment(endDate)) endDate = moment(endDate);

  const months = [];
  let currentDate = startDate.clone();

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
    months.push(currentDate.format(format || 'YYYY-MM'));
    currentDate.add(1, 'month');
  }

  return months;
}

export function getTimezoneToday(
  tz: string = DEFAULT_TIMEZONE,
  dt: string = null,
  format: string = null
) {
  if (dt) {
    if (format) {
      return moment.tz(dt, tz);
    } else {
      return moment.tz(dt, format, tz);
    }
  }
  return moment().tz(tz);
}