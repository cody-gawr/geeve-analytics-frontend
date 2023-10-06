import { Routes } from '@angular/router';

import { ClinicianAnalysisComponent } from './cliniciananalysis/cliniciananalysis.component';
import { ClinicianProceeduresComponent } from './clinicianproceedures/clinicianproceedures.component';
import { FinancesComponent } from './finances/finances.component';
import { FrontDeskComponent } from './frontdesk/frontdesk.component';
import { MarketingComponent } from './marketing/marketing.component';
import { HealthScreenComponent } from './healthscreen/healthscreen.component';
import { FollowupsComponent } from './followups/followups.component';

export const DashboardsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cliniciananalysis',
        component: ClinicianAnalysisComponent,
      },
      {
        path: 'clinicianproceedures',
        component: ClinicianProceeduresComponent,
      },
      {
        path: 'frontdesk',
        component: FrontDeskComponent,
      },
      {
        path: 'marketing',
        component: MarketingComponent,
      },
      {
        path: 'finances',
        component: FinancesComponent,
      },
      {
        path: 'followups',
        component: FollowupsComponent,
      },
      {
        path: 'healthscreen',
        component: HealthScreenComponent,
      },
      {
        path: 'cliniciananalysis/multi',
        component: ClinicianAnalysisComponent,
      },
      {
        path: 'clinicianproceedures/multi',
        component: ClinicianProceeduresComponent,
      },
      {
        path: 'frontdesk/multi',
        component: FrontDeskComponent,
      },
      {
        path: 'marketing/multi',
        component: MarketingComponent,
      },
      {
        path: 'finances/multi',
        component: FinancesComponent,
      },
    ],
  },
];
