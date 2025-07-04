import { FlatTreeControl } from '@angular/cdk/tree';
import { Observable, Subject, combineLatest, distinctUntilChanged, of } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { NavigationEnd, Router } from '@angular/router';
import { AuthFacade } from '../../auth/facades/auth.facade';
import { environment } from '@/environments/environment';
import { ClinicFacade } from '../../clinic/facades/clinic.facade';
import { LayoutFacade } from '../facades/layout.facade';
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
  faCaretRight,
  faCaretDown,
  faPhoneFlip,
  faBullhorn,
  faBullseye,
  faChartPie,
  faUserTag,
} from '@fortawesome/free-solid-svg-icons';
import { USER_MASTER, CONSULTANT, USER_CLINICIAN } from '@/newapp/constants';

/**
 * Menu data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface MenuNode {
  title: string;
  path: string;
  linkType?: 'open' | 'route' | 'modal';
  icon?: IconDefinition;
  children?: MenuNode[];
  permissions?: string[];
  userTypes?: number[];
  validatorFn?: Function;
  badgeText?: string;
  badgeStyle?: string;
}

interface MenuValidatorParams {
  permissions?: string[];
  userType?: number;
  userPlan?: string;
  hasPrimeClinics?: string;
  userId?: string | number;
}

function validatePermission(permissions: string[] | string, per: string) {
  return typeof permissions === 'string'
    ? permissions === 'all' || permissions.includes(per)
    : permissions?.indexOf(per) >= 0;
}

function featureEnabled(feature: string) {
  return environment.featureFlags[feature];
}

const MENU_DATA: MenuNode[] = [
  {
    title: 'Health Screen',
    path: 'dashboards/healthscreen',
    icon: faClinicMedical,
    validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
      return (
        (permissions?.indexOf('healthscreen') >= 0 ||
          [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0) &&
        userType == USER_CLINICIAN
      );
    },
  },
  {
    title: 'Clinic Health',
    path: 'dashboards/healthscreen',
    icon: faClinicMedical,
    validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
      return (
        (permissions?.indexOf('healthscreen') >= 0 ||
          [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0) &&
        userType !== USER_CLINICIAN
      );
    },
  },
  // user_type==2 || permissions.contains(morninghuddle) || user_type==7
  {
    title: 'Morning Huddle',
    path: 'morning-huddle',
    icon: faCoffee,
    validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
      return (
        permissions?.indexOf('morninghuddle') >= 0 ||
        [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
      );
    },
  },
  {
    title: 'CRM',
    path: '/newapp/crm',
    icon: faUserTag,
    children: [
      // user_type==2 || permissions.contains(campaigns) || user_type==7
      {
        title: 'Campaigns',
        path: '/newapp/crm/campaigns',
        icon: faBullhorn,
        badgeText: 'New',
        badgeStyle: 'yellow-bg',
        // validatorFn: ({ permissions, userType, userId }: MenuValidatorParams) => {

        //   return (
        //     validatePermission(permissions, 'campaigns') ||
        //     [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
        //   );
        // },
      },
      // user_type==2 || permissions.contains(followups) || user_type==7
      {
        title: 'Follow Ups',
        path: '/newapp/crm/followups',
        icon: faPhoneFlip,
        // validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
        //   return (
        //     permissions?.indexOf('followups') >= 0 ||
        //     [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
        //   );
        // },
      },
      // user_type==2 || permissions.contains(dashboard3) || user_type==7
      {
        title: 'Conversions',
        path: '/newapp/crm/conversion-tracker',
        icon: faBullseye,
        badgeText: 'Coming soon',
        badgeStyle: 'yellow-bg',
        // validatorFn: ({ permissions, userType, hasPrimeClinics }: MenuValidatorParams) => {
        //   return (
        //     !environment.production ||
        //     ((userType == 2 || permissions?.indexOf('conversionTracker') >= 0 || userType == 7) &&
        //       featureEnabled('conversion-tracker'))
        //   );
        // },
      },
    ],
  },
  // user_type==2 || permissions.indexOf('dashboard') || user_type==7
  {
    title: 'Dashboard',
    path: '/newapp/dashboard',
    icon: faChartArea,
    validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
      return (
        permissions?.indexOf('dashboard') >= 0 || [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
      );
    },
    children: [
      // user_type==2 || permissions.contains(dashboard1) || user_type==7
      {
        title: 'Clinician Analysis',
        path: '/newapp/dashboard/cliniciananalysis',
        validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
          return (
            permissions?.indexOf('dashboard1') >= 0 ||
            [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
          );
        },
      },
      // user_type==2 || permissions.contains(dashboard2) || user_type==7
      {
        title: 'Clinician Procedures & Referrals',
        path: '/newapp/dashboard/clinicianproceedures',
        validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
          return (
            permissions?.indexOf('dashboard2') >= 0 ||
            [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
          );
        },
      },
      // user_type==2 || permissions.contains(dashboard3) || user_type==7
      {
        title: 'Front Desk',
        path: '/newapp/dashboard/frontdesk',
        validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
          return (
            permissions?.indexOf('dashboard3') >= 0 ||
            [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
          );
        },
      },
      // user_type==2 || permissions.contains(dashboard6) || user_type==7
      {
        title: 'Follow Ups',
        path: '/newapp/dashboard/followups',
        validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
          return (
            permissions?.indexOf('dashboard6') >= 0 ||
            [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
          );
        },
      },
      //(user_type==2 || permissions.contains(dashboard4) || user_type==7) && userPlan!='lite'
      {
        title: 'Marketing',
        path: '/newapp/dashboard/marketing',
        badgeText: 'Updated',
        badgeStyle: 'yellow-bg',
        validatorFn: ({ permissions, userType, userPlan }: MenuValidatorParams) => {
          return (
            (permissions?.indexOf('dashboard4') >= 0 ||
              [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0) &&
            userPlan != 'lite'
          );
        },
      },
      // user_type==2 || permissions.contains(dashboard5) || user_type==7
      {
        title: 'Finances',
        path: '/newapp/dashboard/finances',
        badgeText: 'Updated',
        badgeStyle: 'yellow-bg',
        validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
          return (
            permissions?.indexOf('dashboard5') >= 0 ||
            [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
          );
        },
      },
    ],
  },
  // (user_type == 2 || permisions.indexOf('staffmeeting') >= 0 || user_type == 7) && apiUrl.includes('test')
  {
    title: 'Staff Meetings',
    path: 'staff-meetings',
    icon: faIdCard,
    validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
      return false;
      // return (
      //   (permissions?.indexOf('staffmeeting') >= 0 ||
      //     [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0) &&
      //   environment.apiUrl.includes('test')
      // );
    },
  },

  {
    title: 'Practice Insights',
    path: '/newapp/practice-insights',
    icon: faChartPie,
    validatorFn: ({ permissions, userType, hasPrimeClinics }: MenuValidatorParams) => {
      return (
        (userType == 2 || permissions?.indexOf('practiceinsights') >= 0 || userType == 7) &&
        featureEnabled('practice-insights')
      );
    },
  },
  {
    title: 'Prime KPI Report',
    path: 'kpi-report',
    icon: faFile,
    validatorFn: ({ permissions, userType, hasPrimeClinics }: MenuValidatorParams) => {
      return (
        (userType == 2 && hasPrimeClinics == 'yes') ||
        (permissions?.indexOf('kpireport') >= 0 && hasPrimeClinics == 'yes') ||
        userType == 7
      );
    },
  },
  // user_type == 2 || permisions.indexOf('lostopportunity') >= 0 || user_type == 7
  {
    title: 'Lost Opportunity',
    path: 'lost-opportunity',
    icon: faHandHoldingUsd,
    validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
      return (
        permissions?.indexOf('lostopportunity') >= 0 ||
        [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
      );
    },
  },
  // apiUrl.includes('test')
  {
    title: 'Rewards', // icon=new
    path: 'rewards',
    icon: faHandHoldingUsd,
    validatorFn: () => {
      return false;
      // return environment.apiUrl.includes('test');
    },
  },
  {
    title: 'Refer A Friend', // Get 50% off
    path: '',
    icon: faHandshake,
    badgeText: 'Get 50% off',
    validatorFn: () => true,
  },
  // user_type != 7 && apiUrl.includes('test')
  {
    title: 'Tasks',
    path: 'tasks',
    icon: faBriefcase,
    validatorFn: ({ userType }: MenuValidatorParams) => {
      return false;
      //return userType != 7 && environment.apiUrl.includes('test');
    },
  },
  // nav_open == 'setting'
  {
    title: 'Settings',
    path: '',
    icon: faCog,
    children: [
      // user_type == 2 || permisions.indexOf('profilesettings') >= 0 || user_type == 7
      {
        title: 'Clinics',
        path: 'clinic',
        validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
          return (
            permissions?.indexOf('profilesettings') >= 0 ||
            [USER_MASTER, CONSULTANT].indexOf(userType!) >= 0
          );
        },
      },
      {
        title: 'Users',
        path: 'roles-users',
        validatorFn: ({ permissions, userType }: MenuValidatorParams) => {
          return (permissions?.indexOf('profilesettings') >= 0 || userType == 2) && userType != 7;
        },
      },
      {
        title: 'My Account',
        path: 'profile-settings',
      },
    ],
  },
  {
    title: 'Help',
    path: 'https://help.jeeve.com.au/portal/en/kb/jeeve-analytics',
    icon: faQuestion,
    linkType: 'open',
    validatorFn: () => true,
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
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
})
export class AppMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  faCaretRight = faCaretRight;
  faCaretDown = faCaretDown;
  private _transformer = (node: MenuNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      title: node.title,
      path: node.path,
      icon: node.icon,
      level: level,
      badgeText: node.badgeText,
      badgeStyle: node.badgeStyle,
      linkType: node.linkType,
    };
  };

  treeControl = new FlatTreeControl<MenuFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  /** holds each node.path from root → selected leaf */
  public activePathChain: string[] = [];
  public activeUrl: string = '';
  private destroy = new Subject<void>();
  public destroy$ = this.destroy.asObservable();

  public dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  get isLoadingRolesIndividual$() {
    return this.authFacade.isLoadingRolesIndividual$.pipe(takeUntil(this.destroy$));
  }
  public userType: number = 0;

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private clinicFacade: ClinicFacade,
    private layoutFacade: LayoutFacade,
  ) {
    this.dataSource.data = [];
    this.authFacade.getRolesIndividual();
    this.clinicFacade.loadClinics();
  }

  get activedTitle$(): Observable<string> {
    return this.layoutFacade.activatedRouteTitle$;
  }

  hasChild = (_: number, node: MenuFlatNode) => node.expandable;
  ngOnInit() {
    combineLatest([this.authFacade.authUserData$, this.authFacade.rolesIndividualAndClinics$])
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe(([user, result]) => {
        const params: MenuValidatorParams = {
          permissions: result.data,
          userType: Number(result.type),
          userPlan: result.plan,
          hasPrimeClinics: result.hasPrimeClinics,
          userId: user?.parentId || user?.id,
        };
        this.userType = Number(result.type);
        const menuData: MenuNode[] = [];

        MENU_DATA.forEach(item => {
          const mainMenuValid = item.validatorFn ? item.validatorFn(params) : null;
          if (item.children) {
            const children = item.children.filter(c =>
              c.validatorFn ? c.validatorFn(params) : true,
            );
            menuData.push({ ...item, ...{ children } });
            return;
          } else if (mainMenuValid) {
            menuData.push({ ...item });
          }
        });

        this.dataSource.data = menuData;
        const treeNode = this.treeControl.dataNodes.find(
          node => this.activeUrl.includes(node.path) && node.level == 0,
        );
        if (treeNode) this.treeControl.expand(treeNode);
      });

    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        map((event: any) => event.routerEvent ?? event),
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe(event => {
        const { url } = <NavigationEnd>event;
        this.activeUrl = url.split('?')[0];
        const node = this.findNodeByPath(this.activeUrl, MENU_DATA);

        const chain = this.findPathChain(this.activeUrl, MENU_DATA);
        this.activePathChain = chain ? chain.map(n => n.path) : [];

        if (node) {
          this.updateActivateState(node.title);
        }
      });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  toggleMenuItem = (node: MenuFlatNode): void => {
    if (!node.expandable) this.router.navigateByUrl(`/${node.path}`);
  };

  updateActivateState(title: string) {
    this.layoutFacade.setActivatedRouteTitle(title);
  }

  findNodeByPath(path: string, menuNodes: MenuNode[]): MenuNode | null {
    for (let menuNode of menuNodes) {
      if (menuNode.path === path) return menuNode;
      else if (menuNode.children) {
        const found = this.findNodeByPath(path, menuNode.children);
        if (found) return found;
      }
    }
    return null;
  }

  /** recursively walks MENU_DATA to build [ …, parent, leaf ] or null */
  private findPathChain(
    target: string,
    nodes: MenuNode[],
    chain: MenuNode[] = [],
  ): MenuNode[] | null {
    for (const node of nodes) {
      const nextChain = [...chain, node];
      // exact match on full path
      if (node.path === target) {
        return nextChain;
      }
      if (node.children) {
        const found = this.findPathChain(target, node.children, nextChain);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }
}
