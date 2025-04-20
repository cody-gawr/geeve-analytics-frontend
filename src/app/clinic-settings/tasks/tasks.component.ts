import {
  AfterViewInit,
  Inject,
  Component,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TaskService } from './tasks.service';
import { BaseComponent } from '../base/base.component';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
  MatLegacyDialog as MatDialog,
} from '@angular/material/legacy-dialog';
import { ClinicSettingsService } from '../clinic-settings.service';
//import { ClinicianAnalysisService } from '../../dashboards/cliniciananalysis/cliniciananalysis.service';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
  encapsulation: ViewEncapsulation.None,
})
export class DialogOverviewExampleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cookieService: CookieService,
    private taskService: TaskService,
    private router: Router,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(data) {
    if ((data.id && data.old == data.task_name) || data.task_name == '') {
      return false;
    }

    this.taskService.addTask(data.id, data.task_name, data.clinic_id).subscribe(
      res => {
        if (res.status == 200) {
          this.dialogRef.close();
        } else if (res.status == 401) {
          this.handleUnAuthorization();
        }
      },
      error => {
        console.log('error', error);
      },
    );
    return true;
  }

  validate() {}

  handleUnAuthorization() {
    this._cookieService.put('username', '');
    this._cookieService.put('email', '');
    this._cookieService.put('userid', '');
    this.router.navigateByUrl('/login');
  }
}

@Component({
  selector: 'app-tasks-settings',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent extends BaseComponent implements AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  clinic_id$ = new BehaviorSubject<any>(null);
  @Input() set clinicId(value: any) {
    this.clinic_id$.next(value);
  }
  dentistPageSize = 10;
  dentistTablePages: number[] = [];
  currentPage: number = 1;
  tasksList = new MatTableDataSource([]);
  dentistListLoading: boolean = false;
  displayedColumns: string[] = ['task_name', 'active', 'action'];
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
    // private clinicianAnalysisService: ClinicianAnalysisService
  ) {
    super();
  }

  ngAfterViewInit() {
    this.tasksList.sort = this.sort;
    this.tasksList.paginator = this.paginator;
    this.clinic_id$.pipe(takeUntil(this.destroyed$)).subscribe(id => {
      if (id) {
        // this.getClinic(id);
        this.getClinic();
        this.getTasks(id);
      }
    });
  }

  handleUnAuthorization() {
    this._cookieService.put('username', '');
    this._cookieService.put('email', '');
    this._cookieService.put('userid', '');
    this.router.navigateByUrl('/login');
  }

  handlePageChange(goPage: number) {
    if (this.currentPage < goPage) {
      for (let i = this.currentPage; i < goPage; i++) {
        this.paginator.nextPage();
      }
    } else {
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
  };

  // getClinic(id) {
  //   this.clinicianAnalysisService.getClinics(id, 'DailyTaskEnable').subscribe((data: any) => {
  //     if (data.body.data) {
  //       this.dailyTaskEnable = (data.body.data.daily_task_enable == 1) ? true : false;
  //     }
  //   }, error => { });
  // }
  getClinic() {
    this.clinicSettingsService.getClinicData.subscribe(
      (data: any) => {
        if (data.status == 200) {
          this.dailyTaskEnable = data.body.data[0].daily_task_enable == 1 ? true : false;
        }
      },
      error => {},
    );
  }

  getTasks(id) {
    this.taskService.getTasks(id).subscribe(
      res => {
        if (res.status == 200) {
          this.tasksList.data = res.body.data;
          this.setPaginationButtons(res.body.data.length);
        } else if (res.status == 401) {
          this.handleUnAuthorization();
        }
      },
      error => {
        console.log('error', error);
      },
    );
  }

  updateStatus(event, id, is_default) {
    var active = event.checked == true ? 1 : 0;
    this.taskService
      .updateTaskStatus(active, id, this.clinic_id$.value, is_default)
      .subscribe((update: any) => {});
  }

  openDialog(id = '', name = ''): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '500px',
      data: {
        id: id,
        task_name: name,
        clinic_id: this.clinic_id$.value,
        old: name,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getTasks(this.clinic_id$.value);
    });
  }

  public toggleMH(event) {
    var active = event.checked == true ? 1 : 0;
    this.dailyTaskEnable = event.checked;
    this.clinicSettingsService
      .updatePartialSetting(this.clinic_id$.value, active, 'daily_task_enable')
      .subscribe(
        res => {
          if (res.status == 200) {
          }
        },
        error => {},
      );
  }

  deleteTask(taskId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete Task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.value) {
        this.clinicSettingsService.deleteDailyTask(this.clinic_id$.value, taskId).subscribe(
          res => {
            if (res.status == 200) {
              this.getTasks(this.clinic_id$.value);
            }
          },
          error => {},
        );
      }
    });
  }
}
