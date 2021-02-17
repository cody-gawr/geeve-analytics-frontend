import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { ChartService } from '../chart.service';

@Component({
  selector: 'app-date-menu-bar',
  templateUrl: './date-menu-bar.component.html',
  styleUrls: ['./date-menu-bar.component.scss']
})
export class DateMenuBarComponent implements AfterViewInit {
  @Output() filter: EventEmitter<string> = new EventEmitter();
  @Output() changeDate: EventEmitter<any> = new EventEmitter();

  constructor(private chartService: ChartService) { }

  ngAfterViewInit() {
  }

  filterDate(duration: string) {
    this.chartService.changeDuration(duration);
    this.filter.emit(duration);
  }

  choosedDate(event) {
    this.changeDate.emit(event);
  }

}
