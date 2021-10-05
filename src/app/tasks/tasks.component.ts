import { Component, ViewChild, ViewEncapsulation , OnInit} from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { KanbanModule,KanbanComponent, KanbanAllModule,CardSettingsModel, SwimlaneSettingsModel } from '@syncfusion/ej2-angular-kanban';
import { kanbanData } from './data';

@Component({
    selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TasksComponent implements OnInit{
  @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
  public kanbanData: Object[] = extend([], kanbanData, null, true) as Object[];
    public cardSettings: CardSettingsModel = {
        contentField: 'Summary',
        headerField: 'Id'
    };
    public swimlaneSettings: SwimlaneSettingsModel = { keyField: 'Assignee' };
    public statusData: string[] = ['Open', 'InProgress', 'Testing', 'Close'];
    public priorityData: string[] = ['Low', 'Normal', 'Critical', 'Release Breaker', 'High'];
    public assigneeData: string[] = [
      'Nancy Davloio', 'Andrew Fuller', 'Janet Leverling',
      'Steven walker', 'Robert King', 'Margaret hamilt', 'Michael Suyama'
    ];
  public clinic_id:any = '';
    ngOnInit() {
   
    }
    constructor()
    {     
    
    }

    initiate_clinic() {
      var val = $('#currentClinic').attr('cid');
      if(val != undefined && val !='all') {
        this.clinic_id = val;
      }
      $('#title').html('Tasks'); 
    }

   addClick(): void {
  /*  const cardIds = this.kanbanObj.kanbanData.map((obj: { [key: string]: string }) => parseInt(obj.Id.replace('Task ', ''), 10));
    const cardCount: number = Math.max.apply(Math, cardIds) + 1;*/
    const cardCount = 1;
    const cardDetails = {
      Id: 'Task ' + cardCount, Status: 'Open', Priority: 'Normal',
      Assignee: 'Andrew Fuller', Estimate: 0, Tags: '', Summary: ''
    };
    this.kanbanObj.openDialog('Add', cardDetails);
  }

  OnActionComplete(): void {
    alert('Event Fire');
  }
}