import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface CampaignElement {
    patientName: string;
    previousCampaigns: string;
    lastAppointment: string;
    lastProvider: string;
    nextAppointment: string;
    nextProvider: string;
  }
  
@Component({
  selector: 'create-campaign',
  templateUrl: 'create-campaign.component.html',
  styleUrls: ['create-campaign.component.scss'],
  
})
export class CreateCampaignComponent implements AfterViewInit {

    constructor(){
        const data = [];
        for(let i = 0; i < 200; i++){
            data.push(    {
                patientName: 'test',
                previousCampaigns: 'test',
                lastAppointment: 'test',
                lastProvider: 'test',
                nextAppointment: 'test',
                nextProvider: 'test'
            });
        }
        this.dataSource = new MatTableDataSource(data);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = [
        'patientName', 'previousCampaigns', 
        'lastAppointment', 'lastProvider', 
        'nextAppointment', 'nextProvider'
    ];
    dataSource: MatTableDataSource<CampaignElement>;

    todo = [
        {
            iconName: 'medical_services',
            title: 'Treatment'
        },
        {
            iconName: 'list_alt',
            title: 'Incomplete TX Plans'
        },
        {
            iconName: 'health_and_safety',
            title: 'Health Insurance'
        },
        {
            iconName: 'schedule',
            title: 'Overdues'
        },
        {
            iconName: 'personal_injury',
            title: 'Patient Age'
        }
    ];

    done = [];
  
    drop(event: CdkDragDrop<string[]>) {
        console.log(event)
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
          );
        }
    }
}