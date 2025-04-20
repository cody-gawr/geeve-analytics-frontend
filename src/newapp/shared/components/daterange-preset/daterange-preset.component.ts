import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-daterange-preset',
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
      .date-range-preset {
        display: flex;
        justify-content: space-between;
        gap: 6px;
        margin-bottom: 8px;
      }
      button {
        flex: 25%;
        font-size: 11.5px;
      }
      .active {
        background-color: #18a689; /* Example active color */
        color: white;
      }
    `,
  ],
  template: `
    <div class="date-range-preset">
      <button
        mat-stroked-button
        (click)="setDateRange('thisYear')"
        [class.active]="activeRange === 'thisYear'"
      >
        This Year
      </button>
      <button
        mat-stroked-button
        (click)="setDateRange('lastYear')"
        [class.active]="activeRange === 'lastYear'"
      >
        Last 12 months
      </button>
      <button
        mat-stroked-button
        (click)="setDateRange('last2Years')"
        [class.active]="activeRange === 'last2Years'"
      >
        Last 24 months
      </button>
      <button
        mat-stroked-button
        (click)="setDateRange('last3Years')"
        [class.active]="activeRange === 'last3Years'"
      >
        Last 36 months
      </button>
    </div>
    <mat-form-field appearance="outline" subscriptSizing="dynamic">
      <mat-date-range-input [rangePicker]="picker">
        <input
          matStartDate
          (focus)="picker.open()"
          [formControl]="filterFormControlStart"
          placeholder="Start date"
        />
        <input
          matEndDate
          (focus)="picker.open()"
          [formControl]="filterFormControlEnd"
          placeholder="End date"
        />
      </mat-date-range-input>
      <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-date-range-picker #picker startView="year"></mat-date-range-picker>

      <mat-error *ngIf="filterFormControlStart.hasError('matStartDateInvalid')"
        >Invalid start date</mat-error
      >
      <mat-error *ngIf="filterFormControlEnd.hasError('matEndDateInvalid')"
        >Invalid end date</mat-error
      >
    </mat-form-field>
  `,
})
export class DateRangePresetComponent implements OnInit, OnDestroy {
  @Input() filterFormControlStart: FormControl<string | Date | null>;
  @Input() filterFormControlEnd: FormControl<string | Date | null>;

  @Input() activeRange: 'thisYear' | 'lastYear' | 'last2Years' | 'last3Years' | null = null;
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  constructor() {}

  ngOnInit(): void {
    if (this.filterFormControlStart && this.filterFormControlEnd) {
      this.onDateChanges(this.filterFormControlStart.value, this.filterFormControlEnd.value);
      combineLatest([
        this.filterFormControlStart.valueChanges,
        this.filterFormControlEnd.valueChanges,
      ])
        .pipe(takeUntil(this.destroy$))
        .subscribe(([_start, _end]) => {
          this.onDateChanges(_start, _end);
        });
    }
  }

  onDateChanges(_start: string | Date, _end: string | Date) {
    const start = moment(_start);
    const end = moment(_end);
    const today = moment();
    const startOfYear = today.clone().startOf('year'); // Start of the year
    const endOfYear = today.clone().endOf('day'); // End of the year
    const startOfLastYear = today.clone().subtract(1, 'year').startOf('day'); // Start of last year
    const endOfLastYear = today.clone().endOf('day'); // End of last year
    const startOf2YearsAgo = today.clone().subtract(2, 'year').startOf('day'); // Start of 2 years ago
    const endOf2YearsAgo = today.clone().endOf('day'); // End of this year
    const startOf3YearsAgo = today.clone().subtract(3, 'year').startOf('day'); // Start of 3 years ago
    const endOf3YearsAgo = today.clone().endOf('day'); // End of this year

    if (start && start.isSame(startOfYear, 'day') && end && end.isSame(endOfYear, 'day')) {
      this.activeRange = 'thisYear';
    } else if (
      start &&
      start.isSame(startOfLastYear, 'day') &&
      end &&
      end.isSame(endOfLastYear, 'day')
    ) {
      this.activeRange = 'lastYear';
    } else if (
      start &&
      start.isSame(startOf2YearsAgo, 'day') &&
      end &&
      end.isSame(endOf2YearsAgo, 'day')
    ) {
      this.activeRange = 'last2Years';
    } else if (
      start &&
      start.isSame(startOf3YearsAgo, 'day') &&
      end &&
      end.isSame(endOf3YearsAgo, 'day')
    ) {
      this.activeRange = 'last3Years';
    } else {
      this.activeRange = null;
    }
  }

  setDateRange(range: 'thisYear' | 'lastYear' | 'last2Years' | 'last3Years') {
    const today = moment();
    let startDate: moment.Moment;
    let endDate: moment.Moment;

    switch (range) {
      case 'thisYear':
        startDate = today.clone().startOf('year'); // Start of the year
        endDate = today.clone().endOf('day'); // End of the year
        break;
      case 'lastYear':
        startDate = today.clone().subtract(1, 'year').startOf('day'); // Start of last year
        endDate = today.clone().endOf('day'); // End of last year
        break;
      case 'last2Years':
        startDate = today.clone().subtract(2, 'year').startOf('day'); // Start of 2 years ago
        endDate = today.clone().endOf('day'); // End of this year
        break;
      case 'last3Years':
        startDate = today.clone().subtract(3, 'year').startOf('day'); // Start of 3 years ago
        endDate = today.clone().endOf('day'); // End of this year
        break;
    }

    this.filterFormControlStart.setValue(startDate.toDate());
    this.filterFormControlEnd.setValue(endDate.toDate());
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
