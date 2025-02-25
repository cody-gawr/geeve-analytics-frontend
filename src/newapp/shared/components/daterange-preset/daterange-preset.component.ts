import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

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
            font-size: 12px;
        }
        `
    ],
    template: `
        <div class="date-range-preset">
            <button mat-raised-button (click)="setDateRange('thisYear')">This Year</button>
            <button mat-raised-button (click)="setDateRange('lastYear')">Last Year</button>
            <button mat-raised-button (click)="setDateRange('last2Years')">Last 2 Years</button>
            <button mat-raised-button (click)="setDateRange('last3Years')">Last 3 Years</button>
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
export class DateRangePresetComponent {
    @Input() filterFormControlStart: FormControl<Date | null>;
    @Input() filterFormControlEnd: FormControl<Date | null>;

    constructor() {}

    setDateRange(range: 'thisYear' | 'lastYear' | 'last2Years' | 'last3Years') {
        const today = new Date();
        const startDate = new Date();
        const endDate = new Date();

        switch (range) {
            case 'thisYear':
                startDate.setFullYear(today.getFullYear(), 0, 1); // Start of the year
                endDate.setFullYear(today.getFullYear(), 11, 31); // End of the year
                break;
            case 'lastYear':
                startDate.setFullYear(today.getFullYear() - 1, 0, 1); // Start of last year
                endDate.setFullYear(today.getFullYear() - 1, 11, 31); // End of last year
                break;
            case 'last2Years':
                startDate.setFullYear(today.getFullYear() - 2, 0, 1); // Start of 2 years ago
                endDate.setFullYear(today.getFullYear(), 11, 31); // End of this year
                break;
            case 'last3Years':
                startDate.setFullYear(today.getFullYear() - 3, 0, 1); // Start of 3 years ago
                endDate.setFullYear(today.getFullYear(), 11, 31); // End of this year
                break;
        }

        this.filterFormControlStart.setValue(startDate);
        this.filterFormControlEnd.setValue(endDate);
    }
}