import { Component, AfterViewInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CookieService } from "angular2-cookie/core";

import { Router, NavigationEnd } from '@angular/router';
import { HeaderService } from '../header/header.service';
import { DentistService } from '../../../dentist/dentist.service';
import { Subscription } from 'rxjs/Subscription';
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
  constructor(private _cookieService: CookieService, private headerService: HeaderService, private  dentistService: DentistService,private router: Router) {
    

    this._routerSub = this.router.events
         .filter(event => event instanceof NavigationEnd)
         .subscribe((value) => {
       this.route = router.url; 
       if($('#currentClinic').attr('cid') == 'all' && this.route != '/dashboards/healthscreen')
       { 
        this.getClinics();
      }
      if(($('body').find('span#currentDentist').length >= 0 || $('#currentDentist').attr('did') == 'all') && this.route == '/dentist-goals')
       { 
        this.getDentists();
      }
        });
  }
 ngOnDestroy(){
     this._routerSub.unsubscribe();
   }
 ngAfterViewInit() {
  //  this.clinic_id = '1';
     this.getClinics();
      
  }
  public route:any;
  public title;
   public clinicsData:any[] = [];
  public config: PerfectScrollbarConfigInterface = {};
     public clinic_id:any ={};
   public dentistCount:any ={};
     dentists: Dentist[] = [
   { providerId: 'all', name: 'All Dentists' },
  ];
   private warningMessage: string;
   public finalUrl:string;
   public selectedClinic;
   private getClinics() { 
  this.headerService.getClinics().subscribe((res) => {
       if(res.message == 'success'){
        this.clinicsData = res.data;
        if(res.data.length>0) {
        if(this.route == '/dashboards/healthscreen'){
          this.clinic_id ='all';
          this.selectedClinic ='all';
        }
        else  
        {
          this.clinic_id = res.data[0].id;
          this.selectedClinic = res.data[0].id;
        }

        this.title = $('#page_title').val();
        this.loadClinic(this.selectedClinic);
    }
       }
        else if(res.status == '401'){
            this._cookieService.put("username",'');
            this._cookieService.put("email", '');
            this._cookieService.put("token", '');
            this._cookieService.put("userid", '');
            this.router.navigateByUrl('/login');
           }
    }, error => {
     // this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );

  }
  public selectedDentist;
    // Get Dentist
    getDentists() {
      this.dentistService.getDentists(this.clinic_id).subscribe((res) => {
           if(res.message == 'success'){
              this.dentists= res.data;
              this.dentistCount= res.data.length;
        if(this.route != '/dentist-goals'){
          this.selectedDentist ='all';
        }
        else  
        {
          this.selectedDentist = res.data[0].providerId;
        }
           }
            else if(res.status == '401'){
            this._cookieService.put("username",'');
              this._cookieService.put("email", '');
              this._cookieService.put("token", '');
              this._cookieService.put("userid", '');
               this.router.navigateByUrl('/login');
           }
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        }    
        );
  }
 private loadClinic(newValue) {
 if(newValue != 'undefined') {
 if($('body').find('span#currentClinic').length <= 0){
    $('body').append('<span id="currentClinic" style="display:none" cid="'+newValue+'"></span>');
  }
  else{
    $('#currentClinic').attr('cid',newValue);
  }
    this.selectedClinic = newValue;
    this.clinic_id = this.selectedClinic;
    this.getDentists(); 
    $('.internal_clinic').val(newValue);
    $('#clinic_initiate').click();
  }
 }

  
  loadDentist(newValue){
    if($('body').find('span#currentDentist').length <= 0){
    $('body').append('<span id="currentDentist" style="display:none" did="'+newValue+'"></span>');
  }
  else{
    $('#currentDentist').attr('did',newValue);
  }
    this.selectedDentist = newValue;
    $('.internal_dentist').val(newValue);
    $('#dentist_initiate').click();
  }
  
}
