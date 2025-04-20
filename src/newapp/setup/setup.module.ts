import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupRoutingModule } from './setup.routing.module';
import { SharedModule } from '../shared/shared.module';

import { SetupComponent } from './setup.component';
import { AppLayoutModule } from '../layout/app-layout.module';
import { CoreConnectionDialogComponent } from './components/core-connection-dialog/core-connection-dialog.component';
import { DentallyConnectionDialogComponent } from './components/dentally-connection-dialog/dentally-connection-dialog.component';
import { PraktikaConnectionDialogComponent } from './components/praktika-connection-dialog/praktika-connection-dialog.component';
const components = [
  SetupComponent,
  CoreConnectionDialogComponent,
  DentallyConnectionDialogComponent,
  PraktikaConnectionDialogComponent,
];
// const services = [];

@NgModule({
  imports: [CommonModule, SetupRoutingModule, SharedModule, AppLayoutModule],
  declarations: [...components],
  //   providers: [...services],
})
export class SetupModule {}
