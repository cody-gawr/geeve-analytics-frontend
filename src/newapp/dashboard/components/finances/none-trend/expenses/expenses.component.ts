import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { FinanceFacade } from '@/newapp/dashboard/facades/finance.facade';
import { DoughnutChartColors } from '@/newapp/shared/constants';
import {
  JeeveLineFillOptions,
  externalTooltipHandler,
} from '@/newapp/shared/utils';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';
import { MkSelectExpensesModalComponent } from '../select-expenses-modal/select-expenses-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DashboardFacade } from '@/newapp/dashboard/facades/dashboard.facade';
import { ChartTip } from '@/newapp/models/dashboard/finance';
  
@Component({
  selector: 'finance-expense-chart',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class FinanceExpensesComponent implements OnInit, OnDestroy {
  @Input() toolTip: ChartTip;
  get isComingSoon() {
    return this.toolTip?.info.toLowerCase() === 'coming-soon';
  }  
  @Input() isFullMonths = false;
  get isLoading$() {
    return this.financeFacade.isLoadingFnExpenses$;
  }

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  selectedData: { value: number | string; name: string }[] = [];
  unSelectedData: { value: number | string; name: string }[] = [];
  // totalDataLength = 0;

  isShowLabels = true;
  isExplodeSlices = false;
  arcWidth = 0.75;
  isDoughnut = false;
  isGradient = false;
  isTooltipDisabled = false;

  datasets = [];
  labels = [];

  get hasData$() {
    return combineLatest([this.clinicFacade.currentClinicId$]).pipe(
      map(([clinicId]) => {
        if (typeof clinicId === 'string') {
          return this.datasets.length > 0;
        } else {
          return this.selectedData.length > 0;
        }
      })
    );
  }

  get isMultipleClinic$() {
    return this.clinicFacade.currentClinicId$.pipe(
      map(v => typeof v == 'string')
    );
  }

  get isConnectedWith$() {
    return this.clinicFacade.connectedWith$.pipe(
      map(v => v === 'xero' || v === 'myob')
    );
  }

  colorScheme = {
    domain: [
      '#6edbba',
      '#abb3ff',
      '#b0fffa',
      '#ffb4b5',
      '#d7f8ef',
      '#fffdac',
      '#fef0b8',
      '#4ccfae',
    ],
  };

  constructor(
    private financeFacade: FinanceFacade,
    private clinicFacade: ClinicFacade,
    public dialog: MatDialog,
    private dashboardFacade: DashboardFacade
  ) {
    combineLatest([
      this.financeFacade.fnExpensesData$,
      this.clinicFacade.currentClinicId$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([resBody, clinicId]) => {
        if (resBody === null) {
          this.datasets = [];
          this.selectedData = [];
          return;
        };
        const expenses = resBody.data,
          production = resBody.production;
        if (typeof clinicId === 'string') {
          this.datasets = [];
          let i = 0;
          _.chain(expenses)
            .groupBy('accountName')
            .map((accItems, accountName) => {
              return {
                accItems,
                accountName,
              };
            })
            .value()
            .forEach(finalRow => {
              const bgColor = DoughnutChartColors[i];
              i++;
              this.datasets.push({
                data: finalRow.accItems.map(item => {
                  const clinicProd = parseFloat(
                    <string>(
                      resBody.productions.find(p => p.clinicId == item.clinicId)
                        ?.production
                    )
                  );
                  return {
                    x: item.clinicName,
                    y: ((item.expense / clinicProd) * 100).toFixed(1),
                  };
                }),
                label: finalRow.accountName,
                backgroundColor: bgColor,
                hoverBackgroundColor: bgColor,
              });
            });

          this.labels = _.chain(expenses)
            .orderBy('clinicId', 'asc')
            .uniqBy(item => item.clinicName)
            .value()
            .map(item => item.clinicName);
        } else {
          if (production > 0) {
            this.selectedData = [];
            this.unSelectedData = [];
            expenses.forEach((item, index) => {
              const chartItem = {
                name: `${item.accountName}--${item.expense}`,
                value: ((item.expense / production) * 100).toFixed(1),
              };

              if (index < 15) {
                this.selectedData.push(chartItem);
              } else {
                this.unSelectedData.push(chartItem);
              }
            });
            // this.totalDataLength = expenses.length;
          }
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  pieTooltipText({ data, index }) {
    const labl = data.name.split('--');
    if (labl.length > 1) {
      const label = labl[0];
      const exp = Math.round(labl[1])
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return `
              <span class="tooltip-label">${label}</span>
              <span class="tooltip-val"> ${data.value}% ($${exp})</span>
            `;
    } else {
      return '';
    }
  }

  pieLabelText(labels) {
    return labels.split('--')[0];
  }

  openExpensesDialog() {
    const dialogRef = this.dialog.open(MkSelectExpensesModalComponent, {
      data: {
        selectedData: this.selectedData.slice(),
        unSelectedData: this.unSelectedData.slice(),
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedData = result.selectedData;
      this.unSelectedData = result.unSelectedData;
    });
  }

  public labelBarOptionsMultiPercentage: ChartOptions<'bar'> = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
      line: JeeveLineFillOptions,
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
      easing: 'easeOutSine',
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          callback: (label: string | number) => {
            return `${Number(label)}%`;
          },
        },
      },
    },
    plugins: {
      // colors: { enabled: true },
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: (ctx, options) => {
          const tooltip = ctx.tooltip;
          if (!tooltip) return true;
          // disable displaying the color box;
          return false;
        },
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        mode: 'x',
        callbacks: {
          label: tooltipItem => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}%`;
          },
          title: () => '',
        },
      },
    },
  };
}
