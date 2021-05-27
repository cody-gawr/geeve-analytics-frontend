import { ChangeDetectorRef, Component, OnDestroy, AfterViewInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
//import { MenuItems } from '../../../shared/menu-items/menu-items';
import { RolesUsersService } from '../../../roles-users/roles-users.service';
import { CookieService } from "ngx-cookie";
import { HeaderService } from '../header/header.service';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy,AfterViewInit {
  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;
  public clinicsData:any[] = [];
  private _mobileQueryListener: () => void;
  status: boolean = false;
  public user_type;
  public display_name;
  public user_image;
  public login_status;
  public nav_open = "";
  public activeRoute = "";
  public showMenu:boolean = false; 
  public permisions:any = '';

  clickEvent(val) {
    this.status = !this.status;
    if(this.nav_open == val){
      this.nav_open = '';
    } else {
      this.nav_open = val;
    }
  }

  subclickEvent() {
    this.status = true;
  }
  constructor( changeDetectorRef: ChangeDetectorRef,media: MediaMatcher,/* public menuItems: MenuItems,*/ private rolesUsersService: RolesUsersService,private headerService: HeaderService,private _cookieService: CookieService,private route: ActivatedRoute,private router: Router
  ) {
      this.router.events.filter(event => event instanceof NavigationEnd).subscribe((value) => {
          this.getRoles();
          this.activeRoute = router.url;           
          if(this.activeRoute == '/dashboards/cliniciananalysis' || this.activeRoute == '/dashboards/clinicianproceedures' || this.activeRoute == '/dashboards/frontdesk' || this.activeRoute == '/dashboards/marketing' || this.activeRoute == '/dashboards/finances'){
            this.nav_open = 'dashboards';
          } else if(this.activeRoute == '/clinic' || this.activeRoute == '/roles-users' || this.activeRoute == '/profile-settings'){
            this.nav_open = 'setting';
          } else {
            this.nav_open = '';
          }
        });
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
  }
 ngAfterViewInit() {
(<any>$('.srh-btn, .cl-srh-btn')).on('click', function() {
      (<any>$('.app-search')).toggle(200);
    });
    // This is for the topbar search
     this.user_type = this._cookieService.get("user_type");
     this.display_name = this._cookieService.get("display_name");
     this.user_image = this._cookieService.get("user_image");
     this.login_status = this._cookieService.get("login_status");
     if(!this._cookieService.get("user_image"))
      this.user_image = 'assets/images/gPZwCbdS.jpg';

     
    // This is for the megamenu
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
  logout() {
      this.headerService.logout().subscribe((res) => {
        this._cookieService.put("username",'');
        this._cookieService.put("email", '');
        this._cookieService.put("token", '');
        this._cookieService.put("userid", '');
        this._cookieService.put("childid", '');
        this._cookieService.put("dentistid", '');
        this.router.navigate(['/login']);       
    }, error => {
        this._cookieService.put("username",'');
        this._cookieService.put("email", '');
        this._cookieService.put("token", '');
        this._cookieService.put("userid", '');
        this._cookieService.put("childid", '');
        this._cookieService.put("dentistid", '');
        this.router.navigate(['/login']);
    });
  }


 async getRoles() {      
   await this.rolesUsersService.getRolesIndividual().subscribe((res) => {
      if(res.message == 'success'){ 
        this.permisions =res.data;                        
        this._cookieService.put("user_type",res.type);
      }
    }, error => {
    });
  }

}
