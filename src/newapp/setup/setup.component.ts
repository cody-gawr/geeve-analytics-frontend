import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClinicFacade } from '../clinic/facades/clinic.facade';
import { IClinicDTO } from '../models/clinic';
import { Subject, takeUntil, combineLatest, distinctUntilChanged, mergeMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { PraktikaConnectionDialogComponent } from './components/praktika-connection-dialog/praktika-connection-dialog.component';
import { CoreConnectionDialogComponent } from './components/core-connection-dialog/core-connection-dialog.component';
import { DentallyConnectionDialogComponent } from './components/dentally-connection-dialog/dentally-connection-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

const ELEMENT_DATA: any[] = [
  { id: 1, clinicName: 'Hydrogen', stepper_status: 1.0079, symbol: 'H' },
  { id: 2, clinicName: 'Helium', stepper_status: 4.0026, symbol: 'He' },
  { id: 3, clinicName: 'Lithium', stepper_status: 6.941, symbol: 'Li' },
  { id: 4, clinicName: 'Beryllium', stepper_status: 9.0122, symbol: 'Be' },
];

@Component({
  selector: 'newapp-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit, OnDestroy {
  private dataSource: Subject<IClinicDTO[]> = new Subject<IClinicDTO[]>();
  public dataSource$ = this.dataSource.asObservable();
  public displayedColumns: string[] = ['id', 'name', 'pms', 'status', 'action'];
  private destroy = new Subject<void>();
  private destroy$ = this.destroy.asObservable();

  constructor(
    private clinicFacade: ClinicFacade,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.clinicFacade.loadUserClinics();
    this.clinicFacade.isLoadingSyncStatus$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        mergeMap(_ =>
          this.dataSource$.pipe(
            takeUntil(this.destroy$),
            distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
          ),
        ),
      )
      .subscribe(dataSource => {
        console.log({ dataSource });
        if (
          dataSource.length > 0 &&
          dataSource.every(clinic => clinic.connected && clinic.numberOfSuccess > 0)
        ) {
          this.router.navigateByUrl('/dashboards/healthscreen');
        }
      });
    combineLatest([this.clinicFacade.userClinics$, this.clinicFacade.userClinicsSuccess$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([clinics, success]) => {
        const totalCnt = clinics.length;
        clinics = clinics.filter(clinic =>
          ['praktika', 'dentally', 'core'].includes(clinic.pms?.toLowerCase()),
        );

        if (clinics.length > 0 && success) {
          clinics.forEach(clinic => {
            if (clinic.connected === undefined) {
              switch (clinic.pms?.toLowerCase()) {
                case 'praktika':
                  this.clinicFacade.loadPraktikaSyncStatus(clinic.id);
                  break;
                case 'dentally':
                  this.clinicFacade.loadDentallySyncStatus(clinic.id);
                  break;
                case 'core':
                  this.clinicFacade.loadCoreSyncStatus(clinic.id);
                  break;
              }
            }
          });

          this.dataSource.next(clinics);
        } else if (totalCnt > 0 && success) {
          this.router.navigateByUrl('/dashboards/healthscreen');
        }
      });
    console.log('SetupComponent initialized');
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public openDialogForOauthProcess(clinic: IClinicDTO) {
    const clinicId = clinic.id!;
    const pms = clinic.pms;
    if (pms === 'praktika') {
      const dialogRef = this.dialog.open(PraktikaConnectionDialogComponent, {
        width: '500px',
        data: {
          clinicId,
        },
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'success') {
          this.clinicFacade.loadPraktikaSyncStatus(clinic.id);
        }
      });
    } else if (pms === 'core') {
      const dialogRef = this.dialog.open(CoreConnectionDialogComponent, {
        width: '500px',
        data: { id: clinicId },
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'success') {
          this.clinicFacade.loadCoreSyncStatus(clinic.id);
        }
      });
    } else if (pms === 'dentally') {
      const dialogRef = this.dialog.open(DentallyConnectionDialogComponent, {
        data: {
          id: clinicId,
        },
        width: '500px',
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result === 'success') {
          this.clinicFacade.loadDentallySyncStatus(clinic.id);
        }
      });
    } else {
      this.toastr.warning('This pms is not supported', 'PMS Connection');
    }
  }

  continue() {
    this.router.navigate(['/dashboards/healthscreen']);
  }
}
