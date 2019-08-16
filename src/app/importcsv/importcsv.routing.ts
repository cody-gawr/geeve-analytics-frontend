import { Routes } from '@angular/router';

import { ImportcsvComponent } from './importcsv.component';

export const ImportcsvRoutes: Routes = [
  {
    path: '',
    component: ImportcsvComponent,
    data: {
      title: 'Importcsv'
    }
  }
];
