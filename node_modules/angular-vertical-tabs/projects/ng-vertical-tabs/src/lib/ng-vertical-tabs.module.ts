import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule, MatDividerModule, MatListModule } from '@angular/material';

import { NgVerticalTabsComponent } from './ng-vertical-tabs/ng-vertical-tabs.component';
import { DynamicTabAnchorDirective } from './dynamic-tab-anchor.directive';
import { NgVerticalTabsService } from './ng-vertical-tabs.service';
import { NgVerticalTabComponent } from './ng-vertical-tab/ng-vertical-tab.component';

@NgModule({
  imports: [
    CommonModule, FormsModule,
    FlexLayoutModule,
    MatListModule, MatDividerModule, MatButtonModule
  ],
  entryComponents: [NgVerticalTabComponent],
  declarations: [DynamicTabAnchorDirective, NgVerticalTabComponent, NgVerticalTabsComponent, NgVerticalTabComponent],
  exports: [NgVerticalTabComponent, NgVerticalTabsComponent]
})
export class NgVerticalTabsModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: NgVerticalTabsModule, providers: [NgVerticalTabsService] };
  }
}
