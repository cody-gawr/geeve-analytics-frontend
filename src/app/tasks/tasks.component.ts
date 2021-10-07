import {
  Component,
  ViewChild,
  ViewEncapsulation,
  OnInit,
  Inject,
} from "@angular/core";
import { extend } from "@syncfusion/ej2-base";
import {
  KanbanComponent,
  CardSettingsModel,
  DialogEventArgs,
  SwimlaneSettingsModel,
  DialogSettingsModel,
  ActionEventArgs
} from "@syncfusion/ej2-angular-kanban";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { TasksService } from "./tasks.service";
//import { kanbanData } from "./data";

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
    // contentField: "description",
    headerField: "id",
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

  public dialogSettings: DialogSettingsModel = {
    //template: '#dialogSettingsTemplate',
    fields: [
      { key: "id", type: "TextBox" }
     
    ],
  };

  public assigneefields: Object = { text: "name", value: "id" };
  public assigneeGroupfields: Object = { text: "name", value: "id" };
  public clinic_id: any = "";

  dialogOpen(args: DialogEventArgs): void {
    console.log("dialogOpen args ", args);
    console.log("args.data", args.data);
    // args.cancel = false;
  }

  dialogClose(args: DialogEventArgs): void {
    console.log("dialogClose args", args);
    console.log("args.data", args.data);
    // args.cancel = false;
  }
  // dialogSave(args: DialogEventArgs): void {
  //   console.log("dialogClose args", args);
  //   console.log("args.data", args.data);
  //   // args.cancel = true;
  // }

  ngOnInit() {}

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

  
  OnActionComplete(args:ActionEventArgs): void {

    console.log('OnActionComplete args',args);
    console.log('Kanban <b>Action Complete</b> event called<hr>');
}
  getTasks() {
    this.tasksService.getTasks(this.clinic_id).subscribe(
      (data: any) => {
        if (data.status) {
          // this.kanbanData = data.data
          this.kanbanData = extend([], data.data, null, true) as Object[];
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
        if (res.message == "success") {
          res.data.forEach((user) => {
            if (user["display_name"]) {
              this.assigneeData.push({
                id: parseInt(user["id"]),
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
    console.log("cardCount", cardCount);
    const cardDetails = {
      id: cardCount,
     
    };
    this.kanbanObj.openDialog("Add", cardDetails);
  }
}
