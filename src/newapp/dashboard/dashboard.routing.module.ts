import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancesComponent } from './components/finances/finances.component';
import { AppLayoutComponent } from '../layout/app-layout/app-layout.component';
import { MarketingComponent } from './components/marketing/marketing.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'finances',
        component: FinancesComponent
      },
      {
        path: 'marketing',
        component: MarketingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
