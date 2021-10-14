import {
  Component,
  ViewChild,
  ViewEncapsulation,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { extend } from "@syncfusion/ej2-base";
import {
  KanbanComponent,
  CardSettingsModel,
  DialogSettingsModel,
  SwimlaneSettingsModel,
  ActionEventArgs,
  CardRenderedEventArgs,
  DialogEventArgs,
} from "@syncfusion/ej2-angular-kanban";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";
import { TasksService } from "./tasks.service";
import {
  NgxDaterangepickerMd,
  DaterangepickerComponent,
} from "ngx-daterangepicker-material";
import * as moment from "moment";
import { DatePipe } from "@angular/common";
import { MatDatepickerModule } from "@angular/material/datepicker";

/**** Adoptor Updates ****/
class CustomAdaptor extends UrlAdaptor {
  public beforeSend(args: DataManager, xhr: XMLHttpRequest) {
    xhr.withCredentials = true;
    super.beforeSend(args, xhr);
  }
}
/**** Adoptor Updates ****/
/**** Component Declare ****/
@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
  encapsulation: ViewEncapsulation.None,
})
/**** Component Declare ****/

/**** Class Start ****/
export class TasksComponent implements OnInit {
  @ViewChild(DaterangepickerComponent, { static: false })
  datePicker: DaterangepickerComponent;
  @ViewChild("kanbanObj") kanbanObj: KanbanComponent; //kanban component bind
  /**** Card Setting ***/
  public swimlaneSettings: SwimlaneSettingsModel = { keyField: "status" };
  public cardSettings: CardSettingsModel = {
    template: "cardSettingsTemplate",
    contentField: "description",
    headerField: "id",
    // showHeader:false
  };
  /**** Card Setting ***/
  /**** Card Setting ***/
  public dialogSettings: DialogSettingsModel = {
    template: "dialogSettingsTemplate",
    fields: [
      { text: "ID", key: "Id" },
      // { key: "Status", type: "DropDown" },
      // {
      //   key: "Estimate",
      //   type: "Numeric",
      //   validationRules: { range: [0, 1000] },
      // },
      {
        key: "description",
        type: "TextArea",
        validationRules: { required: true },
      },
      { key: "title", validationRules: { required: true } },
      { key: "due_date", validationRules: { required: true } },
    ],
  };

  public dataManager: DataManager;
  /**** Dialog Setting ***/
  /**** Data Manager Setting ***/
  getDatamanger() {
    this.dataManager = new DataManager({
      url:
        "https://test-api.jeeve.com.au/test/analytics/KanbanTasks/ktGetTasks?clinic_id=" +
        this.clinic_id,
      insertUrl:
        "https://test-api.jeeve.com.au/test/analytics/KanbanTasks/ktSaveTasks",
      updateUrl:
        "https://test-api.jeeve.com.au/test/analytics/KanbanTasks/ktSaveTasks",
      removeUrl:
        "https://test-api.jeeve.com.au/test/analytics/KanbanTasks/delete",
      adaptor: new CustomAdaptor(),
      crossDomain: true,
    });
  }
  /**** Data Manager Setting ***/

  public clinic_id: any = "";
  public assignTo: number = 1;
  public statusData: string[] = ["Open", "InProgress", "Testing", "Done"];
  public clinicsData: any[] = [];
  // public assigneeData: { [key: string]: Object }[] = [];
  public assigneeData: any = [];
  public assigneefields: Object = { text: "name", value: "id" };
  public assigneeGroupData: { [key: string]: Object }[] = [
    { id: 3, name: "Practice Manager" },
    { id: 4, name: "Clinician" },
    { id: 5, name: "Staff" },
    { id: 6, name: "Owner" },
  ];
  public assigneeGroup: { [key: string]: Object }[] = [
    { id: 1, name: "Clinic", checked: true, idval: "Main1" },
    { id: 2, name: "Account", checked: false, idval: "Main2" },
    { id: 3, name: "User", checked: false, idval: "Main3" },
    { id: 4, name: "Staff", checked: false, idval: "Main4" },
  ];
  public assigneeGroupfields: Object = { text: "name", value: "id" };
  ngOnInit() {} //
  constructor(private tasksService: TasksService) {
    this.getUsers();
    this.getClinics();
    console.log("active assign to", this.assignTo);
  }

  radioChange(event) {
    this.assignTo = Number(event.target.value);
    console.log("this.assignTo", typeof this.assignTo);
    console.log("this.assignTo", this.assignTo);
    console.log("this.event.target.value", event.target.value);
  }

  initiate_clinic() {
    // Calls on clinic dropdown change
    var val = $("#currentClinic").attr("cid");
    if (val != undefined && val != "all") {
      this.clinic_id = val;
      this.getDatamanger();
    }
    $("#title").html("Tasks");
  }

  dialogOpen(args: DialogEventArgs): void {
    console.log(args.data);
    if (args.requestType == "Edit") {
      if (args.data.assignee_group != null) {
        this.assignTo = 4;
      } else if (args.data.assignee_user != null) {
        this.assignTo = 3;
      } else if (args.data.clinic_id != null) {
        this.assignTo = 1;
      } else {
        this.assignTo = 2;
      }
    } else {
      this.assignTo = 1;
    }
  }

  getUsers() {
    this.tasksService.getUsers().subscribe(
      (res) => {
        if (res.message == "success") {
          res.data.forEach((user) => {
            if (user["displayName"]) {
              this.assigneeData.push({
                id: user["id"],
                name: user["displayName"],
              });
            }
          });
        }
        console.log("this.assigneeData", this.assigneeData);
      },
      (error) => {}
    );
  }

  getClinics() {
    this.tasksService.getClinics().subscribe(
      (res) => {
        if (res.message == "success") {
          this.clinicsData = res.data;
        }
      },
      (error) => {}
    );
  }

  addClick(): void {
    // Calls on add button
    const cardIds = this.kanbanObj.kanbanData.map((obj) =>
      parseInt(obj.id, 10)
    );
    const cardCount: number = Math.max.apply(Math, cardIds) + 1;
    const cardDetails = { Id: cardCount, status: "Open" };
    this.kanbanObj.openDialog("Add", cardDetails);
  }

  OnActionComplete(args: ActionEventArgs): void {
    if (
      args.requestType === "cardCreated" ||
      args.requestType === "cardChanged" ||
      args.requestType === "cardRemoved"
    ) {
      this.assignTo = 1;
      var kanbanInstance = this.kanbanObj;
      setTimeout(function () {
        kanbanInstance.refresh();
      }, 1000);
    }
  }

  //   OnCardRendered(args: CardRenderedEventArgs): void {
  //     console.log('Kanban - ' + (args.data as { [key: string]: Object }).Id + ' - <b>Card Rendered</b> event called<hr>');
  // }
}
