import { AuthFacade } from '../../auth/facades/auth.facade';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter, Subject, takeUntil, map } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss'],
})
export class AppSidebarComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  constructor(
    private authFacade: AuthFacade,
    private router: Router,
    private toastr: ToastrService,
    private localStorage: LocalStorageService
  ) {}

  get authUserName$() {
    return this.authFacade.authUserData$.pipe(
      map(
        authUserData =>
          (authUserData ?? this.authFacade.getAuthUserData())?.displayName
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
