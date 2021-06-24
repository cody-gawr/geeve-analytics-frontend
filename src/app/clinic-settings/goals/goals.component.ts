import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie";
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClinicGoalsService } from '../../clinic-goals/clinic-goals.service';
import { DentistGoalsService } from '../../dentist-goals/dentist-goals.service';
import { DentistService } from '../../dentist/dentist.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-goals-settings',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent extends BaseComponent implements OnInit, AfterViewInit {
  clinic_id$ = new BehaviorSubject<any>(null);
  clinicAnalysisForm: FormGroup;
  clinicProcedureForm: FormGroup;
  frontDeskForm: FormGroup;
  marketingForm: FormGroup;
  financesForm: FormGroup;
  dentists: any = [];
  goalsData: any = {};
  clinicAnalysisGoals: any = [];
  tabs: any = [];
  tabsConstants = {
    clinic_analysis: 'Clinician Analysis',
    clinic_procedure_and_referrals: 'Clinician Procedures & Referrals',
    front_desk: 'Front Desk',
    marketing: 'Marketing',
    finances: 'Finances'
  }
  tabsOptions: string[] = [];
  selectedGoalCategory$ = new BehaviorSubject<any>('');
  selectedTab: any = 1;
  @Input() set clinicId(value: any) {
    this.clinic_id$.next(value);
  };

  constructor(
    private clinicGoalsService: ClinicGoalsService,
    private dentistGoalsService: DentistGoalsService,
    private _cookieService: CookieService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dentistService: DentistService
  ) {
    super();
  }

  ngOnInit() {
/*    this.clinicAnalysisForm = this.fb.group({
      dentistprod: [null, Validators.compose([Validators.required])],
      treatmentplan: [null, Validators.compose([Validators.required])],
      planaverage: [null, Validators.compose([Validators.required])],
      recallrate: [null, Validators.compose([Validators.required])],
      rebookrate: [null, Validators.compose([Validators.required])],
      patientcomplaints: [null, Validators.compose([Validators.required])],
      newpatients: [null, Validators.compose([Validators.required])],
      hourlyrate: [null, Validators.compose([Validators.required])]
    });*/

/*    this.clinicProcedureForm = this.fb.group({
      itempredictor: [null, Validators.compose([Validators.required])],
      ratio1: [null, Validators.compose([Validators.required])],
      ratio2: [null, Validators.compose([Validators.required])],
      ratio3: [null, Validators.compose([Validators.required])],
      totalrevenue: [null, Validators.compose([Validators.required])],
      referralclinician: [null, Validators.compose([Validators.required])]
    });*/
/*
    this.frontDeskForm = this.fb.group({
      utilisationrate: [null, Validators.compose([Validators.required])],
      recallprebook: [null, Validators.compose([Validators.required])],
      treatmentprebook: [null, Validators.compose([Validators.required])],
      fta: [null, Validators.compose([Validators.required])],
      uta: [null, Validators.compose([Validators.required])],
      noticks: [null, Validators.compose([Validators.required])],
      attendancerate: [null, Validators.compose([Validators.required])]
    });*/

/*    this.marketingForm = this.fb.group({
      ƒreferralpatient: [null, Validators.compose([Validators.required])],
      revenuereferral: [null, Validators.compose([Validators.required])],
      visits: [null, Validators.compose([Validators.required])],
      newpatients2: [null, Validators.compose([Validators.required])],
      patientcost: [null, Validators.compose([Validators.required])]
    });*/

/*    this.financesForm = this.fb.group({
      netprofit: [null, Validators.compose([Validators.required])],
      netprofitxero: [null, Validators.compose([Validators.required])],
      netprofitpms: [null, Validators.compose([Validators.required])],
      expenses: [null, Validators.compose([Validators.required])],
      productionclinician: [null, Validators.compose([Validators.required])],
      totalproduction: [null, Validators.compose([Validators.required])],
      collection: [null, Validators.compose([Validators.required])],
      visitproduction: [null, Validators.compose([Validators.required])],
      discount: [null, Validators.compose([Validators.required])],
      overdueaccount: [null, Validators.compose([Validators.required])]
    });*/

  /*  this.tabs = {*/
    /*  clinic_analysis: {
        patchValues: {},
        label: this.tabsConstants.clinic_analysis,
        form: this.clinicAnalysisForm,
        startIndex: 1,
        endIndex: 8,
        controls: [
          {
            label: 'dentist production',
            name: 'dentistprod',
            prefix: '$'
          },
          {
            label: 'treatment plan completion rate',
            name: 'treatmentplan',
            postfix: '%'
          },
          {
            label: 'treatment plan average cost',
            name: 'planaverage'
          },
          {
            label: 'recall prebook rate',
            name: 'recallrate',
            postfix: '%'
          },
          {
            label: 'reappointment rate',
            name: 'rebookrate',
            postfix: '%'
          },
          {
            label: 'no. patients complaints',
            name: 'patientcomplaints'
          },
          {
            label: 'hourly rate',
            name: 'hourlyrate',
            prefix: '$'
          },
          {
            label: 'no. new patients',
            name: 'newpatients'
          }
        ]
      },*/
/*      clinic_procedure_and_referrals: {
        patchValues: [],
        label: this.tabsConstants.clinic_procedure_and_referrals,
        form: this.clinicProcedureForm,
        startIndex: 9,
        endIndex: 14,
        controls: [
          {
            label: 'item predictor analysis value',
            name: 'itempredictor'
          },
          {
            label: 'predictor Ratio 1: (Crown to Large Filling Ratio)',
            name: 'ratio1'
          },
          {
            label: 'Predictor Ratio 2: (Extraction to RCT Ratio)',
            name: 'ratio2'
          },
          {
            label: 'Predictor Ratio 3: (RCT Conversion Ratio)',
            name: 'ratio3'
          },
          {
            label: 'Total Revenue of Clinician Per Procedure value',
            name: 'totalrevenue',
            prefix: '$'
          },
          {
            label: 'Referral to Other Clinicians Internal / External value',
            name: 'referralclinician',
            prefix: '$'
          },
        ]
      },*/
/*      front_desk: {
        patchValues: [],
        label: this.tabsConstants.front_desk,
        form: this.frontDeskForm,
        startIndex: 15,
        endIndex: 21,
        controls: [
          {
            label: 'Utilisation Rate',
            name: 'attendancerate',
            postfix: '%'
          },
          {
            label: 'Recall prebook rate',
            name: 'recallprebook',
            postfix: '%'
          },
          {
            label: 'Reappointment Rate',
            name: 'treatmentprebook',
            postfix: '%'
          },
          {
            label: 'FTA ratio',
            name: 'fta',
            postfix: '%'
          },
          {
            label: 'UTA ratio',
            name: 'uta',
            postfix: '%'
          },
          {
            label: 'Number of Ticks',
            name: 'noticks'
          },
          {
            label: 'Recall Attendance Rate value',
            name: 'attendancerate',
            postfix: '%'
          }
        ]
      },*/
/*      marketing: {
        patchValues: [],
        label: this.tabsConstants.marketing,
        form: this.marketingForm,
        startIndex: 22,
        endIndex: 26,
        controls: [
          {
            label: 'No. New Patients By Referral',
            name: 'ƒreferralpatient'
          },
          {
            label: 'Revenue by Referral',
            name: 'revenuereferral',
            prefix: '$'
          },
          {
            label: 'Total Visits',
            name: 'visits'
          },
          {
            label: 'No. New Patients',
            name: 'newpatients2'
          },
          {
            label: 'Cost of New Patient Acquisition',
            name: 'patientcost',
            prefix: '$'
          }
        ]
      }*/
      // finances: {
      //   patchValues: [],
      //   label: this.tabsConstants.finances,
      //   form: this.financesForm,
      //   startIndex: 15,
      //   endIndex: 36,
      //   controls: [
      //     {
      //       label: 'Net Profit',
      //       name: 'netprofit',
      //       prefix: '$'
      //     },
      //     {
      //       label: 'Net Profit % (Xero)',
      //       name: 'netprofitxero',
      //       postfix: '%'
      //     },
      //     {
      //       label: 'Net Profit % (PMS)',
      //       name: 'netprofitpms',
      //       postfix: '%'
      //     },
      //     {
      //       label: 'Expenses value',
      //       name: 'expenses',
      //       prefix: '$'
      //     },
      //     {
      //       label: 'Production % Per Clinician',
      //       name: 'productionclinician',
      //       postfix: '%'
      //     },
      //     {
      //       label: 'Total Production',
      //       name: 'totalproduction',
      //       prefix: '$'
      //     },
      //     {
      //       label: 'Collection',
      //       name: 'collection',
      //       prefix: '$'
      //     },
      //     {
      //       label: 'Production Per Visit',
      //       name: 'visitproduction'
      //     },
      //     {
      //       label: 'Total Discounts',
      //       name: 'discount',
      //       postfix: '%'
      //     },
      //     {
      //       label: 'Overdue Accounts',
      //       name: 'overdueaccount',
      //       prefix: '$'
      //     }
      //   ]
      // },
   /* }*/
    if (this.clinic_id$.value) this.getDentists(this.clinic_id$.value);

  }

  ngAfterViewInit() {
    combineLatest([
      this.clinic_id$,
      this.selectedGoalCategory$
    ])
      .pipe(
        takeUntil(this.destroyed$) 
      ).subscribe(inputs => {
        const [id, selectedGoalCategory] = inputs;
        if (id) {
          this.getData(id,selectedGoalCategory);
        }
      });
  }


  getData(id,selectedGoalCategory) 
  {
    this.clinicGoalsService.getGoalAllData(id,selectedGoalCategory).subscribe((res) => {
            if (res.message == 'success') {
              this.getGoalsForTabsClinic(res.data);
            } else if (res.status == '401') {
              this.handleUnAuthorization();
            }
          }, error => {
            console.log('error', error)
          });
  }

  getDentists(clinicID) {
    this.dentistService.getDentists(clinicID).subscribe((res) => {
      if (res.message == 'success') {
        this.dentists = res.data;
      }
      else if (res.status == '401') {
        this.handleUnAuthorization();
      }
    }, error => {
      console.log('error', error)
    });
  }

  onTabChanged(event) {
    this.selectedTab = event;
  }

  handleGoalCategorySelection(event) {   
    this.selectedGoalCategory$.next(event);
  }


getGoalsForTabsClinic(allGoals) {
  this.tabs = [];
  this.goalsData = {};
  if(allGoals[0]){
    this.selectedTab = allGoals[0]['id'];    
  }
  allGoals.forEach((res)=> {
    var temp = [];
    temp['name'] = res.dashboard;
    temp['id'] = res.id;
    temp['charts'] = [];
    res.master_charts.forEach((charts,key) => {
      var tempChart = [];     
      tempChart['chart'] = charts.chart;
      tempChart['control'] = charts.chart;
      tempChart['id'] = charts.id;
      tempChart['sign'] = charts.sign;
      tempChart['value'] = 0;
      if(typeof(charts.dentist_goal) != 'undefined' && charts.dentist_goal) {
        tempChart['value'] = charts.dentist_goal.value;
      }
      else if(typeof(charts.clinic_goal) != 'undefined' && charts.clinic_goal) {
        tempChart['value'] = charts.clinic_goal.value;
      }
     
      this.goalsData[parseInt(charts.id)] = tempChart['value'];
      temp['charts'].push(tempChart);
    });
    this.tabs.push(temp);    
  });
}



  getGoalsForTabs(allGoals) {
    let start = 0;
    let end = 0;
    Object.keys(this.tabs).map(key => {
      start = this.tabs[key].startIndex;
      end = this.tabs[key].endIndex;
      let index = 0;
      for (let i = start; i <= end; i++) {
        this.tabs[key].patchValues = {
          ...this.tabs[key].patchValues,
          [this.tabs[key].controls[index].name]: allGoals[i].value
        };
        index++;
      }
      this.tabs[key].form.patchValue(this.tabs[key].patchValues);
    });
  }

  getFormsData() {
    let formattedData: any = {};
    let start = 0;
    let end = 0;
    Object.keys(this.tabs).map(key => {
      start = this.tabs[key].startIndex;
      end = this.tabs[key].endIndex;
      let index = 0;
      for (let i = start; i <= end; i++) {
        formattedData[i] = this.tabs[key].form.get(this.tabs[key].controls[index].name).value;
        index++;
      }
    });
    return formattedData;
  }

  onSubmit() {
   // const allFormsData = this.getFormsData();
    let myJsonString = JSON.stringify(this.goalsData);
    $('.ajax-loader').show();
    if (this.selectedGoalCategory$.value === '') {
      this.updateClinicGoals(myJsonString);
    } else {
      this.updateDentistGoals(myJsonString);
    }
  }

  updateClinicGoals(formData) {
    this.clinicGoalsService.updateClinicGoals(formData, this.clinic_id$.value).subscribe((res) => {
      $('.ajax-loader').hide();
      if (res.message == 'success') {
        this.toastr.success('Clinic Goals Updated');
      }
      else if (res.status == '401') {
        this.handleUnAuthorization();
      }
    }, error => {
      console.log('error', error);
      $('.ajax-loader').hide();
    });
  }

  updateDentistGoals(formData) {
    this.dentistGoalsService.updateDentistGoals(formData, this.clinic_id$.value, this.selectedGoalCategory$.value).subscribe((res) => {
      $('.ajax-loader').hide();
      if (res.message == 'success') {
        this.toastr.success('Dentist Goals Updated');
      } else if (res.status == '401') {
        this.handleUnAuthorization();
      }
    }, error => {
      console.log('error', error);
      $('.ajax-loader').hide();
    });
  }

  handleUnAuthorization() {
    this._cookieService.put("username", '');
    this._cookieService.put("email", '');
    this._cookieService.put("token", '');
    this._cookieService.put("userid", '');
    this.router.navigateByUrl('/login');
  }
  updateName(name){
    var name = name.split('-');
    if(name[1]){
      return name[1];
    }
    return name;
  }
  onBlur(id,val,event){    
    if($(event.target).hasClass('sign%') && val > 100){
      $(event.target).val(100);
      val = 100;
    }  
   this.goalsData[parseInt(id)] =  parseInt(val);
   $(event.target).val(parseInt(val));  
       
    
  }
}
