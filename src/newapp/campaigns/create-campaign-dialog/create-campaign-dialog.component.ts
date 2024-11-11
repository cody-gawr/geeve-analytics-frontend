import {Component} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface CampaignElement {
    patientName: string;
    previousCampaigns: string;
    lastAppointment: string;
    lastProvider: string;
    nextAppointment: string;
    nextProvider: string;
  }
  
  const ELEMENT_DATA: CampaignElement[] = [
    {
        patientName: 'test',
        previousCampaigns: 'test',
        lastAppointment: 'test',
        lastProvider: 'test',
        nextAppointment: 'test',
        nextProvider: 'test'
    },
    {
        patientName: 'test',
        previousCampaigns: 'test',
        lastAppointment: 'test',
        lastProvider: 'test',
        nextAppointment: 'test',
        nextProvider: 'test'
    },
    {
        patientName: 'test',
        previousCampaigns: 'test',
        lastAppointment: 'test',
        lastProvider: 'test',
        nextAppointment: 'test',
        nextProvider: 'test'
    },
    {
        patientName: 'test',
        previousCampaigns: 'test',
        lastAppointment: 'test',
        lastProvider: 'test',
        nextAppointment: 'test',
        nextProvider: 'test'
    }
  ];

@Component({
  selector: 'create-campaign-dialog',
  templateUrl: 'create-campaign-dialog.component.html',
  styleUrls: ['create-campaign-dialog.component.scss'],
  
})
export class CreateCampaignDialog {
    displayedColumns: string[] = [
        'patientName', 'previousCampaigns', 
        'lastAppointment', 'lastProvider', 
        'nextAppointment', 'nextProvider'
    ];
    dataSource = ELEMENT_DATA;

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