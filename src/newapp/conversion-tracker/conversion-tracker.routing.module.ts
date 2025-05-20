import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from '../layout/app-layout/app-layout.component';
import { ConversionTrackerComponent } from './conversion-tracker.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: ConversionTrackerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversionTrackerRoutingModule {}
