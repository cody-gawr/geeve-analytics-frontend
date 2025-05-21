import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversionTrackerComponent } from './conversion-tracker.component';
import { ConversionTrackerRoutingModule } from './conversion-tracker.routing.module';
import { SharedModule } from '@/newapp/shared/shared.module';
import { AppLayoutModule } from '../layout/app-layout.module';
import { StoreModule } from '@ngrx/store';
import { ConversionInsightCardComponent } from './conversion-insight-card/conversion-insight-card.component';
import { ConversionTableComponent } from './conversion-table/conversion-table.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppLayoutModule,
    ConversionTrackerRoutingModule,
    // StoreModule.forFeature(),
  ],
  declarations: [
    ConversionTrackerComponent,
    ConversionInsightCardComponent,
    ConversionTableComponent,
  ],
})
export class ConversionTrackerModule {}
