import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import {
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { RegisterService } from './register.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
     MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
    providers: [
    RegisterService
  ],
  declarations: [RegisterComponent],
  entryComponents: [RegisterComponent],
  exports: [RegisterComponent]
})
export class RegisterModule {
}
