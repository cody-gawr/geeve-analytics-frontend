import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { DemoMaterialModule } from '../demo-material-module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DefaultersService } from './defaulters.service';
import { DefaultersComponent  } from './defaulters.component';
import { DefaultersRoutes } from './defaulters.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DefaultersRoutes),
    MatInputModule,
    NgxDatatableModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    DefaultersService
  ],
  entryComponents: [],
  declarations: [ DefaultersComponent ]
})
export class DefaultersModule { }