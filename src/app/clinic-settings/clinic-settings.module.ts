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
import { TasksComponent,DialogOverviewExampleDialogComponent } from './tasks/tasks.component';
import { EquipmentComponent,DialogOverviewExampleComponent } from './equipments/equipments.component';
import { GoalsComponent } from './goals/goals.component';
import { AutofocusDirective } from './auto-focus.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    RouterModule.forChild(ClinicSettingsRoutes),
    SharedMatModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule
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
    TasksComponent
  ]
})
export class ClinicSettingsModule {}
