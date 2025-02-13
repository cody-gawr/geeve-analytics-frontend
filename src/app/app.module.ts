import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import {
  AppSidebarComponent,
  ReferFriendComponent,
} from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepperComponent } from './layouts/stepper/stepper.component';
import { StepperSidebarComponent } from './layouts/stepper/sidebar/sidebar.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SharedModule } from './shared/shared.module';
import { CookieModule } from 'ngx-cookie';
import { AuthGuard } from './auth/authguard.service';
import { provideUserIdleConfig } from 'angular-user-idle';
import { HeaderService } from './layouts/full/header/header.service';
import { StepperHeaderService } from './layouts/stepper/header/header.service';
import { StepperHeaderrightService } from './layouts/stepper/headerright/headerright.service';
import { DentistService } from './dentist/dentist.service';
import { ToastrModule } from 'ngx-toastr';
import {
  AppHeaderrightComponent,
  FeatureDialogComponent,
} from './layouts/full/headerright/headerright.component';
import { LostOpportunityComponent } from './lost-opportunity/lost-opportunity.component';
import { RewardsComponent } from './rewards/rewards.component';
import { KpiReportComponent } from './kpi-report/kpi-report.component';
import { TasksComponent } from './tasks/tasks.component';
import {
  MorningHuddleComponent,
  DialogOverviewExampleDialogComponent,
  StatusDialogMHComponent,
} from './dashboards/morning-huddle/morning-huddle.component';
import { SignupComponent } from './signup/signup.component';
import {
  FollowupsComponent,
  FollowupsDialogComponent,
  StatusDialogComponent,
  ExportDataDialogComponent,
} from './followups/followups.component';
// import {
//   CampaignsStatusDialogComponent,
//   CampaignsDialogComponent,
// } from './campaigns/campaigns.component';
import { StepperHeaderrightComponent } from './layouts/stepper/headerright/headerright.component';
import { ClinicSettingsService } from './clinic-settings/clinic-settings.service';
import { SharedMatModule } from './shared-mat.module';
import { DemoMaterialModule } from './demo-material-module';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DashboardDurationTabsComponent } from './dashboards/dashboard-duration-tabs/dashboard-duration-tabs.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DndDirective } from './directive/dnd.directive';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { SortDirective } from './directive/sort.directive';
import { StaffMeetingsComponent } from './staff-meetings/staff-meetings.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GraphsComponent } from './graphs/graphs.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '@/newapp/state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { httpInterceptors } from '@/newapp/shared/interceptors';
import { NewAppBlankComponent } from './layouts/blank/new-blank.component';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { clinicFeature } from '@/newapp/clinic/state/reducers/clinic.reducer';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { layoutFeature } from '@/newapp/layout/state/reducers/layout.reducer';
import { AppSwitchMenu } from './layouts/app-switch-menu/app-switch-menu.component';
import { LoginService } from './login/login.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
};

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    // StepperHeaderComponent,
    AppBlankComponent,
    NewAppBlankComponent,
    AppSidebarComponent,
    AppHeaderrightComponent,
    FeatureDialogComponent,
    ReferFriendComponent,
    KpiReportComponent,
    LostOpportunityComponent,
    RewardsComponent,
    TasksComponent,
    MorningHuddleComponent,
    SignupComponent,
    FollowupsComponent,
    FollowupsDialogComponent,
    ExportDataDialogComponent,
    StatusDialogComponent,
    // CampaignsStatusDialogComponent,
    // CampaignsDialogComponent,
    StatusDialogMHComponent,
    DialogOverviewExampleDialogComponent,
    StepperComponent,
    StepperSidebarComponent,
    StepperHeaderrightComponent,
    DashboardDurationTabsComponent,
    SortDirective,
    DndDirective,
    StaffMeetingsComponent,
    GraphsComponent,
    AppSwitchMenu
  ],
  imports: [
    DemoMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    PerfectScrollbarModule,
    DropDownListAllModule,
    SharedModule,
    KanbanModule,
    NgxDaterangepickerMd.forRoot(),
    SharedMatModule.forRoot(),
    CookieModule.withOptions(),
    RouterModule.forRoot(AppRoutes),
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
      //tapToDismiss:false
    }),
    DragDropModule,
    // NgxGaugeModule,
    // ChartsModule,
    // NgxChartsModule,
    StoreModule.forRoot({ ...reducers }, { metaReducers }),
    StoreModule.forFeature(clinicFeature),
    StoreModule.forFeature(layoutFeature),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([]),
    FontAwesomeModule,
  ],
  providers: [
    AuthGuard,
    HeaderService,
    StepperHeaderService,
    ClinicSettingsService,
    StepperHeaderrightService,
    DatePipe,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    DentistService,
    DecimalPipe,
    provideUserIdleConfig({ idle: 14400, timeout: 10, ping: 10 }),
    httpInterceptors,
    ClinicFacade,
    LayoutFacade,
    LoginService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
