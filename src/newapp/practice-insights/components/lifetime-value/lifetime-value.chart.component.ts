import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: 'pi-lifetime-value-chart',
    templateUrl: './lifetime-value.chart.component.html',
    styleUrls: ['./lifetime-value.chart.component.scss'],
})
export class PracticeInsightLifeTimeValueComponent implements OnInit, OnDestroy {
    toolTip = 'Current Overdues';
    chartTitle = 'Current Overdues';
    durationCurrLabel = 'Current';
    noDataAlertMessage = 'Coming Soon';
    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }
}
