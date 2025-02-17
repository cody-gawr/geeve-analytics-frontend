import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardFacade } from '../../facades/dashboard.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import {
  Subject,
  takeUntil,
  combineLatest,
  map,
  filter,
  distinctUntilChanged,
} from 'rxjs';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Router } from '@angular/router';
import moment from 'moment';
import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { FrontDeskFacade } from '../../facades/front-desk.facade';
import _ from 'lodash';
import { ChartTip } from '@/newapp/models/dashboard/finance';
import { CHART_WIDTH_CLASS } from '@/newapp/shared/constants';
import { FD_CHART_ID } from '@/newapp/models/dashboard/front-desk';

@Component({
  selector: 'dashboard-front-desk',
  templateUrl: './front-desk.component.html',
  styleUrls: ['./front-desk.component.scss'],
})
export class FrontDeskComponent implements OnInit, OnDestroy {
  FrontDeskChartIDs = FD_CHART_ID;
  
  FrontDeskChartLayouts = [
    [this.FrontDeskChartIDs.utilisation, this.FrontDeskChartIDs.recallRate, this.FrontDeskChartIDs.reappointRate],
    [this.FrontDeskChartIDs.numberTicks, this.FrontDeskChartIDs.ftaRatio, this.FrontDeskChartIDs.utaRatio]
  ];

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  chartTips: {[key: number]: ChartTip} = {};
  chartWidths: {[key: number]: string} = {};

  get isPraktika$() {
    return this.clinicFacade.isEachClinicPraktika$;
  }

  get isCore$() {
    return this.clinicFacade.isEachClinicCore$;
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(map(t => t !== 'off'));
  }

  get authUserId$() {
    return this.authFacade.authUserData$.pipe(
      map(
        authUserData => (authUserData ?? this.authFacade.getAuthUserData()).id
      )
    );
  }

  get clinicId$() {
    return this.clinicFacade.currentClinicId$;
  }

  constructor(
    private dashbordFacade: DashboardFacade,
    private clinicFacade: ClinicFacade,
    private frontDeskFacade: FrontDeskFacade,
    private layoutFacade: LayoutFacade,
    private authFacade: AuthFacade,
    private router: Router
  ) {
    this.layoutFacade.setTrend('off');
  }

  ngOnInit(): void {
    this.clinicFacade.currentClinicId$
      .pipe(
        takeUntil(this.destroy$),
        filter(v => !!v),
        distinctUntilChanged()
      )
      .subscribe(clinicIds => {
        this.dashbordFacade.loadChartTips(3, clinicIds);
      });

    combineLatest([
      this.clinicFacade.currentClinics$,
      this.layoutFacade.dateRange$,
      this.clinicFacade.connectedWith$,
      this.router.routerState.root.queryParams,
      this.layoutFacade.trend$,
      this.clinicFacade.connectedClinicId$,
      this.dashbordFacade.chartTips$
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(params => {
        const [
          clinics,
          dateRange,
          connectedWith,
          route,
          trend,
          connectedClinicId,
          _chartTips
        ] = params;

        if(!_chartTips) return;
        this.chartTips = _chartTips;

        const clinicId =
          clinics.length > 0
            ? clinics.length > 1
              ? clinics.map(c => c.id).join(',')
              : clinics[0].id
            : null;
        // const isEachClinicPmsCoreOrExact =
        //   clinics.every(c => c.pms == 'core') ||
        //   clinics.every(c => c.pms == 'exact');
        // const isEachClinicPmsCoreOrPraktika = clinics.every(
        //   c => c.pms == 'praktika' || c.pms == 'core'
        // );
        if (clinicId == null) return;

        const newConnectedId =
          typeof clinicId == 'string'
            ? _.min(clinicId.split(',').map(c => parseInt(c)))
            : clinicId;
        if (newConnectedId !== connectedClinicId) {
          return;
        }

        const startDate = dateRange.start;
        const endDate = dateRange.end;
        const duration = dateRange.duration;

        const queryWhEnabled = route && parseInt(route.wh ?? '0') == 1 ? 1 : 0;
        this.frontDeskFacade.setErrors([]);

        const spCallApis = {
          [this.FrontDeskChartIDs.ftaRatio]: [(a) => this.frontDeskFacade.loadFdFtaRatio(a)],
          [this.FrontDeskChartIDs.numberTicks]: [(a) => this.frontDeskFacade.loadFdNumTicks(a)],
          [this.FrontDeskChartIDs.reappointRate]: [(a) => this.frontDeskFacade.loadFdReappointRate(a)],
          [this.FrontDeskChartIDs.recallRate]: [(a) => this.frontDeskFacade.loadFdRecallRate(a)],
          [this.FrontDeskChartIDs.utaRatio]: [(a) => this.frontDeskFacade.loadFdUtaRatio(a)],
          [this.FrontDeskChartIDs.utilisation]: [
            (a) => this.frontDeskFacade.loadFdUtilisationRate(a),
            (a) => this.frontDeskFacade.loadFdUtilisationRateByDay(a)
          ],
        }

        const spCallApisTrend = {
          [this.FrontDeskChartIDs.ftaRatio]: [
            (a, b, c) => this.frontDeskFacade.loadFdFtaRatioTrend(a, b, c)
          ],
          [this.FrontDeskChartIDs.numberTicks]: [(a, b, c) => this.frontDeskFacade.loadFdNumTicksTrend(a, b, c)],
          [this.FrontDeskChartIDs.reappointRate]: [(a, b, c) => this.frontDeskFacade.loadFdReappointRateTrend(a, b, c)],
          [this.FrontDeskChartIDs.recallRate]: [(a, b, c) => this.frontDeskFacade.loadFdRecallRateTrend(a, b, c)],
          [this.FrontDeskChartIDs.utaRatio]: [(a, b, c) => this.frontDeskFacade.loadFdUtaRatioTrend(a, b, c)],
          [this.FrontDeskChartIDs.utilisation]: [(a, b, c) => this.frontDeskFacade.loadFdUtilisationRateTrend(a, b, c)]
        }


        const availableChartIds: number[] = [];
        switch (trend) {
          case 'off':
            const params = {
              clinicId: clinicId,
              startDate: startDate && moment(startDate).format('DD-MM-YYYY'),
              endDate: endDate && moment(endDate).format('DD-MM-YYYY'),
              duration: duration,
              queryWhEnabled,
              connectedWith: connectedWith,
            };
            Object.keys(spCallApis).map(key => {
                const intkey = parseInt(key);
                const info = this.chartTips[intkey]?.info;
                if(info?.toLowerCase() === 'disabled'){

                }else if(info?.toLowerCase() === 'coming-soon'){
                  availableChartIds.push(intkey);
                }else{
                  availableChartIds.push(intkey);
                  spCallApis[intkey].map(spCallFn => {
                    spCallFn(params);
                  });
                }
            });
            break;
          case 'current':
          case 'historic':
            Object.keys(spCallApisTrend).map(key => {
              const intkey = parseInt(key);
              const info = this.chartTips[key]?.info;
              if(info?.toLowerCase() === 'disabled'){

              }else if(info?.toLowerCase() === 'coming-soon'){
                availableChartIds.push(intkey);
              }
              else{
                availableChartIds.push(intkey);
                spCallApisTrend[key].map(spCallFn => {
                  spCallFn(
                    clinicId,
                    trend === 'current' ? 'c' : 'h',
                    queryWhEnabled
                  );
                })
              }
          });
            break;
        }
        this.chartWidths = {};
        const availableChartLayouts = this.FrontDeskChartLayouts.map(l => l.filter(v => availableChartIds.includes(v)));
        availableChartIds.forEach(chartId => {
          const rowIdx = availableChartLayouts.findIndex(row => row.includes(chartId));
          if(rowIdx > -1){
            const len = availableChartLayouts[rowIdx].length;
            this.chartWidths[chartId] = CHART_WIDTH_CLASS[len];
          }
        })
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
