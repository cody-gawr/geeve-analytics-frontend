import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DemoMaterialModule } from '../demo-material-module';
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
        DemoMaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        DentistService
    ],
    declarations: [DentistComponent,
        DialogOverviewExampleDialogComponent]
})
export class DentistModule { }