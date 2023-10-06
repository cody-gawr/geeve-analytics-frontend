import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatTreeModule } from '@angular/material/tree';
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
  ],
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
        ToastrService,
      ],
    };
  }
}
