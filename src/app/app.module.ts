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
import { StepperComponent } from './layouts/stepper/stepper.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { StepperSidebarComponent } from './layouts/stepper/sidebar/sidebar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { CookieService } from "angular2-cookie/services/cookies.service";
import { HttpModule } from '@angular/http'; 
import { AuthGuard } from './auth/authguard.service';
import { AuthService } from './auth/auth.service';
import { HeaderService } from './layouts/full/header/header.service';
import { StepperHeaderService } from './layouts/stepper/header/header.service';
import { StepperHeaderrightService } from './layouts/stepper/headerright/headerright.service';

import { DentistService } from './dentist/dentist.service';

import { AppHeaderrightComponent } from './layouts/full/headerright/headerright.component';
import { StepperHeaderrightComponent } from './layouts/stepper/headerright/headerright.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';


import { ToastrModule } from 'ngx-toastr';


const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    StepperComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppBlankComponent,
    AppSidebarComponent,
    AppHeaderrightComponent,
    StepperSidebarComponent,
    StepperHeaderrightComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    PerfectScrollbarModule,
    SharedModule,
    HttpModule,   
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    NotifierModule.withConfig(customNotifierOptions),
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
    AuthService,
    HeaderService,
    StepperHeaderService,
    StepperHeaderrightService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
      CookieService,
      DentistService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
