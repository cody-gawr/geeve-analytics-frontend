import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DentistService } from './dentist.service';
import { DentistComponent,
  DialogOverviewExampleDialogComponent } from './dentist.component';
import { DentistRoutes } from './dentist.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DentistRoutes),
    MatInputModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DentistService
  ],
  entryComponents: [DialogOverviewExampleDialogComponent],
  declarations: [ DentistComponent,
    DialogOverviewExampleDialogComponent ]
})
export class DentistModule { }