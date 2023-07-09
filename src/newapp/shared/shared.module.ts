import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableResponsiveModule } from './directives/mat-table-responsive.module';
import { TimeMaskDirective } from './directives/time-mask.directive';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
const modules = [
  AngularMaterialModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
  MatTableResponsiveModule
];

const components = [StatsCardComponent];

@NgModule({
  declarations: [TimeMaskDirective, ...components],
  imports: [CommonModule, ...modules],
  exports: [...modules, TimeMaskDirective, ...components],
  providers: []
})
export class SharedModule {}
