import { Component, AfterViewInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CookieService } from "angular2-cookie/core";

import { Router   , NavigationEnd } from '@angular/router';
import { HeaderService } from '../header/header.service';
import { DentistService } from '../../../dentist/dentist.service';
import { first, take } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
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
  constructor(private _cookieService: CookieService,  private router: Router, private headerService: HeaderService, private dentistService: DentistService) {
   
    this._routerSub = this.router.events
         .filter(event => event instanceof NavigationEnd)
         .subscribe((value) => {
          this.route = router.url; 
          if(this.route != '/login')
       {
       this.getClinics();
     }
    });
  
  }


ngOnInit() {
   
}
 ngAfterViewInit() {
    this.clinic_id = '1';
    
    // this.getDentists(); 
      
  }
public route:any;
   public title;
   public clinicsData:any[] = [];
   public clinicdef:any[] = [];
   public config: PerfectScrollbarConfigInterface = {};
   public clinic_id:any ={};
   public dentistCount:any ={};
   public selectedDentist='all';
   public selectedClinic;

  dentists: Dentist[] = [
   { providerId: 'all', name: 'All Dentists' },
  ];

   private warningMessage: string;
   public finalUrl:string;

//this.setClinic();


   private getClinics() { 
    console.log('headerright');
  this.headerService.getClinics().pipe(take(1)).subscribe((res) => {
       if(res.message == 'success'){
        if(res.data.length > 0) {
        this.clinicsData = res.data;                               
        if($('body').find('span#currentClinicid').length > 0 && $('#currentClinicid').attr('cid')){ 
          this.selectedClinic = parseInt($('#currentClinicid').attr('cid'));
        }else{
         this.selectedClinic = res.data[0].id;   
        }
      }
        this.loadClinicid(this.selectedClinic);
        //this._cookieService.set('clinicSelected',this.selectedClinic);

          this.title = $('#page_title').val();
       }
    }, error => {
     // this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );

  }
    // Get Dentist
    getDentists() {
      this.dentistService.getDentists(this.clinic_id).subscribe((res) => {
           if(res.message == 'success'){
              this.dentists= res.data;
              this.dentistCount= res.data.length;

           }
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        }    
        );
  }
  
 private loadClinic(value) {
  this.finalUrl =this.route.url.substring(0, this.route.url.lastIndexOf('/') + 1);
  this.route.navigate([this.finalUrl+value]);
 }
/*  logout() {
      this.headerrightService.logout(this._cookieService.get("userid")).subscribe((res) => {
       console.log(res);
       if(res.message == 'success'){
        this._cookieService.put("username",'');
        this._cookieService.put("email", '');
        this._cookieService.put("token", '');
        this._cookieService.put("userid", '');

        this.router.navigate(['/login']);
       }
    }, error => {
    }    
    );
  }*/
  
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

  loadClinicid(clinicValue){
  if($('body').find('span#currentClinicid').length <= 0){ 
    $('body').append('<span id="currentClinicid" style="display:none" cid="'+clinicValue+'"></span>');
  //  this._cookieService.put('clinicSelected',clinicValue);
  }
  else{
    $('#currentClinicid').attr('cid',clinicValue);
  }
   this.selectedClinic = clinicValue;

 $('.internal_clinic').val(clinicValue);
  $('#clinic_initiate:first').click();

   this.getStripeDetail();

  }

  getStripeDetail(){
 this.headerService.getStripeDetail(this.selectedClinic).subscribe((res) => {
       if(res.message == 'success'){
          if(res.data[0].stripe_account_id){
            $('.notification-box').hide();
            $('body').removeClass('notification-box-main');           

          }
          else{
            $('.notification-box').show(); 
            $('body').addClass('notification-box-main');  
            $('.notification-box a').attr('href','/clinic-settings/'+this.selectedClinic); 
                     
          }
       }
    }, error => {
     // this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );
  }
}
