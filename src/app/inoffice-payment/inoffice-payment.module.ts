import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatCardModule,
  MatCheckboxModule,
  MatButtonModule
} from '@angular/material';
import { InofficePaymentRoutes } from './inoffice-payment.routing';
import { InofficePaymentComponent } from './inoffice-payment.component';

import { LoginService } from '../login/login.service';
import { NgxStripeModule } from '@nomadreservations/ngx-stripe';
import { InofficePaymentService } from './inoffice-payment.service';
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
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(InofficePaymentRoutes),    
    NgxStripeModule.forRoot('pk_test_fgXaq2pYYYwd4H3WbbIl4l8D00A63MKWFc'),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    QuillModule,
    MatInputModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FileUploadModule,
    MatTreeModule,
    MatDatepickerModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    LoginService,
    InofficePaymentService
  ],
  declarations: [
    InofficePaymentComponent,
  ]
})
export class InofficePaymentModule {}
