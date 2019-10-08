import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule, MatInputModule } from '@angular/material';
import { DemoMaterialModule } from '../demo-material-module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RolesUsersService } from './roles-users.service';
import { RolesUsersComponent,
  DialogOverviewExampleDialogComponent,
  RolesOverviewExampleDialogComponent  } from './roles-users.component';
import { RolesUsersRoutes } from './roles-users.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RolesUsersRoutes),
    MatInputModule,
    NgxDatatableModule,
    DemoMaterialModule,
    FormsModule,
    MatFormFieldModule
  ],
  providers: [
    RolesUsersService
  ],
  entryComponents: [DialogOverviewExampleDialogComponent,RolesOverviewExampleDialogComponent],
  declarations: [ RolesUsersComponent,
    DialogOverviewExampleDialogComponent,RolesOverviewExampleDialogComponent ]
})
export class RolesUsersModule { }