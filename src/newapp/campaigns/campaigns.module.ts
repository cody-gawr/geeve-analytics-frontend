import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CampaignsComponent } from './campaings.component';
import { CampaignsRoutingModule } from './campaigns.routing.module';
import { AppLayoutModule } from '../layout/app-layout.module';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppLayoutModule,
    CampaignsRoutingModule,
    DragDropModule
  ],
  declarations: [CampaignsComponent, CreateCampaignComponent],
})
export class CampaignsModule {}
