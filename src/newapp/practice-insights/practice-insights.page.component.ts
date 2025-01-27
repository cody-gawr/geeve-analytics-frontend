import { Component, OnDestroy, OnInit } from "@angular/core";
import { ClinicFacade } from "../clinic/facades/clinic.facade";

@Component({
    selector: 'practice-insights-page',
    templateUrl: './practice-insights.page.component.html',
    styleUrls: ['./practice-insights.page.component.scss'],
})
export class PracticeInsightPageComponent implements OnInit, OnDestroy {

    constructor(
        private clinicFacade: ClinicFacade,
    ){}

    get clinicId$() {
        return this.clinicFacade.currentClinicId$;
    }

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }
}
