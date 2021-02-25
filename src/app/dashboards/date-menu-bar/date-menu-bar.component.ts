import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
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
export class DateMenuBarComponent implements AfterViewInit {
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

  constructor(private chartService: ChartService) { }

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
    this.changeDate.emit(event);
  }

}
