import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { DemoMaterialModule } from '../demo-material-module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RolesUsersService } from './roles-users.service';
import { RolesUsersComponent,
  DialogOverviewExampleDialogComponent,
  RolesOverviewExampleDialogComponent ,
  EditDialogComponent  } from './roles-users.component';
import { RolesUsersRoutes } from './roles-users.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RolesUsersRoutes),
    MatInputModule,
    NgxDatatableModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    DemoMaterialModule
  ],
  providers: [
    RolesUsersService
  ],
  entryComponents: [DialogOverviewExampleDialogComponent,RolesOverviewExampleDialogComponent, EditDialogComponent],
  declarations: [ RolesUsersComponent,
    DialogOverviewExampleDialogComponent,RolesOverviewExampleDialogComponent ,EditDialogComponent]
})
export class RolesUsersModule { }