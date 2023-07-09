import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicComponent } from './clinic.component';
import { ClinicsRoutingModule } from './clinic.routing.module';
import { StoreModule } from '@ngrx/store';
import { clinicFeature } from './state/reducers/clinic.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ClinicEffects } from './state/effects/clinic.effects';
import { ClinicService } from './services/clinic.service';
import { ClinicFacade } from './facades/clinic.facade';
import { SharedModule } from '../shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';

const services = [ClinicService, ClinicFacade];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ClinicsRoutingModule,
    StoreModule.forFeature(clinicFeature),
    EffectsModule.forFeature([ClinicEffects]),
    MatStepperModule
  ],
  declarations: [ClinicComponent],
  providers: [...services]
})
export class ClinicModule {}
