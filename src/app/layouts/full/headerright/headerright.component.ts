import {
  Component,
  AfterViewInit,
  Output,
  EventEmitter,
  Inject
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CookieService, CookieOptions } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd, Event } from '@angular/router';
import { HeaderService } from '../header/header.service';
import { DentistService } from '../../../dentist/dentist.service';
import { Subscription } from 'rxjs';
import { UserIdleService } from 'angular-user-idle';
import { AppConstants } from '../../../app.constants';
import { RolesUsersService } from '../../../roles-users/roles-users.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { environment } from '../../../../environments/environment';

export interface Dentist {
  providerId: string;
  name: string;
}

@Component({
  selector: 'feature-overview-limit-example',
  templateUrl: './feature-overview-limit-example.html'
})
export class FeatureDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FeatureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-headerright',
  templateUrl: './headerright.component.html',
  styleUrls: []
})
export class AppHeaderrightComponent implements AfterViewInit {
  private _routerSub = Subscription.EMPTY;
  providerIdDentist;
  isToggleDentistChart: string;
  user_type_dentist;
  public apiUrl = environment.apiUrl;

  showCompare: boolean = false;
  showDropDown: boolean = false;
  referFriend: boolean = false;
  referFriendName: any = '';
  referFriendEmail: any = '';
  referFriendNameError: boolean = false;
  referFriendEmailError: boolean = false;
  referFriendEmailPError: boolean = false;
  user_type: any = 0;
  unAuth: boolean = false;
  userId: number = null;

  classUrl: string = '';
  @Inject(MAT_DIALOG_DATA) public data: any;
  @Output() newItemEvent = new EventEmitter<Number>();

  constructor(
    private _cookieService: CookieService,
    private rolesUsersService: RolesUsersService,
    private headerService: HeaderService,
    private dentistService: DentistService,
    private router: Router,
    private userIdle: UserIdleService,
    public constants: AppConstants,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    if (this._cookieService.get('user_type')) {
      this.user_type = this._cookieService.get('user_type');
    }
    if (
      this._cookieService.get('features_dismissed') &&
      this._cookieService.get('features_dismissed') == '0'
    ) {
      this.headerService.getNewFeature().subscribe(
        (res) => {
          for (let linkurl of res.body.data) {
            if (linkurl.link) {
              if (!linkurl.link.match(/^[a-zA-Z]+:\/\//)) {
                linkurl.link = 'http://' + linkurl.link;
              }
            }
          }
          const dialogRef = this.dialog.open(FeatureDialogComponent, {
            width: '700px',
            data: res.body.data
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.headerService.getNewFeatureDisable().subscribe((res) => {
              if (res.status == 200) {
                this._cookieService.put('features_dismissed', '1');
              }
            });
          });
        },
        (error) => {
          this.warningMessage = 'Please Provide Valid Inputs!';
        }
      );
    }
    if (this._cookieService.get('userid')) {
      this.userId = Number(this._cookieService.get('userid'));
    }
    this.getRoles();
    this.user_type_dentist = this._cookieService.get('user_type');
    this._routerSub = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.referFriend = false;
        this.route = router.url;
        if (
          this.route == '/dashboards/cliniciananalysis'
          // this.route == '/dashboards/cliniciananalysis/multi'
        ) {
          this.showCompare = true;
        } else {
          this.showCompare = false;
        }

        if (
          [
            '/dashboards/cliniciananalysis',
            '/dashboards/clinicianproceedures'
          ].includes(this.route)
        ) {
          this.showDropDown = true;
        } else {
          this.showDropDown = false;
        }

        if (this.route.includes('/')) {
          var urlParams = this.route.split('/');
          if (typeof urlParams[3] != 'undefined') {
            this.classUrl = urlParams[3];
          } else if (typeof urlParams[2] != 'undefined') {
            this.classUrl = urlParams[2];
          } else if (typeof urlParams[1] != 'undefined') {
            this.classUrl = urlParams[1];
          } else if (typeof urlParams[0] != 'undefined') {
            this.classUrl = urlParams[0];
          }
        }
        this.getClinics();
      }
      // this.getDentists();
      // if($('#currentClinic').attr('cid') == 'all' && this.route != '/dashboards/healthscreen')
      // {
      //}
    });
  }

  alert(trailDays) {
    /************** New Features **************/
    if (trailDays) {
      this.toastr.success(
        `<ul><li>Hey! You have left ${trailDays} Days for you Trail period</li></ul>`,
        'Trail End Alert!',
        {
          closeButton: true,
          disableTimeOut: true,
          enableHtml: true,
          toastClass: 'ngx-toastr new-feature'
        }
      );
    }
    /************** New Features **************/
  }

  /************** unAuthorised **************/
  unAuthorisedAlert(clinicName) {
    this.toastr.success(
      ``,
      `You do not have permission to access this page for ${clinicName}. Please contact the clinic owner.`,
      {
        closeButton: true,
        disableTimeOut: true,
        enableHtml: true,
        toastClass: 'ngx-toastr un-auth'
      }
    );
    /************** unAuthorised **************/
  }

  getRoles() {
    this.rolesUsersService.getRolesIndividual().subscribe(
      (res) => {
        this.rolesUsersService.setRoleIndividual(res);
        if (res.status == 200) {
          this.user_type_dentist = res.body.type;
          let opts = this.constants.cookieOpt as CookieOptions;
          this._cookieService.put('user_type', res.body.type, opts);
        }
      },
      (error) => {}
    );
  }
  ngOnDestroy() {
    this._routerSub.unsubscribe();
  }
  ngAfterViewInit() {
    //  this.clinic_id = '1';
    //this.getClinics();
    //Start watching for user inactivity.
    this.userIdle.startWatching();
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe((count) => {});
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      this.userIdle.stopTimer();
      this._cookieService.removeAll();
      this.router.navigateByUrl('/login');
    });
  }

  toggler() {
    if (this._cookieService.get('dentist_toggle')) {
      this.isToggleDentistChart = this._cookieService.get('dentist_toggle');
    }
    let opts = this.constants.cookieOpt as CookieOptions;
    this.isToggleDentistChart =
      this.isToggleDentistChart == 'true' ? 'false' : 'true';
    this._cookieService.put('dentist_toggle', this.isToggleDentistChart, opts);
    $('#clinic_initiate').click();
  }

  public route: string;
  public title;
  public clinicsData: any[] = [];
  public config: PerfectScrollbarConfigInterface = {};
  public clinic_id: any;
  public dentistCount: any = {};
  dentists: Dentist[] = [];
  private warningMessage: string;
  public finalUrl: string;
  public selectedClinic: any = [];
  public trailDays: Number = 0;
  public selectedDentist;
  public placeHolder = '';
  public showAll: boolean = true;
  public allChecked: boolean = false;

  public get isMultiClinicsVisible(): boolean {
    return (
      (['/dashboards/clinicianproceedures', '/dashboards/finances'].includes(
        this.route
      ) &&
        !['4', '7'].includes(this.user_type) &&
        this.userId == 1) ||
      ([
        '/dashboards/cliniciananalysis',
        '/dashboards/clinicianproceedures',
        '/dashboards/finances',
        '/dashboards/marketing',
        '/dashboards/frontdesk'
      ].includes(this.route) &&
        !['4', '7'].includes(this.user_type) &&
        this.userId == 1)
    );
  }

  public get isAllOptionVisible(): boolean {
    return (
      [
        '/dashboards/finances',
        '/dashboards/marketing',
        '/dashboards/frontdesk',
        '/dashboards/cliniciananalysis',
        '/dashboards/clinicianproceedures'
      ].includes(this.route) && !['4', '7'].includes(this.user_type)
    );
  }

  private getClinics() {
    this.selectedClinic = [];
    this.headerService.getClinics().subscribe(
      (res) => {
        this.headerService.setClinics(res);
        if (res.status == 200) {
          this.clinicsData = res.body.data;
          if (res.body.data.length > 0) {
            if (this.route == '/dashboards/healthscreen') {
              if (this._cookieService.get('clinic_dentist')) {
                if (
                  this._cookieService
                    .get('clinic_dentist')
                    .split('_')[0]
                    .indexOf(',') < 0 ||
                  this._cookieService.get('clinic_dentist').split('_')[0] !=
                    'all'
                ) {
                  this.getAccountConnection(res.body.data[0].id);
                } else {
                  this.resetAccountConnection();
                }
              }
              if (this.clinicsData.length > 1 && this.user_type != '7') {
                this.clinic_id = 'all';
                this.selectedClinic = 'all';
                this.placeHolder = 'All Clinics';
              } else {
                this.clinic_id = res.body.data[0].id;
                this.selectedClinic = res.body.data[0].id;
                this.placeHolder = res.body.data[0].clinicName;
              }
            } else {
              if (this._cookieService.get('clinic_dentist')) {
                let dentistclinic = this._cookieService
                  .get('clinic_dentist')
                  .split('_');
                if (dentistclinic[1] == 'all') {
                  // check dentist data from cookie
                  this.selectedDentist = dentistclinic[1];
                } else {
                  this.selectedDentist = parseInt(dentistclinic[1]);
                }
                if (this.isMultiClinicsVisible) {
                  this.allChecked = false;
                  this.clinic_id = [];
                  this.selectedClinic = [];
                  if (dentistclinic[0].indexOf(',') >= 0) {
                    let tmpcl = [];
                    let allcookieCl = dentistclinic[0].split(',');
                    if (allcookieCl[0] == 'all') {
                      this.allChecked = true;
                    }
                    allcookieCl.forEach((cln) => {
                      if (cln == 'all') {
                        tmpcl.push(cln);
                      } else {
                        tmpcl.push(parseInt(cln));
                      }
                    });
                    this.clinic_id = tmpcl;
                    this.selectedClinic = tmpcl;
                  } else {
                    if (dentistclinic[0] == 'all') {
                      this.allChecked = true;
                      this.clinic_id = 'all';
                      this.selectedClinic = ['all'];
                      res.body.data.forEach((datatemp) => {
                        // getting  clinic name as per cookie data
                        this.selectedClinic.push(datatemp.id);
                      });
                    } else {
                      this.clinic_id.push(parseInt(dentistclinic[0]));
                      this.selectedClinic.push(parseInt(dentistclinic[0]));
                    }
                  }

                  if (
                    this.selectedClinic[0].toString() != 'NaN' &&
                    this.selectedClinic[0] != 'all' &&
                    this.selectedClinic.length == 1 &&
                    [
                      '/dashboards/cliniciananalysis',
                      '/dashboards/clinicianproceedures'
                    ].includes(this.route)
                  ) {
                    this.showDropDown = true;
                  } else {
                    this.showDropDown = false;
                  }
                } else {
                  if (dentistclinic[0].indexOf(',') >= 0) {
                    if (dentistclinic[0].split(',')[0] == 'all') {
                      this.clinic_id = dentistclinic[0].split(',')[1];
                      this.selectedClinic = dentistclinic[0].split(',')[1];
                    } else {
                      this.clinic_id = dentistclinic[0].split(',')[0];
                      this.selectedClinic = dentistclinic[0].split(',')[0];
                    }
                    let opts = this.constants.cookieOpt as CookieOptions;
                    this._cookieService.put('clinic_id', this.clinic_id, opts);
                    this._cookieService.put(
                      'clinic_dentist',
                      this.clinic_id + '_' + dentistclinic[1],
                      opts
                    );
                  } else if (
                    dentistclinic[0] == 'all' ||
                    dentistclinic[0] == ''
                  ) {
                    // check clinic data from cookie
                    this.clinic_id = res.body.data[0].id;
                    this.selectedClinic = res.body.data[0].id;
                  } else if (dentistclinic[0] != 'all') {
                    this.clinic_id = dentistclinic[0];
                    this.selectedClinic = dentistclinic[0];
                  }
                  res.body.data.forEach((datatemp) => {
                    // getting  clinic name as per cookie data
                    if (datatemp.id == this.clinic_id) {
                      this.placeHolder = datatemp.clinicName;
                    }
                  });
                }
              } else {
                if (this.isMultiClinicsVisible) {
                  this.selectedClinic = [];
                  this.selectedClinic.push(res.body.data[0].id);
                } else {
                  this.clinic_id = res.body.data[0].id;
                  this.selectedClinic = res.body.data[0].id;
                  this.placeHolder = res.body.data[0].clinicName;
                }
              }
            }
            this.title = $('#page_title').val();
            this.loadClinic(this.selectedClinic);
          }
        } else if (res.status == '401') {
          this._cookieService.removeAll();
          this.router.navigateByUrl('/login');
        }
      },
      (error) => {
        if (error.status == 401) {
          this._cookieService.removeAll();
          this.router.navigateByUrl('/login');
        }
      }
    );
  }

  addNewItem(value: any) {
    this.newItemEvent.emit(value);
  }

  // Get Dentist
  getDentists() {
    if (this.clinic_id == 'all') {
      return false;
    }
    this.clinic_id &&
      this.dentistService.getDentists(this.clinic_id).subscribe(
        (res) => {
          this.showAll = true;
          this.dentists = [];
          this.dentistService.setDentistList(res);
          if (res.status == 200) {
            res.body.data.forEach((data) => {
              if (data.is_active == 1) {
                this.dentists.push(data);
              }
            }); /*
              this.dentists= res.body.data;*/
            this.dentistCount = this.dentists;
            if (this.route != '/dentist-goals') {
              if (this._cookieService.get('clinic_dentist')) {
                let dentistclinic = this._cookieService
                  .get('clinic_dentist')
                  .split('_');
                if (dentistclinic[1] == 'all') {
                  this.selectedDentist = dentistclinic[1];
                } else {
                  this.selectedDentist = parseInt(dentistclinic[1]);
                }
              } else {
                this.selectedDentist = 'all';
              }
            } else {
              this.showAll = false;
              this.selectedDentist = res.body.data[0].providerId;
            }

            if (
              [
                '/dashboards/cliniciananalysis',
                '/dashboards/clinicianproceedures',
                '/dashboards/frontdesk',
                '/dashboards/marketing',
                '/dashboards/finances',
                '/morning-huddle',
                '/followups',
                '/dashboards/followups',
                '/tasks',
                '/campaigns'
              ].includes(this.route)
            ) {
              let opts = this.constants.cookieOpt as CookieOptions;
              this._cookieService.put(
                'clinic_dentist',
                this.clinic_id + '_' + this.selectedDentist,
                opts
              );
            }
            let opts = this.constants.cookieOpt as CookieOptions;
            this._cookieService.put('clinic_id', this.clinic_id, opts);
          } else if (res.status == '401') {
            this._cookieService.removeAll();
            this.router.navigateByUrl('/login');
          }
        },
        (error) => {
          this.warningMessage = 'Please Provide Valid Inputs!';
        }
      );
  }

  checkPremissions(clinicId: string) {
    let permission: string = '';
    const permission2Route: Record<string, string> = {
      healthscreen: '/dashboards/healthscreen',
      dashboard1: '/dashboards/cliniciananalysis',
      dashboard2: '/dashboards/clinicianproceedures',
      dashboard3: '/dashboards/frontdesk',
      dashboard4: '/dashboards/marketing',
      dashboard5: '/dashboards/finances',
      dashboard6: '/dashboards/followups',
      morninghuddle: '/morning-huddle',
      followups: '/followups',
      lostopportunity: '/lost-opportunity',
      profilesettings: `/clinic-settings/${clinicId}`,
      kpireport: '/kpi-report'
    };
    console.log('check-permissions');

    this.rolesUsersService.getRolesIndividual(clinicId).subscribe(
      (res) => {
        if (res.status == 200) {
          permission = <string>res.body.data;
          console.log(res.body);
          if (permission != '' && this.user_type == 7) {
            if (
              Object.keys(permission2Route).includes(permission) &&
              permission2Route[permission] == this.route
            ) {
              this.unAuth = false;
            } else if (
              ['/rewards', '/clinic', '/profile-settings'].includes(this.route)
            ) {
              this.unAuth = false;
            } else {
              this.unAuth = true;
              $('.sa_dashboard_inner_content').addClass('unauth-hide');
              $('.settings-table-card').addClass('unauth-hide');
              $('.page-content').addClass('unauth-hide');
            }
          } else if (
            ['/rewards', '/clinic', '/profile-settings'].includes(this.route)
          ) {
            this.unAuth = false;
          } else {
            this.unAuth = true;
            $('.sa_dashboard_inner_content').addClass('unauth-hide');
            $('.settings-table-card').addClass('unauth-hide');
            $('.page-content').addClass('unauth-hide');
          }
        }
      },
      (error) => {}
    );
  }

  loadClinic(newValues) {
    $('.toast-close-button').click();
    $('.sa_dashboard_inner_content').removeClass('unauth-hide');
    $('.settings-table-card').removeClass('unauth-hide');
    $('.page-content').removeClass('unauth-hide');
    this.unAuth = false;
    var newValue: any = '';

    if (newValue != 'undefined') {
      if (Array.isArray(newValues)) {
        if (
          [
            '/dashboards/finances',
            '/dashboards/marketing',
            '/dashboards/frontdesk',
            '/dashboards/cliniciananalysis',
            '/dashboards/clinicianproceedures'
          ].includes(this.route)
        ) {
          if (
            this.clinicsData.length == this.selectedClinic.length &&
            this.selectedClinic[0] == 'all'
          ) {
            newValue = '';
            this.selectedClinic = [];
          } else {
            this.selectedClinic = [];
            if (newValues.includes('all')) {
              newValue = 'all';
              this.selectedClinic.push('all');
              this.clinicsData.forEach((data) => {
                this.selectedClinic.push(data.id);
              });
              this.clinic_id = this.selectedClinic;
            } else {
              if (newValues.length == 1) this.getAccountConnection(newValues);
              else {
                this.resetAccountConnection();
              }
              this.selectedClinic = [];
              newValue = newValues;
              this.selectedClinic = newValue;
              this.clinic_id = this.selectedClinic;
            }
          }
        } else {
          newValue = newValues[0];
        }
      } else {
        newValue = newValues;
        if (this.route != '/dashboards/healthscreen') {
          this.getAccountConnection(newValue);
        }
      }
      if (this.user_type == '7') {
        var clid = newValue;
        if (this.route.includes('clinic-settings')) {
          var val = this.route.split('/');
          clid = val[2];
        }
        var cliName = '';
        this.clinicsData.forEach((element) => {
          if (element.id == clid) {
            cliName = element.clinicName;
          }
        });
        var clid = newValue;
        if (this.route.includes('clinic-settings')) {
          var val = this.route.split('/');
          clid = val[2];
        }
        var cliName = '';
        this.clinicsData.forEach((element) => {
          if (element.id == clid) {
            cliName = element.clinicName;
          }
        });
        this.checkPremissions(clid);
        setTimeout(() => {
          if (this.unAuth) {
            this.unAuthorisedAlert(cliName);
            return;
          }
        }, 2000);
      }

      let opts = this.constants.cookieOpt as CookieOptions;
      this._cookieService.put('clinic_id', newValue, opts);
      this.clinicsData.forEach((data) => {
        if (data.id == newValue) {
          this.checkTrailEnd(data);
        }
      });

      if ($('body').find('span#currentClinic').length <= 0) {
        $('body').append(
          '<span id="currentClinic" style="display:none" cid="' +
            newValue +
            '"></span>'
        );
      } else {
        $('#currentClinic').attr('cid', newValue);
      }
      if (
        ![
          '/dashboards/finances',
          '/dashboards/marketing',
          '/dashboards/frontdesk',
          '/dashboards/cliniciananalysis',
          '/dashboards/clinicianproceedures'
        ].includes(this.route)
      ) {
        this.selectedClinic = newValue;
        this.clinic_id = this.selectedClinic;
        this.getDentists();
      }
      if (
        this.route == '/dashboards/cliniciananalysis' ||
        this.route == '/dashboards/clinicianproceedures' ||
        this.route == '/dashboards/cliniciananalysis/multi' ||
        this.route == '/dashboards/clinicianproceedures/multi'
      ) {
        if (Array.isArray(this.clinic_id)) {
          if (this.clinic_id.length == 1) {
            this.getDentists();
          }
        } else {
          this.selectedClinic = newValue;
          this.clinic_id = this.selectedClinic;
          this.getDentists();
        }
      }

      $('.internal_clinic').val(newValue);
      if (this.user_type_dentist != '2' && newValue != 'all') {
        // this.getChildID(newValue);
        if (Array.isArray(this.clinic_id) || this.user_type_dentist == '7') {
          // if(this.clinic_id.length == 1){
          //   this.getChildID(newValue);
          // }else{
          $('#clinic_initiate').click();
          if (this._cookieService.get('clinic_dentist')) {
            let dentistclinic = this._cookieService
              .get('clinic_dentist')
              .split('_');
            if (dentistclinic[0] != newValue) {
              this.selectedDentist = 'all';
            } else {
              if (dentistclinic[1] == 'all') {
                this.selectedDentist = dentistclinic[1];
              } else {
                this.selectedDentist = parseInt(dentistclinic[1]);
              }
            }
          } else {
            this.selectedDentist = 'all';
          }
          // let opts = this.constants.cookieOpt as CookieOptions;
          // this._cookieService.put(
          //   "clinic_dentist",
          //   this.clinic_id + "_" + this.selectedDentist,
          //   opts
          // );
          this.loadDentist(this.selectedDentist);
          // }
        } else {
          this.getChildID(newValue);
        }
      } else {
        $('#clinic_initiate').click();
        if (this._cookieService.get('clinic_dentist')) {
          let dentistclinic = this._cookieService
            .get('clinic_dentist')
            .split('_');
          if (dentistclinic[0] != newValue) {
            this.selectedDentist = 'all';
          } else {
            if (dentistclinic[1] == 'all') {
              this.selectedDentist = dentistclinic[1];
            } else {
              this.selectedDentist = parseInt(dentistclinic[1]);
            }
          }
        } else {
          this.selectedDentist = 'all';
        }
        // let opts = this.constants.cookieOpt as CookieOptions;
        // this._cookieService.put(
        //   "clinic_dentist",
        //   this.clinic_id + "_" + this.selectedDentist,
        //   opts
        // );
        this.loadDentist(this.selectedDentist);
      }
    }
  }

  checkTrailEnd(data) {
    if (data.trial_end_date) {
      var date1 = new Date();
      var date2 = new Date(data.trial_end_date);
      var Time = date2.getTime() - date1.getTime();
      var Days = Time / (1000 * 3600 * 24); //Diference in Days
      this.trailDays = Math.ceil(Days);
    } else {
      this.trailDays = 0;
    }
    this.addNewItem(this.trailDays);
    // this.alert(this.trailDays);
  }

  async getChildID(clinic_id) {
    this.clinic_id &&
      this.dentistService.getChildID(clinic_id).subscribe(
        (res) => {
          let opts = this.constants.cookieOpt as CookieOptions;
          if (res.body.data != 0) {
            this._cookieService.put('dentistid', res.body.data, opts);
          }
          this.providerIdDentist = res.body.data;
          $('#clinic_initiate').click();
        },
        (error) => {
          this.warningMessage = 'Please Provide Valid Inputs!';
        }
      );
  }

  loadDentist(newValue) {
    if (this._cookieService.get('clinic_dentist')) {
      let dentistclinic = this._cookieService.get('clinic_dentist').split('_');
      if (dentistclinic[1] == 'all') {
        this.selectedDentist = dentistclinic[1];
      } else {
        this.selectedDentist = parseInt(dentistclinic[1]);
      }
      if (newValue == null && newValue !== this.selectedDentist) {
        newValue = this.selectedDentist;
      }
    }

    if ($('body').find('span#currentDentist').length <= 0) {
      $('body').append(
        '<span id="currentDentist" style="display:none" did="' +
          newValue +
          '"></span>'
      );
    } else {
      $('#currentDentist').attr('did', newValue);
    }
    this.selectedDentist = newValue;
    if (
      [
        '/dashboards/cliniciananalysis',
        '/dashboards/clinicianproceedures',
        '/dashboards/frontdesk',
        '/dashboards/marketing',
        '/dashboards/finances'
      ].includes(this.route)
    ) {
      let opts = this.constants.cookieOpt as CookieOptions;
      this._cookieService.put(
        'clinic_dentist',
        this.clinic_id + '_' + this.selectedDentist,
        opts
      );
    }
    $('.external_dentist').val(newValue);
    $('#dentist_initiate').click();
  }

  toggleReffer(event) {
    let x = event.clientX;
    this.referFriendNameError = false;
    this.referFriendEmailError = false;
    this.referFriendEmailPError = false;
    this.referFriendName = '';
    this.referFriendEmail = '';
    if (this.referFriend == true) {
      $('.sa_card.topbar-strip').css('z-index', 999);
      $('.morning-huddle-date.topModel').css('z-index', 999);
      $('.sa-pull-right.kanban').css('z-index', 9999);
      $('.e-card.e-template').css('z-index', 999);
      $('body').find('.referafrndForm').css('opacity', 0);
      this.referFriend = false;
    } else {
      this.referFriend = true;
      setTimeout(function () {
        $('.sa_card.topbar-strip').css('z-index', 0);
        $('.morning-huddle-date.topModel').css('z-index', 0);
        $('.sa-pull-right.kanban').css('z-index', 0);
        $('.e-card.e-template').css('z-index', 0);
        $('body')
          .find('.referafrndForm')
          .css({ left: x - 750, opacity: 1 });
      }, 100);
    }
  }

  sendReffer() {
    this.referFriendNameError = false;
    this.referFriendEmailError = false;
    this.referFriendEmailPError = false;
    if (this.referFriendName.trim() == '') {
      this.referFriendNameError = true;
    }
    if (this.referFriendEmail.trim() == '') {
      this.referFriendEmailError = true;
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      !re.test(this.referFriendEmail.trim()) &&
      this.referFriendEmail.trim() != ''
    ) {
      this.referFriendEmailPError = true;
    }

    if (
      this.referFriendEmailError == true ||
      this.referFriendNameError == true ||
      this.referFriendEmailPError
    ) {
      return false;
    }

    this.clinic_id &&
      this.dentistService
        .getReferFriend(
          this.clinic_id,
          this.referFriendName.trim(),
          this.referFriendEmail.trim()
        )
        .subscribe(
          (res) => {
            if (res.status == 200) {
              this.referFriend = false;
              this.referFriendName = '';
              this.referFriendEmail = '';
              this.toastr.success('Email send to user successfully');
            } else {
              this.toastr.success('Something went wrong');
            }
          },
          (error) => {
            this.warningMessage = 'Please Provide Valid Inputs!';
          }
        );
  }

  changeClinic(newValues, allChecked) {
    var newValue: any = '';

    if (newValue != 'undefined') {
      if (Array.isArray(newValues)) {
        if (
          [
            '/dashboards/finances',
            '/dashboards/marketing',
            '/dashboards/frontdesk',
            '/dashboards/cliniciananalysis',
            '/dashboards/clinicianproceedures'
          ].includes(this.route)
          //   this.apiUrl.includes('test')) ||
          // this.route == '/dashboards/finances/multi' ||
          // this.route == '/dashboards/marketing/multi' ||
          // this.route == '/dashboards/frontdesk/multi' ||
          // this.route == '/dashboards/cliniciananalysis/multi' ||
          // this.route == '/dashboards/clinicianproceedures/multi'
        ) {
          if (
            this.clinicsData.length == this.selectedClinic.length &&
            this.clinicsData.length != 1
          ) {
            if (this.allChecked == true) {
              newValue = '';
              this.selectedClinic = [];
              this.allChecked = false;
              this.placeHolder = '';
              this.showDropDown = false;
            } else {
              this.selectedClinic = [];
              newValue = 'all';
              this.selectedClinic.push('all');
              this.clinicsData.forEach((data) => {
                this.selectedClinic.push(data.id);
              });
              this.clinic_id = this.selectedClinic;
              this.allChecked = true;
              this.showDropDown = false;
            }
          } else {
            this.selectedClinic = [];
            if (newValues.includes('all')) {
              newValue = 'all';
              this.selectedClinic.push('all');
              this.clinicsData.forEach((data) => {
                this.selectedClinic.push(data.id);
              });
              this.clinic_id = this.selectedClinic;
              this.allChecked = true;
              this.showDropDown = false;
              this.resetAccountConnection();
            } else {
              if (newValues.length == 1) {
                this.getAccountConnection(newValues);
              } else {
                this.resetAccountConnection();
              }
              if (
                newValues.length == 1 &&
                (this.route == '/dashboards/cliniciananalysis' ||
                  this.route == '/dashboards/clinicianproceedures')
                // this.route == '/dashboards/cliniciananalysis/multi' ||
                // this.route == '/dashboards/clinicianproceedures/multi'
              ) {
                this.showDropDown = true;
              } else {
                this.showDropDown = false;
              }
              this.allChecked = false;
              this.selectedClinic = [];
              newValue = newValues;
              this.selectedClinic = newValue;
              this.clinic_id = this.selectedClinic;
            }
          }
        } else {
          newValue = newValues[0];
        }
      } else {
        newValue = newValues;
      }
    }
  }

  loadClinicEvent($event) {
    if ($event == false && this.selectedClinic != '') {
      this.loadClinic(this.selectedClinic);
    }
    if ($event == false && this.selectedClinic == '') {
      this.toastr.error('Please select atleast one clinic');
    }
  }

  getAccountConnection(clinic_id) {
    this.headerService
      .clinicGetAccountingPlatform(clinic_id)
      .subscribe((res) => {
        if (res.status == 200) {
          let opts = this.constants.cookieOpt as CookieOptions;
          this._cookieService.put('a_connect', res.body.data, opts);
        }
      });
  }
  resetAccountConnection() {
    let opts = this.constants.cookieOpt as CookieOptions;
    this._cookieService.put('a_connect', '', opts);
  }
}
