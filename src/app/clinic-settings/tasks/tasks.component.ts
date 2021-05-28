import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie";
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TaskService } from './tasks.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-tasks-settings',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent extends BaseComponent implements AfterViewInit {
  clinic_id$ = new BehaviorSubject<any>(null);
  @Input() set clinicId(value: any) {
    this.clinic_id$.next(value);
  }
  dentistPageSize = 10;
  dentistTablePages: number[] = [];
  currentPage: number = 1;
  tasksList = new MatTableDataSource([]);
  dentistListLoading: boolean = false;
  displayedColumns: string[] = ['name','active','action'];
  editing = {};
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _cookieService: CookieService,
    private taskService: TaskService,
    private router: Router,
    private toastr: ToastrService
  ) {
    super();
  }

  ngAfterViewInit() {
    this.tasksList.paginator = this.paginator;
    this.clinic_id$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(id => {
      if (id) {
        this.getTasks(id);
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
    if (this.currentPage < goPage) this.paginator.nextPage();
    else this.paginator.previousPage();
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
    this.tasksList.filter = value.trim().toLocaleLowerCase();
  }

  getTasks(id) {
    this.taskService.getTasks(id).subscribe((res) => {
      if (res.message == 'success') {
        this.tasksList.data = res.data;
        this.setPaginationButtons(this.tasksList.data.length);
      }
      else if (res.status == '401') {
        this.handleUnAuthorization();
      }
    }, error => {
      console.log('error', error)
    });
  }

  enableEditing(index, column) {
   /* // this.tasksList.data[index].isEditable = true; 
    this.editing[index + '-' + column] = true;
    Object.keys(this.editing).map(key => {
      this.editing[key] = (key === `${index}-${column}`) ? true : false;
    });*/
  }

  updateValue(event, column, index) {
/*    let oldValue = this.tasksList.data[index][column];    
    this.editing[index + '-' + column] = false;
    const providerId = this.tasksList.data[index].providerId;
    const updatedValue = this.tasksList.data[index]['name'];
    if(column == 'name'){
      const updatedValue = event.target.value;
      this.tasksList.data[index][column] = updatedValue;
    }
    var isActive = null;
    if(column == 'is_active'){
      isActive = 0;
      if(event.target.checked){
        isActive = 1;
      }
    }
     this.dentistService.updateDentists(providerId, updatedValue, this.clinic_id$.value, isActive).pipe(
        takeUntil(this.destroyed$)
      ).subscribe((res) => {
        if (res.message == 'success') {
          this.toastr.success('Dentist Updated');
          this.getDentists(this.clinic_id$.value);
        }
      }, (error) => {
        console.log('error', error);
        this.tasksList.data[index][column] = oldValue;
        this.toastr.error('Opps, Error occurs in updating dentist!');
      });  */
       
  }

  updateStatus(event,id,is_default){
    var active = (event.checked == true)? 1 : 0;
    this.taskService.updateTaskStatus(active,id,this.clinic_id$.value,is_default).subscribe((update:any) => {
      
    });   
  }

}
