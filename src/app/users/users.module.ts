import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UsersService } from './users.service';
import { UsersComponent  } from './users.component';
import { UsersRoutes } from './users.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UsersRoutes),
    MatInputModule,
    NgxDatatableModule,
    FormsModule
  ],
  providers: [
    UsersService
  ],
  declarations: [ UsersComponent ]
})
export class UsersModule { }