import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ControlsOf } from '../../../models';
import { Login } from '../../../models/auth';
import { ToastrService } from 'ngx-toastr';
import { AuthFacade } from '../../facades/auth.facade';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent implements OnInit, OnDestroy {
  formGroup: FormGroup<ControlsOf<Login>>;

  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  constructor(
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authFacade: AuthFacade,
    private router: Router,
  ) {
    this.formGroup = this._formBuilder.group({
      email: new FormControl('demo@jeeve.com.au', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('JulDemoCDC1!', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });

    this.authFacade.success$
      .pipe(
        takeUntil(this.destroy$),
        filter(s => s),
      )
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });

    this.authFacade.error$.pipe(takeUntil(this.destroy$)).subscribe(error => {
      this.toastr.error(error);
    });
  }

  get isSubmitDisabled(): boolean {
    return !this.formGroup.valid;
  }

  get isLoading$(): Observable<boolean> {
    return this.authFacade.isLoading$;
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  login = (): void => {
    const form = <Login>this.formGroup.value;
    this.authFacade.login(form);
  };

  getErrorMessage = (formControlName: string): string => {
    switch (formControlName) {
      case 'email':
        return 'The email is required or incorrect.';
      case 'password':
        return 'The password is required.';
      default:
        return 'The field is required.';
    }
  };
}
