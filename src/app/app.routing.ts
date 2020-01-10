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
        path: 'in-office',
        loadChildren: './in-office/in-office.module#InOfficeModule',
        canActivate: [AuthGuard]
      },

      {
        path: 'in-office-history/:id',
        loadChildren: './in-office-history/in-office-history.module#InOfficeHistoryModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'dentist/:id',
        loadChildren: './dentist/dentist.module#DentistModule',
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
        path: 'material',
        loadChildren:
          './material-component/material.module#MaterialComponentsModule',
      },
      {
        path: 'apps',
        loadChildren: './apps/apps.module#AppsModule',
      },
      {
        path: 'forms',
        loadChildren: './forms/forms.module#FormModule',
      },
      {
        path: 'tables',
        loadChildren: './tables/tables.module#TablesModule',
      },
      {
        path: 'datatables',
        loadChildren: './datatables/datatables.module#DataTablesModule',
      },
      {
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule',
      },
      {
        path: 'widgets',
        loadChildren: './widgets/widgets.module#WidgetsModule',
      },
      {
        path: 'charts',
        loadChildren: './charts/chartslib.module#ChartslibModule',
      },
      {
        path: 'multi',
        loadChildren: './multi-dropdown/multi-dd.module#MultiModule',
      },
      {
        path: 'patients-detail',
        loadChildren: './patients-detail/patients-detail.module#PatientsDetailModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'patient-info/:id',
        loadChildren: './patient-info/patient-info.module#PatientInfoModule',
        canActivate: [AuthGuard]
       },
      {
        path: 'patient-paymentinfo/:id',
        loadChildren: './patient-paymentinfo/patient-paymentinfo.module#PatientPaymentinfoModule',
        canActivate: [AuthGuard]
       },
      //  {
      //   path: 'treatments/:id',
      //   loadChildren: './treatments/treatments.module#TreatmentsModule'
      // },
      {
        path: 'defaulters',
        loadChildren: './defaulters/defaulters.module#DefaultersModule',
        canActivate: [AuthGuard]
      },
   
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
      },
       {
        path: 'test',
        loadChildren:
          './test/test.module#TestModule'
      }
    ]
  },
  {
    path: '',
    component: AppBlankComponent,
    children: [
      {
        path: 'subscription/:clinic_id/:user_id',
        loadChildren:
          './subscription/subscription.module#SubscriptionModule'
      },
      {
        path: 'terms/:id',
        loadChildren: './terms/terms.module#TermsModule'
      },
      
      {
        path: 'payment-patient/:id',
        loadChildren: './payment-patient/payment-patient.module#PaymentPatientModule',
       
      },
      {
        path: 'inoffice-payment/:id',
        loadChildren: './inoffice-payment/inoffice-payment.module#InofficePaymentModule',       
      },
      {
        path: 'purchase-plan/:id',
        loadChildren: './purchase-plan/purchase-plan.module#PurchasePlanModule'
      },
      {
        path: 'thank-you/:id',
        loadChildren: './thank-you/thank-you.module#ThankYouModule',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'authentication/404'
  }
];
