
import { AfterViewInit, Component, EventEmitter, Output ,ViewChild, Input} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { BaseComponent } from '../../clinic-settings/base/base.component';
import { ChartService } from '../chart.service';
import { Router, NavigationEnd, Event } from '@angular/router';
import { NgxDaterangepickerMd, DaterangepickerComponent } from 'ngx-daterangepicker-material';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
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
  @Input() isAllClinic : boolean = false;
  @ViewChild(DaterangepickerComponent, { static: false }) datePicker: DaterangepickerComponent;
  currentSelectedPeriod: string = 'm';

  route:string = '';
  startDate: any;
  endDate: any;
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
      name: 'Last Calendar Year',
      value: 'lcytd'
    },
    {
      name: 'Financial Year',
      value: 'fytd'
    },
    {
      name: 'Last Financial Year',
      value: 'lfytd'
    }
  ];

  constructor(private chartService: ChartService, private router: Router, private datePipe: DatePipe) {
    super();
    chartService.duration$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((value : string) => this.currentSelectedPeriod = value);

   


    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd){
        this.route = router.url; 
        if(this.chartService.duration$.value == 'custom'){
         this.filterDate('m');
        }     
      }
    });
    
  }

  ngAfterViewInit() {
    this.setDate(this.chartService.duration$.value);
  }

  handleSelection(event) {
    this.filterDate(event.value);
  }

  filterDate(duration: string) {    
    this.chartService.changeDuration(duration);
    this.filter.emit(duration);
    this.setDate(this.chartService.duration$.value);
  }

  choosedDate(event) { 
    if(this.route == '/dashboards/cliniciananalysis' || this.route == '/dashboards/clinicianproceedures' || this.route == '/dashboards/frontdesk'){
      this.chartService.selectDateFromCalender(event);
      this.filterDate('custom');
      this.changeDate.emit(event)
      $(".customRange").css("display", "none");
    }  else {        
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



    setDate(duration) {
      if (duration == 'w') {
        const now = new Date();
        if (now.getDay() == 0)
          var day = 7;
        else
          var day = now.getDay();
        var first = now.getDate() - day + 1;
        var last = first + 6;
        var sd = new Date(now.setDate(first));
        this.startDate = this.datePipe.transform(sd.toUTCString(), 'yyyy-MM-dd');
        let end = now.setDate(sd.getDate() + 6);
        this.endDate = this.datePipe.transform(new Date(end).toUTCString(), 'yyyy-MM-dd');
      } else if (duration == 'm') {
        var date = new Date();
        this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');       
      } else if (duration == 'lm') {
        const date = new Date();
        this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() - 1, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 0), 'yyyy-MM-dd');
      } else if (duration == 'q') {
        const now = new Date();
        var cmonth = now.getMonth() + 1;
        var cyear = now.getFullYear();

        if (cmonth >= 1 && cmonth <= 3) {
          this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 0, 1), 'yyyy-MM-dd');
        } else if (cmonth >= 4 && cmonth <= 6) {
          this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 1), 'yyyy-MM-dd');
        } else if (cmonth >= 7 && cmonth <= 9) {
          this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 1), 'yyyy-MM-dd');
        } else if (cmonth >= 10 && cmonth <= 12) {
          this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 1), 'yyyy-MM-dd');
        }
        this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      } else if (duration == 'lq') {
        const now = new Date();
        var cmonth = now.getMonth() + 1;
        var cyear = now.getFullYear();
        if (cmonth >= 1 && cmonth <= 3) {
          this.startDate = this.datePipe.transform(new Date(now.getFullYear() - 1, 9, 1), 'yyyy-MM-dd');
          this.endDate = this.datePipe.transform(new Date(now.getFullYear() - 1, 12, 0), 'yyyy-MM-dd');
        } else if (cmonth >= 4 && cmonth <= 6) {
          this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 0, 1), 'yyyy-MM-dd');
          this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 0), 'yyyy-MM-dd');
        } else if (cmonth >= 7 && cmonth <= 9) {
          this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 1), 'yyyy-MM-dd');
          this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 0), 'yyyy-MM-dd');
        } else if (cmonth >= 10 && cmonth <= 12) {
          this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 1), 'yyyy-MM-dd');
          this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 0), 'yyyy-MM-dd');
        }
        
      } else if (duration == 'cytd') {
        var date = new Date();
        this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 0, 1), 'yyyy-MM-dd');       
        this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');        
      } else if (duration == 'lcytd') {
        var date = new Date();
        this.startDate = this.datePipe.transform(new Date(date.getFullYear() -1, 0, 1), 'yyyy-MM-dd');       
        this.endDate = this.datePipe.transform(new Date(date.getFullYear() -1, 11, 31), 'yyyy-MM-dd');
        
      } else if (duration == 'fytd') {
        var date = new Date();
        if ((date.getMonth() + 1) <= 6) {
          this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 6, 1), 'yyyy-MM-dd');
        } else {
          this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 6, 1), 'yyyy-MM-dd');
        }
        this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');      
       
      } else if (duration == 'lfytd') {
        var date = new Date();
        this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 2, 6, 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 5, 30), 'yyyy-MM-dd');
      }      
      var start = moment(this.startDate);
      var end = moment(this.endDate);
      this.datePicker.setStartDate(start);
      this.datePicker.setEndDate(end);
      this.datePicker.updateView();
    }
}
