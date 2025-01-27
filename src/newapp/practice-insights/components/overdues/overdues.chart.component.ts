import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: 'pi-overdues-chart',
    templateUrl: './overdues.chart.component.html',
    styleUrls: ['./overdues.chart.component.scss'],
})
export class PracticeInsightOverduesComponent implements OnInit, OnDestroy {
    toolTip = 'Customer Lifetime Value';
    chartTitle = 'Customer Lifetime Value';
    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }
}
