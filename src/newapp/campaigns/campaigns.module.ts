import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CampaignsComponent } from './campaings.component';
import { CampaignsRoutingModule } from './campaigns.routing.module';
import { AppLayoutModule } from '../layout/app-layout.module';

const services = [];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppLayoutModule,
    CampaignsRoutingModule,
  ],
  declarations: [CampaignsComponent],
//   providers: [...services],
})
export class CampaignsModule {}
