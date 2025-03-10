import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

interface CustomSelectOption {
    label: string,
    value: string
}

@Component({
    selector: 'app-custom-select',
    styles: [
        `
            .custom-select-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #fafafa;
                font-size: 14px;
                height: 40px;
                min-width: 100px;
                padding-left: 15px;
                border-radius: 10px;

                padding-right: 10px;
                mat-select {
                    font-size: 14px !important;
                }
            }
            .custom-select-font {
                font-size: 14px !important;
            }
        `
    ],
    template: `
        <div class="custom-select-wrapper">
            <mat-select [formControl]="formControl">
                <mat-option class="custom-select-font" *ngFor="let option of options" [value]="option.value">
                    {{option.label}}
                </mat-option>
            </mat-select>
        </div>
    `
})
export class AppCustomSelect implements OnInit {
    @Input() options: CustomSelectOption[];
    @Input() formControl: FormControl<string>;
    constructor() {}

    ngOnInit(): void {
        
    }
}