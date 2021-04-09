import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { StepperHeaderComponent } from './layouts/stepper/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepperComponent } from './layouts/stepper/stepper.component';
import { StepperSidebarComponent } from './layouts/stepper/sidebar/sidebar.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { CookieModule } from "ngx-cookie";
import { AuthGuard } from './auth/authguard.service';
import { HeaderService } from './layouts/full/header/header.service';
import { StepperHeaderService } from './layouts/stepper/header/header.service';
import { StepperHeaderrightService } from './layouts/stepper/headerright/headerright.service';
import { DentistService } from './dentist/dentist.service';
import { ToastrModule } from 'ngx-toastr';
import { AppHeaderrightComponent } from './layouts/full/headerright/headerright.component';
import { LostOpportunityComponent } from './lost-opportunity/lost-opportunity.component';
import { MorningHuddleComponent } from './dashboards/morning-huddle/morning-huddle.component';
import { StepperHeaderrightComponent } from './layouts/stepper/headerright/headerright.component';
import { MatMenuModule} from '@angular/material/menu';
import { ClinicSettingsService } from './clinic-settings/clinic-settings.service';
import { SharedMatModule } from './shared-mat.module';
import { DemoMaterialModule } from './demo-material-module';

import { DashboardDurationTabsComponent } from './dashboards/dashboard-duration-tabs/dashboard-duration-tabs.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    StepperHeaderComponent,
    SpinnerComponent,
    AppBlankComponent,
    AppSidebarComponent,
    AppHeaderrightComponent,
    LostOpportunityComponent,
    MorningHuddleComponent,
    StepperComponent,
    StepperSidebarComponent,
    StepperHeaderrightComponent,
    DashboardDurationTabsComponent
  ],
  imports: [
  MatMenuModule,
  DemoMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    PerfectScrollbarModule,
    SharedModule,
    SharedMatModule.forRoot(),
    CookieModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    ToastrModule.forRoot({ 
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton :true,
      progressBar :true
      //tapToDismiss:false
  })
  ],
  providers: [
    AuthGuard, 
    HeaderService,
    StepperHeaderService,
    ClinicSettingsService,
    StepperHeaderrightService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
      DentistService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
