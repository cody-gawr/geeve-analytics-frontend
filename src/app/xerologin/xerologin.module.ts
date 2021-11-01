import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { XeroLoginRoutes } from './xerologin.routing';
import { XeroLoginService } from './xerologin.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(XeroLoginRoutes),
  ],
  providers: [
  XeroLoginService
  ],
  declarations: [
  ]
})
export class XeroLoginModule {}
