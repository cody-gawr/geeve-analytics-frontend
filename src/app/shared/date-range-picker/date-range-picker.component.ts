import {
  Component,
  OnInit,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
})
export class DateRangePickerComponent implements OnInit {
  @Output() dateRangeChange = new EventEmitter<DateRange<Date>>();
  @ViewChild(MatDateRangePicker) dateRangePicker!: MatDateRangePicker<Date>;

  form: FormGroup = this.fb.group({
    range: this.fb.group({
      start: [null],
      end: [null],
    }),
  });

  private sub!: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.sub = this.form
      .get('range')
      .valueChanges.subscribe((value: { start: Date | null; end: Date | null }) => {
        const { start, end } = value;
        if (start && end) {
          this.dateRangeChange.emit(new DateRange<Date>(start, end));
        }
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  openCalendar() {
    this.dateRangePicker.open();
  }
}
