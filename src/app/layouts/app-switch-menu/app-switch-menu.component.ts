import { environment } from "@/environments/environment";
import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Subject } from 'rxjs';

@Component({
    selector: 'app-switch-menu-old',
    templateUrl: './app-switch-menu.component.html',
    styleUrls: ['./app-switch-menu.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
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