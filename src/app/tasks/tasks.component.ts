import { Component, ViewChild, ViewEncapsulation, OnInit } from "@angular/core";
import { extend } from "@syncfusion/ej2-base";
import {
  KanbanComponent,
  CardSettingsModel,
  DialogSettingsModel,
  SwimlaneSettingsModel,
} from "@syncfusion/ej2-angular-kanban";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";
import { TasksService } from "./tasks.service";
import {
  NgxDaterangepickerMd,
  DaterangepickerComponent,
} from "ngx-daterangepicker-material";
import * as moment from "moment";
import { DatePipe } from "@angular/common";

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
  };
  /**** Card Setting ***/
  /**** Card Setting ***/
  public dialogSettings: DialogSettingsModel = {
    template: "dialogSettingsTemplate",
  };
  /**** Dialog Setting ***/
  /**** Data Manager Setting ***/
  public dataManager: DataManager = new DataManager({
    url: "https://test-api.jeeve.com.au/test/analytics/KanbanTasks/ktGetTasks?clinic_id=86",
    insertUrl:
      "https://test-api.jeeve.com.au/test/analytics/KanbanTasks/ktSaveTasks",
    updateUrl:
      "https://test-api.jeeve.com.au/test/analytics/KanbanTasks/ktSaveTasks",
    removeUrl:
      "https://test-api.jeeve.com.au/test/analytics/KanbanTasks/delete",
    adaptor: new CustomAdaptor(),
    crossDomain: true,
  });
  /**** Data Manager Setting ***/

  public clinic_id: any = "";
  public statusData: string[] = ["Open", "InProgress", "Testing", "Done"];
  // public assigneeData: { [key: string]: Object }[] = [];
  public assigneeData: any = [];
  public assigneefields: Object = { text: "name", value: "id" };
  public assigneeGroupData: { [key: string]: Object }[] = [
    { id: 3, name: "Practice Manager" },
    { id: 4, name: "Clinician" },
    { id: 5, name: "Staff" },
    { id: 6, name: "Owner" },
  ];
  public assigneeGroupfields: Object = { text: "name", value: "id" };
  ngOnInit() {} //
  constructor(private tasksService: TasksService) {
    this.getUsers();
  }

  initiate_clinic() {
    // Calls on clinic dropdown change
    var val = $("#currentClinic").attr("cid");
    if (val != undefined && val != "all") {
      this.clinic_id = val;
    }
    $("#title").html("Tasks");
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

  addClick(): void {
    // Calls on add button
    const cardCount: number = this.kanbanObj.kanbanData.length + 1;
    const cardDetails = { status: "Open" };
    this.kanbanObj.openDialog("Add", cardDetails);
  }
}
