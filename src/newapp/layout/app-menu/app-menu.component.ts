import { FlatTreeControl } from "@angular/cdk/tree";
import { Observable, Subject } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";
import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from "@angular/material/tree";
import { NavigationEnd, Router } from "@angular/router";
import { AuthFacade } from "../../auth/facades/auth.facade";
import { environment } from "@/environments/environment";
import { ClinicFacade } from "../../clinic/facades/clinic.facade";
import { LayoutFacade } from "../facades/layout.facade";
import {
  IconDefinition,
  faBriefcase,
  faChartArea,
  faClinicMedical,
  faCoffee,
  faCog,
  faFile,
  faHandHoldingUsd,
  faHandshake,
  faIdCard,
  faQuestion,
  faUsers,
  faCaretRight,
  faCaretDown,
  faPhoneFlip,
} from "@fortawesome/free-solid-svg-icons";
import { USER_MASTER, CONSULTANT, USER_CLINICIAN } from "@/newapp/constants";

/**
 * Menu data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface MenuNode {
  title: string;
  path: string;
  icon?: IconDefinition;
  children?: MenuNode[];
  permissions?: string[];
  userTypes?: number[];
  validatorFn?: Function;
}

interface MenuValidatorParams {
  permissions?: string[];
  userType?: number;
  userPlan?: string;
  hasPrimeClinics?: string;
}

const MENU_DATA: MenuNode[] = [
  {
    title: "Health Screen",
    path: "dashboards/healthscreen",
    icon: faClinicMedical,
    validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
      return (
        (permissions?.indexOf("healthscreen") >= 0 ||
          [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0) &&
        userType == USER_CLINICIAN
      );
    },
  },
  {
    title: "Clinic Health",
    path: "dashboards/healthscreen",
    icon: faClinicMedical,
    validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
      return (
        (permissions?.indexOf("healthscreen") >= 0 ||
          [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0) &&
        userType !== USER_CLINICIAN
      );
    },
  },
  // user_type==2 || permissions.contains(morninghuddle) || user_type==7
  {
    title: "Morning Huddle",
    path: "morning-huddle",
    icon: faCoffee,
    validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
      return (
        permissions?.indexOf("morninghuddle") >= 0 ||
        [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
      );
    },
  },
  // user_type==2 || permissions.contains(followups) || user_type==7
  {
    title: "Follow Ups",
    path: "followups",
    icon: faPhoneFlip,
    validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
      return (
        permissions?.indexOf("followups") >= 0 ||
        [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
      );
    },
  },
  // (user_type==2 || permissions.indexOf(campaigns) || user_type==7) && apiUrl.includes('test')
  {
    title: "Campaigns",
    path: "campaigns",
    icon: faUsers,
    validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
      return (
        (permissions?.indexOf("campaigns") >= 0 ||
          [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0) &&
        environment.apiUrl.includes("test")
      );
    },
  },
  // user_type==2 || permissions.indexOf('dashboard') || user_type==7
  {
    title: "Dashboard",
    path: "/newapp/dashboard",
    icon: faChartArea,
    validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
      return (
        permissions?.indexOf("dashboard") >= 0 ||
        [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
      );
    },
    children: [
      // user_type==2 || permissions.contains(dashboard1) || user_type==7
      {
        title: "Clinician Analysis",
        path: "dashboards/cliniciananalysis",
        validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
          return (
            permissions?.indexOf("dashboard1") >= 0 ||
            [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
          );
        },
      },
      // user_type==2 || permissions.contains(dashboard2) || user_type==7
      {
        title: "Clinician Procedures & Referrals",
        path: "dashboards/clinicianproceedures",
        validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
          return (
            permissions?.indexOf("dashboard2") >= 0 ||
            [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
          );
        },
      },
      // user_type==2 || permissions.contains(dashboard3) || user_type==7
      {
        title: "Front Desk",
        path: "dashboards/frontdesk",
        validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
          return (
            permissions?.indexOf("dashboard3") >= 0 ||
            [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
          );
        },
      },
      // user_type==2 || permissions.contains(dashboard6) || user_type==7
      {
        title: "Follow Ups",
        path: "dashboards/followups",
        validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
          return (
            permissions?.indexOf("dashboard6") >= 0 ||
            [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
          );
        },
      },
      //(user_type==2 || permissions.contains(dashboard4) || user_type==7) && userPlan!='lite'
      {
        title: "Marketing",
        path: "dashboards/marketing",
        validatorFn: ({
          permissions,
          userType,
          userPlan,
        }: MenuValidatorParams) => {
          return (
            (permissions?.indexOf("dashboard4") >= 0 ||
              [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0) &&
            userPlan != "lite"
          );
        },
      },
      // user_type==2 || permissions.contains(dashboard5) || user_type==7
      {
        title: "Finances",
        path: "/newapp/dashboard/finances",
        validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
          return (
            permissions?.indexOf("dashboard5") >= 0 ||
            [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
          );
        },
      },
    ],
  },
  // (user_type == 2 || permisions.indexOf('staffmeeting') >= 0 || user_type == 7) && apiUrl.includes('test')
  {
    title: "Staff Meetings",
    path: "staff-meetings",
    icon: faIdCard,
    validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
      return (
        (permissions?.indexOf("staffmeeting") >= 0 ||
          [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0) &&
        environment.apiUrl.includes("test")
      );
    },
  },
  // (hasPrimeClinics == 'yes' && user_type == 2) || (hasPrimeClinics == 'yes' && permisions.indexOf('kpireport') >= 0) || user_type == 7
  {
    title: "Prime KPI Report",
    path: "kpi-report",
    icon: faFile,
    validatorFn: ({
      permissions,
      userType,
      hasPrimeClinics,
    }: MenuValidatorParams) => {
      return (
        (userType == 2 && hasPrimeClinics == "yes") ||
        (permissions?.indexOf("kpireport") >= 0 && hasPrimeClinics == "yes") ||
        userType == 7
      );
    },
  },
  // user_type == 2 || permisions.indexOf('lostopportunity') >= 0 || user_type == 7
  {
    title: "Lost Opportunity",
    path: "lost-opportunity",
    icon: faHandHoldingUsd,
    validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
      return (
        permissions?.indexOf("lostopportunity") >= 0 ||
        [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
      );
    },
  },
  // apiUrl.includes('test')
  {
    title: "Rewards", // icon=new
    path: "rewards",
    icon: faHandHoldingUsd,
    validatorFn: () => {
      return environment.apiUrl.includes("test");
    },
  },
  {
    title: "Refer A Friend", // Get 50% off
    path: "",
    icon: faHandshake,
  },
  // user_type != 7 && apiUrl.includes('test')
  {
    title: "Tasks",
    path: "tasks",
    icon: faBriefcase,
    validatorFn: ({ userType }: MenuValidatorParams) => {
      return userType != 7 && environment.apiUrl.includes("test");
    },
  },
  // nav_open == 'setting'
  {
    title: "Settings",
    path: "",
    icon: faCog,
    children: [
      // user_type == 2 || permisions.indexOf('profilesettings') >= 0 || user_type == 7
      {
        title: "Clinics",
        path: "clinic",
        validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
          return (
            permissions?.indexOf("profilesettings") >= 0 ||
            [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
          );
        },
      },
      {
        title: "Users",
        path: "roles-users",
        validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
          return (
            (permissions?.indexOf("profilesettings") >= 0 || userType == 2) &&
            userType != 7
          );
        },
      },
      {
        title: "My Account",
        path: "profile-settings",
      },
    ],
  },
  {
    title: "Help",
    path: "https://jeeve.crunch.help/jeeve-analytics",
    icon: faQuestion,
  },
];

/** Flat node with expandable and level information */
interface MenuFlatNode {
  expandable: boolean;
  title: string;
  path: string;
  icon: IconDefinition | undefined;
  level: number;
}

@Component({
  selector: "app-menu",
  templateUrl: "./app-menu.component.html",
  styleUrls: ["./app-menu.component.scss"],
})
export class AppMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ViewChild('tree') tree: Tree;
  faCaretRight = faCaretRight;
  faCaretDown = faCaretDown;
  private _transformer = (node: MenuNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      title: node.title,
      path: node.path,
      icon: node.icon,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<MenuFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  activedTitle: string = "";
  activedUrl: string = "";
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // defaultMenu = '/dashboard/finances';

  get rolesIndividual$() {
    return this.authFacade.rolesIndividualAndClinics$;
  }

  constructor(
    private router: Router,
    // private menuService: MenuService,
    private authFacade: AuthFacade,
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade
  ) {
    this.dataSource.data = [];
    this.authFacade.getRolesIndividual();
    this.clinicFacade.loadClinics();

    this.rolesIndividual$.pipe(takeUntil(this.destroy$)).subscribe((result) => {
      const params: MenuValidatorParams = {
        permissions: result.data,
        userType: result.type,
        userPlan: result.plan,
        hasPrimeClinics: result.hasPrimeClinics,
      };
      const menuData: MenuNode[] = [];

      MENU_DATA.forEach((item) => {
        //return item.validatorFn ? item.validatorFn(params) : true;
        if (item.validatorFn) {
          const mainMenuValid = item.validatorFn(params);
          if (item.children && mainMenuValid) {
            const children = item.children.filter((c) =>
              c.validatorFn ? c.validatorFn(params) : true
            );
            menuData.push({ ...item, ...{ children } });
            return;
          }
        }
        menuData.push({ ...item });
      });

      this.dataSource.data = menuData;
      const treeNode = this.treeControl.dataNodes.find(
        (node) => this.activedUrl.includes(node.path) && node.level == 0
      );
      if (treeNode) this.treeControl.expand(treeNode);
    });

    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        map((event: any) => event.routerEvent ?? event),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        const { url } = <NavigationEnd>event;
        // const path = this.router.parseUrl(url).root.children['primary']
        //   ? this.router.parseUrl(url).root.children['primary'].segments[0].path
        //   : this.defaultMenu;
        this.activedUrl = url.split("?")[0];

        const node = this.findNodeByPath(this.activedUrl, MENU_DATA);

        if (node) {
          this.updateActivateState(node.title);
        }
      });

    this.activedTitle$.subscribe((v) => {
      this.activedTitle = v;
    });
  }

  get activedTitle$(): Observable<string> {
    // return this.menuService.menuSource$.pipe(
    //   takeUntil(this.destroy$),
    //   map((v) => v.key)
    // );
    return this.layoutFacade.activatedRouteTitle$;
  }

  hasChild = (_: number, node: MenuFlatNode) => node.expandable;
  ngOnInit() {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  toggleMenuItem = (node: MenuFlatNode): void => {
    if (!node.expandable) this.router.navigateByUrl(`/${node.path}`);
  };

  updateActivateState(title: string) {
    this.layoutFacade.setActivatedRouteTitle(title);
    // this.menuService.onMenuStateChange({
    //   key: title,
    //   routeEvent: true
    // });
  }

  findNodeByPath(path: string, menuNodes: MenuNode[]): MenuNode | undefined {
    for (let menuNode of menuNodes) {
      if (menuNode.path == path) return menuNode;
      else if (menuNode.children) {
        return this.findNodeByPath(path, menuNode.children);
      }
    }
    return undefined;
  }
}
