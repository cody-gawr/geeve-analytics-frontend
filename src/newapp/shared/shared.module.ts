import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableResponsiveModule } from './directives/mat-table-responsive.module';
import { TimeMaskDirective } from './directives/time-mask.directive';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { DateRangeMenuComponent } from './components/date-range-menu/date-range-menu.component';
import { TrendModeToggleComponent } from './components/trend-mode-toggle/trend-mode-toggle.component';
import { SpinLoaderComponent } from './components/spin-loader/spin-loader.component';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import {
  TooltipComponent,
  TooltipContainerDirective,
} from './directives/tooltip/tooltip.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AverageModeToggleComponent } from './components/average-mode-toggle/average-mode-toggle.component';
import { CompareModeToggleComponent } from './components/compare-mode-toggle/compare-mode-toggle.component';
import { DragDropButtonComponent } from './components/drag-drop-button/drag-drop-button.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CustomTooltipComponent, CustomTooltipDirective } from './directives/custom-tooltip.directive';

const modules = [
  AngularMaterialModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
  MatTableResponsiveModule,
  FontAwesomeModule,
];

const components = [
  StatsCardComponent,
  DateRangeMenuComponent,
  TrendModeToggleComponent,
  AverageModeToggleComponent,
  CompareModeToggleComponent,
  SpinLoaderComponent,
  DragDropButtonComponent,
  ConfirmDialogComponent,
  CustomTooltipComponent,
  CustomTooltipDirective,
  TimeMaskDirective,
  TooltipDirective,
  TooltipContainerDirective,
];

@NgModule({
  declarations: [
    TooltipComponent,
    ...components,
  ],
  imports: [CommonModule, ...modules],
  exports: [
    ...modules,
    ...components,
  ],
  providers: [],
})
export class SharedModule {}
