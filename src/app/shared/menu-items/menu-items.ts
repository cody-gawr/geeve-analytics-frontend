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
import { ActivatedRoute, Router , NavigationEnd } from "@angular/router";
import { Http, Headers, RequestOptions } from '@angular/http';
import { CookieService } from "angular2-cookie/core";
import { BaseChartDirective } from 'ng2-charts';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';  
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
    role:['2'],
    param2 : 'dashboards',
  },{
    state: 'lost-opportunity',
    name: 'Lost Opportunity',
    type: 'link-lost-opportunity',
    icon: 'fas fa-arrow-up',
    role:['2'],
    param2 : '',
  },
   {
    state: 'morning-huddle',
    name: 'Morning Huddle',
    type: 'link-morning-huddle',
    icon: 'fas fa-sun',
    role:['2'],
    param2 : '',
  },
  {
    state: 'dashboards',
    name: 'Dashboards',
    type: 'sub-dashboards',
    icon: 'fas fa-chart-area',
    children: [
      { state: 'cliniciananalysis', name: 'Clinician Analysis', type: 'link'},
      { state: 'clinicianproceedures', name: 'Clinician Procedures & Referrals', type: 'link'},
      { state: 'frontdesk', name: 'Front Desk', type: 'link'}, 
      { state: 'marketing', name: 'Marketing', type: 'link'}, 
      { state: 'finances', name: 'Finances', type: 'link' , icon: ''}
    ],
    param: '1'
  },  
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
    name: 'Subscription Plans',
    type: 'link-noparam',
    icon: 'fas fa-receipt',
    role:['1']

  },
  {
    state: 'roles-users',
    name: 'Roles Management',
    type: 'link',
    icon: 'fas fa-user-tag',
    role:['2']

  },
  {
    state: '',
    name: 'Goals',
    type: 'sub-child',
    icon: 'fas fa-cog',
    children: [
      { state: 'clinic-goals', name: 'Clinic Goals', type: 'link'},
      { state: 'dentist-goals', name: 'Dentist Goals', type: 'link' }

    ],
    role:['1','2']
  },
  {
    state: 'profile-settings',
    name: 'Profile Settings',
    type: 'link',
    icon: 'fas fa-user-cog',
    role:['1','2']

  },
  
];

@Injectable()
export class MenuItems {
      private _routerSub = Subscription.EMPTY;
  constructor(private rolesUsersService: RolesUsersService, private router: Router) {
   this._routerSub = this.router.events
         .filter(event => event instanceof NavigationEnd)
         .subscribe((value) => {
    this.getRoles();
    });
  }
  getMenuitem(): Menu[] {
    return this.menu;
  }
  public MENUITEMS;
  public dashboard1role=['1','2'];
 public dashboard2role=['1','2'];
 public dashboard3role=['1','2'];
 public dashboard4role=['1','2'];
 public dashboard5role=['1','2'];
 public healthscreenrole=['1','2'];
 public morninghuddlerole=['1','2'];
 public lostoppurtunityrole=['1','2'];
 public clinicsrole=['1','2'];
 public usersrole=['1','2'];
 public profilesettingsrole=['1','2'];
  public menu = [
  {
    state: 'healthscreen',
    name: 'Clinic Health',
    type: 'link-healthscreen',
    icon: 'fas fa-clinic-medical',
    role:this.healthscreenrole,
    param2 : 'dashboards',
  },
  {
    state: 'morning-huddle',
    name: 'Morning Huddle',
    type: 'link-morning-huddle',
    icon: 'fas fa-coffee',
    role:this.morninghuddlerole,
     param2 : '',
  },
  {
    state: 'lost-opportunity',
    name: 'Lost Opportunity',
    type: 'link-lost-opportunity',
    icon: 'fas fa-briefcase',
    role:this.lostoppurtunityrole,
    param2 : '',
  }, 
  {
    state: 'dashboards',
    name: 'Dashboards',
    type: 'sub-dashboards',
    icon: 'fas fa-chart-area',
    children: [
      { state: 'cliniciananalysis', name: 'Clinician Analysis', type: 'link', role:this.dashboard1role},
      { state: 'clinicianproceedures', name: 'Clinician Procedures & Referrals', type: 'link', role:this.dashboard2role},
      { state: 'frontdesk', name: 'Front Desk', type: 'link', role:this.dashboard3role}, 
      { state: 'marketing', name: 'Marketing', type: 'link', role:this.dashboard4role}, 
      { state: 'finances', name: 'Finances', type: 'link' , icon: '', role:this.dashboard5role}
    ],
    role:['2','3','4','5']

  },
  {
    state: 'Settings',
    name: 'Settings',
    type: 'sub-child',
    icon: 'fas fa-cog',
    children: [
      { state: 'clinic', name: 'Clinics', type: 'link',role:this.profilesettingsrole},
      { state: 'roles-users', name: 'Users', type: 'link',role:this.profilesettingsrole},
      { state: 'profile-settings', name: 'Profile Settings', type: 'link',role:['2','3','4','5']},
    ],
    role:['2','3','4','5']

   },  
];
  getRoles() {      
   this.rolesUsersService.getRoles().subscribe((res) => {
       if(res.message == 'success'){ 
         res.data.forEach(result => {
            var dashboards = result.permisions.split(',');
            if(dashboards.includes("dashboard1")) 
              this.dashboard1role.push(result.role_id.toString());
            if(dashboards.includes("dashboard2")) 
              this.dashboard2role.push(result.role_id.toString());
            if(dashboards.includes("dashboard3")) 
              this.dashboard3role.push(result.role_id.toString());
            if(dashboards.includes("dashboard4")) 
              this.dashboard4role.push(result.role_id.toString());
            if(dashboards.includes("dashboard5")) 
              this.dashboard5role.push(result.role_id.toString());
            if(dashboards.includes("healthscreen")) 
              this.healthscreenrole.push(result.role_id.toString());
            if(dashboards.includes("morninghuddle")) 
              this.morninghuddlerole.push(result.role_id.toString());
            if(dashboards.includes("lostoppurtunity")) 
              this.lostoppurtunityrole.push(result.role_id.toString());
            if(dashboards.includes("profilesettings")) 
              this.profilesettingsrole.push(result.role_id.toString());

         });
       }
    }, error => {
    });
  }
}
