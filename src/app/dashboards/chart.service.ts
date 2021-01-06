import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChartService {
    constructor() { }

    colors = {
      odd: '#119682',
      even: '#EEEEF8'
    };

    baseChartData = {
      shadowOffsetX: 3,
      shadowOffsetY: 3,
      shadowBlur: 5,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      pointBevelWidth: 2,
      pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
      pointBevelShadowColor: 'rgba(0, 0, 0, 0.5)',
      pointShadowOffsetX: 3,
      pointShadowOffsetY: 3,
      pointShadowBlur: 10,
      pointShadowColor: 'rgba(0, 0, 0, 0.5)',
      backgroundOverlayMode: 'multiply'
    };

}