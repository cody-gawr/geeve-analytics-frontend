import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTreeModule} from '@angular/material/tree';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
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
        FlexLayoutModule,
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
        FlexLayoutModule,
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