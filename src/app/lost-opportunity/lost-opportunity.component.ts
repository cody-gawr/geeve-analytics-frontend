import { Component, OnDestroy, OnInit,ViewEncapsulation } from '@angular/core';
import { LostOpportunityService } from './lost-opportunity.service';
import { CookieService } from "ngx-cookie";
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { HeaderService } from './../layouts/full/header/header.service';
import { ITooltipData } from '../shared/tooltip/tooltip.directive';
import { AppConstants } from '../app.constants';
import { ChartstipsService } from '../shared/chartstips.service';
@Component({
  selector: 'app-lost-opportunity',
  templateUrl: './lost-opportunity.component.html',
  styleUrls: ['./lost-opportunity.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LostOpportunityComponent implements OnInit, OnDestroy {	
	public clinic_id:any = '';
	public improvement:number = 0;
	public isLoading: boolean = true;
	public discounts:number = 0;
	public discountsReal:number = 0;
	public discountsImp:number = 0;
	public collectionProduction:number = 0;
	public collectionProductionReal:number = 0;
	public collectionProductionImp:number = 0;

	public caseAcceptance:number = 0;
	public caseAcceptanceReal:number = 0;
	public caseAcceptanceImp:number = 0;

	public lostOpportunity:number = 0;
	public lostOpportunityReal:number = 0;
	public production:number = 0;
	public productionReal:number = 0;
	public productionImp:number = 0;
	public charTips:any = [];
	constructor(
		public lostOpportunityService: LostOpportunityService, 
		private _cookieService: CookieService,
		private router: Router,
		private toastr: ToastrService,
		private headerService: HeaderService,
		public constants: AppConstants,
		public chartstipsService: ChartstipsService
		) { 
		this.getChartsTips();
	}

  	ngOnInit() {
  		  $('#currentDentist').attr('did','all');

  		 //this.initiate_clinic();
			//$('.dentist_dropdown').parent().hide(); // added
			$('.sa_heading_bar').addClass("filter_single"); // added
  	}


	ngOnDestroy() {
		//$('.dentist_dropdown').parent().show(); // added
		$('.sa_heading_bar').removeClass("filter_single"); // added
	}

  	initiate_clinic() {
	    $('.external_clinic').show();
	    //$('.dentist_dropdown').hide();
	    $('.header_filters').addClass('flex_direct_mar');
	    $('.header_filters').removeClass('hide_header');
	    var val = $('#currentClinic').attr('cid');
	    if(val != undefined && val !='all') {
	      this.clinic_id = val;
	    }
	    this.lostOpportunityData();
	     $('#title').html('Lost Opportunity');
	}


	lostOpportunityData(){
		this.isLoading = true;
		this.lostOpportunityService.dentistProduction(this.clinic_id).subscribe( (data:any) => {
			if(data.status){
				this.discounts = data.data.discounts;
				this.discountsReal = this.discounts;
				this.collectionProduction = data.data.collectionProduction;
				this.collectionProductionReal = this.collectionProduction;
				this.caseAcceptance = data.data.caseAcceptance;
				this.caseAcceptanceReal = this.caseAcceptance;
				this.production = data.data.production;
				this.productionReal = this.production;
				this.lostOpportunity =  (this.discounts + this.collectionProduction + this.caseAcceptance );
				this.lostOpportunityReal =  this.lostOpportunity
				this.productionImp = 0;
				this.improvement = 0;
				var self = this;
				setTimeout(function(){
					self.isLoading = false;
				},500);
			}
		}, error => {
     		alert('Something Went Wrong.');
    	});
	}

  	sliderOnChange(value: number) {
	  if (this.improvement !== value) {	  	
	    	this.improvement = value ;	    		    
	    	this.discountsImp =  this.countDiscount(this.discountsReal,value);
	    	this.discounts = Math.round(this.discountsReal - this.discountsImp );    	

	    	this.collectionProductionImp =  this.countDiscount(this.collectionProductionReal,value);
	    	this.collectionProduction = Math.round(this.collectionProductionReal - this.collectionProductionImp );

	    	this.caseAcceptanceImp =  this.countDiscount(this.caseAcceptanceReal,value);
	    	this.caseAcceptance = Math.round(this.caseAcceptanceReal - this.caseAcceptanceImp ); 

	    	var tempLO =  this.countDiscount(this.lostOpportunityReal,value);
	    	this.lostOpportunity = Math.round(this.lostOpportunityReal - tempLO );    	
	    	this.production = Math.round(this.productionReal + tempLO );    	
	    	this.productionImp = Math.round(this.productionReal - this.production ) * -1;    	
	    }
	}


	countDiscount(amount, discount){
		return Math.round(( amount * discount ) / 100);  	
	}
	 getChartsTips() {
    this.chartstipsService.getCharts(8).subscribe((data) => {
       if(data.message == 'success'){         
        this.charTips = data.data;
       }
    }, error => {});
  }
}
