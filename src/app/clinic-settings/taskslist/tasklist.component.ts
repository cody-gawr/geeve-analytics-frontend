import { AfterViewInit, Inject, Component, Input, ViewChild, ViewEncapsulation, ElementRef, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie";
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TasklistService as TaskService } from './tasklist.service';
import { BaseComponent } from '../base/base.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ClinicSettingsService } from '../clinic-settings.service';
import { ClinicianAnalysisService } from '../../dashboards/cliniciananalysis/cliniciananalysis.service';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
  styleUrls :['./tasklist.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class DialogOverviewTasklistDialogComponent {
  @ViewChild('allSelected') private allSelected
  addTaskInput: boolean = false;
  taskAddErr: boolean = false;
  @ViewChild('task') task: ElementRef;
  constructor(public dialogRef: MatDialogRef<DialogOverviewTasklistDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _cookieService: CookieService, private taskService: TaskService, private router: Router) { }
  public assigneeData: { [key: string]: Object }[] = [
    { id: '3', name: "Practice Manager" },
    { id: '4', name: "Clinician" },
    { id: '5', name: "Staff" },
    { id: '6', name: "Owner" },
  ];
  public maxSize: number = 7;
  public labels: any = {
    previousLabel: '',
    nextLabel: ''
};
  public showAddItem = false;
  onNoClick(): void {
    this.dialogRef.close();
  }
  onKeyPress(event,index,itemsPerPage,currPage){
    if(event.keyCode===13 || event.charCode === 13){
     this.updateItem(index,itemsPerPage,currPage);
    }
  }
  pageChanged(event){
    this.dialogRef.componentInstance.data.currPage = event;
  }

  save(data) {
    if (data.list_name == '' || data.assigned_roles == '' || (data.task_name == '' && this.showAddItem)) {
      return false;
    }
    var index = data.assigned_roles.indexOf('0');
    if (index !== -1) {
      data.assigned_roles.splice(index, 1);
    }
    let roles = data.assigned_roles.toString();
    this.taskService.addTask(data.list_id, data.list_name, roles, data.clinic_id).subscribe((res) => {
      if (res.body.message == 'success') {
        this.dialogRef.close();
      } else if (res.status == 401) {
        this.handleUnAuthorization();
      }
    }, error => {
      console.log('error', error)
    });
  }

  update(data){
      if (data.list_name == '' || data.assigned_roles == '' || (data.task_name == '' && this.showAddItem)) {
        return false;
      }
      var index = data.assigned_roles.indexOf('0');
      if (index !== -1) {
        data.assigned_roles.splice(index, 1);
      }
      let roles = data.assigned_roles.toString();
      this.taskService.updateTasklist(data.list_id,  data.clinic_id, data.list_name, roles).subscribe((res) => {
        if (res.body.message == 'success') {
          this.dialogRef.close();
        } else if (res.status == 401) {
          this.handleUnAuthorization();
        }
      }, error => {
        console.log('error', error)
      });
  }

  validate() {

  }

  handleUnAuthorization() {
    this._cookieService.put("username", '');
    this._cookieService.put("email", '');
    this._cookieService.put("userid", '');
    this.router.navigateByUrl('/login');
  }

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.dialogRef.componentInstance.data.assigned_roles = ['0', '3', '4', '5', '6'];
    } else {
      this.dialogRef.componentInstance.data.assigned_roles = [];
    }

  }

  markRead(index,itemsPerPage,currPage) {
    let i = itemsPerPage * (currPage - 1) + index;
    this.dialogRef.componentInstance.data.tasksListItems[i].readOnly = !this.dialogRef.componentInstance.data.tasksListItems[i].readOnly
    this.dialogRef.componentInstance.data.currPage = currPage;
  }

  updateItem(index,itemsPerPage,currPage) {
    let i = itemsPerPage * (currPage - 1) + index;
    let data = this.dialogRef.componentInstance.data.tasksListItems[i];
    if (data) {
      this.taskService.updateTasksItem(data.id, data.list_id, data.task_name, data.clinic_id).subscribe((res) => {
        if (res.body.message == 'success') {
          this.dialogRef.componentInstance.data.tasksListItems[i].readOnly = true
        } else if (res.status == 401) {
          this.handleUnAuthorization();
        }
      }, error => {
        console.log('error', error)
      });
    }
  }

  removeItem(index,itemsPerPage,currPage) {
    let i = itemsPerPage * (currPage - 1) + index;
    let data = this.dialogRef.componentInstance.data.tasksListItems[i];
    if (data) {
      this.taskService.deleteTasksItem(data.id, data.clinic_id).subscribe((res) => {
        if (res.body.message == 'success') {
          this.dialogRef.componentInstance.data.tasksListItems.splice(i, 1);
          this.dialogRef.componentInstance.data.totalRecords = this.dialogRef.componentInstance.data.tasksListItems.length;
        } else if (res.status == 401) {
          this.handleUnAuthorization();
        }
      }, error => {
        console.log('error', error)
      });
    }
  }
  additem() {
    this.showAddItem = !this.showAddItem
  }

  // add task with the input  field

  addTaskIn(data) {
    let task_name = this.task.nativeElement.value; 
    if (task_name) {
      this.taskService.addTasksItem(data.list_id, task_name, data.clinic_id).subscribe((res) => {
        if (res.body.message == 'success') {
        this.addTaskInput = false;
        let newData = res.body.data;
        newData.readOnly = true
        newData.task_name = task_name;
        this.dialogRef.componentInstance.data.tasksListItems.push(newData);
        data.tasksListItems.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        this.dialogRef.componentInstance.data.totalRecords = this.dialogRef.componentInstance.data.tasksListItems.length;
        }
      });
      this.taskAddErr = false;
    }
    else
      this.taskAddErr = true;
  }

  additemNew(data) {
    this.dialogRef.componentInstance.data.currPage = 1;


    /*this.showAddItem = !this.showAddItem

    
      this.taskService.addTasksItem(data.list_id, 'New task created', data.clinic_id).subscribe((res) => {
        if (res.body.message == 'success') {
          let oldData = this.dialogRef.componentInstance.data.tasksListItems;
        let newData = res.body.data;
        if (oldData.length) {
          newData.readOnly = true
          oldData.push(newData);
        } else {
          oldData = newData
        }
        } else if (res.status == 401) {
          this.handleUnAuthorization();
        }
      }, error => {
        console.log('error', error)
      });
    */



    this.taskService.updateTasksItem('', data.list_id, 'New Task', data.clinic_id).subscribe((res) => {
      if (res.body.message == 'success') {
        let newData = res.body.data;
        newData.readOnly = false
        newData.task_name = '';
        this.dialogRef.componentInstance.data.tasksListItems.push(newData);
        data.tasksListItems.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        this.dialogRef.componentInstance.data.totalRecords = this.dialogRef.componentInstance.data.tasksListItems.length;
      } else if (res.status == 401) {
        this.handleUnAuthorization();
      }
    }, error => {
      console.log('error', error)
    });

  }


}



@Component({
  selector: 'app-tasklist-settings',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent extends BaseComponent implements AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  clinic_id$ = new BehaviorSubject<any>(null);
  @Input() set clinicId(value: any) {
    this.clinic_id$.next(value);
  }
  tasksListItems = null;
  dentistPageSize = 10;
  dentistTablePages: number[] = [];
  currentPage: number = 1;
  tasksList = new MatTableDataSource([]);
  dentistListLoading: boolean = false;
  displayedColumns: string[] = ['list_name', 'active', 'action'];
  editing = {};
  clinicData: any = [];
  dailyTaskEnable: boolean = false;
  dataTaskArray:any =[];
  totalRecords: string;
  currPage: number = 1;
  itemsPerPage: number =  10;

  constructor(
    private _cookieService: CookieService,
    private taskService: TaskService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private clinicSettingsService: ClinicSettingsService,
    private clinicianAnalysisService: ClinicianAnalysisService
  ) {
    super();   
  }

  ngAfterViewInit() {
    this.tasksList.sort = this.sort;
    this.tasksList.paginator = this.paginator;
    this.clinic_id$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(id => {
      if (id) {
        // this.getClinic(id);
        this.getClinic();
        this.getTasks(id);
      }
    })
  }

  handleUnAuthorization() {
    this._cookieService.put("username", '');
    this._cookieService.put("email", '');
    this._cookieService.put("userid", '');
    this.router.navigateByUrl('/login');
  }

  handlePageChange(goPage: number) {
    if (this.currentPage < goPage) {
      for (let i = this.currentPage; i < goPage; i++) {
        this.paginator.nextPage();
      }
    }
    else {
      for (let i = goPage; i < this.currentPage; i++) {
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
    this.tasksList.filter = value.trim().toLocaleLowerCase();
    let pageNum = this.tasksList.filteredData.length;
    this.setPaginationButtons(pageNum);
  }

  // getClinic(id) {
  //   this.clinicianAnalysisService.getClinics(id, 'DailyTaskEnable').subscribe((data: any) => {
  //     if (data.data) {
  //       this.dailyTaskEnable = (data.data.daily_task_enable == 1) ? true : false;
  //     }
  //   }, error => { });
  // }
  getClinic() {
    this.clinicSettingsService.getClinicData.subscribe((data: any) => {
      if (data.status == 200) {
        this.dailyTaskEnable = (data.data[0].daily_task_enable == 1) ? true : false;
      }
    }, error => { });
  }

  public apiCompleteGet:boolean = true;
  getTasks(id) {
    this.taskService.getTasks(id).subscribe((res) => {
      if (res.body.message == 'success') {
        this.apiCompleteGet = false;
        this.tasksList.data = res.body.data;
        this.setPaginationButtons(res.body.data.length);
      }
      else if (res.status == 401) {
        this.handleUnAuthorization();
      }
    }, error => {
      console.log('error', error)
    });
  }

  updateStatus(event, id, is_default) {
    var active = (event.checked == true) ? 1 : 0;
    this.taskService.updateTaskStatus(active, id, this.clinic_id$.value, is_default).subscribe((update: any) => {
      if(update.status == 200){
        this.toastr.success('Task Updated');
      }
    });
  }

  openDialog(id = '', name = '', assigned_roles = ''): void {
    if (id) {
      this.taskService.getTasksList(this.clinic_id$.value, id).subscribe((res) => {
        if (res.body.message == 'success') {
          res.body.data.end_of_day_tasks.forEach(e => {
            e.readOnly = true;
            e.clinic_id = this.clinic_id$.value;
          }); 
          this.dataTaskArray = res.body.data.end_of_day_tasks;
          this.totalRecords = this.dataTaskArray.length;  
          res.body.data.end_of_day_tasks.sort((a, b) => parseInt(b.id) - parseInt(a.id));     
          const dialogRef = this.dialog.open(DialogOverviewTasklistDialogComponent, {
            width: '500px',
            data: { list_id: id, tasksListItems: res.body.data.end_of_day_tasks, list_name: name, assigned_roles: assigned_roles.split(","), clinic_id: this.clinic_id$.value, old: name, old_assigned_roles: assigned_roles , totalRecords: this.totalRecords, currPage:this.currPage ,itemsPerPage: this.itemsPerPage}
          });
          dialogRef.afterClosed().subscribe(result => {
            this.getTasks(this.clinic_id$.value);
          });
        }
        else if (res.status == 401) {
          this.handleUnAuthorization();
        }
      }, error => {
        console.log('error', error)
      });
    } else {

      const dialogRef = this.dialog.open(DialogOverviewTasklistDialogComponent, {
        width: '500px',
        data: { list_id: id, tasksListItems: [], list_name: name, assigned_roles: assigned_roles.split(","), clinic_id: this.clinic_id$.value, old: name, old_assigned_roles: assigned_roles }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getTasks(this.clinic_id$.value);
      });
    }



  }

  public toggleMH(event) {
    var active = (event.checked == true) ? 1 : 0;
    this.dailyTaskEnable = event.checked;
    this.clinicSettingsService.updatePartialSetting(this.clinic_id$.value, active, 'daily_task_enable').subscribe((res) => {
      if (res.body.message == 'success') {
        this.toastr.success('Task Updated');
       }
    }, error => { });
  }

  deleteTask(taskId,listname) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete the task list: '+ listname,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.taskService.deleteTaskList(taskId, this.clinic_id$.value).subscribe((res) => {
          if (res.body.message == 'success') {
            this.getTasks(this.clinic_id$.value);
          }
        }, error => {
        });
      }
    });
  }

}