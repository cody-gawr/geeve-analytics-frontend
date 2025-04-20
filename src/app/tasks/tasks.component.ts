import {
  Component,
  ViewChild,
  ViewEncapsulation,
  OnInit,
  AfterViewInit,
  Input,
} from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { FormControl } from '@angular/forms';
import { CookieService, CookieOptions } from 'ngx-cookie';
import {
  KanbanComponent,
  CardSettingsModel,
  DialogSettingsModel,
  SwimlaneSettingsModel,
  ActionEventArgs,
  CardRenderedEventArgs,
  DialogEventArgs,
  ColumnsModel,
  DragEventArgs,
} from '@syncfusion/ej2-angular-kanban';
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';
import { TasksService } from './tasks.service';
import {
  NgxDaterangepickerMd,
  DaterangepickerComponent,
  DaterangepickerDirective,
} from 'ngx-daterangepicker-material';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { environment } from '../../environments/environment';
import { HeaderService } from '../layouts/full/header/header.service';

/**** Adoptor Updates ****/
class CustomAdaptor extends UrlAdaptor {
  public override beforeSend(args: DataManager, xhr: XMLHttpRequest) {
    xhr.withCredentials = true;
    super.beforeSend(args, xhr);
  }
}
/**** Adoptor Updates ****/
/**** Component Declare ****/
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
/**** Component Declare ****/

/**** Class Start ****/
export class TasksComponent implements AfterViewInit, OnInit {
  @ViewChild(DaterangepickerDirective, { static: false })
  pickerDirective: DaterangepickerDirective;
  @ViewChild(DaterangepickerComponent, { static: false })
  datePicker: DaterangepickerComponent;
  files: any[] = [];
  showNextPage: boolean = false;
  @ViewChild('kanbanObj') kanbanObj: KanbanComponent; //kanban component bind
  /**** Card Setting ***/
  public swimlaneSettings: SwimlaneSettingsModel = { keyField: 'group_by' };
  public cardSettings: CardSettingsModel = {
    template: 'cardSettingsTemplate',
    contentField: 'description',
    headerField: 'id',
    showHeader: true,
    // footerCssField:"id"
  };
  // -----------------------------
  public isIndividual = false;
  public isGroup = false;
  public isClinic = false;
  public isRecurring = false;
  // -----------------------------
  /**** Card Setting ***/
  /**** Card Setting ***/
  public dialogSettings: DialogSettingsModel = {
    template: 'dialogSettingsTemplate',
    // model: {
    //   showCloseIcon: true,
    //   cssClass: 'task-modal',
    //   width: 670,
    // },
    fields: [
      { text: 'ID', key: 'Id' },
      // { key: "Status", type: "DropDown" },
      // {
      //   key: "Estimate",
      //   type: "Numeric",
      //   validationRules: { range: [0, 1000] },
      // },
      {
        key: 'description',
        type: 'TextArea',
        validationRules: { required: true },
      },
      { key: 'title', validationRules: { required: true } },
      { key: 'due_date', validationRules: { required: true } },
      { key: 'clinic_id' },
      { key: 'assignee_group' },
      { key: 'assignee_user' },
      { key: 'user_type' },
    ],
  };

  public step: number = 1;

  public dataManager: DataManager;
  /**** Dialog Setting ***/
  /**** Data Manager Setting ***/
  getDatamanger() {
    this.dataManager = new DataManager({
      url: environment.apiUrl + '/KanbanTasks/ktGetTasks?clinic_id=' + this.clinic_id,
      insertUrl: environment.apiUrl + '/KanbanTasks/ktSaveTasks',
      updateUrl: environment.apiUrl + '/KanbanTasks/ktSaveTasks',
      removeUrl: environment.apiUrl + '/KanbanTasks/ktDelete',
      adaptor: new CustomAdaptor(),
      crossDomain: true,
      offline: false,
    });
  }
  /**** Data Manager Setting ***/
  public clinic_id: any = '';
  public user_type: any = null;
  public assignTo: number = 1;
  public statusData: string[] = ['Open', 'InProgress', 'Done'];
  public clinicsData: any[] = [];
  // public assigneeData: { [key: string]: Object }[] = [];
  public assigneeData: any = [];
  public assigneefields: Object = { text: 'name', value: 'id' };
  public assigneeGroupData: { [key: string]: Object }[] = [
    { id: 3, name: 'Practice Manager' },
    { id: 4, name: 'Clinician' },
    { id: 5, name: 'Staff' },
    { id: 6, name: 'Owner' },
  ];

  // not in use
  public assigneeGroup: { [key: string]: Object }[] = [
    { id: 0, name: '-- Select group --', checked: false, idval: '' },
    { id: 1, name: 'Clinic', checked: true, idval: 'Main1' },
    { id: 2, name: 'Account', checked: false, idval: 'Main2' },
    { id: 3, name: 'User', checked: false, idval: 'Main3' },
    { id: 4, name: 'Staff', checked: false, idval: 'Main4' },
    { id: 5, name: 'St', checked: false, idval: 'Main5' },
  ];

  public recurringData: { [key: string]: Object }[] = [
    { id: 1, name: 'Weekly' },
    { id: 2, name: 'Monthly' },
    { id: 3, name: 'Yearly' },
  ];
  public assigneeGroupfields: Object = { text: 'name', value: 'id' };
  @Input() progress = 0;
  constructor(
    private tasksService: TasksService,
    private _cookieService: CookieService,
    private headerService: HeaderService,
  ) {
    this.getUsers();
    this.getClinics();

    // this.date1 =new FormControl(moment("10-20-2020", "MM-DD-YYYY"));
  }
  public columns: ColumnsModel[] = [
    { headerText: 'To Do', keyField: 'Open' },
    { headerText: 'In Progress', keyField: 'InProgress' },
    { headerText: 'Done', keyField: 'Done' },
  ];
  ngOnInit() {} //
  ngAfterViewInit() {
    // This is for the topbar search
    this.user_type = this._cookieService.get('user_type');

    // This is for the megamenu
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  // file from browsing
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  openDatepicker() {
    this.pickerDirective.open();
  }
  radioChange(event) {
    this.assignTo = Number(event.target.value);
  }

  initiate_clinic() {
    // Calls on clinic dropdown change
    var val = $('#currentClinic').attr('cid');
    if (val != undefined && val != 'all') {
      this.clinic_id = val;
      this.getDatamanger();
    }
    $('#title').html('Task Manager');
  }

  dialogOpen(args: DialogEventArgs): void {
    $('.e-dlg-closeicon-btn').hide();
    $('.e-dialog-cancel, .e-dialog-add, .e-dialog-edit, .e-dialog-delete').on('click', () => {
      this.isIndividual = this.isClinic = this.isGroup = this.isRecurring = false;
    });

    var d = document.getElementsByClassName('e-dialog-cancel');
    $(d).addClass('mat-focus-indicator mat-raised-button mat-gray');

    this.step = 1;
    if (args.requestType == 'Edit') {
      $('.e-dlg-header').text('Edit Task');

      if (args.data.assignee_group != null) {
        this.assignTo = 4;
        this.isGroup = true;
      } else if (args.data.assignee_user != null) {
        this.assignTo = 3;
        this.isIndividual = true;
      } else if (args.data.clinic_id != null) {
        this.assignTo = 1;
        this.isClinic = true;
      } else {
        // this.assignTo = 2;
        this.isClinic = this.isIndividual = this.isGroup = this.isRecurring = false;
      }
    } else if (args.requestType === 'Add') {
      $('.e-dlg-header').text('Who is this task for?');
    }
  }

  // not in use
  nextToStep() {
    this.step = this.step + 1;
    $('.e-dlg-header').text('Add task');
    this.assignTo = 2;
  }

  // not in use
  backToStep() {
    $('.e-dlg-closeicon-btn').click();
    this.isIndividual = false;
    this.isClinic = false;
    this.isGroup = false;
    // this.step = this.step - 1;
    // $(".e-dlg-header").text("Who is this task for?");
    // this.assignTo = 1;
  }

  getUsers() {
    this.tasksService.getUsers().subscribe(
      res => {
        if (res.status == 200) {
          this.assigneeData.push({
            id: null,
            name: '-- select assignee --',
          });
          res.body.data.forEach(user => {
            if (user['displayName']) {
              this.assigneeData.push({
                id: user['id'],
                name: user['displayName'],
              });
            }
          });
        }
      },
      error => {},
    );
  }

  getClinics() {
    this.headerService.getClinic.subscribe(
      res => {
        if (res.status == 200) {
          this.clinicsData = res.body.data;
        }
      },
      error => {},
    );
    // this.tasksService.getClinics().subscribe(
    //   (res) => {
    //     if (res.status == 200) {
    //       this.clinicsData = res.body.data;
    //     }
    //   },
    //   (error) => {}
    // );
  }

  addClick(): void {
    const cardIds = this.kanbanObj.kanbanData.map(obj => parseInt(obj.id, 10));
    const cardCount: number = Math.max.apply(Math, cardIds) + 1;

    const cardDetails = { Id: cardCount, status: 'Open' };
    this.kanbanObj.openDialog('Add', cardDetails);
  }

  OnActionComplete(args: ActionEventArgs): void {
    if (args.requestType === 'cardCreated') {
      var kanbanInstance = this.kanbanObj;
      setTimeout(function () {
        kanbanInstance.refresh();
      }, 600);
    }
    // if (
    //   args.requestType === "cardCreated" ||
    //   args.requestType === "cardChanged" ||
    //   args.requestType === "cardRemoved"
    // ) {
    //   this.assignTo = 1;
    //   // var kanbanInstance = this.kanbanObj;
    //   // setTimeout(function () {
    //   //   kanbanInstance.refresh();
    //   // }, 600);
    // }
  }

  checkIdOverdue(data) {
    var ToDate = new Date();
    if (new Date(data.due_date) < ToDate && data.status != 'Done') {
      return 'warning';
    }
    return '';
  }

  onKanbanBDrag(args: DragEventArgs) {
    $(window).one('mousemove', function (e) {
      $('.e-cloned-card').offset({
        top: e.clientY - 50,
        left: e.clientX - 150,
      });
    });
  }

  // -------------------------------------
  isEnable(val) {
    if (val == 'individual') {
      this.assignTo = 3;
      this.isIndividual = true;
      this.isClinic = false;
      this.isGroup = false;
    } else if (val == 'group') {
      this.assignTo = 4;
      this.isIndividual = false;
      this.isGroup = true;
      this.isClinic = false;
    } else if (val == 'clinic') {
      this.assignTo = 1;
      this.isIndividual = false;
      this.isClinic = true;
      this.isGroup = false;
    }
  }

  toggleIsRuccring() {
    this.isRecurring = !this.isRecurring;
  }

  // -------------------------------------
}
