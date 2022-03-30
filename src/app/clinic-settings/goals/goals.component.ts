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
  year = new Date().getFullYear();
  range: any = [];
  tabsOptions: string[] = [];
  selectedGoalCategory$ = new BehaviorSubject<any>('');
  selectedTab: any = 1;
  Cconsultant:any ='';
  selectedYear : any = this.year;
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
    this.range.push(this.year - 1);
    this.range.push(this.year);
    for (var i = 1; i < 3; i++) {
        this.range.push(this.year + i);
    }
  }

  ngOnInit() {
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
          this.getData(id,selectedGoalCategory,this.selectedYear);
        }
      });
  }


  getData(id,selectedGoalCategory,selectedYear) 
  {
    this.dentistService.getClinicSettings(this.clinic_id$.value).subscribe((res) => {
      if (res.message == 'success') {
        this.Cconsultant = res.data[0]['consultant'];
          this.clinicGoalsService.getGoalAllData(id,selectedGoalCategory,selectedYear).subscribe((res) => {
            if (res.message == 'success') {
              this.getGoalsForTabsClinic(res.data);
            } else if (res.status == '401') {
              this.handleUnAuthorization();
            }
        }, error => {
          console.log('error', error)
        });
      }
      else if (res.status == '401') {
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

  // getClinicSettings(clinicID) {
  //   this.dentistService.getClinicSettings(clinicID).subscribe((res) => {
  //     if (res.message == 'success') {
  //       this.Cconsultant = res.data[0]['consultant'];
  //       console.log(this.Cconsultant);
  //     }
  //     else if (res.status == '401') {
  //       this.handleUnAuthorization();
  //     }
  //   }, error => {
  //     console.log('error', error)
  //   });
  // }

  onTabChanged(event) {
    this.selectedTab = event;
  }

  onTabYearChanged(event) {
    this.selectedYear = event;
    combineLatest([
      this.clinic_id$,
      this.selectedGoalCategory$
    ])
      .pipe(
        takeUntil(this.destroyed$) 
      ).subscribe(inputs => {
        const [id, selectedGoalCategory] = inputs;
        if (id) {
          this.getData(id,selectedGoalCategory,this.selectedYear);
        }
      });
  }

  handleGoalCategorySelection(event) {   
    this.selectedGoalCategory$.next(event);
  }


getGoalsForTabsClinic(allGoals) {
  this.tabs = [];
  var temp = {};
  this.goalsData = {'year': this.selectedYear, 'goals' : {} };
  allGoals.forEach((res)=> {
    temp = {
     'd_id' : res.id,
     'd_name' : res.dashboard,
     'charts' : [],
   };
   var chartTemp = {};
   res.master_charts.forEach( (chart) => {
      chartTemp = 
      {
        'c_id' : chart.id,
        'c_dashboard_id' : chart.dashboard_id,
        'c_name' : chart.chart,
        'sign' : chart.sign,
        'goals' : []
      };
      if( typeof(chart['all_dentist_goals']) != 'undefined' ){
        chartTemp['goals'] = this.setGoalsPerMonth(chart['all_dentist_goals']);
        this.goalsData['goals'][chart.id] = this.setGoalsPerMonth(chart['all_dentist_goals']);
      } else {
        chartTemp['goals'] = this.setGoalsPerMonth(chart['all_clinic_goals']);
        this.goalsData['goals'][chart.id] = this.setGoalsPerMonth(chart['all_clinic_goals']);
      }
      
      temp['charts'].push(chartTemp);
      
   });
   this.tabs.push(temp);
  });

  if(this.Cconsultant != 'prime'){
    this.selectedTab = this.tabs[0].d_id;
  }else{
    this.selectedTab = 10; // Kpi report
  }
  
}


setGoalsPerMonth(chartGoals)
{  
  var values= [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];     
    chartGoals.forEach( (chardValues) => {
      for(var i=0; i <= 11; i++ ){
        var d1 = new Date(this.selectedYear,i,1);
        var d2 = new Date(chardValues.start_date);
        if(d1.getMonth() === d2.getMonth())
        {
          values[i] = chardValues.value;
        }
        
      }
    });
    return values;
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



  onSubmit() {

    let myJsonString = JSON.stringify(this.goalsData);
    $('.ajax-loader').show();
    if (this.selectedGoalCategory$.value === '') {
      this.updateClinicGoals(myJsonString);
      this.getData(this.clinic_id$.value,this.selectedGoalCategory$.value,this.selectedYear);
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

  onKeyUp(event){       
    /*if(event.keyCode == 45 || (event.keyCode >= 48 && event.keyCode <= 57)){
      if(event.keyCode == 45){
        if($(event.target).hasClass('sign%')){
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
      }
      return true;
    } else {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }*/
  }
  onBlur(id,val,event,sn){    
     event.preventDefault();
      event.stopPropagation();
    if($(event.target).hasClass('sign%') && val > 100){
      val = 100;
    }  else if(val == ''){
      val = 0;
    } 
   $(event.target).val(val);  
   this.goalsData['goals'][parseInt(id)][parseInt(sn)] =  parseInt(val);
   

 }
}
