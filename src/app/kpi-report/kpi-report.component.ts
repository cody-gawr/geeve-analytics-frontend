import { Component, OnDestroy, OnInit,ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { KpiReportService } from './kpi-report.service';
import { CookieService } from "ngx-cookie";
import {  Router } from "@angular/router";
import { DatePipe, JsonPipe } from '@angular/common';
import { MatTabGroup } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-kpi-report',
  templateUrl: './kpi-report.component.html',
  styleUrls: ['./kpi-report.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class KpiReportComponent implements OnInit, OnDestroy {
	public user_type: any = '';
	public clinic_id: any = '';
	public clinicName: any = '';
	public selectedDay: string = new Date().getDate().toString();
	public selectedMonth: string = new Date().getMonth().toString();
  	public selectedYear: string = new Date().getFullYear().toString();

	constructor( private datepipe: DatePipe,
		private titleService:Title,public KpiReportService: KpiReportService,private _cookieService: CookieService, private router: Router) { 
		$('#title').html('KPI Report');
	console.log(this.selectedYear);
	}

  ngOnInit() {
  }

	ngOnDestroy() {
		this.titleService.setTitle("Jeeve Analytics");
	}  
	openLink(link){
		window.open(link,"_blank");
	}

	initiate_clinic() {
		this.user_type = this._cookieService.get("user_type");
		var val = $('#currentClinic').attr('cid');
		console.log(val);
		if (val != undefined && val != 'all') {
		  this.clinic_id = val;
	
		//   this.clinicianAnalysisService.getClinicSettings(this.clinic_id).subscribe((data: any) => {
		// 	if (data.message == 'success') {
		// 	  this.isEnablePO = (data.data.post_op_enable == 1) ? true : false;
		// 	  this.isEnableOR = (data.data.recall_enable == 1) ? true : false;
		// 	  this.isEnableTH = (data.data.tick_enable == 1) ? true : false;
		// 	  this.isEnableFT = (data.data.fta_enable == 1) ? true : false;
		// 	  this.isEnableUT = (data.data.uta_enable == 1) ? true : false;
		// 	}
		//   });
	
	
	
		}
	  }

	setDate(type) {
		if (type == 'add') {
			var setDate = new Date(parseInt(this.selectedYear) + 1, parseInt(this.selectedMonth), parseInt(this.selectedDay));
		 	this.selectedYear = this.datepipe.transform(setDate, 'yyyy');
		} else {
			var setDate = new Date(parseInt(this.selectedYear) - 1, parseInt(this.selectedMonth), parseInt(this.selectedDay));
		 	this.selectedYear = this.datepipe.transform(setDate, 'yyyy');
		}
	  }
}
