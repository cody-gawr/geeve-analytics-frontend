import { AfterViewInit, Component, Input, ViewChild, ViewEncapsulation, Inject, } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ChartsService } from "./charts.service";
import { DentistService } from "../../dentist/dentist.service";
import { BaseComponent } from "../base/base.component";
import { MatSort } from "@angular/material/sort";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material/dialog";
import { ITooltipData } from "../../shared/tooltip/tooltip.directive";
import { AppConstants } from "../../app.constants";
/************* Add Jeeve Names ***********/

@Component({
  selector: "add-jeeve-name",
  templateUrl: "./add-jeeve-name.html",
  encapsulation: ViewEncapsulation.None,
})

export class DentisChartComponent {
  public jeeveId: any = 1;
  public dentistDataList: any = "";
  public update: any = false;
  public excludedProviders = [];

  constructor(
    public dialogRef: MatDialogRef<DentisChartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cookieService: CookieService,
    private router: Router,
    private chartsService: ChartsService,
    private toastr: ToastrService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  advanceToggle(event, id, data) {
    // let val = 'main-' + id;
    
    var chart_id = Number(data.chartID);
    var clinic_id = Number(data.clinic_id);
    var providerId = Number(id);
    var status = '';
    if (event.checked) {
      // this.excludedProviders.push(id)
      // $('#' + val).show()
      //hit save api
      status = 'include';

    } else {
      // var index = this.excludedProviders.indexOf(id);
      // if (index !== -1) {
      //   this.excludedProviders.splice(index, 1);
      // }
      // $('#' + val).hide()
      //hit remove api
      status = 'exclude';
    }
    this.saveRecord(chart_id, clinic_id, providerId, status);
    
  }

  saveRecord(chart_id, clinic_id, providerId, status) {
    this.chartsService.addDentistRecord(chart_id, clinic_id, providerId, status).subscribe(
      (res) => {
        if (res.status == 200) {
          if(status == 'exclude'){
            this.toastr.success("Provider successfully disabled");
          }else{
            this.toastr.success("Provider successfully enabled");
          }         
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
  }


  save(data) {
    // var name = JSON.stringify(data.jeeveNames);
    var chartID = data.chartID;
    
    // this.dentistService.addDentistRecord(data.clinic_id, name).subscribe(
    //   (res) => {
    //     if (res.status == 200) {
    //       this.dialogRef.close();
    //     }
    //   },
    //   (error) => {
    //     console.log("error", error);
    //   }
    // );
  }
}

/************* Add Jeeve Names ***********/

@Component({
  selector: "app-charts-settings",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.css"],
})

export class ChartsComponent extends BaseComponent implements AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  clinic_id$ = new BehaviorSubject<any>(null);
  @Input() set clinicId(value: any) {
    this.clinic_id$.next(value);
  }
  public advanceOption: boolean = false;
  dentistPageSize = 10;
  dentistTablePages: number[] = [];
  currentPage: number = 1;
  dentistListData = [];
  dash1Lable = "";
  dash2Lable = "";
  dash3Lable = "";
  dentistList = new MatTableDataSource([]);
  dash1List = new MatTableDataSource([]);
  dash2List = new MatTableDataSource([]);
  dash3List = new MatTableDataSource([]);
  dentistListLoading: boolean = false;
  displayedColumns: string[] = ["chart", "configuration"];
  jeeveProviderIds: any = [];
  dash1ListArray: any = [];
  dash3ListArray: any = [];
  editing = {};
  chartData = {};

  public userPlan: any = "lite";
  public activeDentist: any = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _cookieService: CookieService,
    private dentistService: DentistService,
    private chartsService: ChartsService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public constants: AppConstants
  ) {
    super();
  }


  ngAfterViewInit() {
    this.userPlan = this._cookieService.get("user_plan");
    this.dentistList.paginator = this.paginator;
    this.dentistList.sort = this.sort;
    this.clinic_id$.pipe(takeUntil(this.destroyed$)).subscribe((id) => {
      if (id) {
        this.getDentists(id);
      }
    });
    this.getCharts();
  }

  handleUnAuthorization() {
    this._cookieService.put("username", "");
    this._cookieService.put("email", "");
    this._cookieService.put("userid", "");
    this.router.navigateByUrl("/login");
  }

  getCharts() {
    this.chartsService.getCharts().subscribe(
      (res) => {
        if (res.status == 200) {
          this.jeeveProviderIds = [];
          this.dash1ListArray = [];
          this.dash3ListArray = [];
          for (let i = 1; i <= 9; i++) {
            this.jeeveProviderIds.push({ id: i, name: "Jeeve Provider " + i });
          }
          this.chartData = res.body.data;
          res.body.data.forEach((element) => { });

          for (let index = 0; index < res.body.data.length; index++) {
            const element = res.body.data[index];
            if (index == 0) {
              this.dash1Lable = element.dashboard;
              element.master_charts.forEach(ele => {
               if(ele.id == 7){
                this.dash1ListArray.push(ele);
               }
              });             
            // this.dash1List.data = element.master_charts;
            this.dash1List.data =  this.dash1ListArray;
            }
            if (index == 1) {
              this.dash2Lable = element.dashboard;
              this.dash2List.data = element.master_charts;
            }
            if (index == 2) {
              this.dash3Lable = element.dashboard;
              element.master_charts.forEach(ele => {
                if(ele.id == 38){
                 this.dash3ListArray.push(ele);
                }
               });             
              //this.dash3List.data = element.master_charts;
              this.dash3List.data = this.dash3ListArray;
            }
          }
          
        } else if (res.status == "401") {
          this.handleUnAuthorization();
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

  getDentists(id) {
    this.dentistService.getDentists(id, 1).subscribe(
      (res) => {
        if (res.status == 200) {
          this.jeeveProviderIds = [];
          for (let i = 1; i <= 9; i++) {
            this.jeeveProviderIds.push({ id: i, name: "Jeeve Provider " + i });
          }
          this.dentistListData = res.body.data;
          this.dentistList.data = res.body.data;
        } else if (res.status == "401") {
          this.handleUnAuthorization();
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
  }
  public jeeveNames: any = {};

  updateValue(event, column, index, providerId, updatedValue) {
    if (event.type == "keyup" && event.keyCode != 13 && column == "name") {
      return false;
    }
    let updatedColumn = "";
    if (column == "position") {
      updatedColumn = "position";
      updatedValue = event.target.value;
    }

    if (column == "name") {
      updatedColumn = "name";
      updatedValue = event.target.value;
    }
    var jeeveId = "";
    if (column == "jeeve_id") {
      jeeveId = event.target.value;
    }

    var isActive = null;
    if (column == "is_active") {
      if (this.userPlan == "lite") {
        if (this.activeDentist >= 2 || !event.target.checked) {
          this.toastr.error(
            "Please contact the Jeeve support team to change your dentist selections"
          );
          $(event.target).prop("checked", !event.target.checked);
          return false;
        }
      }
      isActive = 0;
      if (event.target.checked) {
        isActive = 1;
      }
    }
    this.dentistService
      .updateDentists(
        providerId,
        updatedValue,
        this.clinic_id$.value,
        isActive,
        jeeveId,
        updatedColumn
      )
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (res) => {
          this.editing[index + "-" + column] = false;
          if (res.status == 200) {
            this.toastr.success("Dentist Updated");
            this.getDentists(this.clinic_id$.value);
          }
        },
        (error) => {
          this.toastr.error("Opps, Error occurs in updating dentist!");
        }
      );
  }

  openSetJeeveName(chartID,chartName) {
    let dentistsExclusions = [];
    this.chartsService.getDentistsExclusions(this.clinic_id$.value, chartID).subscribe(
      (res) => {
        if (res.status == 200) {
          
          dentistsExclusions = res.body.data.map(function (data) {
            return data.providerId;
          });
          this.dentistListData.map(function (data) {
            if (dentistsExclusions.includes(data.id)) {
              // found element
              data.checked = false
            } else {
              data.checked = true
            }
            return data;
          });
          const dialogRef = this.dialog.open(DentisChartComponent, {
            width: "650px",
            data: {
              clinic_id: this.clinic_id$.value,
              chartID: chartID,
              dentistDataList: this.dentistListData,
              dentistsExclusions: dentistsExclusions,
              chartName: chartName,
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.getDentists(this.clinic_id$.value);
          });
        } else if (res.status == "401") {
          this.handleUnAuthorization();
        }
      },
      (error) => {
        console.log("error", error);
      }
    );


  }

  historyPosChips(event, colour, type= '')
  {
    $('.custom-tooltip').css({'visibility': 'hidden','opacity': '1' } );
    let x= event.clientX;
    let y= parseInt(event.clientY);
    setTimeout( function(){
      $('.custom-tooltip').css({'top': (y +20) , 'left' : (x -200),'visibility': 'visible' ,'opacity': '1'} );
      
    },100);
  }
}
