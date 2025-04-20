import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DialogLocationDialogComponent, SetupComponent } from './setup.component';
import { SetupRoutes } from './setup.routing';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { DemoMaterialModule } from '../demo-material-module';
import { SetupService } from './setup.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClinicService } from '../clinic/clinic.service';
import { PlansService } from '../plans/plans.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PraktikaConnectionDialogComponent } from './praktika-connection-dialog/praktika-connection-dialog.component';

@NgModule({
  declarations: [SetupComponent, DialogLocationDialogComponent, PraktikaConnectionDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SetupRoutes),
    MatInputModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  providers: [SetupService, ClinicService, PlansService],
})
export class SetupModule {}
