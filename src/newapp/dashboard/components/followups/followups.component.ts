import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardFacade } from '../../facades/dashboard.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import {
  Subject,
  takeUntil,
  combineLatest,
  map,
  distinctUntilChanged,
  filter,
} from 'rxjs';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import moment from 'moment';
import _ from 'lodash';
import { FollowupsFacade } from '../../facades/followups.facade';

@Component({
  selector: 'dashboard-followups',
  templateUrl: './followups.component.html',
  styleUrls: ['./followups.component.scss'],
})
export class FollowupsComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  get clinicId$() {
    return this.clinicFacade.currentClinicId$;
  }

  constructor(
    private dashbordFacade: DashboardFacade,
    private clinicFacade: ClinicFacade,
    private fuFacadee: FollowupsFacade,
    private layoutFacade: LayoutFacade
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
        this.dashbordFacade.loadChartTips(9, clinicIds);
      });

    combineLatest([
      this.clinicFacade.currentClinicId$,
      this.layoutFacade.dateRange$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(params => {
        const [clinicId, dateRange] = params;
        if (clinicId == null) return;
        const startDate = dateRange.start;
        const endDate = dateRange.end;
        const duration = dateRange.duration;

        const queryParams: FuApiQueryParams = {
          clinicId: clinicId,
          startDate: startDate && moment(startDate).format('DD-MM-YYYY'),
          endDate: endDate && moment(endDate).format('DD-MM-YYYY'),
          duration: duration,
        };

        this.fuFacadee.loadFuGetConversion(queryParams);
        this.fuFacadee.loadFuGetFollowupCompletion(queryParams);
        this.fuFacadee.loadFuGetOutcome(queryParams);
        this.fuFacadee.loadFuGetConversionPerUser(queryParams);
        this.fuFacadee.loadFuGetPerUser(queryParams);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  getChartTip(index: number) {
    return this.dashbordFacade.chartTips$.pipe(
      takeUntil(this.destroy$),
      map(c => {
        if (c && c[index]) {
          return c[index];
        }
        return '';
      })
    );
  }
}
