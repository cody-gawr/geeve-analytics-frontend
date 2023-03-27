import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  AfterViewInit,
  ViewEncapsulation,
  Inject
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { RolesUsersService } from '../../../roles-users/roles-users.service';
import { CookieService, CookieOptions } from 'ngx-cookie';
import { HeaderService } from '../header/header.service';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AppConstants } from '../../../app.constants';
import { ToastrService } from 'ngx-toastr';

import { DentistService } from '../../../dentist/dentist.service';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog
} from '@angular/material/dialog';

@Component({
  selector: 'refer-friend',
  templateUrl: './referral.html',
  encapsulation: ViewEncapsulation.None
})
export class ReferFriendComponent {
  public referFriendName: any = '';
  public referFriendEmail: any = '';
  public referFriendNameError: boolean = false;
  public referFriendEmailError: boolean = false;
  public referFriendEmailPError: boolean = false;
  public referFriendNameErrorMsg: string = null;
  public referFriendEmailErrorMsg: string = null;
  clinicsData = [];
  clinic_id;
  constructor(
    public dialogRef: MatDialogRef<ReferFriendComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cookieService: CookieService,
    private router: Router,
    private dentistService: DentistService,
    private toastr: ToastrService,
    private headerService: HeaderService // private chartsService: ChartsService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(data) {
    this.clinic_id = this._cookieService.get('clinic_id');

    this.referFriendNameError = false;
    this.referFriendEmailError = false;
    this.referFriendEmailPError = false;

    if (data.referFriendName.trim() == '') {
      this.referFriendNameError = true;
      this.referFriendNameErrorMsg = 'Please enter name';
    }

    if (data.referFriendEmail.trim() == '') {
      this.referFriendEmailError = true;
      this.referFriendEmailErrorMsg = 'Please enter email';
    }

    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      !re.test(this.referFriendEmail.trim()) &&
      this.referFriendEmail.trim() != ''
    ) {
      this.referFriendEmailPError = true;
      this.referFriendEmailErrorMsg = 'Please enter valid email';
    }

    if (
      this.referFriendEmailError == true ||
      this.referFriendNameError == true ||
      this.referFriendEmailPError
    ) {
      return false;
    }

    this.dentistService
      .getReferFriend(
        this.clinic_id,
        data.referFriendName.trim(),
        data.referFriendEmail.trim()
      )
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.referFriendNameError = false;
            this.referFriendEmailError = false;
            this.dialogRef.close();
            this.toastr.success('Your invite has been sent!');
          } else {
            this.toastr.success('Something went wrong');
          }
        },
        (error) => {
          // this.warningMessage = "Please Provide Valid Inputs!";
        }
      );
  }
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy, AfterViewInit {
  public apiUrl = environment.apiUrl;
  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;
  public clinicsData: any[] = [];
  private _mobileQueryListener: () => void;
  status: boolean = false;
  public user_type;
  public display_name;
  public user_image;
  public login_status;
  public nav_open = '';
  public activeRoute = '';
  public showMenu: boolean = false;
  public permisions: any = '';
  public permisions_var: any = '';
  public clinic_id;
  public hasPrimeClinics;

  clickEvent(val) {
    this.status = !this.status;
    if (this.nav_open == val) {
      this.nav_open = '';
    } else {
      this.nav_open = val;
    }
  }

  subclickEvent() {
    this.status = true;
  }

  constructor(
    public dialog: MatDialog,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    /* public menuItems: MenuItems,*/ private rolesUsersService: RolesUsersService,
    private headerService: HeaderService,
    private _cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router,
    public constants: AppConstants
  ) {
    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationEnd && event.url != '/login') {
        this.user_type = this._cookieService.get('user_type');
        if (!this._cookieService.get("user_image")){
          this.user_image = 'assets/images/gPZwCbdS.jpg';
        }
        // else{
        //   this.user_image = this._cookieService.get("user_image");
        // }
        this.display_name = this._cookieService.get('display_name');
        this.login_status = this._cookieService.get('login_status');


        this.clinic_id = this._cookieService.get('clinic_id');
        if (this.user_type == 7) {
          if (this.clinic_id != null && typeof this.clinic_id != 'undefined') {
            this.clinic_id = this._cookieService.get('clinic_id');
            this.getRoles();
          } else {
            this.getClinic();
          }
        } else {
          this.getClinic();
        }
        this.activeRoute = router.url;
        if (
          this.activeRoute == '/dashboards/cliniciananalysis' ||
          this.activeRoute == '/dashboards/clinicianproceedures' ||
          this.activeRoute == '/dashboards/frontdesk' ||
          this.activeRoute == '/dashboards/marketing' ||
          this.activeRoute == '/dashboards/finances' ||
          this.activeRoute == '/dashboards/followups'
        ) {
          this.nav_open = 'dashboards';
        } else if (
          this.activeRoute == '/clinic' ||
          this.activeRoute == '/roles-users' ||
          this.activeRoute == '/profile-settings'
        ) {
          this.nav_open = 'setting';
        } else {
          this.nav_open = '';
        }
      //}
    //});
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngAfterViewInit() {
    (<any>$('.srh-btn, .cl-srh-btn')).on('click', function () {
      (<any>$('.app-search')).toggle(200);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.headerService.logout().subscribe(
      () => {
        this._cookieService.removeAll();
        this.rolesUsersService.setRoleIndividual({
          body: { message: '', data: [], plan: '', type: 0 },
          status: 0
        })
        this.router.navigate(['/login']);
      },
    );
  }

  public userPlan: any = '';
  getRoles() {
    this.rolesUsersService.getRoleIndividual.subscribe({
      next: (res) => {
        if (res.status == 200) {
          this.permisions = res.body.data;
          this._cookieService.put('user_type', res.body.type + '', this.constants.cookieOpt );
          this._cookieService.put('user_plan', res.body.plan, this.constants.cookieOpt );
          this.userPlan = res.body.plan;
          //Remove apis calls when user have not permission of any page form FE
          if (res.body.type != 2 && res.body.type != 7) {
            if (this.activeRoute == '/dashboards/healthscreen') {
              this.permisions_var = 'healthscreen';
            } else if (this.activeRoute == '/dashboards/cliniciananalysis') {
              this.permisions_var = 'dashboard1';
            } else if (this.activeRoute == '/dashboards/clinicianproceedures') {
              this.permisions_var = 'dashboard2';
            } else if (this.activeRoute == '/dashboards/frontdesk') {
              this.permisions_var = 'dashboard3';
            } else if (this.activeRoute == '/dashboards/marketing') {
              this.permisions_var = 'dashboard4';
            } else if (this.activeRoute == '/dashboards/finances') {
              this.permisions_var = 'dashboard5';
            } else if (this.activeRoute == '/morning-huddle') {
              this.permisions_var = 'morninghuddle';
            } else if (this.activeRoute == '/lost-opportunity') {
              this.permisions_var = 'lostopportunity';
            }

            if (this.permisions.indexOf(this.permisions_var) >= 0) {
            } else {
              this.router.navigate(['/profile-settings']);
            }
          }
          // End
        }
      },
      error: (error) => {}
    });
  }

  getClinic() {
    this.headerService.getClinic.subscribe(
      (res) => {
        if (res.status == 200) {
          this.clinic_id = res.body.data[0]['id'];
          this.hasPrimeClinics = res.body.hasPrimeClinics;
          this.getRoles();
        }
      },
      (error) => {}
    );
  }

  open() {
    const dialogRef = this.dialog.open(ReferFriendComponent, {
      width: '700px',
      data: {
        referFriendName: '',
        referFriendEmail: ''
      }
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
