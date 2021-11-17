import { AfterViewInit, Component, Input, ViewChild,ViewEncapsulation,Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie";
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DentistService } from '../../dentist/dentist.service';
import { BaseComponent } from '../base/base.component';
import {MatSort} from '@angular/material/sort';
import { MAT_DIALOG_DATA,MatDialogRef,MatDialog } from '@angular/material/dialog';
import { ITooltipData } from '../../shared/tooltip/tooltip.directive';
import { environment } from "../../../environments/environment";
import { AppConstants } from "../../app.constants";

/************* Add Jeeve Names ***********/
  
@Component({
  selector: 'add-jeeve-name',
  templateUrl: './add-jeeve-name.html',
  encapsulation: ViewEncapsulation.None
})

export class AddJeeveNameComponent
{ 
  public jeeveId:any = 1;
  public jeeveName:any = '';
  public update:any = false;

  constructor(public dialogRef: MatDialogRef<AddJeeveNameComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private _cookieService: CookieService, private router: Router, private dentistService: DentistService ){}
  onNoClick(): void {
    this.dialogRef.close();
  }
  updatevalue(event, index)
  {
    this.data.jeeveNames[index] = $.trim(event.target.value);    
  }

  save(data){
    var name = JSON.stringify( data.jeeveNames);
    this.dentistService.updateJeeveName(data.clinic_id, name).subscribe((res) => {
        if(res.message == 'success')
        {
          this.dialogRef.close();
        }
      }, error => {
        console.log('error', error)
      });    
   }
}

/************* Add Jeeve Names ***********/




@Component({
  selector: 'app-dentist-settings',
  templateUrl: './dentist.component.html',
  styleUrls: ['./dentist.component.css']
})
export class DentistComponent extends BaseComponent implements AfterViewInit {
   @ViewChild(MatSort) sort: MatSort;
  clinic_id$ = new BehaviorSubject<any>(null);
  @Input() set clinicId(value: any) {
    this.clinic_id$.next(value);
  }
  public apiUrl = environment.apiUrl; 

  public advanceOption:boolean = false;
  dentistPageSize = 10;
  dentistTablePages: number[] = [];
  currentPage: number = 1;
  dentistList = new MatTableDataSource([]);
  dentistListLoading: boolean = false;
  displayedColumns: string[] = ['providerId', 'name','jeeve_id','position', 'is_active'];
  jeeveProviderIds: any = [];
  editing = {};
  
  public userPlan:any = 'lite';
  public activeDentist:any = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _cookieService: CookieService,
    private dentistService: DentistService,
    private router: Router,
    private toastr: ToastrService,
     public dialog: MatDialog,
     public constants: AppConstants
  ) {
    super();
  }

  ngAfterViewInit() {
    this.userPlan =  this._cookieService.get("user_plan"); 
    this.dentistList.paginator = this.paginator;
    this.dentistList.sort = this.sort;
    this.clinic_id$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(id => {
      if (id) {
        this.getDentists(id);
        this.getJeeveNames(id);
      }
    })
  }
  advanceToggle(event){
    this.advanceOption = event.checked;
  }
  handleUnAuthorization() {
    this._cookieService.put("username", '');
    this._cookieService.put("email", '');
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
    this.dentistList.filter = value.trim().toLocaleLowerCase();
  }

  getDentists(id) {
    this.dentistService.getDentists(id,1).subscribe((res) => {
      if (res.message == 'success') {
        this.jeeveProviderIds = [];
        for(let i = 1; i <= 9; i++){
          this.jeeveProviderIds.push({'id':i, 'name': 'Jeeve Provider '+i});
        }

        this.dentistList.data = res.data;
        this.setPaginationButtons(this.dentistList.data.length);
        let activeDnt:any = res.data.filter(p => p.is_active == 1);  
        this.activeDentist =  activeDnt.length;
      }
      else if (res.status == '401') {
        this.handleUnAuthorization();
      }
    }, error => {
      console.log('error', error)
    });
  }
  public jeeveNames:any = {};
  getJeeveNames(id) {
    this.dentistService.getJeeveNames(id).subscribe((res) => {
      if (res.message == 'success') {
        this.jeeveNames = res.data;        
      }
      else if (res.status == '401') {
        this.handleUnAuthorization();
      }
    }, error => {
    });
  }

  enableEditing(index, column) {
    // this.dentistList.data[index].isEditable = true; 
    this.editing[index + '-' + column] = true;
    Object.keys(this.editing).map(key => {
      this.editing[key] = (key === `${index}-${column}`) ? true : false;
    });
  }


  updateValue(event, column, index,providerId, updatedValue) 
  {  
    if(event.type == 'keyup' &&  event.keyCode != 13 && column == 'name')
    {
      return false;
    }
    let updatedColumn = '';
     if(column == 'position')
     {
       updatedColumn = 'position';
       updatedValue = event.target.value;           
     }

    if(column == 'name')
    {
       updatedColumn = 'name';
      updatedValue = event.target.value;           
    }
    var jeeveId = '';
    if(column == 'jeeve_id')
    {
      jeeveId =  event.target.value;           
    }

    var isActive = null;
    if(column == 'is_active')
    {
      if(this.userPlan == 'lite')
      {
        if(this.activeDentist >= 2 || !event.target.checked)
        {
          this.toastr.error('Please contact the Jeeve support team to change your dentist selections');
          $(event.target).prop( "checked", !event.target.checked )
          return false;
        }        
      }   
      isActive = 0;
      if(event.target.checked)
      {
        isActive = 1;
      }
    }
    this.dentistService.updateDentists(providerId, updatedValue, this.clinic_id$.value, isActive,jeeveId,updatedColumn)
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe((res) => {
        this.editing[index + '-' + column] = false;
        if (res.message == 'success') {
          this.toastr.success('Dentist Updated');
          this.getDentists(this.clinic_id$.value);
        }
      }, (error) => {
        this.toastr.error('Opps, Error occurs in updating dentist!');
      });  
    }

    openSetJeeveName()
    {
      const dialogRef = this.dialog.open(AddJeeveNameComponent, {
        width: '650px',
        data: { clinic_id: this.clinic_id$.value,jeeveNames: this.jeeveNames }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getDentists(this.clinic_id$.value);
      }); 
    }
}