import { Component, ViewChild, ViewEncapsulation, OnInit } from "@angular/core";
import { extend } from "@syncfusion/ej2-base";
import {
  KanbanModule,
  KanbanComponent,
  KanbanAllModule,
  CardSettingsModel,
  CardRenderedEventArgs,
  DialogSettingsModel,
  DialogEventArgs,
  CardClickEventArgs,
  SwimlaneSettingsModel,
} from "@syncfusion/ej2-angular-kanban";
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";
// import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { TasksService } from "./tasks.service";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class TasksComponent implements OnInit {
  @ViewChild("kanbanObj") kanbanObj: KanbanComponent;
  public kanbanData: Object[] = [];
  public cardSettings: CardSettingsModel = {
    contentField: "description",
    headerField: "title",
  };
  public swimlaneSettings: SwimlaneSettingsModel = { keyField: "Assignee" };
  public statusData: string[] = ["Open", "InProgress", "Testing", "Close"];
  public priorityData: string[] = [
    "Low",
    "Normal",
    "Critical",
    "Release Breaker",
    "High",
  ];
  public dateValue: Date = new Date();
  public dateValue2 = "10/7/2021";
  public assigneeData: { [key: string]: Object }[] = [];
  public assigneeGroupData: { [key: string]: Object }[] = [
    { id: 3, name: "Practice Manager" },
    { id: 4, name: "Clinician" },
    { id: 5, name: "Staff" },
    { id: 6, name: "Owner" },
  ];
  public assigneefields: Object = { text: "name", value: "id" };
  public assigneeGroupfields: Object = { text: "name", value: "id" };
  public clinic_id: any = "";
  public dataManager: DataManager = new DataManager({
    url: "https://test-api.jeeve.com.au/test/analytics/KanbanTasks/ktGetTasks?clinic_id=86",
    updateUrl: "updateUrl/gaurav",
    insertUrl: "insertUrl/gaurav",
    removeUrl: "removeUrl/gaurav",
    crudUrl: "crudUrl/gaurav",
    adaptor: new UrlAdaptor(),
    crossDomain: true,
  });

  ngOnInit() {
    //   new DataManager({ url: SERVICE_URI }).executeQuery(new Query().take(6)).then((e: ReturnOption) => {
    //     this.items = e.result as object[];
    // }).catch((e) => true);
    //   https://test-api.jeeve.com.au/test/analytics/KanbanTasks/ktGetTasks?clinic_id=86
  }

  constructor(private tasksService: TasksService) {}

  initiate_clinic() {
    var val = $("#currentClinic").attr("cid");

    if (val != undefined && val != "all") {
      this.clinic_id = val;
      this.getTasks();
      this.getUsers();
    }
    $("#title").html("Tasks");
  }

  getTasks() {
    this.tasksService.getTasks(this.clinic_id).subscribe(
      (data: any) => {
        if (data.status) {
          // this.kanbanData = data.data
          this.kanbanData = extend([], data.data, null, true) as Object[];
          // this.kanbanObj.kanbanData = extend([], data.data, null, true) as Object[];

          // this.OnCreate()
          // this.OnDataBound()
        }
      },
      (error) => {
        alert("Something Went Wrong.");
      }
    );
    console.log(this.kanbanData);
  }

  getUsers() {
    this.tasksService.getUsers().subscribe(
      (res) => {
        if (res.message == "success") {
          res.data.forEach((user) => {
            if (user["display_name"]) {
              this.assigneeData.push({
                id: user["id"],
                name: user["display_name"],
              });
            }
          });
        }
      },
      (error) => {}
    );
  }

  addClick(): void {
    /*  const cardIds = this.kanbanObj.kanbanData.map((obj: { [key: string]: string }) => parseInt(obj.Id.replace('Task ', ''), 10));*/
    const cardCount: number = this.kanbanObj.kanbanData.length + 1;
    const cardDetails = {
      id: cardCount,
      status: "Open",
      // Priority: "Normal",
      // Assignee: "Andrew Fuller",
      description: "",
      title: "",
    };
    this.kanbanObj.openDialog("Add", cardDetails);
  }
}
