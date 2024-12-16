import { environment } from "@/environments/environment";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subject } from 'rxjs';

@Component({
    selector: 'app-switch-menu',
    templateUrl: './app-switch-menu.component.html',
    styleUrls: ['./app-switch-menu.component.scss'],
})
export class AppSwitchMenu implements OnInit, OnDestroy {
    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();
    @Input() clinicId = 0;
    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }

    goToPay() {
        window.location.href=environment.payUrl + '?switchClinicId=' + this.clinicId;
    }
    
    goToAnalytics() {
        // window.location.href='https://test-analytics.jeeve.com';
    }
}