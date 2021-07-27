import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClinicSettingsRoutes } from './clinic-settings.routing';
import { ClinicSettingsComponent } from './clinic-settings.component';
import { ClinicSettingsService } from './clinic-settings.service';
import { TaskService } from './tasks/tasks.service';
import { EquipmentsService } from './equipments/equipments.service';
import { SharedMatModule } from '../shared-mat.module';
import { DemoMaterialModule } from '../demo-material-module';
import { BaseComponent } from './base/base.component';
import { DentistComponent } from './dentist/dentist.component';
import { AlertsComponent } from './alerts/alerts.component';
import { TasksComponent,DialogOverviewExampleDialogComponent } from './tasks/tasks.component';
import { EquipmentComponent,DialogOverviewExampleComponent } from './equipments/equipments.component';
import { GoalsComponent } from './goals/goals.component';
import { AutofocusDirective } from './auto-focus.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    RouterModule.forChild(ClinicSettingsRoutes),
    SharedMatModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    ClinicSettingsService,
    TaskService,
    EquipmentsService
  ],
  declarations: [
    ClinicSettingsComponent,
    BaseComponent,
    DentistComponent,
    AlertsComponent,
    TasksComponent,
    GoalsComponent,
    AutofocusDirective,
    DialogOverviewExampleDialogComponent,
    DialogOverviewExampleComponent,
    EquipmentComponent
  ],
  entryComponents: [DialogOverviewExampleDialogComponent, DialogOverviewExampleComponent],  
  exports: [
    BaseComponent,
    DentistComponent,
    GoalsComponent,
    AlertsComponent,
    TasksComponent
  ]
})
export class ClinicSettingsModule {}
