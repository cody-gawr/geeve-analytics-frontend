import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClinicComponent } from './clinic.component';

const routes: Routes = [
  {
    path: '',
    component: ClinicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicsRoutingModule {}
