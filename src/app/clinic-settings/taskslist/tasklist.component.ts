import { AfterViewInit, Inject, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
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
  encapsulation: ViewEncapsulation.None
})


export class DialogOverviewTasklistDialogComponent {
  @ViewChild('allSelected') private allSelected
  constructor(public dialogRef: MatDialogRef<DialogOverviewTasklistDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _cookieService: CookieService, private taskService: TaskService, private router: Router) { }
  public assigneeData: { [key: string]: Object }[] = [
    { id: '3', name: "Practice Manager" },
    { id: '4', name: "Clinician" },
    { id: '5', name: "Staff" },
    { id: '6', name: "Owner" },
  ];
  public showAddItem = false;
  onNoClick(): void {
    this.dialogRef.close();
  }

  save(data) {

    // if (((data.id && data.old == data.list_name) || (data.id && data.old_assigned_roles == data.assigned_roles.toString())) || (data.list_name == '' || data.assigned_roles == '')) {
    //   return false;
    // }

    if (data.list_name == '' || data.assigned_roles == '' || (data.task_name == '' && this.showAddItem)) {
      return false;
    }
    var index = data.assigned_roles.indexOf('0');
    if (index !== -1) {
      data.assigned_roles.splice(index, 1);
    }
    let roles = data.assigned_roles.toString();
    this.taskService.addTask(data.id, data.list_name, roles, data.clinic_id).subscribe((res) => {
      if (res.message == 'success') {
        this.dialogRef.close();
      } else if (res.status == '401') {
        this.handleUnAuthorization();
      }
    }, error => {
      console.log('error', error)
    });
    if (data.task_name) {
      this.taskService.addTasksItem(data.id, data.task_name, data.clinic_id).subscribe((res) => {
        if (res.message == 'success') {
          this.dialogRef.close();
        } else if (res.status == '401') {
          this.handleUnAuthorization();
        }
      }, error => {
        console.log('error', error)
      });
    }
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

  markRead(i) {
    this.dialogRef.componentInstance.data.tasksListItems[i].readOnly = !this.dialogRef.componentInstance.data.tasksListItems[i].readOnly
  }

  updateItem(i) {

    let data = this.dialogRef.componentInstance.data.tasksListItems[i];
    if (data) {
      this.taskService.updateTasksItem(data.id, data.list_id, data.task_name, data.clinic_id).subscribe((res) => {
        if (res.message == 'success') {
          this.dialogRef.componentInstance.data.tasksListItems[i].readOnly = true
        } else if (res.status == '401') {
          this.handleUnAuthorization();
        }
      }, error => {
        console.log('error', error)
      });
    }
    // this.dialogRef.componentInstance.data.tasksListItems[i].readOnly = !this.dialogRef.componentInstance.data.tasksListItems[i].readOnly
  }
  removeItem(i) {
<<<<<<< HEAD
    let data = this.dialogRef.componentInstance.data.tasksListItems[i];
    if (data) {
      this.taskService.deleteTasksItem(data.id, data.clinic_id).subscribe((res) => {
        if (res.message == 'success') {
          this.dialogRef.componentInstance.data.tasksListItems.splice(i, 1);
        } else if (res.status == '401') {
          this.handleUnAuthorization();
        }
      }, error => {
        console.log('error', error)
      });
    }
=======
    this.dialogRef.componentInstance.data.tasksListItems.splice(i, 1);
>>>>>>> bfed29ac760d2609f7dfd186da0de5152ad5c0f2
  }

  additem() {
    this.showAddItem = (this.showAddItem) ? false : true
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
        this.getClinic(id);
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
  }

  getClinic(id) {
    this.clinicianAnalysisService.getClinics(id, 'DailyTaskEnable').subscribe((data: any) => {
      if (data.data) {
        this.dailyTaskEnable = (data.data.daily_task_enable == 1) ? true : false;
      }
    }, error => { });
  }

  getTasks(id) {
    this.taskService.getTasks(id).subscribe((res) => {
      if (res.message == 'success') {
        this.tasksList.data = res.data;
        this.setPaginationButtons(res.data.length);
      }
      else if (res.status == '401') {
        this.handleUnAuthorization();
      }
    }, error => {
      console.log('error', error)
    });
  }

  getTasksList(clinicId, id) {

  }

  updateStatus(event, id, is_default) {
    var active = (event.checked == true) ? 1 : 0;
    this.taskService.updateTaskStatus(active, id, this.clinic_id$.value, is_default).subscribe((update: any) => {

    });
  }

  openDialog(id = '', name = '', assigned_roles = ''): void {
    if (id) {
      this.taskService.getTasksList(this.clinic_id$.value, id).subscribe((res) => {
        if (res.message == 'success') {
          res.data.end_of_day_tasks.forEach(e => {
            e.readOnly = true;
            e.clinic_id = this.clinic_id$.value;
          });
          const dialogRef = this.dialog.open(DialogOverviewTasklistDialogComponent, {
            width: '500px',
            data: { id: id, tasksListItems: res.data.end_of_day_tasks, list_name: name, assigned_roles: assigned_roles.split(","), clinic_id: this.clinic_id$.value, old: name, old_assigned_roles: assigned_roles }
          });
          dialogRef.afterClosed().subscribe(result => {
            this.getTasks(this.clinic_id$.value);
          });
        }
        else if (res.status == '401') {
          this.handleUnAuthorization();
        }
      }, error => {
        console.log('error', error)
      });
    } else {

      const dialogRef = this.dialog.open(DialogOverviewTasklistDialogComponent, {
        width: '500px',
        data: { id: id, tasksListItems: [], list_name: name, assigned_roles: assigned_roles.split(","), clinic_id: this.clinic_id$.value, old: name, old_assigned_roles: assigned_roles }
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
      if (res.message == 'success') { }
    }, error => { });
  }

  deleteTask(taskId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete Task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.clinicSettingsService.deleteDailyTask(this.clinic_id$.value, taskId).subscribe((res) => {
          if (res.message == 'success') {
            this.getTasks(this.clinic_id$.value);
          }
        }, error => {
        });
      }
    });
  }

}