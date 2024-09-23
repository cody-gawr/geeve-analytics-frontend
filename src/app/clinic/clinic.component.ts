import {
  Component,
  Inject,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import { ClinicService } from './clinic.service';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from './../layouts/full/header/header.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { SetupService } from '../setup/setup.service';
import { PraktikaConnectionDialogComponent } from './praktika-connection-dialog/praktika-connection-dialog.component';
import { environment } from '@/environments/environment';
import { DentallyConnectionDialogComponent } from './dentally-connection-dialog/dentally-connection-dialog.component';
import { MyobConnectionDialogComponent } from './myob-connection-dialog/myob-connection-dialog.component';
import { XeroConnectionDialogComponent } from './xero-connection-dialog/xero-connection-dialog.component';
import { CoreConnectionDialogComponent } from './core-connection-dialog/core-connection-dialog.component';
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
})
/**
 *Update Clinic
 *AUTHOR - Teq Mavens
 */
export class DialogOverviewExampleDialogComponent {
  public apiUrl = environment.apiUrl;
  public form: UntypedFormGroup;
  public isConnectedCore: boolean = false;
  public showConnectButton: boolean = false;
  public urlPattern =
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  public pmsValue = '';
  constructor(
    private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    this.form = this.fb.group({
      name: [
        null,
        Validators.compose([Validators.required, Validators.pattern(/\S/)]),
      ],
      address: [
        null,
        Validators.compose([Validators.required, Validators.pattern(/\S/)]),
      ],
      //   patient_dob: [null, Validators.compose([Validators.required])],
      contact_name: [
        null,
        Validators.compose([Validators.required, Validators.pattern(/\S/)]),
      ],
      pms: [null, Validators.compose([Validators.required])],
      coreURL: [null, ''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public clinic_id;
  save(data) {
    var patient_id;
    this.clinic_id = $('#currentClinicid').attr('cid');
    this.dialogRef.close(data);
    $('.form-control-dialog').each(function () {
      var likeElement = $(this).click();
    });
  }

  file: File;
  connectToCore() {
    this.isConnectedCore = true;
  }
  selectPMS(data) {
    this.pmsValue = data;
    this.showConnectButton = data == 'core' ? true : false;
    if (this.showConnectButton) {
      this.form
        .get('coreURL')
        .setValidators([
          Validators.required,
          Validators.pattern(this.urlPattern),
        ]);
    } else {
      this.form.get('coreURL').clearValidators();
      this.form.get('coreURL').updateValueAndValidity();
    }
  }
}

@Component({
  selector: 'app-dialog-overview-limit-example-dialog',
  templateUrl: './dialog-overview-limit-example.html',
})
/**
 *Get count of clinic limmits
 *AUTHOR - Teq Mavens
 */
export class DialogOverviewExampleLimitDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}

declare var require: any;
const data: any = require('@/assets/company.json');
@Component({
  selector: 'app-table-filter',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
/**
 *Main Clinic Component
 *AUTHOR - Teq Mavens
 */
export class ClinicComponent implements AfterViewInit, OnDestroy {
  name: string;
  address: string;
  contact_name: string;
  pms: string;
  coreURL: string;
  public userPlan: any = '';
  public user_type: any = '';
  fileInput: any;
  public availabeLocations;
  public clinicName;

  //initialize component
  ngAfterViewInit() {
    $('.header_filters').removeClass('hide_header');
    $('.header_filters').removeClass('flex_direct_mar');
    $('#title').html('Clinics');
    //$('.header_filters').hide();
    $('.external_clinic').show();
    //$('.dentist_dropdown').hide();
    $('.header_filters').addClass('hide_header');
  }

  editing = {};
  rows = [];
  temp = [...data];

  loadingIndicator = true;
  reorderable = true;
  checkStatusInterval = null;

  columns = [
    { prop: 'sr' },
    { name: 'clinicName' },
    { name: 'address' },
    { name: 'contactName' },
    { name: 'created' },
  ];

  @ViewChild(ClinicComponent) table: ClinicComponent;
  constructor(
    private toastr: ToastrService,
    private clinicService: ClinicService,
    public dialog: MatDialog,
    private _cookieService: CookieService,
    private router: Router,
    private headerService: HeaderService,
    private setupService: SetupService
  ) {
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
    this.getUserDetails();
    this.getClinics();
    this.userPlan = this._cookieService.get('user_plan');
    this.user_type = this._cookieService.get('user_type');
    // this.checkPmsStatus();
    // this.checkStatusInterval = setInterval(() => {
    //   // every 2 sconds
    //   this.checkPmsStatus();
    // }, 10000)
  }
  private warningMessage: string;

  checkPmsStatus() {
    if(this.rows && this.rows.length > 0){
      // check status
      for(const row of this.rows){
        const pms = row.pms;
        switch(pms){
          case 'core':
            this.setupService.checkCoreStatus(row.id).subscribe(
              {
                next: res => {
                  if (res.status == 200) {
                    if (res.body.data.refresh_token && res.body.data.token && res.body.data.core_user_id){
                      //
                      row.connected = true;
                    }else{
                      row.connected = false;
                    }
                  }
                },
                error: error => {
                  console.error(error);
                  row.connected = false;
                }
              }
            );
            break;
          case 'dentally':
            this.setupService.checkDentallyStatus(row.id).subscribe(
              {
                next: res => {
                  if (res.status == 200) {
                    if (res.body.data.site_id) {
                      row.connected = true;
                    }else{
                      row.connected = false;
                    }
                  }
                },
                error: error => {
                  console.error(error);
                  row.connected = false;
                }
              }
            );
            break;
          case 'praktika':
            this.clinicService.checkPraktikaStatus(row.id).subscribe(
              {
                next: (data) => {
                  if (data.success) {
                    row.connected = true;
                  } else {
                    row.connected = false;
                  }
                }, error: err => {
                  row.connected = false;
                },
              }
            );
            break;
          case 'myob':
            this.setupService.checkMyobStatus(row.id).subscribe(
              res => {
                if (res.body.message != 'error') {
                  if (res.body.data.connectedWith == 'myob') {
                    row.connected = true;
                  } else {
                    row.connected = false;
                  }
                } else {
                  row.connected = false;
                }
              },
              error => {
                row.connected = false;
              }
            );
            break;
          case 'xero':
            this.setupService.checkXeroStatus(row.id).subscribe(
              {
                next: res => {
                  if (res.body.message != 'error') {
                    if (res.body.data.connectedWith == 'xero') {
                      row.connected = true;
                    } else {
                      row.connected = false;
                    }
                  } else {
                    row.connected = false;
                  }
                },
                error: error => {
                  row.connected = false;
                }
              }
            );
            break;
        }
      }
    }
  }

  ngOnDestroy(): void {
    if(this.checkStatusInterval) clearInterval(this.checkStatusInterval);
  }
  //open add clinic modal
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '400px',
      data: {
        name: this.name,
        address: this.address,
        contact_name: this.contact_name,
        pms: this.pms,
        coreURL: this.coreURL,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.clinicName = result.name;

        if (result.coreURL == undefined) result.coreURL = '';

        var coreURL = '';
        if (result.pms == 'core') {
          let url: string = result.coreURL;
          let https = 'https';
          if (url.includes(https)) {
            coreURL = url;
          } else {
            coreURL = 'https://' + url;
          }
        }

        const _createClinic = (prak_result?: any) => {
          this.clinicService
            .addClinic(
              result.name,
              result.address,
              result.contact_name,
              result.pms,
              coreURL
            )
            .subscribe(
              res => {
                //@audit-issue - This needs to be updated soon. Needs to check status code instead of message property.
                if (res.body.message == 'error') {
                  this.toastr.error(res.body.data);
                  this.openLimitDialog();
                } else if (res.status == 200) {
                  if (res.body.data.pms == 'core') {
                    let id = res.body.data.id;
                    this.getConnectCoreLink(id);
                  } else if (res.body.data.pms == 'dentally') {
                    let id = res.body.data.id;
                    this.getConnectDentallyLink(id);
                  } else if (res.body.data.pms === 'praktika') {
                    if (
                      prak_result?.customer_user &&
                      prak_result?.customer_secret
                    ) {
                      this.clinicService
                        .CreatePraktikaConfig(
                          prak_result?.customer_user,
                          prak_result?.customer_secret,
                          res.body.data.id
                        )
                        .subscribe({
                          next: response => {
                            if (!response.response) {
                              this.toastr.error(
                                'Failed to connect Praktika account',
                                'Praktika Account'
                              );
                              return;
                            }
                            this.toastr.success(
                              'Praktika account connected',
                              'Praktika Account'
                            );
                            this.getClinics();
                          },
                          error: err =>
                            this.toastr.error(
                              'Failed to connect Praktika account',
                              'Praktika Account'
                            ),
                        });
                    } else {
                      this.toastr.error('Please Provide Valid Inputs!');
                    }

                    return;
                  } else {
                    this.toastr.success('Clinic Added!');
                  }
                  this.getClinics();
                }
              },
              error => {
                this.warningMessage = 'Please Provide Valid Inputs!';
              }
            );
        };

        if (result.pms == 'praktika') {
          const dialogRef = this.dialog.open(
            PraktikaConnectionDialogComponent,
            {
              width: '500px',
            }
          );
          dialogRef.afterClosed().subscribe((_result: any) => {
            if (_result?.customer_user && _result?.customer_secret) {
              _createClinic(_result);
            }
          });
          return;
        } else {
          _createClinic();
        }
      }
    });
  }
  //open clinic limit dialog
  openLimitDialog(): void {
    const dialogRef = this.dialog.open(
      DialogOverviewExampleLimitDialogComponent,
      {}
    );

    dialogRef.afterClosed().subscribe(result => {});
  }
  //get list of clinics
  public clinicscount = 0;
  public createdClinicsCount = 0;
  public getClinics() {
    this.headerService.getClinic.subscribe(
      res => {
        if (res.status == 200) {
          this.rows = res.body.data;
          if (res.body.data.length > 0) {
            this.temp = [...res.body.data];
            this.clinicscount = res.body?.purchasedTotal ?? 0;
            this.createdClinicsCount = res.body?.data.length ?? 0;
            this.table = data;
          }
          this.checkPmsStatus();
        } else if (res.status == 401) {
          this._cookieService.put('username', '');
          this._cookieService.put('email', '');
          this._cookieService.put('userid', '');
          this.router.navigateByUrl('/login');
        }
      },
      error => {
        this.warningMessage = 'Please Provide Valid Inputs!';
      }
    );
  }
  //get count of clinics allowed
  private getUserDetails() {
    this.rows = [];
    this.clinicService.getUserDetails().subscribe(
      res => {
        if (res.status == 200) {
          if (res.body.data) {
            this.clinicscount = res.body.data.clinics_count;
          }
        } else if (res.status == 401) {
          this._cookieService.put('username', '');
          this._cookieService.put('email', '');
          this._cookieService.put('userid', '');
          this.router.navigateByUrl('/login');
        }
      },
      error => {
        this.warningMessage = 'Please Provide Valid Inputs!';
      }
    );
  }
  //delete clinic
  deleteClinic(row) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete Clinic?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.value) {
        $('.ajax-loader').show();
        if (this.rows[row]['id']) {
          this.clinicService.deleteClinic(this.rows[row]['id']).subscribe(
            res => {
              $('.ajax-loader').hide();
              if (res.status == 200) {
                this.toastr.success('Clinic Removed!');
                this.getClinics();
              } else if (res.status == 401) {
                this._cookieService.put('username', '');
                this._cookieService.put('email', '');
                this._cookieService.put('userid', '');
                this.router.navigateByUrl('/login');
              }
            },
            error => {
              $('.ajax-loader').hide();
              this.warningMessage = 'Please Provide Valid Inputs!';
            }
          );
        } else {
          this.rows.splice(row, 1);
          this.rows = [...this.rows];
        }
      } else {
        $('.ajax-loader').hide();
      }
    });
  }
  //craete dentist for clinic
  addDentist() {
    var temp = {};
    temp['providerId'] = 'Enter Provider Id';
    temp['name'] = 'Enter Name';
    var length = this.rows.length;
    this.editing[length + '-providerId'] = true;
    this.editing[length + '-name'] = true;

    this.rows.push(temp);
    this.table = data;
  }
  //fileter data
  updateFilter(event) {
    const val = event?.target?.value?.toLowerCase();

    if (val) {
      // filter our data
      const temp = this.temp.filter(function (d) {
        return d.clinicName.toLowerCase().indexOf(val) !== -1 || !val;
      });
      // update the rows
      this.rows = temp;
    } else {
      this.rows = [...this.temp];
    }

    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }
  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.clinicService
      .updateClinic(this.rows[rowIndex]['id'], this.rows[rowIndex][cell], cell)
      .subscribe(
        res => {
          if (res.status == 200) {
            this.toastr.success('Clinic Details Updated!');
            this.getClinics();
          }
        },
        error => {
          this.warningMessage = 'Please Provide Valid Inputs!';
        }
      );
    this.rows = [...this.rows];
  }

  enableEditing(rowIndex, cell) {
    //this.editing[rowIndex + '-' + cell] = true;
  }

  navigateMan(id) {
    if (id) {
    }
  }

  onActivate(event) {
    if (event.type == 'click') {
      if (event.row) {
        this.router.navigate(['/clinic-settings', event.row.id]);
      }
    }
  }

  private getConnectCoreLink(id, reconnect = false) {
    this.setupService.getConnectCoreLink(id).subscribe(
      res => {
        if (res.status == 200) {
          const appSuccess = res.body.success;
          if (appSuccess) {
            let connectToCoreLink = res.body.data;
            this.connectToCore(connectToCoreLink, id, reconnect);
          } else {
            this.warningMessage = res.body.message;
          }
        }
      },
      error => {
        this.warningMessage = 'Please Provide Valid Inputs!';
      }
    );
  }

  private getConnectDentallyLink(id, reconnect = false) {
    this.setupService.getConnectDentallyLink(id).subscribe(
      res => {
        if (res.status == 200) {
          const appSuccess = res.body.success;
          if (appSuccess) {
            let connectToDentallyLink = res.body.data;
            this.connectToDentally(connectToDentallyLink, id, reconnect);
          } else {
            this.warningMessage = res.body.message;
          }
        }
      },
      error => {
        this.warningMessage = 'Please Provide Valid Inputs!';
      }
    );
  }
  public connectToCore(link, id, reconnect = false) {
    var win = window.open(link, 'MsgWindow', 'width=1000,height=800');
    var timer = setInterval(() => {
      if (win.closed) {
        if (!reconnect) {
          this.checkCoreStatus(id);
        }
        this.headerService
          .getClinics()
          .subscribe(data => console.log('data', data));
        clearTimeout(timer);
      }
    }, 1000);
  }

  public connectToDentally(link, id, reconnect = false) {
    var win = window.open(link, 'MsgWindow', 'width=1000,height=800');
    var timer = setInterval(() => {
      if (win.closed) {
        if (!reconnect) {
          this.checkDentallyStatus(id);
        }
        this.headerService
          .getClinics()
          .subscribe(data => console.log('data', data));
        clearTimeout(timer);
      }
    }, 1000);
  }

  private checkCoreStatus(id) {
    this.setupService.checkCoreStatus(id).subscribe(
      res => {
        if (res.status == 200) {
          if (res.body.data.refresh_token && res.body.data.token && res.body.data.core_user_id)
            this.getClinicLocation(id);
        }
      },
      error => {
        this.warningMessage = 'Please Provide Valid Inputs!';
      }
    );
  }

  private checkDentallyStatus(id) {
    this.setupService.checkDentallyStatus(id).subscribe(
      res => {
        if (res.status == 200) {
          if (res.body.data.site_id) {
          }
        }
      },
      error => {
        this.warningMessage = 'Please Provide Valid Inputs!';
      }
    );
  }

  private getClinicLocation(id) {
    this.setupService.getClinicLocation(id).subscribe(res => {
      if (res.status == 200) {
        this.availabeLocations = [...res.body.data];
        this.checkMappedLocations();
        this.openLocationDialog(id);
      }
    });
  }

  openLocationDialog(id): void {
    const dialogRef = this.dialog.open(DialogLocationDialogComponent, {
      width: '600px',
      data: { location: this.availabeLocations, display_name: this.clinicName },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        let location_id = result;
        this.setupService.saveClinicLocation(id, location_id).subscribe(res => {
          if (res.status == 200) {
            this.toastr.success('Clinic Added!');
          }
        });
      }
    });
  }

  private checkMappedLocations() {
    this.clinicService.checkMappedLocations().subscribe(res => {
      if (res.status == 200) {
        this.availabeLocations.filter(location => {
          res.body.data.forEach(ele => {
            if (location.Identifier == ele.location_id) {
              location.DisplayName += '(has)';
            }
          });
        });
      }
    });
  }

  removePmsConnection(event, clinicId) {
    event.preventDefault();
    event.stopPropagation();
    const clinic = this.rows.find(r => r.id === clinicId);
    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to disconnect ${clinic.clinicName} from ${clinic.pms}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.value) {
        switch(clinic.pms){
          case 'core':
            this.clinicService.removeClinic(clinicId).subscribe(res => {
              if (res.status == 200) {
                this.toastr.success(`Remove Core for ${clinic.clinicName}`);
                clinic.core_sessions = [];
                clinic.connected = false;
              }
            });
            break;
          case 'dentally':
            this.clinicService.removeDentallyClinic(clinic.id).subscribe(
              {
                next: (res) => {
                  console.log('dentally disconnected:', res)
                  clinic.connected = false;
                },
                error: (err) => {
                  console.log(err);
                }
              }
            );
            break;
          case 'praktika':
            this.clinicService.removePraktikaClinic(clinic.id).subscribe(
              {
                next: (res) => {
                  console.log('praktika disconnected:', res)
                  clinic.connected = false;
                },
                error: (err) => {
                  console.log(err);
                }
              }
            );
            break;
          case 'myob':
            break;
          case 'xero':
            break;

        }

      }
    });
  }

  removeDentally(event, clinicId) {
    event.preventDefault();
    event.stopPropagation();
    const clinic = this.rows.find(r => r.id === clinicId);
    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to disconnect ${clinic.clinicName} from Dentally?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.value) {
        this.clinicService.removeDentallyClinic(clinicId).subscribe(res => {
          if (res.status == 200) {
            this.toastr.success(`Remove Dentally for ${clinic.clinicName}`);
            clinic.dentally_clinics = [];
          }
        });
      }
    });
  }

  reconnectPms(event, clinicId) {
    event.preventDefault();
    event.stopPropagation();
    const clinic = this.rows.find(r => r.id === clinicId);
    switch(clinic.pms){
      case 'core':
        const dialogRef_core = this.dialog.open(CoreConnectionDialogComponent, {
          data: {
            id: clinicId,
          },
          width: '500px',
        });
        dialogRef_core.afterClosed().subscribe((result: any) => {
          if (result === 'success') {
            clinic.connected = undefined;
            this.setupService.checkCoreStatus(clinic.id).subscribe(
              {
                next: res => {
                  if (res.status == 200) {
                    if (res.body.data.refresh_token && res.body.data.token && res.body.data.core_user_id){
                      //
                      clinic.connected = true;
                    }else{
                      clinic.connected = false;
                    }
                  }
                },
                error: error => {
                  console.error(error);
                  clinic.connected = false;
                }
              }
            );
          }
        });
        // if (clinic.core_clinics[0]?.clinic_url) {
        //   this.getConnectCoreLink(clinicId, true);
        // } else {
        //   this.toastr.warning('No Registred Clinic URL');
        // }
        break;
      case 'dentally':
        const dialogRef_dentally = this.dialog.open(DentallyConnectionDialogComponent, {
          data: {
            id: clinicId,
          },
          width: '500px',
        });
        dialogRef_dentally.afterClosed().subscribe((result: any) => {
          if (result === 'success') {
            clinic.connected = undefined;
            this.setupService.checkDentallyStatus(clinic.id).subscribe(
              {
                next: res => {
                  if (res.status == 200) {
                    if (res.body.data.site_id) {
                      clinic.connected = true;
                    }else{
                      clinic.connected = false;
                    }
                  }
                },
                error: error => {
                  console.error(error);
                  clinic.connected = false;
                }
              }
            );
          }
        });
        break;
      case 'praktika':
        const dialogRef = this.dialog.open(
          PraktikaConnectionDialogComponent,
          {
            width: '500px',
            data: { clinic_id: clinic.id }
          }
        );
        dialogRef.afterClosed().subscribe((_result: any) => {
          if(_result == 'success'){
            clinic.connected = undefined;
            this.clinicService.checkPraktikaStatus(clinic.id).subscribe(
              {
                next: (data) => {
                  if (data.success) {
                    clinic.connected = true;
                  } else {
                    clinic.connected = false;
                  }
                }, error: err => {
                  clinic.connected = false;
                },
              }
            );
          }
        });
        break;
      case 'myob':
        const dialogRef_myob = this.dialog.open(
          MyobConnectionDialogComponent,
          {
            width: '500px',
            data: { id: clinic.id }
          }
        );
        dialogRef_myob.afterClosed().subscribe((_result: any) => {
          if(_result == 'success'){
            clinic.connected = undefined;
            this.setupService.checkMyobStatus(clinic.id).subscribe(
              res => {
                if (res.body.message != 'error') {
                  if (res.body.data.connectedWith == 'myob') {
                    clinic.connected = true;
                  } else {
                    clinic.connected = false;
                  }
                } else {
                  clinic.connected = false;
                }
              },
              error => {
                clinic.connected = false;
              }
            );
          }
        });
        break;
      case 'xero':
        const dialogRef_xero = this.dialog.open(
          XeroConnectionDialogComponent,
          {
            width: '500px',
            data: { id: clinic.id }
          }
        );
        dialogRef_xero.afterClosed().subscribe((_result: any) => {
          if(_result == 'success'){
            clinic.connected = undefined;
            this.setupService.checkXeroStatus(clinic.id).subscribe(
              res => {
                if (res.body.message != 'error') {
                  if (res.body.data.connectedWith == 'xero') {
                    clinic.connected = true;
                  } else {
                    clinic.connected = false;
                  }
                } else {
                  clinic.connected = false;
                }
              },
              error => {
                clinic.connected = false;
              }
            );
          }
        });
        break;
    }

  }

  reconnectToDentally(event, clinicId) {
    event.preventDefault();
    event.stopPropagation();
    const clinic = this.rows.find(r => r.id === clinicId);
    if (clinic.dentally_clinics[0]?.clinic_url) {
      this.getConnectDentallyLink(clinicId, true);
    } else {
      this.toastr.warning('No Registred Clinic URL');
    }
  }
}

@Component({
  selector: 'dialog-location',
  templateUrl: './dialog-location.html',
})
export class DialogLocationDialogComponent {
  public selectedLocation: any = null;
  constructor(
    public dialogRef: MatDialogRef<DialogLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
  }
  onNoClick() {
    this.dialogRef.close();
  }
  save(data) {
    this.dialogRef.close(data);
  }
  selectLocationChange(e) {
    this.selectedLocation = e;
  }
  checkUserSelection(location) {
    let has: string = (location.DisplayName += '');
    return has.includes('(has)');
  }
}
