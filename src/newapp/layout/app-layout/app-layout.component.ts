import { ClinicFacade } from '../../clinic/facades/clinic.facade';
import { Clinic } from '../../models/clinic';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppLayoutService } from '../services/app-layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  sidenavMode: MatDrawerMode = 'side';
  isSidenavVisible = false;
  clinic: Clinic | null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private appLayoutService: AppLayoutService,
    private clinicFacade: ClinicFacade,
    private ref: ChangeDetectorRef
  ) {}

  get clinicDetailSidenavOpened$(): Observable<boolean> {
    return this.appLayoutService.clinicDetailSidenavOpened$;
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result.matches) {
          this.sidenavMode = 'over';
        } else {
          this.sidenavMode = 'side';
        }
      });

    this.breakpointObserver
      .observe([Breakpoints.Large, Breakpoints.XLarge])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result.matches) {
          this.isSidenavVisible = true;
        } else {
          this.isSidenavVisible = false;
        }
      });

    this.appLayoutService.currentClinic$
      .pipe(takeUntil(this.destroy$))
      .subscribe((clinic) => (this.clinic = clinic));
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  onOpenedChange = (e: boolean) => {
    if (!e) {
      this.clinicFacade.setCurrentClinicId(null);
    }
  };

  onMainNavOpenedChange = (e: boolean) => {
    this.isSidenavVisible = e;
  };

  toggleSideBar = () => {
    this.isSidenavVisible = !this.isSidenavVisible;
  };
}
