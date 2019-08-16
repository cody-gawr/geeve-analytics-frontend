import { Routes } from '@angular/router';

import { ClinicianAnalysisComponent } from './cliniciananalysis/cliniciananalysis.component';
import { ClinicianProceeduresComponent } from './clinicianproceedures/clinicianproceedures.component';
import { FinancesComponent } from './finances/finances.component';
import { FrontDeskComponent } from './frontdesk/frontdesk.component';
import { MarketingComponent } from './marketing/marketing.component';
import { HealthScreenComponent } from './healthscreen/healthscreen.component';

export const DashboardsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cliniciananalysis/:id',
        component: ClinicianAnalysisComponent
      },
      {
        path: 'clinicianproceedures/:id',
        component: ClinicianProceeduresComponent
      },
      {
        path: 'frontdesk/:id',
        component: FrontDeskComponent
      },
      {
        path: 'marketing/:id',
        component: MarketingComponent
      },
      {
        path: 'finances/:id',
        component: FinancesComponent
      },
      {
        path: 'healthscreen/:id',
        component: HealthScreenComponent
      }
    ]
  }
];
