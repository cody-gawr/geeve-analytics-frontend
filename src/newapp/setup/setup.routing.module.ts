import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupComponent } from './setup.component';
import { SetupLayoutComponent } from '../layout/setup-layout/setup-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SetupLayoutComponent,
    children: [
      {
        path: '',
        component: SetupComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupRoutingModule {}
