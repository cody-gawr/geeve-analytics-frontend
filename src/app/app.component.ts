import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
// import { Colors } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

// const plugin1 = {
//   id: 'global-chart-plugin-001',
//   beforeDraw: function (chart: Chart) {
//     if (chart.config.options.elements.center) {
//       //Get ctx from string
//       var ctx = chart.ctx;

//       //Get options from the center object in options
//       var centerConfig = chart.config.options.elements.center;
//       var fontStyle = 'Gilroy-Regular';
//       var txt = centerConfig.text;
//       var color = centerConfig.color || '#000';
//       var sidePadding = centerConfig.sidePadding || 10;
//       var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
//       //Start with a base font of 30px
//       ctx.font = "30px " + fontStyle;

//       //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
//       var stringWidth = ctx.measureText(txt).width;
//       var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

//       // Find out how much the font can grow in width.
//       var widthRatio = elementWidth / stringWidth;
//       var newFontSize = Math.floor((txt.length > 4 ? 15 : 10) * widthRatio);
//       var elementHeight = (chart.innerRadius * 2);

//       // Pick a new font size so it will not be larger than the height of label.
//       var fontSizeToUse = Math.min(newFontSize, elementHeight);

//       //Set font settings to draw it correctly.
//       ctx.textAlign = 'center';
//       ctx.textBaseline = 'middle';
//       var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
//       var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
//       ctx.font = fontSizeToUse + "px " + fontStyle;
//       ctx.fillStyle = color;

//       //Draw text in center
//       ctx.fillText(txt, centerX, centerY);
//     }
//   }
// }
export class AppComponent {
  constructor() {
    Chart.defaults.font.family = 'Gilroy-Regular';
    Chart.register(annotationPlugin);
    // Chart.register(Colors);
  }
}
