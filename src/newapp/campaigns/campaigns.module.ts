import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CampaignsComponent } from './campaings.component';
import { CampaignsRoutingModule } from './campaigns.routing.module';
import { AppLayoutModule } from '../layout/app-layout.module';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CampaignService } from './services/campaign.service';
import { StartCampaignDialog } from './start-campaign-dialog/start-campaign-dialog.component';
import { CommonDataService } from '../shared/services/common-data.service';
import { ViewCampaignComponent } from './view-campaign/view-campaign.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppLayoutModule,
    CampaignsRoutingModule,
    DragDropModule
  ],
  declarations: [
    CampaignsComponent, CreateCampaignComponent, 
    StartCampaignDialog, ViewCampaignComponent],
  providers: [ CampaignService, CommonDataService]
})
export class CampaignsModule {}
