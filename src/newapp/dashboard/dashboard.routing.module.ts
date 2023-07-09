import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancesComponent } from './components/finances/finances.component';
import { AppLayoutComponent } from '../layout/app-layout/app-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'finances',
        component: FinancesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
