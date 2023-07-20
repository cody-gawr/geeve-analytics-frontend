import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { DATE_RANGE_DURATION } from '@/newapp/models/layout';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import moment from 'moment';

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
  constructor(
    private layoutFacade: LayoutFacade
  ) {}

  get duration$(){
    return this.layoutFacade.duration$;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  setDuration(duration: DATE_RANGE_DURATION) {
    this.layoutFacade.setDuration(duration);
    switch(duration){
        case 'w':
            break;
        case 'm':
            this.layoutFacade.saveDateRange(
                moment().startOf('month'), 
                moment()
            );
            break;
        case 'lm':
            this.layoutFacade.saveDateRange(
                moment().subtract(1, 'months').startOf('month'), 
                moment()
            );
            break;
        case 'q':
            this.layoutFacade.saveDateRange(
                moment().startOf('quarter'), 
                moment()
            );
            break;
        case 'lq':
            this.layoutFacade.saveDateRange(
                moment().subtract(1, 'quarters').startOf('quarter'), 
                moment()
            );
            break;
        case 'cytd':
            this.layoutFacade.saveDateRange(
                moment().startOf('year'), 
                moment()
            );
            break;
        case 'lcytd':
            this.layoutFacade.saveDateRange(
                moment().subtract(1, 'years').startOf('year'), 
                moment()
            );
            break;
        case 'fytd':
            if(moment().month() >= 5){
                this.layoutFacade.saveDateRange(
                    moment().month(6).date(1), 
                    moment()
                );
            }else{
                this.layoutFacade.saveDateRange(
                    moment().subtract(1, 'years').month(6).date(1), 
                    moment()
                );
            }
            break;
        case 'lfytd':
            if(moment().month() >= 5){
                this.layoutFacade.saveDateRange(
                    moment().subtract(1, 'years').month(6).date(1), 
                    moment()
                );
            }else{
                this.layoutFacade.saveDateRange(
                    moment().subtract(2, 'years').month(6).date(1), 
                    moment()
                );
            }
            break;
    }
  }
}
