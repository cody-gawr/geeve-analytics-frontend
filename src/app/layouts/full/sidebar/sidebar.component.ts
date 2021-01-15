import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { CookieService } from "angular2-cookie/core";
import { HeaderService } from '../header/header.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  clickEvent() {
    this.status = !this.status;
  }

  subclickEvent() {
    this.status = true;
  }
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private headerService: HeaderService
    ,private _cookieService: CookieService,
    private route: ActivatedRoute, private router: Router
  ) {
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
      this.headerService.logout(this._cookieService.get("userid")).subscribe((res) => {
       console.log(res);
       if(res.message == 'success'){
            this._cookieService.removeAll();
        this.router.navigate(['/login']);
       }
    }, error => {
    }    
    );
  }

}
