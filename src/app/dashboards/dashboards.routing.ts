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
        path: 'cliniciananalysis',
        component: ClinicianAnalysisComponent
      },
      {
        path: 'clinicianproceedures',
        component: ClinicianProceeduresComponent
      },
      {
        path: 'frontdesk',
        component: FrontDeskComponent
      },
      {
        path: 'marketing',
        component: MarketingComponent
      },
      {
        path: 'finances',
        component: FinancesComponent
      },
      {
        path: 'healthscreen',
        component: HealthScreenComponent
      }
    ]
  }
];
