
import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { BaseComponent } from '../../clinic-settings/base/base.component';
import { ChartService } from '../chart.service';
interface IDateOption {
  name: string,
  value: string
}
@Component({
  selector: 'app-date-menu-bar',
  templateUrl: './date-menu-bar.component.html',
  styleUrls: ['./date-menu-bar.component.scss']
})
export class DateMenuBarComponent extends BaseComponent implements AfterViewInit {
  @Output() filter: EventEmitter<string> = new EventEmitter();
  @Output() changeDate: EventEmitter<any> = new EventEmitter();
  currentSelectedPeriod: string = 'm';
  
  DateOptions: Array<IDateOption> = [
    {
      name: 'This Month',
      value: 'm'
    },
    {
      name: 'Last Month',
      value: 'lm'
    },
    {
      name: 'This Quarter',
      value: 'q'
    },
    {
      name: 'Last Quarter',
      value: 'lq'
    },
    {
      name: 'Calender Year',
      value: 'cytd'
    },
    {
      name: 'Financial Year',
      value: 'fytd'
    }
  ];

  constructor(private chartService: ChartService) {
    super();
    chartService.duration$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(value => this.currentSelectedPeriod = value);
    
  }

  ngAfterViewInit() {
  }

  handleSelection(event) {
    this.filterDate(event.value);
  }

  filterDate(duration: string) {
    this.chartService.changeDuration(duration);
    this.filter.emit(duration);
  }

  choosedDate(event) {
    // console.log(`event`, event); 
    var val = event.chosenLabel;
    val = val.toString().split(" - ");
    var date2: any = new Date(val[1]);
    var date1: any = new Date(val[0]);
    var diffTime: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    if (diffTime <= 365) {
      this.chartService.selectDateFromCalender(event);
      this.filterDate('custom');
      this.changeDate.emit(event)
      $(".customRange").css("display", "none");
    } else {
      Swal.fire({
        text: "Please select date range within 365 Days",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "Ok",
      }).then((result) => {});
    }

  
  }

}
