import { Injectable } from '@angular/core';
import { RolesUsersService } from '../../roles-users/roles-users.service';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';
export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  /* {
    state: '',
    name: 'Personal',
    type: 'saperator',
    icon: 'av_timer'
  },
  {
    state: 'dashboard',
    name: 'Dashboard',
    type: 'sub',
    icon: 'av_timer',
    children: [
      { state: 'dashboard1', name: 'Dashboard 1', type: 'link' },
      { state: 'dashboard2', name: 'Dashboard 2', type: 'link' }
    ]
  },*/
  {
    state: 'healthscreen',
    name: 'Health Screen',
    type: 'link-healthscreen',
    icon: 'fas fa-home',
    role: ['2'],
    param2: 'dashboards'
  },
  {
    state: 'lost-opportunity',
    name: 'Lost Opportunity',
    type: 'link-lost-opportunity',
    icon: 'fas fa-arrow-up',
    role: ['2'],
    param2: ''
  },
  {
    state: 'morning-huddle',
    name: 'Morning Huddle',
    type: 'link-morning-huddle',
    icon: 'fas fa-sun',
    role: ['2'],
    param2: ''
  },
  {
    state: 'dashboards',
    name: 'Dashboards',
    type: 'sub-dashboards',
    icon: 'fas fa-chart-area',
    children: [
      { state: 'cliniciananalysis', name: 'Clinician Analysis', type: 'link' },
      {
        state: 'clinicianproceedures',
        name: 'Clinician Procedures & Referrals',
        type: 'link'
      },
      { state: 'frontdesk', name: 'Front Desk', type: 'link' },
      { state: 'marketing', name: 'Marketing', type: 'link' },
      { state: 'finances', name: 'Finances', type: 'link', icon: '' }
    ],
    param: '1'
  },
  {
    state: 'clinic',
    name: 'Clinics',
    type: 'link-noparam',
    icon: 'fas fa-home',
    role: ['2']
  },
  {
    state: 'dentist',
    name: 'Dentists',
    type: 'link',
    icon: 'fas fa-tooth',
    role: ['2']
  },
  {
    state: 'users',
    name: 'Registered Users',
    type: 'link-noparam',
    icon: 'fas fa-users',
    role: ['1']
  },
  {
    state: 'plans',
    name: 'Subscription Plans',
    type: 'link-noparam',
    icon: 'fas fa-receipt',
    role: ['1']
  },
  {
    state: 'roles-users',
    name: 'Roles Management',
    type: 'link',
    icon: 'fas fa-user-tag',
    role: ['2']
  },
  {
    state: '',
    name: 'Goals',
    type: 'sub-child',
    icon: 'fas fa-cog',
    children: [
      { state: 'clinic-goals', name: 'Clinic Goals', type: 'link' },
      { state: 'dentist-goals', name: 'Dentist Goals', type: 'link' }
    ],
    role: ['1', '2']
  },
  {
    state: 'profile-settings',
    name: 'Profile Settings',
    type: 'link',
    icon: 'fas fa-user-cog',
    role: ['1', '2']
  }
];

@Injectable()
export class MenuItems {
  private _routerSub = Subscription.EMPTY;
  constructor(
    private rolesUsersService: RolesUsersService,
    private router: Router
  ) {
    this._routerSub = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.getRoles();
      }
    });
  }
  getMenuitem(): Menu[] {
    return this.menu;
  }
  public MENUITEMS;

  public dashboard1role = ['1', '2', '3', '4'];
  public dashboard2role = ['1', '2', '3', '4'];
  public dashboard3role = ['1', '2', '3', '5'];
  public dashboard4role = ['1', '2', '3', '5'];
  public dashboard5role = ['1', '2'];
  public healthscreenrole = ['1', '2', '3'];
  public morninghuddlerole = ['1', '2', '3', '4', '5'];
  public lostoppurtunityrole = ['1', '2', '3'];
  public clinicsrole = ['1', '2', '3'];
  public usersrole = ['1', '2', '3'];
  public profilesettingsrole = ['1', '2', '3'];

  public menu = [
    {
      state: 'healthscreen',
      name: 'Clinic Health',
      type: 'link-healthscreen',
      icon: 'fas fa-clinic-medical',
      role: this.healthscreenrole,
      param2: 'dashboards'
    },
    {
      state: 'morning-huddle',
      name: 'Morning Huddle',
      type: 'link-morning-huddle',
      icon: 'fas fa-coffee',
      role: this.morninghuddlerole,
      param2: ''
    },
    {
      state: 'dashboards',
      name: 'Dashboards',
      type: 'sub-dashboards',
      icon: 'fas fa-chart-area',
      children: [
        {
          state: 'cliniciananalysis',
          name: 'Clinician Analysis',
          type: 'link',
          role: this.dashboard1role
        },
        {
          state: 'clinicianproceedures',
          name: 'Clinician Procedures & Referrals',
          type: 'link',
          role: this.dashboard2role
        },
        {
          state: 'frontdesk',
          name: 'Front Desk',
          type: 'link',
          role: this.dashboard3role
        },
        {
          state: 'marketing',
          name: 'Marketing',
          type: 'link',
          role: this.dashboard4role
        },
        {
          state: 'finances',
          name: 'Finances',
          type: 'link',
          icon: '',
          role: this.dashboard5role
        }
      ],
      role: ['2', '3', '4', '5']
    },
    {
      state: 'lost-opportunity',
      name: 'Lost Opportunity',
      type: 'link-lost-opportunity',
      icon: 'fas fa-briefcase',
      role: this.lostoppurtunityrole,
      param2: ''
    },
    {
      state: 'Settings',
      name: 'Settings',
      type: 'sub-child',
      icon: 'fas fa-cog',
      children: [
        {
          state: 'clinic',
          name: 'Clinics',
          type: 'link',
          role: this.profilesettingsrole
        },
        {
          state: 'roles-users',
          name: 'Users',
          type: 'link',
          role: this.profilesettingsrole
        },
        {
          state: 'profile-settings',
          name: 'Profile Settings',
          type: 'link',
          role: ['2', '3', '4', '5']
        }
      ],
      role: ['2', '3', '4', '5']
    }
  ];
  getRoles() {
    this.rolesUsersService.getRoles().subscribe(
      (res) => {
        if (res.status == 200) {
          res.body.data.forEach((item: any) => {
            var dashboards = item.permissions.split(',');
            if (dashboards.includes('dashboard1'))
              this.dashboard1role.push(item.role_id.toString());
            if (dashboards.includes('dashboard2'))
              this.dashboard2role.push(item.role_id.toString());
            if (dashboards.includes('dashboard3'))
              this.dashboard3role.push(item.role_id.toString());
            if (dashboards.includes('dashboard4'))
              this.dashboard4role.push(item.role_id.toString());
            if (dashboards.includes('dashboard5'))
              this.dashboard5role.push(item.role_id.toString());
            if (dashboards.includes('healthscreen'))
              this.healthscreenrole.push(item.role_id.toString());
            if (dashboards.includes('morninghuddle'))
              this.morninghuddlerole.push(item.role_id.toString());
            if (dashboards.includes('lostoppurtunity'))
              this.lostoppurtunityrole.push(item.role_id.toString());
            if (dashboards.includes('profilesettings'))
              this.profilesettingsrole.push(item.role_id.toString());
          });
        }
      },
      (error) => {}
    );
  }
}
