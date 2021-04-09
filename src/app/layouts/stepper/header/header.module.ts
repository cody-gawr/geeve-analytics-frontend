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
import { StepperHeaderComponent } from './header.component';
import { StepperHeaderService } from './header.service';
 import { MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    StepperHeaderService
  ],
  declarations: [
    StepperHeaderComponent
  ]
})
export class HeaderModule {}
