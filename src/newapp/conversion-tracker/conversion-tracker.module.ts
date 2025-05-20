import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversionTrackerComponent } from './conversion-tracker.component';
import { ConversionTrackerRoutingModule } from './conversion-tracker.routing.module';
import { SharedModule } from '@/app/shared/shared.module';
import { AppLayoutModule } from '../layout/app-layout.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppLayoutModule,
    ConversionTrackerRoutingModule,
    // StoreModule.forFeature(),
  ],
  declarations: [ConversionTrackerComponent],
})
export class ConversionTrackerModule {}
