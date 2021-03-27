import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutes } from './login.routing';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginService
  ],
  declarations: [
    LoginComponent,
  ]
})
export class LoginModule {}
