import { Component, AfterViewInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CookieService,  CookieOptions  } from "ngx-cookie";

import { Router, NavigationEnd } from '@angular/router';
import { HeaderService } from '../header/header.service';
import { DentistService } from '../../../dentist/dentist.service';
import { Subscription } from 'rxjs/Subscription';
import { UserIdleService } from 'angular-user-idle';
import { AppConstants } from '../../../app.constants';
 import { RolesUsersService } from '../../../roles-users/roles-users.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';  
export interface Dentist {
  providerId: string;
  name: string;
}

@Component({
  selector: 'app-headerright',
  templateUrl: './headerright.component.html',
  styleUrls: []
})
export class AppHeaderrightComponent implements AfterViewInit  {   
  private _routerSub = Subscription.EMPTY;
  providerIdDentist;
  isToggleDentistChart:string;
  user_type_dentist; 
  showCompare:boolean = false;
  showDropDown:boolean = false;
  classUrl:string = '';
  constructor(private _cookieService: CookieService,private rolesUsersService: RolesUsersService, private headerService: HeaderService, private  dentistService: DentistService,private router: Router, private userIdle: UserIdleService,public constants: AppConstants) {
    this.getRoles();
      this.user_type_dentist = this._cookieService.get("user_type");
      this._routerSub = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((value) => {
            this.route = router.url; 
            if(this.route == '/dashboards/cliniciananalysis'){
              this.showCompare = true;
            } else {
              this.showCompare = false;
            }

            if(this.route == '/dashboards/cliniciananalysis' || this.route == '/dashboards/clinicianproceedures'  ){
              this.showDropDown = true;
            } else {
              this.showDropDown = false;
            }

            if(this.route.includes('/')){
              var urlParams = this.route.split("/");
              if(typeof(urlParams[3]) != 'undefined'){
                this.classUrl = urlParams[3];
              } else if(typeof(urlParams[2]) != 'undefined'){
                this.classUrl = urlParams[2];
              } else  if(typeof(urlParams[1]) != 'undefined'){
                this.classUrl = urlParams[1];
              } else if(typeof(urlParams[0]) != 'undefined'){
                this.classUrl = urlParams[0];
              }             
            }
            this.getClinics();
           // this.getDentists();
          // if($('#currentClinic').attr('cid') == 'all' && this.route != '/dashboards/healthscreen')
          // { 
          //}
    });
  }

  async getRoles() {      
   await this.rolesUsersService.getRolesIndividual().subscribe((res) => {
      if(res.message == 'success')
      { 
        this.user_type_dentist = res.type;
        let opts = this.constants.cookieOpt as CookieOptions;
        this._cookieService.put("user_type",res.type, opts);      
      }
    }, error => {
    });
  }
 ngOnDestroy(){
     this._routerSub.unsubscribe();
   }
 ngAfterViewInit() {
    //  this.clinic_id = '1';
    //this.getClinics();
    //Start watching for user inactivity.
    this.userIdle.startWatching();    
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => {});    
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      this.userIdle.stopTimer();
      this._cookieService.removeAll();
      this.router.navigateByUrl('/login');
    });

  }

  toggler(){
    if(this._cookieService.get("dentist_toggle")){
      this.isToggleDentistChart = this._cookieService.get("dentist_toggle");
    }  
    let opts = this.constants.cookieOpt as CookieOptions;
    this.isToggleDentistChart = (this.isToggleDentistChart=='true')? "false" : "true";
    this._cookieService.put("dentist_toggle", this.isToggleDentistChart, opts);
    $('#clinic_initiate').click();
  }
  
  public route:any;
  public title;
   public clinicsData:any[] = [];
    public config: PerfectScrollbarConfigInterface = {};
    public clinic_id:any;
    public dentistCount:any ={};
    dentists: Dentist[] = [];
   private warningMessage: string;
   public finalUrl:string;
   public selectedClinic;
   public selectedDentist;
    public placeHolder='';
   public showAll:boolean = true;

   private getClinics() { 
    this.headerService.getClinics().subscribe((res) => {
      if(res.message == 'success'){
        this.clinicsData = res.data;
        if(res.data.length>0) {
          if(this.route == '/dashboards/healthscreen'){
            if(this.clinicsData.length>1) {
              this.clinic_id ='all';
              this.selectedClinic ='all';
              this.placeHolder ='All Clinics';
            } else {
              this.clinic_id = res.data[0].id;
              this.selectedClinic = res.data[0].id;
              this.placeHolder =res.data[0].clinicName;
            }
          } else   {
            if(this._cookieService.get("clinic_dentist")){
              let dentistclinic = this._cookieService.get("clinic_dentist").split('_');
              this.clinic_id = dentistclinic[0];
              this.selectedClinic = dentistclinic[0];
              if(dentistclinic[1] == 'all'){
                this.selectedDentist = dentistclinic[1];
              }else{
                this.selectedDentist = parseInt(dentistclinic[1]);
              }
              
              res.data.forEach((datatemp) => {
                if(datatemp.id == this.clinic_id){
                  this.placeHolder =datatemp.clinicName;
                }
              });
              
            }else{
              this.clinic_id = res.data[0].id;
              this.selectedClinic = res.data[0].id;
              this.placeHolder =res.data[0].clinicName;
              
            }
          }
          this.title = $('#page_title').val();
          this.loadClinic(this.selectedClinic);
        }
      } else if(res.status == '401'){
        this._cookieService.removeAll();
        this.router.navigateByUrl('/login');
      }
    }, (error) => {
        if(error.status == 401){
          this._cookieService.removeAll();
          this.router.navigateByUrl('/login');
        }
        
    });
  }

 
    // Get Dentist
    getDentists() {
      if(this.clinic_id == 'all'){
        return false;
      }
      this.dentists = [];
      this.clinic_id && this.dentistService.getDentists(this.clinic_id).subscribe((res) => {
          this.showAll = true;
           if(res.message == 'success'){
              res.data.forEach((data) => {
                if(data.is_active == 1){
                  this.dentists.push(data);
                }
              });/*
              this.dentists= res.data;*/
              this.dentistCount= this.dentists;
              if(this.route != '/dentist-goals'){

                if(this._cookieService.get("clinic_dentist")){
                  let dentistclinic = this._cookieService.get("clinic_dentist").split('_');
                  if(dentistclinic[1] == 'all'){
                    this.selectedDentist =dentistclinic[1];
                  }else{
                    this.selectedDentist = parseInt(dentistclinic[1]);
                  }
                
                }else{ 
                  this.selectedDentist = 'all';
                }
              } else {
                this.showAll = false;
                this.selectedDentist = res.data[0].providerId;
              }

               if(this.route == '/dashboards/cliniciananalysis' || this.route == '/dashboards/clinicianproceedures'|| this.route == '/dashboards/frontdesk' || this.route == '/dashboards/marketing' || this.route == '/dashboards/finances' || this.route == '/morning-huddle'|| this.route == '/followups' || this.route == '/dashboards/followups'){
                let opts = this.constants.cookieOpt as CookieOptions;
                 this._cookieService.put("clinic_dentist",this.clinic_id+'_'+this.selectedDentist, opts);
               }
           } else if(res.status == '401'){
             this._cookieService.removeAll();
              this.router.navigateByUrl('/login');
           }
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        }    
        );
  }

  loadClinic(newValue) { 
    if(newValue != 'undefined') {
      if($('body').find('span#currentClinic').length <= 0){
        $('body').append('<span id="currentClinic" style="display:none" cid="'+newValue+'"></span>');
      } else {
        $('#currentClinic').attr('cid',newValue);
      }
      this.selectedClinic = newValue;
      this.clinic_id = this.selectedClinic;
      
      this.getDentists(); 
      $('.internal_clinic').val(newValue);
      if(this.user_type_dentist != '2' && newValue != 'all'){
        this.getChildID(newValue); 
      }
      else{
      $('#clinic_initiate').click();
      if(this._cookieService.get("clinic_dentist")){
        let dentistclinic = this._cookieService.get("clinic_dentist").split('_');
        if(dentistclinic[0] !== newValue){
          this.selectedDentist = 'all';
        }else{
          if(dentistclinic[1] == 'all'){
            this.selectedDentist =dentistclinic[1];
          }else{
            this.selectedDentist = parseInt(dentistclinic[1]);
          }
        }
        }else{
          this.selectedDentist ='all';
        }        
        this.loadDentist(this.selectedDentist);
      }    
    }
 }
  
  async getChildID(clinic_id) {
    this.clinic_id && this.dentistService.getChildID(clinic_id).subscribe((res) => {
      let opts = this.constants.cookieOpt as CookieOptions;
     this._cookieService.put("dentistid", res.data, opts);
      this.providerIdDentist = res.data;
      $('#clinic_initiate').click();
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }
  
  loadDentist(newValue){ 
    if(this._cookieService.get("clinic_dentist")){
      let dentistclinic = this._cookieService.get("clinic_dentist").split('_');
                  if(dentistclinic[1] == 'all'){
                    this.selectedDentist =dentistclinic[1];
                  }else{
                    this.selectedDentist = parseInt(dentistclinic[1]);
                  }
                  if(newValue == null && newValue !== this.selectedDentist){
                    newValue = this.selectedDentist;
                  }
      }
      
    if($('body').find('span#currentDentist').length <= 0){
    $('body').append('<span id="currentDentist" style="display:none" did="'+newValue+'"></span>');
  }
  else{
    $('#currentDentist').attr('did',newValue);
  }
    this.selectedDentist = newValue;
    if(this.route == '/dashboards/cliniciananalysis' || this.route == '/dashboards/clinicianproceedures'|| this.route == '/dashboards/frontdesk' || this.route == '/dashboards/marketing' || this.route == '/dashboards/finances'){
      let opts = this.constants.cookieOpt as CookieOptions;
      this._cookieService.put("clinic_dentist",this.clinic_id+'_'+this.selectedDentist,opts);
    }
    $('.internal_dentist').val(newValue);
    $('#dentist_initiate').click();
  }
  
}
