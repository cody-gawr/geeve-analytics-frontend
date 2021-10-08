import { Component, ViewChild, ViewEncapsulation , OnInit} from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, CardSettingsModel,DialogSettingsModel,SwimlaneSettingsModel  } from '@syncfusion/ej2-angular-kanban';
import { DataManager,UrlAdaptor,Query } from '@syncfusion/ej2-data';


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
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  encapsulation: ViewEncapsulation.None
})
/**** Component Declare ****/

/**** Class Start ****/
export class TasksComponent implements OnInit{
  @ViewChild('kanbanObj') kanbanObj: KanbanComponent; //kanban component bind
  /**** Card Setting ***/
  public swimlaneSettings: SwimlaneSettingsModel = { keyField: "status" };
  public cardSettings: CardSettingsModel = {
    template: 'cardSettingsTemplate',
    contentField: 'description',
    headerField: 'id'    
  };
  /**** Card Setting ***/
  /**** Card Setting ***/
  public dialogSettings: DialogSettingsModel = {
    template: 'dialogSettingsTemplate'
  };
  /**** Dialog Setting ***/
  /**** Data Manager Setting ***/
  public dataManager: DataManager  = new DataManager({
      url: 'https://test-api.jeeve.com.au/test/analytics/KanbanTasks/ktGetTasks?clinic_id=86',     
      insertUrl: 'https://test-api.jeeve.com.au/test/analytics/KanbanTasks/ktSaveTasks',     
      updateUrl: 'https://test-api.jeeve.com.au/test/analytics/KanbanTasks/ktSaveTasks',     
      removeUrl: 'https://test-api.jeeve.com.au/test/analytics/KanbanTasks/delete',     
      adaptor: new CustomAdaptor,
      crossDomain: true
  }); 
  /**** Data Manager Setting ***/

  public statusData: string[] = ['Open', 'InProgress', 'Testing', 'Done'];
  public assigneeData: string[] = [
    'Nancy Davloio', 'Andrew Fuller', 'Janet Leverling',
    'Steven walker', 'Robert King', 'Margaret hamilt', 'Michael Suyama'
  ];
  public clinic_id:any = '';
  ngOnInit() {} //
  constructor(){}
  initiate_clinic() { // Calls on clinic dropdown change
    var val = $('#currentClinic').attr('cid');
    if(val != undefined && val !='all') {
      this.clinic_id = val;
    }
    $('#title').html('Tasks'); 
  }

  addClick(): void { // Calls on add button
    const cardCount = 1;
    const cardDetails = {id:1, status: 'Open'};
    this.kanbanObj.openDialog('Add', cardDetails);
  }
}