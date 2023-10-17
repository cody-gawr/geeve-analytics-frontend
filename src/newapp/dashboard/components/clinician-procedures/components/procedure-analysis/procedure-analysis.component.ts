import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { ClinicianProcedureFacade } from '@/newapp/dashboard/facades/clinician-procedures.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, LegendOptions, ChartDataset } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';
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
      takeUntil(this.destroy$),
      map(v => v === 'general')
    );
  }

  get isSpecialList$() {
    return this.cpFacade.cpPredictorAnalysisVisibility$.pipe(
      takeUntil(this.destroy$),
      map(v => v === 'specialist')
    );
  }

  get enablePaTable$() {
    return combineLatest([this.isTrend$, this.isMultipleClinic$]).pipe(
      map(([isTrend, isMultipleClinic]) => {
        return (
          !isTrend && !isMultipleClinic && this.maxVal > 0 && this.showPaTable
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
    ]).pipe(
      takeUntil(this.destroy$),
      map(([isLoading1, isLoading2]) => {
        return isLoading1 || isLoading2;
      })
    );
  }

  get isMultipleClinic$() {
    return this.clinicFacade.currentClinicId$.pipe(
      takeUntil(this.destroy$),
      map(v => typeof v == 'string')
    );
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(
      takeUntil(this.destroy$),
      map(t => t !== 'off')
    );
  }

  get legend$() {
    return combineLatest([
      this.clinicFacade.currentClinics$,
      this.dentistFacade.currentDentistId$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(([clinics, dentistId]) => {
        return !(clinics.length == 1 && dentistId !== 'all');
      })
    );
  }

  get hasData() {
    return this.labels.length > 0 && this.maxVal > 0;
  }

  get noDataAlertMessage$() {
    return combineLatest([
      this.clinicFacade.currentClinics$,
      this.dentistFacade.currentDentistId$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(([clinics, dentistId]) => {
        if (clinics.length == 1 && dentistId !== 'all') {
          return 'You have no specialist items in this period';
        }
        return `You have no Crowns, Splints, RCTs, Perio, Stainless Steel Crowns, Composite Veneers, Implant Crowns, Whitening or Extractions in this period`;
      })
    );
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
      this.isMultipleClinic$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ([
          isTrend,
          visibility,
          chartData,
          specialChartData,
          isMultiClinics,
        ]) => {
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
      //this.isTrend$,
      this.clinicFacade.currentClinics$,
      this.dentistFacade.currentDentistId$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(([clinics, dentistId]) => {
        if (clinics.length === 1 && dentistId !== 'all') {
          // dentistMode
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
      bar: {
        borderWidth: 10,
      },
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

  generatePaSpecialTotal(palData) {
    const Implant_Surg = palData
      .map(item => parseFloat(item.Implant_Surg))
      .map(v => Math.round(v))
      .reduce((prev, curr) => prev + curr, 0);
    const Braces = palData
      .map(item => parseFloat(item.Braces))
      .map(v => Math.round(v))
      .reduce((prev, curr) => prev + curr, 0);
    const Aligners = palData
      .map(item => parseFloat(item.Aligners))
      .map(v => Math.round(v))
      .reduce((prev, curr) => prev + curr, 0);
    const MAS = palData
      .map(item => parseFloat(item.MAS))
      .map(v => Math.round(v))
      .reduce((prev, curr) => prev + curr, 0);
    const Perio_Surg = palData
      .map(item => parseFloat(item.Perio_Surg))
      .map(v => Math.round(v))
      .reduce((prev, curr) => prev + curr, 0);
    const Endo_Re_treat = palData
      .map(item => parseFloat(item.Endo_Re_treat))
      .map(v => Math.round(v))
      .reduce((prev, curr) => prev + curr, 0);
    const Veneers_ind = palData
      .map(item => parseFloat(item.Veneers_ind))
      .map(v => Math.round(v))
      .reduce((prev, curr) => prev + curr, 0);
    let html = '<td> Total </td>';
    html += '<td>' + Implant_Surg + '</td>';
    html += '<td>' + Braces + '</td>';
    html += '<td>' + Aligners + '</td>';
    html += '<td>' + MAS + '</td>';
    html += '<td>' + Perio_Surg + '</td>';
    html += '<td>' + Endo_Re_treat + '</td>';
    html += '<td>' + Veneers_ind + '</td>';
    return this.sanitized.bypassSecurityTrustHtml(html);
  }
}
