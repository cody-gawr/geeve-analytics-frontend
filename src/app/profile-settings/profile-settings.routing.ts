import { Routes } from '@angular/router';

import { ProfileSettingsComponent } from './profile-settings.component';

export const ProfileSettingsRoutes: Routes = [
  {
   path: '',
    component: ProfileSettingsComponent,
    data: {
      title: 'Profile Settings'
    }
  }
];
