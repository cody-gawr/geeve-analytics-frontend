import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversionTrackerComponent } from './conversion-tracker.component';
import { ConversionTrackerRoutingModule } from './conversion-tracker.routing.module';
import { SharedModule } from '@/newapp/shared/shared.module';
import { AppLayoutModule } from '../layout/app-layout.module';
import { StoreModule } from '@ngrx/store';
import { ConversionInsightCardComponent } from './conversion-insight-card/conversion-insight-card.component';
import { ConversionTableComponent } from './conversion-table/conversion-table.component';
import { conversionTrackerFeacture } from './state/reducers/conversion-tracker.reducer';
import { ConversionTrackerFacade } from './facades/conversion-tracker.facade';
import { EffectsModule } from '@ngrx/effects';
import { ConversionTrackerEffect } from './state/effects/conversion-tracker.effects';
import { UpsertConversionCodeValuesDialogComponent } from './update-conversion-code-values-dialog/upsert-conversion-code-values-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppLayoutModule,
    ConversionTrackerRoutingModule,
    StoreModule.forFeature(conversionTrackerFeacture),
    EffectsModule.forFeature([ConversionTrackerEffect]),
  ],
  declarations: [
    ConversionTrackerComponent,
    ConversionInsightCardComponent,
    ConversionTableComponent,
    UpsertConversionCodeValuesDialogComponent,
  ],
  providers: [ConversionTrackerFacade],
})
export class ConversionTrackerModule {}
