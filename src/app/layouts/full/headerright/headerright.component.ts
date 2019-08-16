import { Component, AfterViewInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CookieService } from "angular2-cookie/core";

import { Router } from '@angular/router';
import { HeaderService } from '../header/header.service';
import { DentistService } from '../../../dentist/dentist.service';
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
  constructor(private _cookieService: CookieService,  private route: Router, private headerService: HeaderService, private dentistService: DentistService) {}

 ngAfterViewInit() {
    this.clinic_id = '1';
     this.getClinics();
        this.getDentists(); 
      
  }
  public title;
   public clinicsData:any[] = [];
  public config: PerfectScrollbarConfigInterface = {};
     public clinic_id:any ={};
   public dentistCount:any ={};
   public selectedDentist='all';
     dentists: Dentist[] = [
   { providerId: 'all', name: 'All Dentists' },
  ];
   private warningMessage: string;
   public finalUrl:string;
   private getClinics() { 
  this.headerService.getClinics().subscribe((res) => {
       if(res.message == 'success'){
        this.clinicsData = res.data;
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
  //this.location.go(this.finalUrl+value);
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
}
