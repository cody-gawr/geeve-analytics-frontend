import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TermsComponent} from './terms.component';

import {
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TermsRoutes } from './terms.routing';
import { TermsService } from './terms.service';
import { MatDialogModule} from '@angular/material';
import { ClinicSettingsService } from '../clinic-settings/clinic-settings.service';
//import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SlickModule } from 'ngx-slick';

 

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TermsRoutes),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    SlickModule.forRoot()
  ],
  providers: [
    TermsService,
    ClinicSettingsService
  ],
  bootstrap: [TermsComponent],
  declarations: [TermsComponent],
  exports: [TermsComponent]

})
export class TermsModule {}
