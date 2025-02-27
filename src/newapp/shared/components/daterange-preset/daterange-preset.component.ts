import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { combineLatest, Subject, takeUntil } from "rxjs";
import * as dayjs from "dayjs";

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
        `
    ],
    template: `
        <div class="date-range-preset">
            <button mat-stroked-button 
                    (click)="setDateRange('thisYear')" 
                    [class.active]="activeRange === 'thisYear'">This Year</button>
            <button mat-stroked-button 
                    (click)="setDateRange('lastYear')" 
                    [class.active]="activeRange === 'lastYear'">Last Year</button>
            <button mat-stroked-button 
                    (click)="setDateRange('last2Years')" 
                    [class.active]="activeRange === 'last2Years'">Last 2 Years</button>
            <button mat-stroked-button 
                    (click)="setDateRange('last3Years')" 
                    [class.active]="activeRange === 'last3Years'">Last 3 Years</button>
        </div>
         <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-date-range-input [rangePicker]="picker">
                <input matStartDate (focus)="picker.open()" [formControl]="filterFormControlStart"
                    placeholder="Start date">
                <input matEndDate (focus)="picker.open()" [formControl]="filterFormControlEnd"
                    placeholder="End date">
            </mat-date-range-input>
            <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-date-range-picker #picker startView="year"></mat-date-range-picker>

            <mat-error
                *ngIf="filterFormControlStart.hasError('matStartDateInvalid')">Invalid
                start date</mat-error>
            <mat-error
                *ngIf="filterFormControlEnd.hasError('matEndDateInvalid')">Invalid
                end date</mat-error>
        </mat-form-field>
    `
})
export class DateRangePresetComponent implements OnInit {
    @Input() filterFormControlStart: FormControl<string | Date | null>;
    @Input() filterFormControlEnd: FormControl<string | Date | null>;

    @Input() activeRange: 'thisYear' | 'lastYear' | 'last2Years' | 'last3Years' | null = null;
    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();

    constructor() {}

    ngOnInit(): void {
        if (this.filterFormControlStart && this.filterFormControlEnd) {
            combineLatest([this.filterFormControlStart.valueChanges, this.filterFormControlEnd.valueChanges])
                .pipe(takeUntil(this.destroy$))
                .subscribe(([_start, _end]) => {
                    const start = dayjs(_start);
                    const end = dayjs(_end);
                    const today = dayjs();
                    const startOfYear = today.startOf('year'); // Start of the year
                    const endOfYear = today.endOf('year'); // End of the year
                    const startOfLastYear = today.subtract(1, 'year').startOf('year'); // Start of last year
                    const endOfLastYear = today.subtract(1, 'year').endOf('year'); // End of last year
                    const startOf2YearsAgo = today.subtract(2, 'year').startOf('year'); // Start of 2 years ago
                    const endOf2YearsAgo = today.endOf('year'); // End of this year
                    const startOf3YearsAgo = today.subtract(3, 'year').startOf('year'); // Start of 3 years ago
                    const endOf3YearsAgo = today.endOf('year'); // End of this year

                    if (start && start.isSame(startOfYear, 'day') && end && end.isSame(endOfYear, 'day')) {
                        this.activeRange = 'thisYear';
                    } else if (start && start.isSame(startOfLastYear, 'day') && end && end.isSame(endOfLastYear, 'day')) {
                        this.activeRange = 'lastYear';
                    } else if (start && start.isSame(startOf2YearsAgo, 'day') && end && end.isSame(endOf2YearsAgo, 'day')) {
                        this.activeRange = 'last2Years';
                    } else if (start && start.isSame(startOf3YearsAgo, 'day') && end && end.isSame(endOf3YearsAgo, 'day')) {
                        this.activeRange = 'last3Years';
                    } else {
                        this.activeRange = null;
                    }
                });
        }
    }

    setDateRange(range: 'thisYear' | 'lastYear' | 'last2Years' | 'last3Years') {
        const today = dayjs();
        let startDate: dayjs.Dayjs;
        let endDate: dayjs.Dayjs;

        switch (range) {
            case 'thisYear':
                startDate = today.startOf('year'); // Start of the year
                endDate = today.endOf('year'); // End of the year
                break;
            case 'lastYear':
                startDate = today.subtract(1, 'year').startOf('year'); // Start of last year
                endDate = today.subtract(1, 'year').endOf('year'); // End of last year
                break;
            case 'last2Years':
                startDate = today.subtract(2, 'year').startOf('year'); // Start of 2 years ago
                endDate = today.endOf('year'); // End of this year
                break;
            case 'last3Years':
                startDate = today.subtract(3, 'year').startOf('year'); // Start of 3 years ago
                endDate = today.endOf('year'); // End of this year
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