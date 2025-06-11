import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CampaignsComponent } from './campaigns.component';
import { CampaignsRoutingModule } from './campaigns.routing.module';
import { AppLayoutModule } from '../layout/app-layout.module';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CampaignService } from './services/campaign.service';
import { StartCampaignDialog } from './start-campaign-dialog/start-campaign-dialog.component';
import { CommonDataService } from '../shared/services/common-data.service';
import { ViewCampaignComponent } from './view-campaign/view-campaign.component';
import { CsvColumnSelectDialog } from './create-campaign/csv-column-select-dialog/csv-column-select-dialog.component';
import { StoreModule } from '@ngrx/store';
import { campaignFeature } from './state/reducers/campaign.reducer';
import { CampaignFacade } from './facades/campaign.facade';
import { FeaturePayAppDialogComponent } from '@/app/layouts/full/headerright/headerright.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppLayoutModule,
    CampaignsRoutingModule,
    DragDropModule,
    StoreModule.forFeature(campaignFeature),
  ],
  declarations: [
    CampaignsComponent,
    CreateCampaignComponent,
    StartCampaignDialog,
    ViewCampaignComponent,
    CsvColumnSelectDialog,
  ],
  providers: [CampaignService, CommonDataService, CampaignFacade],
})
export class CampaignsModule {}
