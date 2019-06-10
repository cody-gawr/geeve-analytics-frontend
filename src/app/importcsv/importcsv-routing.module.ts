import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportcsvComponent } from './importcsv.component';

const routes: Routes = [
  {
    path: '',
    component: ImportcsvComponent,
    data: {
      title: 'Importcsv'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportcsvRoutingModule {}
