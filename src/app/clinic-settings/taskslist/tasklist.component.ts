import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import {
  AfterViewInit,
  Inject,
  Component,
  Input,
  ViewChild,
  ViewEncapsulation,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { concatMap, take, takeUntil } from 'rxjs/operators';
import { TasklistService as TaskService } from './tasklist.service';
import { BaseComponent } from '../base/base.component';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
  MatLegacyDialog as MatDialog,
} from '@angular/material/legacy-dialog';

import { ClinicSettingsService } from '../clinic-settings.service';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';
import { CdkDragDrop, CdkDragEnd, CdkDragStart, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';
import { MatOption } from '@angular/material/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
  styleUrls: ['./tasklist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogOverviewTasklistDialogComponent {
  private destroy = new Subject<void>();
  private destroy$ = this.destroy.asObservable();
  addTaskInput: boolean = false;
  taskAddErr: boolean = false;
  @ViewChild('allSelected') private allSelected: MatOption;
  @ViewChild('task') task: ElementRef<HTMLInputElement>;

  public assigneeData: { [key: string]: Object }[] = [
    { id: '3', name: 'Practice Manager' },
    { id: '4', name: 'Clinician' },
    { id: '5', name: 'Staff' },
    { id: '6', name: 'Owner' },
  ];
  public maxSize: number = 7;
  public labels: any = {
    previousLabel: '',
    nextLabel: '',
  };
  public showAddItem = false;
  public sortDirection = 'asc';

  constructor(
    private renderer: Renderer2,
    private dialogRef: MatDialogRef<DialogOverviewTasklistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cookieService: CookieService,
    private taskService: TaskService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.initializeSortOrder();
  }

  ngAfterViewInit() {
    this.destroy.next();
    this.destroy.complete();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onKeyPress(event: KeyboardEvent, index: number) {
    if (event.key === 'Enter') {
      this.updateItem(index);
    }
  }

  save(data) {
    if (
      data.list_name == '' ||
      data.assigned_roles == '' ||
      (data.task_name == '' && this.showAddItem)
    ) {
      return false;
    }
    var index = data.assigned_roles.indexOf('0');
    if (index !== -1) {
      data.assigned_roles.splice(index, 1);
    }
    let roles = data.assigned_roles.toString();
    this.taskService.addTask(data.list_id, data.list_name, roles, data.clinic_id).subscribe(
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

  private initializeSortOrder<T extends { sort_order: number }>() {
    if (this.data.tasksListItems.every((item: T) => item.sort_order === 0)) {
      this.data.tasksListItems.forEach((item: T, index: number) => {
        item.sort_order = index + 1;
      });
    }
    this.data.tasksListItems.sort((a: T, b: T) => a.sort_order - b.sort_order);
  }

  update(data) {
    if (
      data.list_name == '' ||
      data.assigned_roles == '' ||
      (data.task_name == '' && this.showAddItem)
    ) {
      return false;
    }
    const index = data.assigned_roles.indexOf('0');
    if (index !== -1) {
      data.assigned_roles.splice(index, 1);
    }
    let roles = data.assigned_roles.toString();

    this.taskService
      .updateTaskListSortOrder(
        data.clinic_id,
        data.tasksListItems.map(item => {
          return { id: item.id, sort_order: item.sort_order };
        }),
      )
      .pipe(
        concatMap(_ =>
          this.taskService.updateTasklist(data.list_id, data.clinic_id, data.list_name, roles),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe(res => {
        if (res.status == 200) {
          this.dialogRef.close();
        } else if (res.status == 401) {
          this.handleUnAuthorization();
        }
      });
    this.taskService.updateTasklist(data.list_id, data.clinic_id, data.list_name, roles).subscribe(
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

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.dialogRef.componentInstance.data.assigned_roles = ['0', '3', '4', '5', '6'];
    } else {
      this.dialogRef.componentInstance.data.assigned_roles = [];
    }
  }

  public toggle(event: MatCheckboxChange, index: number) {
    this.dialogRef.componentInstance.data.tasksListItems[index].is_active = event.checked ? 1 : 0;
    this.updateItem(index);
  }

  markRead(index: number): void {
    this.dialogRef.componentInstance.data.tasksListItems[index].readOnly =
      !this.dialogRef.componentInstance.data.tasksListItems[index].readOnly;
  }

  updateItem(index: number): void {
    let data = this.dialogRef.componentInstance.data.tasksListItems[index];
    if (data) {
      this.taskService
        .updateTaskItem(data.id, data.list_id, data.task_name, data.clinic_id, data.is_active)
        .pipe(take(1))
        .subscribe({
          next: res => {
            if (res.status == 200) {
              this.dialogRef.componentInstance.data.tasksListItems[index].readOnly = true;
            } else if (res.status == 401) {
              this.handleUnAuthorization();
            }
          },
          error: error => {
            console.log('error', error);
          },
        });
    }
  }

  removeItem(index: number) {
    let data = this.dialogRef.componentInstance.data.tasksListItems[index];
    if (data) {
      this.taskService.deleteTasksItem(data.id, data.clinic_id).subscribe(
        res => {
          if (res.status == 200) {
            this.dialogRef.componentInstance.data.tasksListItems.splice(index, 1);
            this.dialogRef.componentInstance.data.totalRecords =
              this.dialogRef.componentInstance.data.tasksListItems.length;
          } else if (res.status == 401) {
            this.handleUnAuthorization();
          }
        },
        error => {
          console.log('error', error);
        },
      );
    }
  }

  public onDragStarted(_: CdkDragStart) {
    this.renderer.addClass(document.body, 'no-select');
  }

  public onDragEnded(_: CdkDragEnd) {
    this.renderer.removeClass(document.body, 'no-select');
  }

  public drop(event: CdkDragDrop<any[]>) {
    if (event.previousIndex !== event.currentIndex) {
      const previousIndex = event.previousIndex;
      const currentIndex = event.currentIndex;
      moveItemInArray(this.data.tasksListItems, previousIndex, currentIndex);
      this.updateSortOrder();
    }
  }

  public updateSortOrder() {
    this.data.tasksListItems.forEach((item, index) => {
      item.sort_order = index + 1;
    });
  }

  additem() {
    this.showAddItem = !this.showAddItem;
  }

  // add task with the input  field
  addTaskIn(data) {
    let task_name = this.task.nativeElement.value;
    if (task_name) {
      const maxSortOrder = Math.max(
        ...this.dialogRef.componentInstance.data.tasksListItems.map(item => item.sort_order),
        0,
      );
      const sortOrder = maxSortOrder + 1;
      this.taskService
        .addTasksItem(data.list_id, task_name, data.clinic_id, sortOrder)
        .subscribe(res => {
          if (res.status == 200) {
            this.addTaskInput = false;
            let newData = res.body.data;
            newData.readOnly = true;
            newData.task_name = task_name;

            // newData.sort_order = sortOrder;
            this.dialogRef.componentInstance.data.tasksListItems.push(newData);

            this.initializeSortOrder();
            this.dialogRef.componentInstance.data.totalRecords =
              this.dialogRef.componentInstance.data.tasksListItems.length;
          }
        });
      this.taskAddErr = false;
    } else {
      this.taskAddErr = true;
    }
  }

  addItemNew(data) {
    this.dialogRef.componentInstance.data.currPage = 1;

    this.taskService.updateTaskItem(null, data.list_id, 'New Task', data.clinic_id).subscribe(
      res => {
        if (res.status == 200) {
          let newData = res.body.data;
          newData.readOnly = false;
          newData.task_name = '';
          this.dialogRef.componentInstance.data.tasksListItems.push(newData);
          // data.tasksListItems.sort((a, b) => parseInt(b.id) - parseInt(a.id));
          this.dialogRef.componentInstance.data.totalRecords =
            this.dialogRef.componentInstance.data.tasksListItems.length;
        } else if (res.status == 401) {
          this.handleUnAuthorization();
        }
      },
      error => {
        console.log('error', error);
      },
    );
  }
}

@Component({
  selector: 'app-tasklist-settings',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
  dataTaskArray: any = [];
  totalRecords: string;
  currPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private _cookieService: CookieService,
    private taskService: TaskService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private clinicSettingsService: ClinicSettingsService,
  ) {
    super();
  }

  ngAfterViewInit() {
    this.tasksList.sort = this.sort;
    this.tasksList.paginator = this.paginator;
    this.clinic_id$.pipe(takeUntil(this.destroyed$)).subscribe(id => {
      if (id) {
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
    let pageNum = this.tasksList.filteredData.length;
    this.setPaginationButtons(pageNum);
  };

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

  public apiCompleteGet: boolean = true;
  getTasks(id) {
    this.taskService.getTasks(id).subscribe(
      res => {
        if (res.status == 200) {
          this.apiCompleteGet = false;
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
      .subscribe((update: any) => {
        if (update.status == 200) {
          this.toastr.success('Task Updated');
        }
      });
  }

  openDialog(id = '', name = '', assigned_roles = ''): void {
    if (id) {
      this.taskService
        .getTasksList(this.clinic_id$.value, id)
        .pipe(take(1))
        .subscribe({
          next: res => {
            if (res.status == 200) {
              const data: {
                end_of_day_tasks: {
                  id: number;
                  sort_order: number;
                  task_name: string;
                  readOnly: boolean;
                  is_active: boolean;
                  list_id: number;
                  clinic_id: any;
                }[];
              } = res.body.data;
              data.end_of_day_tasks.forEach(item => {
                item.readOnly = true;
                item.clinic_id = this.clinic_id$.value;
              });
              this.dataTaskArray = res.body.data.end_of_day_tasks;
              this.totalRecords = this.dataTaskArray.length;
              const dialogRef = this.dialog.open(DialogOverviewTasklistDialogComponent, {
                width: '640px',
                data: {
                  list_id: id,
                  tasksListItems: data.end_of_day_tasks,
                  list_name: name,
                  assigned_roles: assigned_roles.split(','),
                  clinic_id: this.clinic_id$.value,
                  old: name,
                  old_assigned_roles: assigned_roles,
                  totalRecords: this.totalRecords,
                  currPage: this.currPage,
                  itemsPerPage: this.itemsPerPage,
                },
              });
              dialogRef
                .afterClosed()
                .pipe(take(1))
                .subscribe(_ => {
                  this.getTasks(this.clinic_id$.value);
                });
            } else if (res.status == 401) {
              this.handleUnAuthorization();
            }
          },
          error: error => {
            console.log('error', error);
          },
        });
    } else {
      const dialogRef = this.dialog.open(DialogOverviewTasklistDialogComponent, {
        width: '640px',
        data: {
          list_id: id,
          tasksListItems: [],
          list_name: name,
          assigned_roles: assigned_roles.split(','),
          clinic_id: this.clinic_id$.value,
          old: name,
          old_assigned_roles: assigned_roles,
        },
      });
      dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe(_ => {
          this.getTasks(this.clinic_id$.value);
        });
    }
  }

  public toggleMH(event) {
    var active = event.checked == true ? 1 : 0;
    this.dailyTaskEnable = event.checked;
    this.clinicSettingsService
      .updatePartialSetting(this.clinic_id$.value, active, 'daily_task_enable')
      .subscribe({
        next: res => {
          if (res.status == 200) {
            this.toastr.success('Task Updated');
          }
        },
        error: error => {},
      });
  }

  deleteTask(taskId, listname) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete the task list: ' + listname,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.value) {
        this.taskService.deleteTaskList(taskId, this.clinic_id$.value).subscribe(
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
