import { Injectable } from '@angular/core';
import { RolesUsersService } from '../../roles-users/roles-users.service';

import { Component, AfterViewInit, SecurityContext, ViewEncapsulation, OnInit, Pipe, PipeTransform, ViewChild, ElementRef  } from '@angular/core';
import * as frLocale from 'date-fns/locale/fr';
import { DatePipe } from '@angular/common';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import 'chartjs-plugin-style';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CookieService } from "angular2-cookie/core";
import { BaseChartDirective } from 'ng2-charts';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import { NgxSmartModalService } from 'ngx-smart-modal';

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

  // {
  //   state: 'dashboards',
  //   name: 'Dashboards',
  //   type: 'sub-dashboards',
  //   icon: 'fas fa-chart-area',
  //   children: [
  //     { state: 'cliniciananalysis', name: 'Clinician Analysis', type: 'link', param : '1'}
  //   ],
  //   param: '1'
  // },  
  {
    state: 'clinic',
    name: 'Clinics',
    type: 'link-noparam',
    icon: 'fas fa-home',
    role:['2']
  },
  {
    state: 'dentist',
    name: 'Dentists',
    type: 'link',
    icon: 'fas fa-tooth',
    param : '1',
    role:['2']
  },
  {
    state: 'users',
    name: 'Registered Users',
    type: 'link-noparam',
    icon: 'fas fa-users',
    role:['1']
  },
  {
    state: 'plans',
    name: 'Member Plans',
    type: 'link-noparam',
    icon: 'fas fa-receipt',
    role:['2']

  },
  {
    state: 'in-office',
    name: 'In office Plans',
    type: 'link-noparam',
    icon: 'fas fa-receipt',
    role:['2']

  },
  {

    state: 'defaulters',
    name: 'Defaulters',
    type: 'link-noparam',
    icon: 'fas fa-user-tag',
    role:['2']

  },
   {
    state: 'treatments',
    name: 'Treatments',
    type: 'link',
    icon: 'fas fa-user-tag',
    param: '1',
    role:['2']

  },
  // {
  //   state: 'roles-users',
  //   name: 'Roles Management',
  //   type: 'link',
  //   icon: 'fas fa-user-tag',
  //   param: '1',
  //   role:['2']

  // },
  {
    state: '',
    name: 'Goals',
    type: 'sub-child',
    icon: 'fas fa-medal',
    children: [
      { state: 'clinic-goals', name: 'Clinic Goals', type: 'link', param : '1'},
      { state: 'dentist-goals', name: 'Dentist Goals', type: 'link', param : '1' }

    ],
    param: '1',
    role:['1','2']

  },

  {
    state: 'profile-settings',
    name: 'Settings',
    type: 'link',
    icon: 'fas fa-user-cog',
    param : '1',
    role:['1','2']

  },
  /*{
    state: 'material',
    name: 'Material Ui',
    type: 'sub',
    icon: 'bubble_chart',
    badge: [{ type: 'red', value: '17' }],
    children: [
      { state: 'badge', name: 'Badge', type: 'link' },
      { state: 'button', name: 'Buttons', type: 'link' },
      { state: 'cards', name: 'Cards', type: 'link' },
      { state: 'grid', name: 'Grid List', type: 'link' },
      { state: 'lists', name: 'Lists', type: 'link' },
      { state: 'menu', name: 'Menu', type: 'link' },
      { state: 'tabs', name: 'Tabs', type: 'link' },
      { state: 'stepper', name: 'Stepper', type: 'link' },
      { state: 'ripples', name: 'Ripples', type: 'link' },
      { state: 'expansion', name: 'Expansion Panel', type: 'link' },
      { state: 'chips', name: 'Chips', type: 'link' },
      { state: 'toolbar', name: 'Toolbar', type: 'link' },
      { state: 'progress-snipper', name: 'Progress snipper', type: 'link' },
      { state: 'progress', name: 'Progress Bar', type: 'link' },
      { state: 'dialog', name: 'Dialog', type: 'link' },
      { state: 'tooltip', name: 'Tooltip', type: 'link' },
      { state: 'snackbar', name: 'Snackbar', type: 'link' },
      { state: 'slider', name: 'Slider', type: 'link' },
      { state: 'slide-toggle', name: 'Slide Toggle', type: 'link' }
    ]
  },
  {
    state: 'apps',
    name: 'Apps',
    type: 'sub',
    icon: 'apps',
    children: [
      { state: 'calendar', name: 'Calendar', type: 'link' },
      { state: 'messages', name: 'Mail box', type: 'link' },
      { state: 'chat', name: 'Chat', type: 'link' },
      { state: 'taskboard', name: 'Taskboard', type: 'link' }
    ]
  },
  {
    state: '',
    name: 'Forms, Table & Widgets',
    type: 'saperator',
    icon: 'av_timer'
  },
  {
    state: 'forms',
    name: 'Forms',
    type: 'sub',
    icon: 'insert_drive_file',
    children: [
      { state: 'form-layout', name: 'Form-Layout', type: 'link' },
      { state: 'autocomplete', name: 'Autocomplete', type: 'link' },
      { state: 'checkbox', name: 'Checkbox', type: 'link' },
      { state: 'radiobutton', name: 'Radio Button', type: 'link' },
      { state: 'datepicker', name: 'Datepicker', type: 'link' },
      { state: 'select', name: 'Select', type: 'link' },
      { state: 'formfield', name: 'Form Field', type: 'link' },
      { state: 'input', name: 'Inputs', type: 'link' },
      { state: 'tree', name: 'Tree', type: 'link' },
      { state: 'editor', name: 'Editor', type: 'link' },
      { state: 'form-validation', name: 'Form Validation', type: 'link' },
      { state: 'file-upload', name: 'File Upload', type: 'link' },
      { state: 'wizard', name: 'Wizard', type: 'link' },
      { state: 'paginator', name: 'Paginator', type: 'link' },
      { state: 'sortheader', name: 'Sort Header', type: 'link' },
      { state: 'multiselect', name: 'Multiselect', type: 'link' }
    ]
  },
  {
    state: 'tables',
    name: 'Tables',
    type: 'sub',
    icon: 'web',
    children: [
      { state: 'basictable', name: 'Basic Table', type: 'link' },
      { state: 'filterable', name: 'Filterable Table', type: 'link' },
      { state: 'pagination', name: 'Pagination Table', type: 'link' },
      { state: 'sortable', name: 'Sortable Table', type: 'link' },
      { state: 'mix', name: 'Mix Table', type: 'link' },
      { state: 'smarttable', name: 'Smart Table', type: 'link' }
    ]
  },
  {
    state: 'datatables',
    name: 'Data Tables',
    type: 'sub',
    icon: 'border_all',
    children: [
      { state: 'basicdatatable', name: 'Basic Data Table', type: 'link' },
      { state: 'filter', name: 'Filterable', type: 'link' },
      { state: 'editing', name: 'Editing', type: 'link' },
      { state: 'materialtable', name: 'Material Table', type: 'link' }
    ]
  },
  {
    state: 'widgets',
    name: 'Widgets',
    type: 'link',
    icon: 'widgets'
  },
  {
    state: '',
    name: 'Extra Component',
    type: 'saperator',
    icon: 'av_timer'
  },
  {
    state: 'authentication',
    name: 'Authentication',
    type: 'sub',
    icon: 'perm_contact_calendar',
    children: [
      { state: 'login', name: 'Login', type: 'link' },
      { state: 'register', name: 'Register', type: 'link' },
      { state: 'forgot', name: 'Forgot', type: 'link' },
      { state: 'lockscreen', name: 'Lockscreen', type: 'link' },
      { state: '404', name: 'Error', type: 'link' }
    ]
  },
  {
    state: 'charts',
    name: 'Charts',
    type: 'sub',
    icon: 'insert_chart',
    children: [
      { state: 'chartjs', name: 'Chart Js', type: 'link' },
      { state: 'chartistjs', name: 'Chartist Js', type: 'link' },
      { state: 'ngxchart', name: 'Ngx Charts', type: 'link' }
    ]
  },*/
/*
  {
    state: 'multi',
    name: 'Menu Levels',
    icon: 'star',
    type: 'sub',
    children: [
      {
        state: 'second-level',
        name: 'Second Level',
        type: 'link'
      },
      {
        state: 'third-level',
        name: 'Second Level',
        type: 'subchild',
        subchildren: [
          {
            state: 'third-level',
            name: 'Third Level',
            type: 'link'
          }
        ]
      }
    ]
  }*/
];

@Injectable()
export class MenuItems {
  constructor(private rolesUsersService: RolesUsersService) {
    this.getRoles();
  }
  getMenuitem(): Menu[] {
    return this.menu;
  }
   public MENUITEMS;
   public clinic=['2'];
   public memberships=['2'];
   public paymentplans=['2'];
   public defaulters=['2'];

   public rolesusers=['2'];
   public profilesettings=['2'];
  public menu = [
  
  {
    state: 'dashboards',
    name: 'Dashboards',
    type: 'link-noparam',
    icon: 'fas fa-chart-area',
    role:['1','2']

  },  
  {
    state: 'clinic',
    name: 'Clinics',
    type: 'link-noparam',
    icon: 'fas fa-home',
    role:this.clinic
  },
  // {
  //   state: 'dentist',
  //   name: 'Dentists',
  //   type: 'link',
  //   icon: 'fas fa-tooth',
  //   param : '1',
  //   role:['2']
  // },

  {
    state: 'users',
    name: 'Registered Users',
    type: 'link-noparam',
    icon: 'fas fa-users',
    role:['1']
  },

  {
    state: 'patients-detail',
    name: 'Memberships', //Member Plans
    type: 'link-noparam',
    icon: 'fas fa-receipt',
    role:this.memberships

  },
  // {
  //   state: 'purchase-plan',
  //    name: 'Purchase Plan',
  //   type: 'link',
  //   icon: 'fas fa-user-tag',
  //   param: '1',
  //   role:['2']
  // },
  {
    state: 'in-office',
    name: 'Payment Plans', //In office Plans
    type: 'link-noparam',
    icon: 'fas fa-file-invoice',
    role:this.paymentplans
  },
  {
    state: 'defaulters',
    name: 'Defaulters',
    type: 'link-noparam',
    icon: 'fas fa-user-times',
    role:this.defaulters
    },
  {

    state: 'roles-users',
    name: 'Roles Management',
    type: 'link',
    icon: 'fas fa-user-tag',
    param: '1',
    role:this.rolesusers
  },
  //   {
  //   state: 'treatments',
  //   name: 'Treatments',
  //   type: 'link',
  //   icon: 'fas fa-hospital',
  //   param: '1',
  //   role:['2','3']
  // },
  // {
  //   state: 'profile-settings',
  //   name: 'Settings',
  //   type: 'link',
  //   icon: 'fas fa-user-cog',
  //   param : '1',
  //   role:['2','3']
  // },
  {
     state: 'profile-settings',
    name: 'Settings',
    type: 'sub-child',
    icon: 'fas fa-user-cog',
    children: [
      { state: 'profile-settings', name: 'Settings', type: 'link',param : '1'},
      { state: 'plans', name: 'Member Plans', type: 'link',param : ''}
    ],
    role:this.profilesettings

  }
];
  getRoles() {      
   this.rolesUsersService.getRoles().subscribe((res) => {
       if(res.message == 'success'){ 
         res.data.forEach(result => {
          if(result.id != '1') {
            var roles = result.permisions.split(',');
            if(roles.includes("clinics")) 
              this.clinic.push(result.id.toString());
            if(roles.includes("roles")) 
              this.rolesusers.push(result.id.toString());
            if(roles.includes("paymentplans")) 
              this.paymentplans.push(result.id.toString());
            if(roles.includes("memberships")) 
              this.memberships.push(result.id.toString());
            if(roles.includes("defaulters")) 
              this.defaulters.push(result.id.toString());
            if(roles.includes("settings")) 
              this.profilesettings.push(result.id.toString());
          }
         });
       }
    }, error => {
    });

  }
}
