import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UsersService } from './users.service';
import { UsersComponent  } from './users.component';
import { UsersRoutes } from './users.routing';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UsersRoutes),
    MatInputModule,
    NgxDatatableModule,
    FormsModule,
    DemoMaterialModule
  ],
  providers: [
    UsersService
  ],
  declarations: [ UsersComponent ]
})
export class UsersModule { }