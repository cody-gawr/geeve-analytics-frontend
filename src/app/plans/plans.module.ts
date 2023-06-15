import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DemoMaterialModule } from '../demo-material-module';
import { PlansService } from './plans.service';
import { PlansComponent,DialogOverviewExampleDialogComponent  } from './plans.component';
import { PlansRoutes } from './plans.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PlansRoutes),
        MatInputModule,
        NgxDatatableModule,
        FlexLayoutModule,
        FormsModule, ReactiveFormsModule,
        DemoMaterialModule
    ],
    providers: [
        PlansService
    ],
    declarations: [PlansComponent, DialogOverviewExampleDialogComponent]
})
export class PlansModule { }