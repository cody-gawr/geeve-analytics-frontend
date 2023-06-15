import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { XeroRoutes } from './xero.routing';
import { XeroComponent } from './xero.component';
import { XeroService } from './xero.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(XeroRoutes),
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
    XeroService
  ],
  declarations: [
    XeroComponent,
  ]
})
export class XeroModule {}
