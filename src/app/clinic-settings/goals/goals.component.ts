import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClinicGoalsService } from '../../clinic-goals/clinic-goals.service';
import { DentistGoalsService } from '../../dentist-goals/dentist-goals.service';
import { DentistService } from '../../dentist/dentist.service';
import { BaseComponent } from '../base/base.component';
import { ClinicSettingsService } from '../clinic-settings.service';
import { LocalStorageService } from '@/app/shared/local-storage.service';

@Component({
  selector: 'app-goals-settings',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
})
export class GoalsComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  clinic_id$ = new BehaviorSubject<any>(null);
  clinicAnalysisForm: UntypedFormGroup;
  clinicProcedureForm: UntypedFormGroup;
  frontDeskForm: UntypedFormGroup;
  marketingForm: UntypedFormGroup;
  financesForm: UntypedFormGroup;
  dentists: any = [];
  goalsData: any = {};
  clinicAnalysisGoals: any = [];
  tabs: any = [];
  year = new Date().getFullYear();
  range: any = [];
  tabsOptions: string[] = [];
  selectedGoalCategory$ = new BehaviorSubject<any>('');
  selectedTab: any = 1;
  Cconsultant: any = '';
  selectedYear: any = this.year;
  tabChanged: boolean = false;
  @Input() set clinicId(value: any) {
    this.clinic_id$.next(value);
  }

  constructor(
    private clinicGoalsService: ClinicGoalsService,
    private dentistGoalsService: DentistGoalsService,
    private _cookieService: CookieService,
    private router: Router,
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private dentistService: DentistService,
    private clinicSettingsService: ClinicSettingsService,
    private localStorageService: LocalStorageService
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
    combineLatest([this.clinic_id$, this.selectedGoalCategory$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(inputs => {
        const [id, selectedGoalCategory] = inputs;
        if (id) {
          this.getData(id, selectedGoalCategory, this.selectedYear);
        }
      });
  }

  getData(id, selectedGoalCategory, selectedYear) {
    this.clinicSettingsService.getClinicData.subscribe(
      res => {
        if (res.status == 200) {
          this.Cconsultant = res.body.data[0]['consultant'];
          this.clinicGoalsService
            .getGoalAllData(id, selectedGoalCategory, selectedYear)
            .subscribe(
              res => {
                if (res.status == 200) {
                  this.getGoalsForTabsClinic(res.body.data);
                } else if (res.status == 401) {
                  this.handleUnAuthorization();
                }
              },
              error => {
                console.log('error', error);
              }
            );
        } else if (res.status == 401) {
          this.handleUnAuthorization();
        }
      },
      error => {
        console.log('error', error);
      }
    );
    // this.dentistService.getClinicSettings(this.clinic_id$.value).subscribe((res) => {
    //   if (res.status == 200) {
    //     this.Cconsultant = res.body.data[0]['consultant'];
    //       this.clinicGoalsService.getGoalAllData(id,selectedGoalCategory,selectedYear).subscribe((res) => {
    //         if (res.status == 200) {
    //           this.getGoalsForTabsClinic(res.body.data);
    //         } else if (res.status == 401) {
    //           this.handleUnAuthorization();
    //         }
    //     }, error => {
    //       console.log('error', error)
    //     });
    //   }
    //   else if (res.status == 401) {
    //     this.handleUnAuthorization();
    //   }
    // }, error => {
    //   console.log('error', error)
    // });
  }

  getDentists(clinicID) {
    this.dentistService.getDentists(clinicID).subscribe(
      res => {
        if (res.status == 200) {
          this.dentists = res.body.data;
        } else if (res.status == 401) {
          this.handleUnAuthorization();
        }
      },
      error => {
        console.log('error', error);
      }
    );
  }

  onTabChanged(event) {
    if ([1, 10].indexOf(event) === -1) {
      this.selectedGoalCategory$.next('');
    }
    this.selectedTab = event;
    this.tabChanged = true;
  }

  onTabYearChanged(event) {
    this.selectedYear = event;
    combineLatest([this.clinic_id$, this.selectedGoalCategory$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(inputs => {
        const [id, selectedGoalCategory] = inputs;
        if (id) {
          this.getData(id, selectedGoalCategory, this.selectedYear);
        }
      });
  }

  handleGoalCategorySelection(event) {
    this.selectedGoalCategory$.next(event);
  }

  get isExactOrCore(): boolean {
    return this.localStorageService.isEachClinicPmsExactOrCore(
      this.clinic_id$.value
    );
  }

  get isExactOrCoreOrPraktika(): boolean {
    return this.localStorageService.isEachClinicExactOrCoreOrPraktika(
      this.clinic_id$.value
    );
  }

  getGoalsForTabsClinic(allGoals) {
    this.tabs = [];
    var temp = {
      d_id: 0,
      d_name: 0,
      charts: [],
    };
    this.goalsData = { year: this.selectedYear, goals: {} };
    allGoals.forEach(res => {
      temp = {
        d_id: res.id,
        d_name: res.dashboard,
        charts: [],
      };
      var chartTemp = {};
      res.master_charts.forEach(chart => {
        if (
          this.isExactOrCore &&
          res.id == 10 &&
          [
            'Dentist Days',
            'Dentist Production Per Hour',
            'Dentist Production Per Day',
          ].indexOf(chart.chart) > -1
        ) {
          return;
        }
        if (
          this.isExactOrCoreOrPraktika &&
          res.id == 3 &&
          ['UTA ratio'].indexOf(chart.chart) > -1
        ) {
          return;
        }
        if (
          res.id == 1 &&
          [
            'No. New Patients - Items Provider',
            'Recall Prebook Rate - Status',
          ].indexOf(chart.chart) > -1
        ) {
          return;
        }
        if (
          res.id == 4 &&
          ['No. New Patients - Items Provider'].indexOf(chart.chart) > -1
        ) {
          return;
        }
        chartTemp = {
          c_id: chart.id,
          c_dashboard_id: chart.dashboard_id,
          c_name: chart.chart,
          sign: chart.sign,
          goals: [],
        };
        if (typeof chart['all_dentist_goals'] != 'undefined') {
          chartTemp['goals'] = this.setGoalsPerMonth(
            chart['all_dentist_goals']
          );
          this.goalsData['goals'][chart.id] = this.setGoalsPerMonth(
            chart['all_dentist_goals']
          );
        } else {
          chartTemp['goals'] = this.setGoalsPerMonth(chart['all_clinic_goals']);
          this.goalsData['goals'][chart.id] = this.setGoalsPerMonth(
            chart['all_clinic_goals']
          );
        }

        temp['charts'].push(chartTemp);
      });
      this.tabs.push(temp);
    });
    const syncCharts = (cId1, cId2, tab1, tab2) => {
      const kPINoNowPatientsChart = this.tabs[tab1]?this.tabs[tab1]['charts'].find(
        c => c.c_id == cId1
      ):[];
      const marketingNoNewPatientsChart = this.tabs[tab2]?this.tabs[tab2]['charts'].find(
        c => c.c_id == cId2
      ):[];
      if (marketingNoNewPatientsChart) {
        marketingNoNewPatientsChart.goals = kPINoNowPatientsChart?.goals;
        marketingNoNewPatientsChart.c_id = cId1;
      }
    };

    syncCharts(8, 36, 4, 2);
    syncCharts(4, 16, 0, 1);
    syncCharts(5, 17, 0, 1);

    var order = [63, 64, 1, 49, 15, 66, 65, 8];
    this.tabs[4]?.charts.sort(function (a, b) {
      return order.indexOf(a.c_id) - order.indexOf(b.c_id);
    });
    if(this.tabs[4]) this.tabs[4].d_name = 'Prime KPI Report';

    // this.swap(this.tabs[4].charts,0,2);

    // if(this.Cconsultant != 'prime'){
    //   this.selectedTab = this.tabs[0].d_id;
    // }else{
    //   this.selectedTab = 10; // Kpi report
    // }
    if (this.Cconsultant == 'prime' && !this.tabChanged) {
      this.selectedTab = 10;
    }
  }

  swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  setGoalsPerMonth(chartGoals) {
    var values = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    chartGoals.forEach(chardValues => {
      for (var i = 0; i <= 11; i++) {
        var d1 = new Date(this.selectedYear, i, 1);
        var d2 = new Date(chardValues.start_date);
        if (d1.getMonth() === d2.getMonth()) {
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
          [this.tabs[key].controls[index].name]: allGoals[i].value,
        };
        index++;
      }
      this.tabs[key].form.patchValue(this.tabs[key].patchValues);
    });
  }

  onSubmit() {
    this.goalsData.goals[16] = this.goalsData.goals[4];
    this.goalsData.goals[17] = this.goalsData.goals[5];
    this.goalsData.goals[36] = this.goalsData.goals[8];
    let myJsonString = JSON.stringify(this.goalsData);
    $('.ajax-loader').show();
    if (this.selectedGoalCategory$.value === '') {
      this.updateClinicGoals(myJsonString);
      // this.getData(this.clinic_id$.value,this.selectedGoalCategory$.value,this.selectedYear);
    } else {
      this.updateDentistGoals(myJsonString);
    }
  }

  updateClinicGoals(formData) {
    this.clinicGoalsService
      .updateClinicGoals(formData, this.clinic_id$.value)
      .subscribe(
        res => {
          $('.ajax-loader').hide();
          if (res.status == 200) {
            this.toastr.success('Clinic Goals Updated');
            this.getData(
              this.clinic_id$.value,
              this.selectedGoalCategory$.value,
              this.selectedYear
            );
          } else if (res.status == 401) {
            this.handleUnAuthorization();
          }
        },
        error => {
          console.log('error', error);
          $('.ajax-loader').hide();
        }
      );
  }

  updateDentistGoals(formData) {
    this.dentistGoalsService
      .updateDentistGoals(
        formData,
        this.clinic_id$.value,
        this.selectedGoalCategory$.value
      )
      .subscribe(
        res => {
          $('.ajax-loader').hide();
          if (res.status == 200) {
            this.toastr.success('Dentist Goals Updated');
            this.getData(
              this.clinic_id$.value,
              this.selectedGoalCategory$.value,
              this.selectedYear
            );
          } else if (res.status == 401) {
            this.handleUnAuthorization();
          }
        },
        error => {
          $('.ajax-loader').hide();
        }
      );
  }

  handleUnAuthorization() {
    this._cookieService.put('username', '');
    this._cookieService.put('email', '');
    this._cookieService.put('userid', '');
    this.router.navigateByUrl('/login');
  }
  updateName(name) {
    var name = name.split('-');
    if (name[1]) {
      return name[1];
    }
    return name;
  }

  onKeyUp(id, val, event, sn, tab) {
    val = parseFloat(val ? val : '0');
    if ($(event.target).hasClass('sign%') && val > 100) {
      val = 100;
      $(event.target).val(val);
    } else if (val == '') {
      val = '';
      $(event.target).val(val);
    }
    //$(event.target).val(val);
    val = +val;
    this.goalsData['goals'][id][sn] = val == 0 ? -1 : val;
    if (tab === 'Prime KPI Report' && !this.isExactOrCore) {
      let product =
        +$("input[name='goal63" + sn + "']").val() *
        +$("input[name='goal64" + sn + "']").val();
      $("input[name='goal1" + sn + "']").val(product == 0 ? '' : product);
      this.goalsData['goals'][1][sn] = product == 0 ? -1 : product;
    }
  }

  //   onBlur(id,val,event,sn){
  //     event.preventDefault();
  //     event.stopPropagation();
  //     if($(event.target).hasClass('sign%') && val > 100){
  //       val = 100;
  //     }  else if(val == ''){
  //       val = '';
  //     }
  //    $(event.target).val(val);
  //    this.goalsData['goals'][parseInt(id)][parseInt(sn)] = parseInt(val);
  //  }

  keyDown(event) {
    if (
      (event.keyCode < 37 || event.keyCode > 40) &&
      (event.keyCode < 48 || event.keyCode > 57) &&
      (event.keyCode < 96 || event.keyCode > 105) &&
      event.keyCode != 9 &&
      event.keyCode != 8 &&
      event.keyCode != 46 &&
      event.keyCode != 190
    ) {
      event.preventDefault();
    }
  }
}
