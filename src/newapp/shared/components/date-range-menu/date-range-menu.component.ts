import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { DATE_RANGE_DURATION } from '@/newapp/models/layout';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import moment from 'moment';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';

export const DateRangeMenus: {range: DATE_RANGE_DURATION, label: string}[] = [
    { range: 'm', label: 'This Month' }, 
    { range: 'lm', label: 'Last Month' },
    { range: 'q', label: 'This Quarter' },
    { range: 'lq', label: 'Last Quarter' },
    { range: 'cytd', label: 'Calendar Year' }, 
    { range: 'lcytd', label: 'Last Calendar Year' }, 
    { range: 'fytd', label: 'Financial Year' }, 
    { range: 'lfytd', label: 'Last Financial Year' }
]

@Component({
  selector: 'date-range-menu',
  templateUrl: './date-range-menu.component.html',
  styleUrls: ['./date-range-menu.component.scss']
})
export class DateRangeMenuComponent implements OnInit, OnDestroy {
  dateRangeMenus = DateRangeMenus;

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  constructor(
    private layoutFacade: LayoutFacade
  ) {}

  get duration$(){
    return this.layoutFacade.dateRange$.pipe(
        takeUntil(this.destroy$),
        map(v => v.duration)
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  setDuration(duration: DATE_RANGE_DURATION) {
    switch(duration){
        case 'w':
            break;
        case 'm':
            this.layoutFacade.saveDateRange(
                moment().startOf('month'), 
                moment(),
                'm'
            );
            break;
        case 'lm':
            this.layoutFacade.saveDateRange(
                moment().subtract(1, 'months').startOf('month'), 
                moment(),
                duration
            );
            break;
        case 'q':
            this.layoutFacade.saveDateRange(
                moment().startOf('quarter'), 
                moment(),
                duration
            );
            break;
        case 'lq':
            this.layoutFacade.saveDateRange(
                moment().subtract(1, 'quarters').startOf('quarter'), 
                moment(),
                duration
            );
            break;
        case 'cytd':
            this.layoutFacade.saveDateRange(
                moment().startOf('year'), 
                moment(),
                duration
            );
            break;
        case 'lcytd':
            this.layoutFacade.saveDateRange(
                moment().subtract(1, 'years').startOf('year'), 
                moment(),
                duration
            );
            break;
        case 'fytd':
            if(moment().month() >= 5){
                this.layoutFacade.saveDateRange(
                    moment().month(6).date(1), 
                    moment(),
                    duration
                );
            }else{
                this.layoutFacade.saveDateRange(
                    moment().subtract(1, 'years').month(6).date(1), 
                    moment(),
                    duration
                );
            }
            break;
        case 'lfytd':
            if(moment().month() >= 5){
                this.layoutFacade.saveDateRange(
                    moment().subtract(1, 'years').month(6).date(1), 
                    moment(),
                    duration
                );
            }else{
                this.layoutFacade.saveDateRange(
                    moment().subtract(2, 'years').month(6).date(1), 
                    moment(),
                    duration
                );
            }
            break;
    }
  }
}
