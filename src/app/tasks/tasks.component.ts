import { Component, ViewChild, ViewEncapsulation , OnInit} from '@angular/core';
import { KanbanModule,KanbanComponent, KanbanAllModule,CardSettingsModel, SwimlaneSettingsModel } from '@syncfusion/ej2-angular-kanban';
import { kanbanData } from './data';

@Component({
    selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TasksComponent implements OnInit{
  public data: Object[] = kanbanData;
    public cardSettings: CardSettingsModel = {
        contentField: 'Summary',
        headerField: 'Id'
    };
    public swimlaneSettings: SwimlaneSettingsModel = { keyField: 'Assignee' };
    ngOnInit() {
   
    }
    constructor()
    {     
      $('#title').html('Tasks');
    }
}