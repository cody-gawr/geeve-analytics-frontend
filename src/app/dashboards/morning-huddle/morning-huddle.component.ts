import { Component, OnInit } from '@angular/core';
import { MorningHuddleService } from './morning-huddle.service';
import { CookieService } from "angular2-cookie/core";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {name: '', production: '', recall: '', treatment:''},
];
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

  displayedColumns: string[] = ['name', 'production', 'recall', 'treatment'];
  dataSource = ELEMENT_DATA;
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
  
    if(typeof($('#setPreviousDay').val()) != 'undefined' && $('#setPreviousDay').val() != 'NaN' ) {
      this.previousDays = parseInt($.trim($('#setPreviousDay').val()));
    }
    this.getDentistPerformance();
    this.getRecallRate();
    this.getTreatmentRate();
    this.getDentistList();
  }

  getDentistPerformance(){
  	this.morningHuddleService.dentistProduction( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((production:any) => {
  		if(production.status == true) {
        this.production = production.data;
  		}
  	});	
  }


  getRecallRate(){
  	this.morningHuddleService.recallRate( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((recallRate:any) => {
  		if(recallRate.status == true){
        this.recallRate = recallRate.data;
  		}
  	});	
  }

  getTreatmentRate(){
    this.morningHuddleService.rebookTreatmentRate( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((treatmentRate:any) => {
      if(treatmentRate.status == true){
         this.treatmentRate = treatmentRate.data;
      }
    }); 
  }


 getDentistList(){
    this.morningHuddleService.dentistList( this.clinic_id, this.previousDays,  this.user_type  ).subscribe((list:any) => {
      if(list.status == true){
        this.dentistList = list.data;
        console.log(this.dentistList);
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


