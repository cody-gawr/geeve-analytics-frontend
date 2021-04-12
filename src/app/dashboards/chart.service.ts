
import { Injectable } from '@angular/core';
import { PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChartService {
    duration$ = new BehaviorSubject<string>('m');
    customSelectedDate$ = new BehaviorSubject<any>(null);
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

    beforeDrawChart(count: number, isCurrency?:boolean) {
      let array: PluginServiceGlobalRegistrationAndOptions[] = [{
        beforeDraw(chart: any) {
          const ctx = chart.ctx;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = ((count.toString().length>4) ? 24 : 37) + 'px Gilroy-Bold';
          ctx.fillStyle = '#454649';
          // Draw text in center
          
          if(isCurrency) {
            let currencyFormate = count.toFixed(0).split(/(?=(?:...)*$)/).join(','); //decimal numbers fixed to zero number of digits after decimal point
            ctx.fillText(('$ ' + currencyFormate), centerX, centerY);
          } else {
            ctx.fillText(count, centerX, centerY); 
          }                   
        }
      }]
      return array
    }

    changeDuration(period: string) {
      this.duration$.next(period);
    }

    selectDateFromCalender(event) {
      let val = (event.chosenLabel);
        val = val.toString().split(' - ');
        let startDate = val[0];
        let endDate = val[1];
        this.customSelectedDate$.next({
          startDate,
          endDate
        })
    }

}