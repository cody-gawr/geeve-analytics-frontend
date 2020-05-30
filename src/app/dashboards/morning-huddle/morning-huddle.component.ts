import { Component, OnInit } from '@angular/core';
import { MorningHuddleService } from './morning-huddle.service';
import { CookieService } from "angular2-cookie/core";


@Component({
  selector: 'app-morning-huddle',
  templateUrl: './morning-huddle.component.html',
  styleUrls: ['./morning-huddle.component.css']
})
export class MorningHuddleComponent implements OnInit {
	public id:any = '';
  	public clinic_id:any = '';
  	public user_type:any = '';
    public production:any = '';
    public recallRate:any = '';
    public treatmentRate:any = '';
    public dentistList:any = [];
    public previousDays:any = 1;

  constructor(private morningHuddleService: MorningHuddleService, private _cookieService: CookieService) { 
  }
 ngOnInit(){
    this.user_type = this._cookieService.get("user_type");
     this.initiate_clinic();
 }


  initiate_clinic() {
    $('.external_clinic').show();
    $('.dentist_dropdown').hide();
    $('.header_filters').addClass('flex_direct_mar');
    $('.header_filters').removeClass('hide_header');
    var val = $('#currentClinic').attr('cid');
    if(val != undefined && val !='all') {
      this.clinic_id = val;
    } 
    if(typeof($('#setPreviousDay').val()) != 'undefined' ){
      this.previousDays = parseInt($.trim($('#setPreviousDay').val()));
    }
   	this.getDentistPerformance();
  	this.getRecallRate();
    this.getTreatmentRate();
    this.getDentistList();
  }
  getDentistPerformance(){
  	this.morningHuddleService.dentistProduction( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production) => {
  		if(production.status){
        this.production = production.data;
  		}
  	});	
  }

  getRecallRate(){
  	this.morningHuddleService.recallRate( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((recallRate) => {
  		if(recallRate.status){
        this.recallRate = recallRate.data;
  		}
  	});	
  }

  getTreatmentRate(){
    this.morningHuddleService.rebookTreatmentRate( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((treatmentRate) => {
      if(treatmentRate.status){
         this.treatmentRate = treatmentRate.data;
      }
    }); 
  }

 getDentistList(){
    this.morningHuddleService.dentistList( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((list) => {
      if(list.status){
        this.dentistList = list.data;
      }
    }); 
  }

  getdifference (a, b) { 
    return Math.abs(a - b); 
  }

  getFirstLetter(str){
    if(str.toLowerCase().indexOf("dr ") == 0){
      str = str.slice(3);
    }
    var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
    return matches.join('')
  }

}

