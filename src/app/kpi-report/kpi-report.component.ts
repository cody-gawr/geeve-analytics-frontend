 import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { KpiReportService } from './kpi-report.service';
import { CookieOptions, CookieService } from "ngx-cookie";
import { Router } from "@angular/router";
import { DatePipe, JsonPipe } from '@angular/common';
import { MatLegacyTabGroup as MatTabGroup } from '@angular/material/legacy-tabs';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator'
import { ToastrService } from 'ngx-toastr';
import { DentistService } from '../dentist/dentist.service';
import { AppConstants } from '../app.constants';
export interface Dentist {
	providerId: string;
	name: string;
}
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
	public Cconsultant: any = '';
	public selectedDay: string = new Date().getDate().toString();
	public selectedMonth: any = '';
	public selectedYear: any = '';
	public selectedMonthYear: any = '';
	public selectedMonthRange: any = '';
	private warningMessage: string;
	public selectedDentist;
	public childid: string = '';
	public startDate: any = '';
	public endDate: any = '';
	public range: any = [];
	public monthrange: any = [];
	public showAll: boolean = true;
	public dentistCount: any = {};
	dentists: Dentist[] = [
		{ providerId: 'all', name: 'All Dentists' },
	];

	constructor(private datepipe: DatePipe,
		private titleService: Title, private dentistService: DentistService, public KpiReportService: KpiReportService, private _cookieService: CookieService, private toastr: ToastrService, private router: Router, public constants: AppConstants) {
		$('#title').html('Prime KPI Report');
		// this.selectedMonthYear = this.datepipe.transform(new Date(), 'MMMM-yyyy');
		this.selectedMonthYear = this.datepipe.transform(new Date(), 'yyyy-MM-dd 00:00:00').replace(/\s/, 'T');
			
		this.range.push(this.selectedMonthYear);
		for (var i = 1; i < 20; i++) {
			// let todaysDate = new Date('01' + this.selectedMonthYear);
			let todaysDate = new Date(this.selectedMonthYear);
			todaysDate.setDate(1);

			// let selectedDate = new Date('01' + this.selectedMonthYear);
			let selectedDate = new Date(this.selectedMonthYear);
			selectedDate.setDate(1);

			selectedDate.setMonth(todaysDate.getMonth() - 1);
			// this.selectedMonthYear = this.datepipe.transform(selectedDate, 'MMMM-yyyy');
			this.selectedMonthYear = this.datepipe.transform(selectedDate, 'yyyy-MM-dd 00:00:00').replace(/\s/, 'T');

			this.range.push(this.selectedMonthYear);
		}
		// this.selectedMonthYear = this.datepipe.transform(new Date(), 'MMMM-yyyy');
		this.selectedMonthYear = this.datepipe.transform(new Date(), 'yyyy-MM-dd 00:00:00').replace(/\s/, 'T');

		for (var i = 0; i < 12; i++) {
			this.monthrange.push(i);
		}
		this.selectedMonthRange = 3;
	}

	ngOnInit() {
		$('.header_filters').removeClass('hide_header');
		$('.header_filters').removeClass('flex_direct_mar ');
	}

	ngOnDestroy() {
		this.titleService.setTitle("Jeeve Analytics");
	}
	openLink(link) {
		window.open(link, "_blank");
	}

	initiate_clinic() {
		this.user_type = this._cookieService.get("user_type");
		var val = $('#currentClinic').attr('cid');
		$('.header_filters').addClass('flex_direct_mar');
		if (this._cookieService.get("dentistid")) {
			this.childid = this._cookieService.get("dentistid");
		//	this.selectedDentist = this._cookieService.get("dentistid");
		}
		if (val != undefined && val != 'all') {
			this.clinic_id = val;
			this.getDentists();
			this.selectedDentist = 'all';
			this.KpiReportService.getClinicSettings(this.clinic_id).subscribe((res) => {
				if (res.status == 200) {
					this.Cconsultant = res.body.data[0]['consultant'];
					if (this.Cconsultant == 'prime') {
						$("#kpireport").removeClass('consult');
						$("#notAuth").addClass('consult');
						$('.prime-logo').removeClass('displogo');
						this.filterDate();
					} else {
						$("#kpireport").addClass('consult');
						$("#notAuth").removeClass('consult');
						$('.prime-logo').addClass('displogo');
					}
				}
				else if (res.status == 401) {
					this.handleUnAuthorization();
				}
			}, error => {
				console.log('error', error)
			});


		}
	}
	initiate_dentist() {
		var val = $('#currentDentist').attr('did');
		this.loadDentist(val);
		if (this.Cconsultant == 'prime') {
			this.filterDate();
		}

	}

	loadDentist(newValue) {
		// if (this._cookieService.get("clinic_dentist")) {
		// 	let dentistclinic = this._cookieService.get("clinic_dentist").split('_');
		// 	if (dentistclinic[1] == "all") {
		// 		this.selectedDentist = dentistclinic[1];
		// 	} else {
		// 		this.selectedDentist = parseInt(dentistclinic[1]);
		// 	}
		// 	if (newValue == null && newValue !== this.selectedDentist) {
		// 		newValue = this.selectedDentist;
		// 	}
		// }

		// if ($("body").find("span#currentDentist").length <= 0) {
		// 	$("body").append(
		// 		'<span id="currentDentist" style="display:none" did="' +
		// 		newValue +
		// 		'"></span>'
		// 	);
		// } else {
		// 	$("#currentDentist").attr("did", newValue);
		// }
		this.selectedDentist = newValue;
		// if (
		// 	this.route == "/dashboards/cliniciananalysis" ||
		// 	this.route == "/dashboards/clinicianproceedures" ||
		// 	this.route == "/dashboards/frontdesk" ||
		// 	this.route == "/dashboards/marketing" ||
		// 	this.route == "/kpi-report" ||

		// 	this.route == "/dashboards/finances"
		// ) {
		// 	let opts = this.constants.cookieOpt as CookieOptions;
		// 	this._cookieService.put(
		// 		"clinic_dentist",
		// 		this.clinic_id + "_" + this.selectedDentist,
		// 		opts
		// 	);
		// }
		$(".internal_dentist").val(newValue);
		var val = $('#currentDentist').attr('did');
		//this.loadDentist(val);
		if (this.Cconsultant == 'prime') {
			this.filterDate();
		}
		//$("#dentist_initiate").click();
	}

	filterDate() {
		this.selectedMonth = this.datepipe.transform(this.selectedMonthYear, 'M');
		this.selectedYear = this.datepipe.transform(this.selectedMonthYear, 'yyyy');
		// this.endDate = this.datepipe.transform(new Date(this.selectedYear, this.selectedMonth, 0), 'yyyy-MM-dd');
		this.endDate = this.datepipe.transform(new Date(this.selectedYear, this.selectedMonth, 0), 'yyyy-MM-dd 00:00:00').replace(/\s/, 'T');
		
		let currentdate = new Date(this.endDate);
		let subMonths = this.selectedMonthRange + 1;
		// let sDate = new Date(currentdate.setMonth(currentdate.getMonth() - subMonths)).toISOString().slice(0, 10);
		// let sMonth: any = this.datepipe.transform(sDate, 'M');
		// let sYear: any = this.datepipe.transform(sDate, 'yyyy');
		let selectedMonthYear = this.datepipe.transform(this.selectedMonthYear, 'M');
		let currenteMonth = this.datepipe.transform(new Date(),'M');
		if(selectedMonthYear == currenteMonth){
			// this.endDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
			this.endDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd 00:00:00').replace(/\s/, 'T');
		}
		currentdate.setDate(1);
		currentdate.setMonth((currentdate.getMonth() + 1) - subMonths);
		this.startDate = this.datepipe.transform(new Date(currentdate), 'yyyy-MM-dd 00:00:00').replace(/\s/, 'T');

		// this.startDate = this.datepipe.transform(new Date(sYear, sMonth), 'yyyy-MM-dd');
		var dentistVal;
		// if ($('.internal_dentist').val())
		// 	dentistVal = $('.internal_dentist').val();
		// else
		// 	dentistVal = $('.external_dentist').val();
		// if (dentistVal == '') {
		// 	if (this._cookieService.get("clinic_dentist")) {
		// 		var dentistVal1 = this._cookieService.get("clinic_dentist").split('_');
		// 		dentistVal = dentistVal1[1];
		// 	}
		// }
		// if (dentistVal == 'all') {
		// 	this.selectedDentist = '';
		// } else {
		// 	this.selectedDentist = dentistVal;
		// }
		this.getKpiReport();
	}

	handleUnAuthorization() {
		this._cookieService.put("username", '');
		this._cookieService.put("email", '');
		this._cookieService.put("userid", '');
		this.router.navigateByUrl('/login');
	}

	onTabChanged(event) {
		this.selectedMonthYear = event
		this.selectedMonth = this.datepipe.transform(event, 'M');
		this.selectedYear = this.datepipe.transform(event, 'yyyy');
		this.endDate = this.datepipe.transform(new Date(this.selectedYear, this.selectedMonth, 0), 'yyyy-MM-dd');
		let currentdate = new Date(this.endDate);
		let subMonths = this.selectedMonthRange + 1;
		let selectedMonthYear = this.datepipe.transform(this.selectedMonthYear, 'M');
		let currenteMonth = this.datepipe.transform(new Date(),'M');
		if(selectedMonthYear == currenteMonth){
			this.endDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
		}
		currentdate.setDate(1);
		currentdate.setMonth((currentdate.getMonth() + 1) - subMonths);
		this.startDate = this.datepipe.transform(new Date(currentdate), 'yyyy-MM-dd');
		this.getKpiReport();
	}
	onMonthRangeChange(event) {
		this.selectedMonthRange = event;
		this.selectedMonth = this.datepipe.transform(this.selectedMonthYear, 'M');
		this.selectedYear = this.datepipe.transform(this.selectedMonthYear, 'yyyy');
		this.endDate = this.datepipe.transform(new Date(this.selectedYear, this.selectedMonth, 0), 'yyyy-MM-dd');
		let subMonths = this.selectedMonthRange + 1;
		let currentdate = new Date(this.endDate);
		// compair the current month with the selected tabmonth 
		let selectedMonthYear = this.datepipe.transform(this.selectedMonthYear, 'M');
		let currenteMonth = this.datepipe.transform(new Date(),'M');
		if(selectedMonthYear == currenteMonth){
			this.endDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
		}
		// -------------------------------------------------
		currentdate.setDate(1);		
		currentdate.setMonth((currentdate.getMonth() + 1) - subMonths);
		this.startDate = this.datepipe.transform(new Date(currentdate), 'yyyy-MM-dd');
		this.getKpiReport();
	}
	// setDate(type) {
	// 	if (type == 'add') {
	// 		var setDate = new Date(parseInt(this.selectedYear) + 1, parseInt(this.selectedMonth), parseInt(this.selectedDay));
	// 	 	this.selectedYear = this.datepipe.transform(setDate, 'yyyy');
	// 	} else {
	// 		var setDate = new Date(parseInt(this.selectedYear) - 1, parseInt(this.selectedMonth), parseInt(this.selectedDay));
	// 	 	this.selectedYear = this.datepipe.transform(setDate, 'yyyy');
	// 	}
	//   }

	public reportData: any = [];
	public reportMonths: any = [];
	public reportloader: boolean;
	public totalProductionActual:number ;
	public totalHoursAvailable:number ;
	public totalDaysActual:number ;
	public totalDentistProductionPerDayActual:number ;
	public totalDentistProductionPerHrActual :number ;
	private getKpiReport() {
		this.reportloader = true;

		this.startDate = this.datepipe.transform(new Date(this.startDate), 'yyyy-MM-dd');
		this.endDate = this.datepipe.transform(new Date(this.endDate), 'yyyy-MM-dd');

		this.KpiReportService.getKpiReport(this.clinic_id, this.startDate, this.endDate, this.selectedDentist).subscribe((res: any) => {
			if (res.status == 200) {
				this.reportloader = false;
				this.reportData = res.body.data;
				this.reportData.forEach(element => {
					if(element.kpi_type == "Production"){
						element.val.forEach(ele => {
							if(ele.clinic_id == undefined){
								this.totalProductionActual = ele.actual;
							}
						});
					}
					if(element.kpi_type == "Dentist Days"){
						element.val.forEach(ele => {
							if(ele.clinic_id == undefined){
								this.totalDaysActual = ele.actual;
							}
						});
					}
					if(element.kpi_type == "Utilisation Rate"){
						element.val.forEach(ele => {
							if(ele.clinic_id == undefined){
								this.totalHoursAvailable = ele.available_hours;
							}
						});
					}
				});
				this.totalDentistProductionPerDayActual =  this.totalProductionActual / this.totalDaysActual;
				this.totalDentistProductionPerHrActual = this.totalProductionActual / this.totalHoursAvailable;
				
				this.reportData.forEach(element => {
					if(element.kpi_type == "Dentist Production Per Day"){
						element.val.forEach(ele => {
							if(ele.clinic_id == undefined){
								ele.actual = this.totalDentistProductionPerDayActual;
							}
						});
					}
					if(element.kpi_type == "Hourly Rate"){
						element.val.forEach(ele => {
							if(ele.clinic_id == undefined){
								ele.actual = this.totalDentistProductionPerHrActual;
							}
						});
					}
				});
				this.reportData[8]['kpi_type'] = 'Discounts';
				this.reportData[5]['kpi_type'] = 'Dentist Production Per Hr';
				this.reportMonths = res.body.months;
			}
		}, error => {
			this.reportloader = false;	
			// this.warningMessage = "Please Provide Valid Inputs!";
			// this.toastr.error('There was an error retrieving your report data, please contact our support team.');
		}
		);
	}

	// Get Dentist
	getDentists() {
		this.dentistService.currentDentistList.subscribe(res=>{
			if (res.status == 200) {
					this.dentists = res.body.data;
					this.dentistCount = res.body.data.length;
				}
				else if (res.status == 401) {
					this._cookieService.put("username", '');
					this._cookieService.put("email", '');
					this._cookieService.put("userid", '');
					this.router.navigateByUrl('/login');
				}
			}, error => {
				this.warningMessage = "Please Provide Valid Inputs!";
		});
		// this.clinic_id && this.dentistService.getDentists(this.clinic_id).subscribe((res) => {
		// 	if (res.status == 200) {
		// 		this.dentists = res.body.data;
		// 		this.dentistCount = res.body.data.length;
		// 	}
		// 	else if (res.status == 401) {
		// 		this._cookieService.put("username", '');
		// 		this._cookieService.put("email", '');
		// 		this._cookieService.put("userid", '');
		// 		this.router.navigateByUrl('/login');
		// 	}
		// }, error => {
		// 	this.warningMessage = "Please Provide Valid Inputs!";
		// }
		// );
	}
}
