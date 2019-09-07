import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { AuthGuard } from './auth/authguard.service';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }
      ,
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'importcsv/:id',
        loadChildren: './importcsv/importcsv.module#ImportcsvModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboards',
        loadChildren: './dashboards/dashboards.module#DashboardsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'header',
        loadChildren: './layouts/full/header/header.module#HeaderModule'
      },
      {
        path: 'roles/:id',
        loadChildren: './roles/roles.module#RolesModule'
      },
      {
        path: 'roles-users/:id',
        loadChildren: './roles-users/roles-users.module#RolesUsersModule'
      },
      {
        path: 'clinic',
        loadChildren: './clinic/clinic.module#ClinicModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'users',
        loadChildren: './users/users.module#UsersModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'plans',
        loadChildren: './plans/plans.module#PlansModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'dentist/:id',
        loadChildren: './dentist/dentist.module#DentistModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'clinic-goals/:id',
        loadChildren: './clinic-goals/clinic-goals.module#ClinicGoalsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'clinic-settings/:id',
        loadChildren: './clinic-settings/clinic-settings.module#ClinicSettingsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'profile-settings/:id',
        loadChildren: './profile-settings/profile-settings.module#ProfileSettingsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'dentist-goals/:id',
        loadChildren: './dentist-goals/dentist-goals.module#DentistGoalsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'material',
        loadChildren:
          './material-component/material.module#MaterialComponentsModule'
      },
      {
        path: 'apps',
        loadChildren: './apps/apps.module#AppsModule'
      },
      {
        path: 'forms',
        loadChildren: './forms/forms.module#FormModule'
      },
      {
        path: 'tables',
        loadChildren: './tables/tables.module#TablesModule'
      },
      {
        path: 'datatables',
        loadChildren: './datatables/datatables.module#DataTablesModule'
      },
      {
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
      },
      {
        path: 'widgets',
        loadChildren: './widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'charts',
        loadChildren: './charts/chartslib.module#ChartslibModule'
      },
      {
        path: 'multi',
        loadChildren: './multi-dropdown/multi-dd.module#MultiModule'
      }
    ]
  },
  {
    path: '',
    component: AppBlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren:
          './authentication/authentication.module#AuthenticationModule'
      }
    ]
  },
  {
    path: '',
    component: AppBlankComponent,
    children: [
      {
        path: 'login',
        loadChildren:
          './login/login.module#LoginModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'authentication/404'
  }
];
