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
import { FlexLayoutModule } from '@angular/flex-layout';

import { HomeRoutes } from './home.routing';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HomeService
  ],
  declarations: [
    HomeComponent,
  ]
})
export class HomeModule {}
