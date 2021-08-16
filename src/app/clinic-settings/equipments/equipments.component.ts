import { AfterViewInit, Inject,Component, Input, ViewChild,ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie";
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EquipmentsService } from './equipments.service';
import { BaseComponent } from '../base/base.component';
import { MAT_DIALOG_DATA,MatDialogRef,MatDialog } from '@angular/material/dialog';
import { ClinicianAnalysisService } from '../../dashboards/cliniciananalysis/cliniciananalysis.service';
import { ClinicSettingsService } from '../clinic-settings.service';
import {MatSort} from '@angular/material/sort';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',

  encapsulation: ViewEncapsulation.None
})


export class DialogOverviewExampleComponent { 
  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private _cookieService: CookieService,private equipmentsService: EquipmentsService, private router: Router) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  save(data){  
    if( (data.id && data.old == data.item_name && data.quantityold == data.quantity)   ||  data.item_name == ''){
      return false;
    }

    this.equipmentsService.addItem(data.id,data.item_name,data.quantity,data.clinic_id).subscribe((res) => {
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
  selector: 'app-equipment-settings',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentComponent extends BaseComponent implements AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
  clinic_id$ = new BehaviorSubject<any>(null);
  @Input() set clinicId(value: any) {
    this.clinic_id$.next(value);
  }
  dentistPageSize = 10;
  dentistTablePages: number[] = [];
  currentPage: number = 1;
  itemList = new MatTableDataSource([]);
  dentistListLoading: boolean = false;
  displayedColumns: string[] = ['equip_item','quantity','active','action'];
  editing = {};
  clinicData:any = [];
  EquipListEnable: boolean = false;
  EquipListloader: boolean = false;


  constructor(
    private _cookieService: CookieService,
    private equipmentsService: EquipmentsService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public clinicianAnalysisService: ClinicianAnalysisService,
    public clinicSettingsService: ClinicSettingsService,
  ) {
    super();
  }

  ngAfterViewInit() {
    this.itemList.sort = this.sort;
    this.itemList.paginator = this.paginator;
    this.clinic_id$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(id => {
      if (id) {
        this.getClinic(id);
        this.getItems(id);
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
    this.itemList.filter = value.trim().toLocaleLowerCase();
  }


   getClinic(id){
      this.clinicianAnalysisService.getClinics(id,'EquipListEnable').subscribe((data: any) => {
        if(data.data){
          this.EquipListEnable = (data.data.equip_list_enable == 1)? true : false;
        }
      }, error => {});
    }

  getItems(id) {
    this.EquipListloader = true;
    this.equipmentsService.getItems(id).subscribe((res) => {
        this.EquipListloader = false;
      if (res.message == 'success') {
        this.itemList.data = res.data;
        this.setPaginationButtons(res.data.length);
               
      }
      else if (res.status == '401') {
        this.handleUnAuthorization();
      }
    }, error => {
      console.log('error', error)
    });
  }

  updateStatus(event,id,is_default){
    var active = (event.checked == true)? 1 : 0;
    this.equipmentsService.updateItemStatus(active,id,this.clinic_id$.value,is_default).subscribe((update:any) => {
      
    });   
  }

  openDialog(id= '',name= '',quantity = ''): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleComponent, {
      width: '500px',
      data: {id: id, item_name: name,clinic_id: this.clinic_id$.value, old: name, quantity: quantity, quantityold: quantity}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getItems(this.clinic_id$.value);
    });
    
  }

  public toggleMH(event)
  {
    var active = (event.checked == true)? 1 : 0;
    this.EquipListEnable = event.checked;
    this.clinicSettingsService.updatePartialSetting(this.clinic_id$.value,active,'equip_list_enable' ).subscribe((res) => {
      if(res.message == 'success') {}
    }, error => {});
  }

  deleteList(listId)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete Item?',
      icon: 'warning',
      showCancelButton: true, 
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.value)
      {
        this.clinicSettingsService.deleteEqupList(this.clinic_id$.value,listId ).subscribe((res) => {
        if(res.message == 'success')
        {
          this.getItems(this.clinic_id$.value);
        }
        }, error => {          
        });
      }
    });
  }

}
