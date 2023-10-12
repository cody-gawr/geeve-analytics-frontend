import { Chart, ChartType, Plugin, TooltipItem, TooltipModel } from 'chart.js';
import moment from 'moment-timezone';
import {
  LineHoverOptions,
  LineOptions,
  ScriptableAndArrayOptions,
  ScriptableContext,
} from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { HttpErrorResponse } from '@angular/common/http';

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

export function formatXTooltipLabel(tooltipItem: TooltipItem<any>) {
  return tooltipItem.parsed.y < 0
    ? '- $'
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

export const externalTooltipHandler = <T extends ChartType>(args: {
  chart: Chart;
  tooltip: TooltipModel<T>;
}) => {
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
