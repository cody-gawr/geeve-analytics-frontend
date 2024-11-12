import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignsComponent } from './campaings.component';
import { AppLayoutComponent } from '../layout/app-layout/app-layout.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
        {
            path: '',
            component: CampaignsComponent,
        },
        {
          path: 'create',
          component: CreateCampaignComponent,
        }
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignsRoutingModule {}
