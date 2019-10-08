import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatCardModule,
  MatCheckboxModule,
  MatButtonModule
} from '@angular/material';
import { PaymentPatientRoutes } from './payment-patient.routing';
import { PaymentPatientComponent } from './payment-patient.component';

import { LoginService } from '../login/login.service';
import { NgxStripeModule } from '@nomadreservations/ngx-stripe';
import { PaymentPatientService } from './payment-patient.service';
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
    RouterModule.forChild(PaymentPatientRoutes),    
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
    PaymentPatientService
  ],
  declarations: [
    PaymentPatientComponent,
  ]
})
export class PaymentPatientModule {}
