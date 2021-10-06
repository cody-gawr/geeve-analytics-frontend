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
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { TasksService } from "./tasks.service";

// import { kanbanData } from "./data";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class TasksComponent implements OnInit {
  @ViewChild("kanbanObj") kanbanObj: KanbanComponent;
  // public kanbanData: Object[] = extend([], [], null, true) as Object[];
  public kanbanData:any;
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
  
  ngOnInit() {
    
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
          let kanbanDataTmp: Object[] = [];
          data.data.forEach(function (dataset){
            let temp = {
              Id: dataset.id,   
              Status: dataset.status,
              Summary: dataset.description,
              Type: 'Story',
              Priority: 'Low',
              Tags: 'Analytic',
              Estimate: 3.5,
              Title: dataset.title,
              dueDate:'10/14/2021',
              Assignee: 'Nancy Davloio',
              RankId: 1,
              clinic_id:1,
              user_id:1,
              assignee_user:1,
              assignee_group:1,
              created_date:'09/14/2021',
          };
            kanbanDataTmp.push(temp);
          });
          console.log(kanbanDataTmp, '****');
          this.kanbanData = kanbanDataTmp;
          //this.kanbanData = extend([], kanbanDataTmp, null, true) as Object[];
          //console.log(this.kanbanData);
        }
      },
      (error) => {
        alert("Something Went Wrong.");
      }
    );
  }

  getUsers() {
    this.tasksService.getUsers().subscribe(
      (res) => {
        console.log("res data", res);
        if (res.message == "success") {
        }
      },
      (error) => {}
    );
  }

  addClick(): void {
    /*  const cardIds = this.kanbanObj.kanbanData.map((obj: { [key: string]: string }) => parseInt(obj.Id.replace('Task ', ''), 10));
    const cardCount: number = Math.max.apply(Math, cardIds) + 1;*/
    const cardCount = 1;
    const cardDetails = {
      Id: cardCount,
      Status: "Open",
      Priority: "Normal",
      Assignee: "Andrew Fuller",
      Estimate: 0,
      Tags: "",
      Summary: "",
      Title: "",
    };
    this.kanbanObj.openDialog("Add", cardDetails);
  }

  onClear(): void {
    document.getElementById("EventLog").innerHTML = "";
  }

  OnCreate(): void {
    console.log("Kanban <b>Load</b> event called<hr>");
    console.log("Kanban - " + this.kanbanObj);
  }

  OnActionBegin(): void {
    console.log("Kanban <b>Action Begin</b> event called<hr>");
  }

  OnActionComplete(): void {
    console.log("Kanban <b>Action Complete</b> event called<hr>");
  }

  OnActionFailure(): void {
    console.log("Kanban <b>Action Failure</b> event called<hr>");
  }

  OnDataBinding(event): void {
    console.log("Kanban <b>Data Binding</b> event called<hr>" + event);
    console.log("Kanban <b>Data Binding</b> event called<hr>");
  }

  OnDataBound(): void {
    console.log("Kanban <b>Data Bound</b> event called<hr>");
  }

  OnCardRendered(args: CardRenderedEventArgs): void {
    console.log("args", args);
    // console.log('args.data',args.data);
    // console.log(
    //   "Kanban - " +
    //     (args.data as { [key: string]: Object }).Id +
    //     " - <b>Card Rendered</b> event called<hr>"
    // );
  }

  OnQueryCellInfo(): void {
    console.log("Kanban <b>Query Cell Info</b> event called<hr>");
  }

  OnCardClick(args: CardClickEventArgs): void {
    console.log(
      "Kanban - " +
        (args.data as { [key: string]: Object }).Id +
        " - <b>Card Click</b> event called<hr>"
    );
  }

  OnCardDoubleClick(args: CardClickEventArgs): void {
    console.log("args", args);
    // console.log('args data',args.data)
    // console.log(
    //   "Kanban - " +
    //     (args.data as { [key: string]: Object }).Id +
    //     " - <b>Card Double Click</b> event called<hr>"
    // );
  }

  OnDragStart(): void {
    console.log("Kanban <b>Drag Start</b> event called<hr>");
  }

  OnDrag(): void {
    console.log("Kanban <b>Drag</b> event called<hr>");
  }

  OnDragStop(): void {
    console.log("Kanban <b>Drag Stop</b> event called<hr>");
  }
}
