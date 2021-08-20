import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignupRoutes } from './signup.routing';
import { SignupService } from './signup.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SignupRoutes),
  ],
  providers: [
  SignupService
  ],
  declarations: [
  ]
})
export class SignupModule {}
