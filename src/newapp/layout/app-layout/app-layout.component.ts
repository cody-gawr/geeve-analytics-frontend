import { ClinicFacade } from '../../clinic/facades/clinic.facade';
import { Clinic } from '../../models/clinic';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Subject, takeUntil, map, filter } from 'rxjs';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  sidenavMode: MatDrawerMode = 'side';
  isSidenavVisible = false;
  clinic: Clinic | null;
  activatedUrl: string = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private clinicFacade: ClinicFacade
  ) {
    // this.router.events
    //   .pipe(
    //     takeUntil(this.destroy$),
    //     map((event: any) => event.routerEvent ?? event),
    //     filter(event => event instanceof NavigationStart)
    //   )
    //   .subscribe(_ => {
    //     this.clinicFacade.setMultiClinicSelection(null);
    //   });

    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        map((event: any) => event.routerEvent ?? event),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        const { url } = <NavigationEnd>event;
        this.activatedUrl = url.split('?')[0];
      });
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result.matches) {
          this.sidenavMode = 'over';
        } else {
          this.sidenavMode = 'side';
        }
      });

    this.breakpointObserver
      .observe([Breakpoints.Large, Breakpoints.XLarge])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result.matches) {
          this.isSidenavVisible = true;
        } else {
          this.isSidenavVisible = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  onOpenedChange = (e: boolean) => {};

  onMainNavOpenedChange = (e: boolean) => {
    this.isSidenavVisible = e;
  };

  toggleSideBar = () => {
    this.isSidenavVisible = !this.isSidenavVisible;
  };
}
