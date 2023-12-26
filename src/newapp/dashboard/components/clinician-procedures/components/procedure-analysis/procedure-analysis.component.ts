import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { ClinicianProcedureFacade } from '@/newapp/dashboard/facades/clinician-procedures.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, LegendOptions, ChartDataset } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import {
  Subject,
  takeUntil,
  combineLatest,
  map,
  distinctUntilChanged,
} from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'cp-procedure-analysis-chart',
  templateUrl: './procedure-analysis.component.html',
  styleUrls: ['./procedure-analysis.component.scss'],
})
export class CpAnalysisComponent implements OnInit, OnDestroy {
  @Input() toolTip = '';

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  get isGeneral$() {
    return this.cpFacade.cpPredictorAnalysisVisibility$.pipe(
      map(v => v === 'general')
    );
  }

  get isSpecialList$() {
    return this.cpFacade.cpPredictorAnalysisVisibility$.pipe(
      map(v => v === 'specialist')
    );
  }

  get enablePaTable$() {
    return combineLatest([this.isTrend$, this.isDentistMode$]).pipe(
      map(([isTrend, isDentistMode]) => {
        return (
          !isTrend && !isDentistMode && this.maxVal > 0 && this.showPaTable
        );
      })
    );
  }

  showPaTable = false;
  datasets: ChartDataset[] = [];
  labels = [];
  maxVal = 0;
  bgColors = [];
  paTableData = [];

  get isLoading$() {
    return combineLatest([
      this.cpFacade.isLoadingCpPredictorAnalysis$,
      this.cpFacade.isLoadingCpPredictorSpecialistAnalysis$,
      this.cpFacade.isLoadingCpPredictorAnalysisTrend$,
    ]).pipe(
      map(
        ([
          isLoadingCpPredictorAnalysis,
          isLoadingCpPredictorSpecialistAnalysis,
          isLoadingCpPredictorAnalysisTrend,
        ]) => {
          return (
            isLoadingCpPredictorAnalysis ||
            isLoadingCpPredictorSpecialistAnalysis ||
            isLoadingCpPredictorAnalysisTrend
          );
        }
      )
    );
  }

  get isMultipleClinic$() {
    return this.clinicFacade.isMultiClinicsSelected$;
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(t => t !== 'off'));
  }

  get legend$() {
    return combineLatest([
      this.isTrend$,
      this.clinicFacade.currentClinics$,
      this.dentistFacade.currentDentistId$,
    ]).pipe(
      map(
        ([isTrend, clinics, dentistId]) =>
          !(isTrend || (clinics.length == 1 && dentistId !== 'all'))
      )
    );
  }

  get hasData() {
    return this.labels.length > 0;
  }

  get noDataAlertMessage$() {
    return this.isGeneral$.pipe(
      takeUntil(this.destroy$),
      map(isGeneral =>
        isGeneral
          ? 'You have no Crowns, Splints, RCTs, Perio, Stainless Steel Crowns, Composite Veneers, Implant Crowns, Whitening or Extractions in this period'
          : 'You have no specialist items in this period'
      )
    );
  }

  get isDentistMode$() {
    return this.dentistFacade.isDentistMode$;
  }

  constructor(
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
    private dentistFacade: DentistFacade,
    private cpFacade: ClinicianProcedureFacade,
    private sanitized: DomSanitizer
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.isTrend$,
      this.cpFacade.cpPredictorAnalysisVisibility$,
      this.cpFacade.cpPredictorAnalysisChartData$,
      this.cpFacade.cpPredictorSpecialistAnalysisChartData$,
      this.cpFacade.cpPredictorAnalysisTrendChartData,
      this.isDentistMode$,
      this.isMultipleClinic$,
    ])
      .pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        ([
          isTrend,
          visibility,
          chartData,
          specialChartData,
          predictorAnalysisTrendChartData,
          dentistMode,
          isMultiClinics,
        ]) => {
          if (dentistMode && isTrend) {
            this.datasets = predictorAnalysisTrendChartData.datasets;
            this.labels = predictorAnalysisTrendChartData.labels;
          } else {
            if (visibility === 'general') {
              this.datasets = chartData.datasets;
              this.labels = chartData.labels;
              this.maxVal = chartData.maxData;
              this.bgColors = chartData.bgColors;
              if (!isMultiClinics && !isTrend) {
                this.paTableData = chartData.paTableData;
              }
            } else {
              this.datasets = specialChartData.datasets;
              this.labels = specialChartData.labels;
              this.maxVal = specialChartData.maxData;
              this.bgColors = specialChartData.bgColors;
              if (!isMultiClinics && !isTrend) {
                this.paTableData = specialChartData.paSpecialTableData;
              }
            }
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  setVisibility(val: 'general' | 'specialist') {
    this.cpFacade.setCpPredictorAnalysisVisibility(val);
  }

  get chartOptions$() {
    return combineLatest([
      this.clinicFacade.currentClinics$,
      this.dentistFacade.currentDentistId$,
    ]).pipe(
      map(([clinics, dentistId]) => {
        if (clinics.length === 1 && dentistId !== 'all') {
          return this.stackedChartOptions;
        } else if (clinics.length > 1) {
          return this.stackedChartOptionsmulti;
        } else return this.stackedChartOptions;
      })
    );
  }

  private legendLabelOptions: _DeepPartialObject<LegendOptions<any>> = {
    labels: {
      usePointStyle: true,
      padding: 20,
    },
    onClick: function (e) {
      e.native.stopPropagation();
    },
  };

  public stackedChartOptions: ChartOptions = {
    hover: {
      mode: null,
    },
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
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
          callback: function (label: number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label;
            }
            return '';
          },
        },
      },
    },
    plugins: {
      colors: {
        enabled: true,
      },
      legend: {
        display: true,
        position: 'top',
        ...this.legendLabelOptions,
      },
      tooltip: {
        mode: 'x',
        displayColors(ctx, options) {
          return !!ctx.tooltip;
        },
        callbacks: {
          label: function (tooltipItems) {
            if (tooltipItems.parsed.y > 0 && tooltipItems.dataset.label != '') {
              if (tooltipItems.dataset.label.indexOf('DentistMode-') >= 0) {
                return tooltipItems.label + ': ' + tooltipItems.formattedValue;
              } else {
                return (
                  tooltipItems.dataset.label +
                  ': ' +
                  tooltipItems.formattedValue
                );
              }
            }
            return '';
          },
          title: function (tooltip) {
            if (tooltip[0].dataset.label?.indexOf('DentistMode-') >= 0) {
              var dentist = tooltip[0].dataset.label.split('Mode-');
              return dentist[1];
            } else {
              return tooltip[0].label;
            }
          },
        },
      },
    },
  };
  public stackedChartOptionsmulti: ChartOptions = {
    hover: {
      mode: null,
    },
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7,
      },
      // bar: {
      //   borderWidth: 10,
      // },
    },
    // scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
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
          callback: function (label: number, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label;
            }
            return '';
          },
        },
      },
    },
    plugins: {
      colors: {
        enabled: true,
      },
      legend: {
        display: true,
        position: 'top',
        ...this.legendLabelOptions,
      },
      tooltip: {
        mode: 'x',
        displayColors(ctx, options) {
          return !ctx.tooltip;
        },
        callbacks: {
          label: function (tooltipItems) {
            if (tooltipItems.parsed.y > 0 && tooltipItems.dataset.label != '') {
              if (tooltipItems.dataset.label.indexOf('DentistMode-') >= 0) {
                return tooltipItems.label + ': ' + tooltipItems.formattedValue;
              } else {
                return (
                  tooltipItems.dataset.label +
                  ': ' +
                  tooltipItems.formattedValue
                );
              }
            }
            return '';
          },
          title: function (tooltip) {
            if (tooltip[0].dataset.label.indexOf('DentistMode-') >= 0) {
              var dentist = tooltip[0].dataset.label.split('Mode-');
              return dentist[1];
            } else {
              return tooltip[0].label;
            }
          },
        },
      },
    },
  };

  generatePaGeneralTotal(palData) {
    const Crowns_Onlays = palData
      .map(item => parseFloat(item.Crowns_Onlays))
      .map(v => Math.round(v))
      .reduce((prev, curr) => prev + curr, 0);
    const Splints = palData
      .map(item => parseFloat(item.Splints))
      .map(v => Math.round(v))
      .reduce((prev, curr) => prev + curr, 0);
    const RCT = palData
      .map(item => parseFloat(item.RCT))
      .map(v => Math.round(v))
      .reduce((prev, curr) => prev + curr, 0);
    const Perio = palData
      .map(item => parseFloat(item.Perio))
      .map(v => Math.round(v))
      .reduce((prev, curr) => prev + curr, 0);
    const Surg_Ext = palData
      .map(item => parseFloat(item.Surg_Ext))
      .map(v => Math.round(v))
      .reduce((prev, curr) => prev + curr, 0);
    const Imp_Crowns = palData
      .map(item => parseFloat(item.Imp_Crowns))
      .map(v => Math.round(v))
      .reduce((prev, curr) => prev + curr, 0);
    const SS_Crowns = palData
      .map(item => parseFloat(item.SS_Crowns))
      .map(v => Math.round(v))
      .reduce((prev, curr) => prev + curr, 0);
    const Comp_Veneers = palData
      .map(item => parseFloat(item.Comp_Veneers))
      .map(v => Math.round(v))
      .reduce((prev, curr) => prev + curr, 0);
    const Whitening = palData
      .map(item => parseFloat(item.Whitening))
      .map(v => Math.round(v))
      .reduce((prev, curr) => prev + curr, 0);
    let html = '<td> Total </td>';
    html += '<td>' + Crowns_Onlays + '</td>';
    html += '<td>' + Splints + '</td>';
    html += '<td>' + RCT + '</td>';
    html += '<td>' + Perio + '</td>';
    html += '<td>' + Surg_Ext + '</td>';
    html += '<td>' + Imp_Crowns + '</td>';
    html += '<td>' + SS_Crowns + '</td>';
    html += '<td>' + Comp_Veneers + '</td>';
    html += '<td>' + Whitening + '</td>';
    return this.sanitized.bypassSecurityTrustHtml(html);
  }

  toggleShowPaTable() {
    this.showPaTable = !this.showPaTable;
  }

  generatePaSpecialTotal(palData: any[]) {
    const implantSurg = palData
      .map((item: any) => parseFloat(item.Implant_Surg))
      .map((v: number) => Math.round(v))
      .reduce((prev: number, curr: number) => prev + curr, 0);

    const braces = palData
      .map((item: any) => parseFloat(item.Braces))
      .map((v: number) => Math.round(v))
      .reduce((prev: number, curr: number) => prev + curr, 0);

    const aligners = palData
      .map((item: any) => parseFloat(item.Aligners))
      .map((v: number) => Math.round(v))
      .reduce((prev: number, curr: number) => prev + curr, 0);

    const mas = palData
      .map((item: any) => parseFloat(item.MAS))
      .map((v: number) => Math.round(v))
      .reduce((prev: number, curr: number) => prev + curr, 0);

    const perioSurg = palData
      .map((item: any) => parseFloat(item.Perio_Surg))
      .map((v: number) => Math.round(v))
      .reduce((prev: number, curr: number) => prev + curr, 0);

    const endoReTreat = palData
      .map((item: any) => parseFloat(item.Endo_Re_treat))
      .map((v: number) => Math.round(v))
      .reduce((prev: number, curr: number) => prev + curr, 0);

    const veneersInd = palData
      .map((item: any) => parseFloat(item.Veneers_ind))
      .map((v: number) => Math.round(v))
      .reduce((prev: number, curr: number) => prev + curr, 0);

    let html = '<td> Total </td>';
    html += '<td>' + implantSurg + '</td>';
    html += '<td>' + braces + '</td>';
    html += '<td>' + aligners + '</td>';
    html += '<td>' + mas + '</td>';
    html += '<td>' + perioSurg + '</td>';
    html += '<td>' + endoReTreat + '</td>';
    html += '<td>' + veneersInd + '</td>';

    return this.sanitized.bypassSecurityTrustHtml(html);
  }
}
