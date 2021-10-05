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
import { DropDownList } from "@syncfusion/ej2-dropdowns";

import { kanbanData } from "./data";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
  encapsulation: ViewEncapsulation.None,
})

export class TasksComponent implements OnInit {
  @ViewChild("kanbanObj") kanbanObj: KanbanComponent;
  public kanbanData: Object[] = extend([], kanbanData, null, true) as Object[];
  public cardSettings: CardSettingsModel = {
    contentField: "Summary",
    headerField: "Title",
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
  public assigneeData: string[] = [
    "Nancy Davloio",
    "Andrew Fuller",
    "Janet Leverling",
    "Steven walker",
    "Robert King",
    "Margaret hamilt",
    "Michael Suyama",
  ];
  ngOnInit() {}
  constructor() {
    $("#title").html("Tasks");
  }

  addClick(): void {
    const cardIds = this.kanbanObj.kanbanData.length;
    const cardCount: number = cardIds + 1;
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
    console.log(
      "Kanban - " + this.kanbanObj       
        
    );
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
    console.log("Kanban <b>Data Binding</b> event called<hr>"+event);
    console.log("Kanban <b>Data Binding</b> event called<hr>");
  }

  OnDataBound(): void {
    console.log("Kanban <b>Data Bound</b> event called<hr>");    
    
  }

  OnCardRendered(args: CardRenderedEventArgs): void {
    console.log('args',args);    
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
    console.log('args',args)
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
