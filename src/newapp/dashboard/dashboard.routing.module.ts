import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancesComponent } from './components/finances/finances.component';
import { AppLayoutComponent } from '../layout/app-layout/app-layout.component';
import { MarketingComponent } from './components/marketing/marketing.component';
import { FrontDeskComponent } from './components/front-desk/front-desk.component';
import { ClinicianProcedureComponent } from './components/clinician-procedures/clinician-procedures.component';
import { ClinicianAnalysisComponent } from './components/clinician-analysis/clinician-analysis.component';
import { FollowupsComponent } from './components/followups/followups.component';
import { UnsubscribedPageComponent } from './components/unsubscribed-page/unsubscribed-page.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'finances',
        component: FinancesComponent,
      },
      {
        path: 'marketing',
        component: MarketingComponent,
      },
      {
        path: 'frontdesk',
        component: FrontDeskComponent,
      },
      {
        path: 'followups',
        component: FollowupsComponent,
      },
      {
        path: 'clinicianproceedures',
        component: ClinicianProcedureComponent,
      },
      {
        path: 'cliniciananalysis',
        component: ClinicianAnalysisComponent,
      },
      {
        path: 'unsubscribed',
        component: UnsubscribedPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
