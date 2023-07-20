import { ClinicFacade } from "@/newapp/clinic/facades/clinic.facade";
import { FinanceFacade } from "@/newapp/dashboard/facades/finance.facade";
import { LayoutFacade } from "@/newapp/layout/facades/layout.facade";
import { DateRangeMenus } from "@/newapp/shared/components/date-range-menu/date-range-menu.component";
import { JeeveLineFillOptions } from "@/newapp/shared/utils";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { ChartOptions, LegendOptions } from "chart.js";
import _, { forEach } from "lodash";
import { Subject, takeUntil, combineLatest, map } from 'rxjs';
import { _DeepPartialObject } from "chart.js/dist/types/utils";

@Component({
    selector: 'prod-collection-chart',
    templateUrl: './prod-collection.component.html',
    styleUrls: ['./prod-collection.component.scss']
})
export class ProdCollectionComponent implements OnInit, OnDestroy {
    @Input() toolTip = '';
    get isLoading$() {
        return combineLatest([
            this.financeFacade.isLoadingNetProfitProduction$, 
            this.financeFacade.isLoadingCollection$
        ]) .pipe(
            takeUntil(this.destroy$),
            map(([v, v1]) => v && v1)
        )
    }

    chartOptions: ChartOptions<'bar'>;

    datasets = [];
    labels = [];

    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();

    get totalProdVal$() {
        return this.financeFacade.productionVal$.pipe(
            takeUntil(this.destroy$),
            map(v => v)
        )
    }

    get totalProdTrendVal$(){
        return this.financeFacade.productionTrendVal$.pipe(
            takeUntil(this.destroy$),
            map(v => v)
        )
    }

    get collectionVal$() {
        return this.financeFacade.collectionVal$.pipe(
            takeUntil(this.destroy$),
            map(v => v)
        )
    }

    get collectionTrendVal$() {
        return this.financeFacade.collectionTrendVal$.pipe(
            takeUntil(this.destroy$),
            map(v => v)
        )
    }

    get durationLabel$() {
        return this.layoutFacade.durationLabel$
    }

    get durationTrendLabel$() {
        return this.layoutFacade.durationTrendLabel$
    }

    constructor(
        private financeFacade: FinanceFacade,
        private layoutFacade: LayoutFacade,
        private clinicFacade: ClinicFacade
    ) {
        combineLatest([
            this.financeFacade.productionVal$,
            this.financeFacade.prodChartData$,
            this.financeFacade.collectionChartData$,
            this.financeFacade.collectionVal$,
            this.clinicFacade.currentClinicId$
        ])
        .pipe(
            takeUntil(this.destroy$)
        ).subscribe(([prodVal, prodData, collData, collectionVal, clinicId]) => {
            let chartData = [];

            if(typeof clinicId == 'string'){
              const pChartData = [];
              prodData.forEach((item, index) => {
                pChartData.push({
                  data: [Math.round(parseFloat(<string>item.production))],
                  label: item.clinicName,
                  // backgroundColor: this.doughnutChartColors[idx],
                  // hoverBackgroundColor: this.doughnutChartColors[idx]
                })
              })
              chartData = pChartData.map((item) => {
                const collectionItem = collData.find(
                  (ele) => ele.clinicName == item.label
                );
                return {
                  ...item,
                  data: !!collectionItem
                    ? [...item.data, Math.round(parseFloat(<string>collectionItem.collection))]
                    : item.data
                };
              });
              this.chartOptions = this.labelBarOptionsMultiTC;
              this.datasets = chartData;
            }else{
              chartData.push(prodVal);
              chartData.push(collectionVal);
              this.chartOptions = this.labelBarOptionsTC;
              this.datasets = [{data: chartData}];
            }
            this.labels = [ 'Production', 'Collection'];
            
        });
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }

    
  get isMultipleClinic$(){
    return this.clinicFacade.currentClinicId$.pipe(
      takeUntil(this.destroy$),
      map(v => typeof v == 'string')
    )
  }

  public labelBarOptionsTC: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
      easing: 'easeOutSine'
    },
    scales: {
      x: 
        {
          grid: {
            color: 'transparent'
          },
          stacked: false,
        }
      ,
      y: 
        {
          stacked: false,
          grid: {
            color: 'transparent'
          },
          suggestedMin: 0,
          ticks: {
            callback: function (label: string | number, index, labels) {
              // when the floored value is the same as the value we have a whole number
              return `${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(Number(label))}`;
            },
            autoSkip: false
          }
        },
        
        
    },
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        mode: 'x',
        callbacks: {
          label: function (tooltipItems) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(tooltipItems.parsed.y);
          }
        }
      }
    }
  };

  public stackLegendGenerator: _DeepPartialObject<LegendOptions<any>> = {
    display: true,
    position: 'bottom',
    labels: {
      boxWidth: 8,
      usePointStyle: true,
      generateLabels: (chart) => {
        let labels = [];
        let bg_color = {};
        chart.data.datasets.forEach((item) => {
          item.data.forEach((val: number) => {
            if (val > 0) {
              labels.push(item.label);
              bg_color[item.label] = item.backgroundColor;
            }
          });
        });
        labels = [...new Set(labels)];
        labels = labels.splice(0, 10);
        return labels.map((item) => ({
          text: item,
          strokeStyle: bg_color[item],
          fillStyle: bg_color[item]
        }));
      }
    },
    // onClick: (event: MouseEvent, legendItem: LegendItem) => {}
  };

  public labelBarOptionsMultiTC: ChartOptions<'bar'> = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7
      },
      line: JeeveLineFillOptions,
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
      easing: 'easeOutSine'
    },
    scales: {
      x: 
        {
          stacked: true,
          ticks: {
            autoSkip: false
          }
        },
      y: 
        {
          stacked: true,
          ticks: {
            callback: function (label: string | number, index, labels) {
              // when the floored value is the same as the value we have a whole number
              return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(Number(label));
            }
          }
        }
    },
    plugins: {
      legend: this.stackLegendGenerator,
      tooltip: {
        mode: 'x',
        // enabled: false,
        // external: function (tooltipChart) {
        //   const tooltip = tooltipChart.tooltip;
        //   if (!tooltip) return;
        //   var tooltipEl = document.getElementById('chartjs-tooltip');
        //   if (!tooltipEl) {
        //     tooltipEl = document.createElement('div');
        //     tooltipEl.id = 'chartjs-tooltip';
        //     tooltipEl.style.backgroundColor = '#FFFFFF';
        //     tooltipEl.style.borderColor = '#B2BABB';
        //     tooltipEl.style.borderWidth = 'thin';
        //     tooltipEl.style.borderStyle = 'solid';
        //     tooltipEl.style.zIndex = '999999';
        //     tooltipEl.style.backgroundColor = '#000000';
        //     tooltipEl.style.color = '#FFFFFF';
        //     document.body.appendChild(tooltipEl);
        //   }
        //   if (tooltip.opacity === 0) {
        //     tooltipEl.style.opacity = '0';
        //     return;
        //   } else {
        //     tooltipEl.style.opacity = '0.8';
        //   }
  
        //   tooltipEl.classList.remove('above', 'below', 'no-transform');
        //   if (tooltip.yAlign) {
        //     tooltipEl.classList.add(tooltip.yAlign);
        //   } else {
        //     tooltipEl.classList.add('no-transform');
        //   }
  
        //   function getBody(bodyItem) {
        //     return bodyItem.lines;
        //   }
        //   if (tooltip.body) {
        //     var titleLines = tooltip.title || [];
        //     var bodyLines = tooltip.body.map(getBody);
        //     var labelColorscustom = tooltip.labelColors;
        //     var innerHtml = '<table><thead>';
        //     innerHtml += '</thead><tbody>';
  
        //     let total: any = 0;
        //     bodyLines.forEach(function (body, i) {
        //       if (!body[0].includes('$0')) {
        //         var singleval = body[0].split(':');
        //         if (singleval[1].includes('-')) {
        //           var temp = singleval[1].split('$');
        //           var amount = temp[1]?.replace(/,/g, '');
        //           total -= parseFloat(amount??'0');
        //         } else {
        //           var temp = singleval[1].split('$');
        //           var amount = temp[1]?.replace(/,/g, '');
        //           total += parseFloat(amount??'0');
        //         }
        //       }
        //     });
        //     total = Math.round(total);
        //     if (total != 0) {
        //       var num_parts = total.toString().split('.');
        //       num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        //       total = num_parts.join('.');
        //     }
        //     titleLines.forEach(function (title) {
        //       innerHtml +=
        //         '<tr><th colspan="2" style="text-align: left;">' +
        //         title +
        //         ': $' +
        //         total +
        //         '</th></tr>';
        //     });
        //     bodyLines.forEach(function (body, i) {
        //       if (!body[0].includes('$0')) {
        //         var body_custom = body[0];
        //         body_custom = body_custom.split(':');
        //         const lastIndex = body_custom.length - 1;
        //         if (body_custom[lastIndex].includes('-')) {
        //           var temp_ = body_custom[lastIndex].split('$');
        //           temp_[1] = Math.round(temp_.length > 1?temp_[1].replace(/,/g, ''):0);
        //           temp_[1] = temp_[1].toString();
        //           temp_[1] = temp_[1].split(/(?=(?:...)*$)/).join(',');
        //           body_custom[lastIndex] = temp_.join('$');
        //         } else {
        //           var temp_ = body_custom[lastIndex].split('$');
        //           temp_[1] = Math.round(temp_.length > 1?temp_[1].replace(/,/g, ''):0);
        //           temp_[1] = temp_[1].toString();
        //           temp_[1] = temp_[1].split(/(?=(?:...)*$)/).join(',');
        //           body_custom[lastIndex] = temp_.join('$');
        //         }
  
        //         body[0] = body_custom.join(':');
        //         innerHtml +=
        //           '<tr><td class="td-custom-tooltip-color"><span class="custom-tooltip-color" style="background:' +
        //           labelColorscustom[i].backgroundColor +
        //           '"></span></td><td style="padding: 0px">' +
        //           body[0] +
        //           '</td></tr>';
        //       }
        //     });
        //     innerHtml += '</tbody></table>';
        //     tooltipEl.innerHTML = innerHtml;
        //     //tableRoot.innerHTML = innerHtml;
        //   }
        //   // disable displaying the color box;
        //   var position = tooltipChart.chart.canvas.getBoundingClientRect();
        //   // Display, position, and set styles for font
        //   tooltipEl.style.position = 'fixed';
        //   tooltipEl.style.left =
        //     position.left + window.pageXOffset + tooltip.caretX - 130 + 'px';
        //   tooltipEl.style.top =
        //     position.top + window.pageYOffset + tooltip.caretY - 70 + 'px';
        //   // tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
        //   // tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
        //   // tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
        //   // tooltipEl.style.padding =
        //   //   tooltip.yPadding + 'px ' + tooltip. + 'px';
        //   tooltipEl.style.pointerEvents = 'none';
        // },
        // displayColors: false,
        callbacks: {
          label: function (tooltipItems) {
            return `${tooltipItems.dataset.label}: ${tooltipItems.parsed.y}`
          },
          title: function(tooltipItems){
            return `${tooltipItems[0].label}: ${_.sumBy(tooltipItems, t => t.parsed.y)}`
          }
        }
      }
    }
  };
  
}