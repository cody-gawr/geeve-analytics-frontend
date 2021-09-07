import { AfterViewInit, Inject,Component, Input, ViewChild,ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie";
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScriptsService } from './scripts.service';
import { BaseComponent } from '../base/base.component';
import { MAT_DIALOG_DATA,MatDialogRef,MatDialog } from '@angular/material/dialog';
import { ClinicSettingsService } from '../clinic-settings.service';
import { ClinicianAnalysisService } from '../../dashboards/cliniciananalysis/cliniciananalysis.service';
import Swal from 'sweetalert2';
import {MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './add.html',
  encapsulation: ViewEncapsulation.None
})


export class AddScriptsComponent {    
  constructor(public dialogRef: MatDialogRef<AddScriptsComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private _cookieService: CookieService, private scriptsService: ScriptsService, private router: Router) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  save(data){  

    if(data.type == '' && data.name == '' && data.text == ''){
      return false;
    }
    this.scriptsService.addUpdateScript(data.id,data.name,data.text,data.type,data.colour,data.clinic_id).subscribe((res) => {
      if (res.message == 'success') {
        this.dialogRef.close();
      } else if (res.status == '401') {
        this.handleUnAuthorization();
      }
    }, error => {
      console.log('error', error)
    });
  }
  validate(){

  }

  handleUnAuthorization() {
    this._cookieService.put("username", '');
    this._cookieService.put("email", '');
    this._cookieService.put("token", '');
    this._cookieService.put("userid", '');
    this.router.navigateByUrl('/login');
  }

}



@Component({
  selector: 'app-scripts-settings',
  templateUrl: './scripts.component.html',
  styleUrls: ['./scripts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ScriptsComponent extends BaseComponent implements AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  clinic_id$ = new BehaviorSubject<any>(null);
  @Input() set clinicId(value: any) {
    this.clinic_id$.next(value);
  }
  dentistPageSize = 10;
  dentistTablePages: number[] = [];
  currentPage: number = 1;
  scriptList = new MatTableDataSource([]);
  dentistListLoading: boolean = false;
  displayedColumns: string[] = ['script_title','followup_type','colour','is_active','action'];
  editing = {};
  clinicData:any = [];
  dailyTaskEnable: boolean = false;
  

  constructor(
    private _cookieService: CookieService,
    private scriptsService: ScriptsService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private clinicSettingsService: ClinicSettingsService,
    private clinicianAnalysisService: ClinicianAnalysisService
  ) {
    super();
  }

  ngAfterViewInit() {
      this.scriptList.sort = this.sort;
    this.scriptList.paginator = this.paginator;
    this.clinic_id$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(id => {
      if (id) {
        this.getScripts(id);
      }
    })
  }

  handleUnAuthorization() {
    this._cookieService.put("username", '');
    this._cookieService.put("email", '');
    this._cookieService.put("token", '');
    this._cookieService.put("userid", '');
    this.router.navigateByUrl('/login');
  }

  handlePageChange(goPage: number) {
    if (this.currentPage < goPage)
    {
      for(let i = this.currentPage; i < goPage; i++){
        this.paginator.nextPage();
      }      
    }
    else
    {
      for(let i = goPage; i < this.currentPage; i++){
        this.paginator.previousPage();
      }      
    }
    this.currentPage = goPage; //make the page active by class
  }

  setPaginationButtons(totalDentist) {
    this.dentistTablePages = [];
    const totalPages = Math.ceil(totalDentist / this.dentistPageSize);
    for (let i = 0; i < totalPages; i++) {
      this.dentistTablePages.push(i + 1);
    }
  }

  doFilter = (value: string) => {
    this.scriptList.filter = value.trim().toLocaleLowerCase();
  }  

  getScripts(id) {
    this.scriptsService.getScripts(id).subscribe((res) => {
      if (res.message == 'success') {
        this.scriptList.data = res.data;        
        this.setPaginationButtons(res.data.length);
      }
      else if (res.status == '401') {
        this.handleUnAuthorization();
      }
    }, error => {
      console.log('error', error)
    });
  }
  openDialog(id= '',name= '',text= '',type= '',colour= ''): void {
    const dialogRef = this.dialog.open(AddScriptsComponent, {
      width: '500px',
      data: {id: id, name: name,text:text,type:type,colour:colour,clinic_id: this.clinic_id$.value}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getScripts(this.clinic_id$.value);
    });    
  }



  deleteScript(recordId)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete Task?',
      icon: 'warning',
      showCancelButton: true, 
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.value)
      {
        this.scriptsService.deleteScript(this.clinic_id$.value,recordId ).subscribe((res) => {
        if(res.message == 'success')
        {
          this.getScripts(this.clinic_id$.value);
        }
        }, error => {          
        });
      }
    });
  }

  updateScript(value,record_id,column){
    if(column == 'is_active'){
      if(value){
        value = 1;
      } else {
        value = 0;
      }
    }
    
    this.scriptsService.updateSingleColumn(record_id,column,value,this.clinic_id$.value).subscribe((res) => {
    }, error => {});
  }

}