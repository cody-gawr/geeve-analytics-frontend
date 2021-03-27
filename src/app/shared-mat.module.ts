import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAccordion, MatCardModule, MatDatepickerModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatTableModule, MatTabsModule, MatTreeModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ClinicService } from './clinic/clinic.service';
import { DentistService } from './dentist/dentist.service';
import { DentistGoalsService } from './dentist-goals/dentist-goals.service';
import { ClinicGoalsService } from './clinic-goals/clinic-goals.service';
import { ToastrService } from 'ngx-toastr';

/**
* Do not specify providers for modules that might be imported by a lazy loaded module.
*/
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        CdkTableModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatExpansionModule,
        MatTreeModule,
        MatDatepickerModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        CdkTableModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatExpansionModule,
        MatTreeModule,
        MatDatepickerModule,
    ]
})
export class SharedMatModule {
    static forRoot(): ModuleWithProviders<SharedMatModule> {
        return {
            ngModule: SharedMatModule,
            providers: [
                ClinicService, 
                DentistService, 
                DentistGoalsService, 
                ClinicGoalsService, 
                ToastrService
            ],
        };
    }
}