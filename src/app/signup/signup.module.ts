import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignupRoutes } from './signup.routing';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SignupRoutes),
  ],
  providers: [
  ],
  declarations: [
  ]
})
export class SignupModule {}
