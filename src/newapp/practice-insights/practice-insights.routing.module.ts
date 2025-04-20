import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PracticeInsightPageComponent } from './practice-insights.page.component';
import { AppLayoutComponent } from '../layout/app-layout/app-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: PracticeInsightPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PracticeInsightRoutingModule {}
