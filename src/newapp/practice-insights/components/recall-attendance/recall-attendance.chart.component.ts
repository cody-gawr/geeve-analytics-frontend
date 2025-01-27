import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import moment from "moment";

@Component({
    selector: 'pi-recall-attendance-chart',
    templateUrl: './recall-attendance.chart.component.html',
    styleUrls: ['./recall-attendance.chart.component.scss'],
})
export class PracticeInsightRecallAttendanceComponent implements OnInit, OnDestroy {
    chartTitle = 'Recall Attendance';
    chartTabs = ['6 Months', '7 Months', '12 Months'];
    activeTab = '6 Months';
    chartType = 'arch';
    toolTip = 'Recall Attendance';
    noDataAlertMessage = 'You have no data for Recall Attendance!';
    durationCurrLabel = 'Current';
    date = new FormControl(moment());

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }

    switchActiveTab(tab: string){
        this.activeTab = tab;
    }
}
