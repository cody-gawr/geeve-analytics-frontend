import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ClinicSettingsRoutes } from "./clinic-settings.routing";
import { ClinicSettingsComponent } from "./clinic-settings.component";
import { ClinicSettingsService } from "./clinic-settings.service";
import { TaskService } from "./tasks/tasks.service";
import { TasklistService } from "./taskslist/tasklist.service";
import { CustomisationsService } from "./customisations/customisations.service";
import { ChartsService } from "./charts/charts.service";
import { EquipmentsService } from "./equipments/equipments.service";
import { ScriptsService } from "./scripts/scripts.service";
import { SharedMatModule } from "../shared-mat.module";
import { DemoMaterialModule } from "../demo-material-module";
import { BaseComponent } from "./base/base.component";
import {
  DentistComponent,
  AddJeeveNameComponent,
} from "./dentist/dentist.component";
import { AlertsComponent } from "./alerts/alerts.component";
import {
  TasksComponent,
  DialogOverviewExampleDialogComponent,
} from "./tasks/tasks.component";
import {
  TasklistComponent,
  DialogOverviewTasklistDialogComponent,
} from "./taskslist/tasklist.component";
import {
  DialogSetColorsDialogComponent,
} from "./customisations/customisations.component";

import {
  ScriptsComponent,
  AddScriptsComponent,
} from "./scripts/scripts.component";
import {
  EquipmentComponent,
  DialogOverviewExampleComponent,
} from "./equipments/equipments.component";
import { GoalsComponent } from "./goals/goals.component";
import { CustomisationsComponent } from "./customisations/customisations.component";
import { ChartsComponent,DentisChartComponent } from "./charts/charts.component";
import { AutofocusDirective } from "./auto-focus.directive";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { NgxPaginationModule } from 'ngx-pagination';
import { ReviewMsgTemplateDialog } from "./review-msg-template-dialog/review-msg-template-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClinicSettingsRoutes),
    SharedMatModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule,
  ],
  providers: [
    ClinicSettingsService,
    TaskService,
    TasklistService,
    CustomisationsService,
    EquipmentsService,
    ScriptsService,
    ChartsService
  ],
  declarations: [
    ClinicSettingsComponent,
    BaseComponent,
    DentistComponent,
    AlertsComponent,
    TasksComponent,
    TasklistComponent,
    ScriptsComponent,
    GoalsComponent,
    CustomisationsComponent,
    AutofocusDirective,
    DialogOverviewExampleDialogComponent,
    DialogOverviewTasklistDialogComponent,
    AddJeeveNameComponent,
    DialogOverviewExampleComponent,
    AddScriptsComponent,
    EquipmentComponent,
    ChartsComponent,
    DialogSetColorsDialogComponent,
    DentisChartComponent,
    ReviewMsgTemplateDialog
  ],
  entryComponents: [
    DialogOverviewExampleDialogComponent,
    DialogOverviewTasklistDialogComponent,
    DialogOverviewExampleComponent,
    AddJeeveNameComponent,
    AddScriptsComponent,
    DialogSetColorsDialogComponent,
    DentisChartComponent
  ],
  exports: [
    BaseComponent,
    DentistComponent,
    GoalsComponent,
    CustomisationsComponent,
    AlertsComponent,
    TasksComponent,
    TasklistComponent,
    ScriptsComponent,
    ChartsComponent
  ],
})
export class ClinicSettingsModule {}
