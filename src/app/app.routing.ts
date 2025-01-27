import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { LostOpportunityComponent } from './lost-opportunity/lost-opportunity.component';
import { RewardsComponent } from './rewards/rewards.component';
import { KpiReportComponent } from './kpi-report/kpi-report.component';
import { TasksComponent } from './tasks/tasks.component';
import { MorningHuddleComponent } from './dashboards/morning-huddle/morning-huddle.component';
import { FollowupsComponent } from './followups/followups.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { AuthGuard } from './auth/authguard.service';
import { StaffMeetingsComponent } from './staff-meetings/staff-meetings.component';
import { NewAppBlankComponent } from './layouts/blank/new-blank.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
      {
        path: 'dashboards',
        loadChildren: () =>
          import('./dashboards/dashboards.module').then(
            m => m.DashboardsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'header',
        loadChildren: () =>
          import('./layouts/full/header/header.module').then(
            m => m.HeaderModule
          ),
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./roles/roles.module').then(m => m.RolesModule),
      },
      {
        path: 'roles-users',
        loadChildren: () =>
          import('./roles-users/roles-users.module').then(
            m => m.RolesUsersModule
          ),
      },
      {
        path: 'clinic',
        loadChildren: () =>
          import('./clinic/clinic.module').then(m => m.ClinicModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'plans',
        loadChildren: () =>
          import('./plans/plans.module').then(m => m.PlansModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'dentist',
        loadChildren: () =>
          import('./dentist/dentist.module').then(m => m.DentistModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'clinic-goals',
        loadChildren: () =>
          import('./clinic-goals/clinic-goals.module').then(
            m => m.ClinicGoalsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'morning-huddle',
        component: MorningHuddleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'staff-meetings',
        component: StaffMeetingsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'kpi-report',
        component: KpiReportComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'lost-opportunity',
        component: LostOpportunityComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'rewards',
        component: RewardsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'tasks',
        component: TasksComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'followups',
        component: FollowupsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'campaigns',
        component: CampaignsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'clinic-settings/:id',
        loadChildren: () =>
          import('./clinic-settings/clinic-settings.module').then(
            m => m.ClinicSettingsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'profile-settings',
        loadChildren: () =>
          import('./profile-settings/profile-settings.module').then(
            m => m.ProfileSettingsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'dentist-goals',
        loadChildren: () =>
          import('./dentist-goals/dentist-goals.module').then(
            m => m.DentistGoalsModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '',
    component: AppBlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./authentication/authentication.module').then(
            m => m.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: 'newapp',
    component: NewAppBlankComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../newapp/dashboard/dashboard.module').then(
            m => m.DashboardModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'campaigns',
        loadChildren: () =>
          import('../newapp/campaigns/campaigns.module').then(
            m => m.CampaignsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'practice-insights',
        loadChildren: () =>
          import('../newapp/practice-insights/practice-insights.module').then(
            m => m.PracticeInsightModule
          ),
        canActivate: [AuthGuard],
      }
    ],
  },
  {
    path: '',
    component: NewAppBlankComponent,
    children: [
      {
        path: 'setup',
        loadChildren: () =>
          import('../newapp/setup/setup.module').then(m => m.SetupModule),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '',
    component: AppBlankComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then(m => m.LoginModule),
      },
      {
        path: 'xero',
        loadChildren: () =>
          import('./xero/xero.module').then(m => m.XeroModule),
      },
      {
        path: 'xerosignup',
        loadChildren: () =>
          import('./signup/signup.module').then(m => m.SignupModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/404',
  },
];
