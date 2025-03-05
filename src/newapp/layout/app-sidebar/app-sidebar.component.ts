import { AuthFacade } from '../../auth/facades/auth.facade';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter, Subject, takeUntil, map } from 'rxjs';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss'],
})
export class AppSidebarComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  isOpen = false;
  // products = [];
  currenctClinicId = 0;
  constructor(
    private authFacade: AuthFacade,
    private router: Router,
    private toastr: ToastrService,
    private localStorage: LocalStorageService,
    private clinicService: ClinicFacade
  ) {
    this.clinicService.currentClinics$.subscribe(clinics => {
      if(clinics.length > 0) {
        //this.products = clinics[0].clinicProducts?.map(product => product.uniqueCode);
        this.currenctClinicId = clinics[0].id;
      }
    });
  }

  get authUserName$() {
    return this.authFacade.authUserData$.pipe(
      map(
        authUserData => authUserData?.displayName
      )
    );
  }

  ngOnInit() {
    this.authFacade.logoutSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter(s => s)
      )
      .subscribe(() => {
        this.localStorage.clearData();
        this.toastr.success("You're logged out.");
        this.router.navigateByUrl('/login');
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  logout = () => {
    this.authFacade.logout();
  };
}
