import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import moment from 'moment';
import { Subject, takeUntil, map, combineLatest, filter } from 'rxjs';

export const DateRangeMenus: { range: DATE_RANGE_DURATION; label: string }[] = [
  { range: 'm', label: 'This Month' },
  { range: 'lm', label: 'Last Month' },
  { range: 'q', label: 'This Quarter' },
  { range: 'lq', label: 'Last Quarter' },
  { range: 'cytd', label: 'Calendar Year' },
  { range: 'lcytd', label: 'Last Calendar Year' },
  { range: 'fytd', label: 'Financial Year' },
  { range: 'lfytd', label: 'Last Financial Year' },
];

@Component({
  selector: 'date-range-menu',
  templateUrl: './date-range-menu.component.html',
  styleUrls: ['./date-range-menu.component.scss'],
})
export class DateRangeMenuComponent implements OnInit, OnDestroy {
  dateRangeMenus = DateRangeMenus;

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  selectedMenu: DATE_RANGE_DURATION;
  activedUrl = '';

  constructor(
    private layoutFacade: LayoutFacade,
    private dentistFacade: DentistFacade,
    private clinicFacade: ClinicFacade,
    private router: Router,
  ) {}

  get duration$() {
    return this.layoutFacade.dateRange$.pipe(
      takeUntil(this.destroy$),
      map(v => v.duration),
    );
  }

  get isDentistMode$() {
    return this.dentistFacade.isDentistMode$;
  }

  get isTrend$() {
    return this.layoutFacade.trend$.pipe(
      takeUntil(this.destroy$),
      map(v => v && v !== 'off'),
    );
  }

  get enableDatePresets$() {
    return combineLatest([
      this.dentistFacade.currentDentistId$,
      this.clinicFacade.currentClinics$,
      this.layoutFacade.trend$,
    ]).pipe(
      map(([dentistIds, clinicIds, trend]) => {
        if (this.activedUrl === '/newapp/dashboard/cliniciananalysis') {
          return dentistIds === 'all' || trend === 'off' || clinicIds.length > 1;
        } else {
          return trend === 'off';
        }
      }),
    );
  }

  ngOnInit(): void {
    this.layoutFacade.dateRange$.pipe(takeUntil(this.destroy$)).subscribe(v => {
      this.selectedMenu = v.duration;
    });

    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        map((event: any) => event.routerEvent ?? event),
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe(event => {
        const { url } = <NavigationEnd>event;
        this.activedUrl = url.split('?')[0];
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  setDuration(duration: DATE_RANGE_DURATION) {
    switch (duration) {
      case 'w':
        this.layoutFacade.saveDateRange(moment().startOf('week'), moment(), 'w', 1, false);
        break;
      case 'm':
        this.layoutFacade.saveDateRange(moment().startOf('month'), moment(), 'm', 1, true);
        break;
      case 'lm':
        this.layoutFacade.saveDateRange(
          moment().subtract(1, 'months').startOf('month'),
          moment().subtract(1, 'months').endOf('month'),
          duration,
          1,
          true,
        );
        break;
      case 'q':
        this.layoutFacade.saveDateRange(moment().startOf('quarter'), moment(), duration, 3, false);
        break;
      case 'lq':
        this.layoutFacade.saveDateRange(
          moment().subtract(1, 'quarters').startOf('quarter'),
          moment().subtract(1, 'quarters').endOf('quarter'),
          duration,
          3,
          false,
        );
        break;
      case 'cytd':
        this.layoutFacade.saveDateRange(
          moment().startOf('year'),
          moment(),
          duration,
          moment().diff(moment().startOf('year'), 'months', false),
          false,
        );
        break;
      case 'lcytd':
        this.layoutFacade.saveDateRange(
          moment().subtract(1, 'years').startOf('year'),
          moment().subtract(1, 'years').endOf('year'),
          duration,
          12,
          false,
        );
        break;
      case 'fytd':
        if (moment().month() >= 6) {
          this.layoutFacade.saveDateRange(
            moment().month(6).date(1),
            moment(),
            duration,
            moment().diff(moment().month(6).date(1), 'months', false),
            false,
          );
        } else {
          this.layoutFacade.saveDateRange(
            moment().subtract(1, 'years').month(6).date(1),
            moment(),
            duration,
            moment().diff(moment().subtract(1, 'years').month(6).date(1), 'months', false),
            false,
          );
        }
        break;
      case 'lfytd':
        // if (moment().month() >= 5) {
        //   this.layoutFacade.saveDateRange(
        //     moment().subtract(1, 'years').month(6).date(1),
        //     moment().month(5).date(30),
        //     duration,
        //     12,
        //     false
        //   );
        // } else {
        if (moment().month() < 6) {
          this.layoutFacade.saveDateRange(
            moment().subtract(2, 'years').month(6).date(1),
            moment().subtract(1, 'years').month(5).date(30),
            duration,
            12,
            false,
          );
        } else {
          this.layoutFacade.saveDateRange(
            moment().subtract(1, 'years').month(6).date(1),
            moment().subtract(0, 'years').month(5).date(30),
            duration,
            12,
            false,
          );
        }

        //}
        break;
    }
    this.layoutFacade.setTrend('off');
  }
}
