import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatCardModule,
  MatCheckboxModule,
  MatButtonModule
} from '@angular/material';
import { UpdateCardRoutes } from './update-card.routing';
import { UpdateCardComponent } from './update-card.component';

import { LoginService } from '../login/login.service';
import { UpdateCardService } from './update-card.service';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { QuillModule } from 'ngx-quill';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { MatTreeModule } from '@angular/material/tree';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxStripeModule } from 'ngx-stripe';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UpdateCardRoutes),    
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    FormsModule,
    QuillModule,
    MatInputModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FileUploadModule,
    MatTreeModule,
    MatDatepickerModule,
    NgxStripeModule.forRoot(''),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    LoginService,
    UpdateCardService
  ],
  declarations: [
    UpdateCardComponent,
  ]
})
export class UpdateCardModule {}
