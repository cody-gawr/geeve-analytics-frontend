(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./apps/apps.module": [
		"./src/app/apps/apps.module.ts",
		"default~apps-apps-module~clinic-goals-clinic-goals-module~dentist-goals-dentist-goals-module~forms-f~687192af",
		"common",
		"apps-apps-module"
	],
	"./authentication/authentication.module": [
		"./src/app/authentication/authentication.module.ts",
		"default~authentication-authentication-module~forms-forms-module",
		"common",
		"authentication-authentication-module"
	],
	"./charts/chartslib.module": [
		"./src/app/charts/chartslib.module.ts",
		"default~charts-chartslib-module~dashboard-dashboard-module~dashboards-dashboards-module~importcsv-im~dcb35db1",
		"default~charts-chartslib-module~dashboards-dashboards-module~importcsv-importcsv-module",
		"common",
		"charts-chartslib-module"
	],
	"./clinic-goals/clinic-goals.module": [
		"./src/app/clinic-goals/clinic-goals.module.ts",
		"default~apps-apps-module~clinic-goals-clinic-goals-module~dentist-goals-dentist-goals-module~forms-f~687192af",
		"default~clinic-goals-clinic-goals-module~dentist-goals-dentist-goals-module~forms-forms-module",
		"common",
		"clinic-goals-clinic-goals-module"
	],
	"./clinic/clinic.module": [
		"./src/app/clinic/clinic.module.ts",
		"default~clinic-clinic-module~datatables-datatables-module~dentist-dentist-module~importcsv-importcsv~7c0cf883",
		"default~clinic-clinic-module~datatables-datatables-module~dentist-dentist-module",
		"common",
		"clinic-clinic-module"
	],
	"./dashboard/dashboard.module": [
		"./src/app/dashboard/dashboard.module.ts",
		"default~charts-chartslib-module~dashboard-dashboard-module~dashboards-dashboards-module~importcsv-im~dcb35db1",
		"common",
		"dashboard-dashboard-module"
	],
	"./dashboards/dashboards.module": [
		"./src/app/dashboards/dashboards.module.ts",
		"default~charts-chartslib-module~dashboard-dashboard-module~dashboards-dashboards-module~importcsv-im~dcb35db1",
		"default~charts-chartslib-module~dashboards-dashboards-module~importcsv-importcsv-module",
		"common",
		"dashboards-dashboards-module"
	],
	"./datatables/datatables.module": [
		"./src/app/datatables/datatables.module.ts",
		"default~clinic-clinic-module~datatables-datatables-module~dentist-dentist-module~importcsv-importcsv~7c0cf883",
		"default~clinic-clinic-module~datatables-datatables-module~dentist-dentist-module",
		"common",
		"datatables-datatables-module"
	],
	"./dentist-goals/dentist-goals.module": [
		"./src/app/dentist-goals/dentist-goals.module.ts",
		"default~apps-apps-module~clinic-goals-clinic-goals-module~dentist-goals-dentist-goals-module~forms-f~687192af",
		"default~clinic-goals-clinic-goals-module~dentist-goals-dentist-goals-module~forms-forms-module",
		"common",
		"dentist-goals-dentist-goals-module"
	],
	"./dentist/dentist.module": [
		"./src/app/dentist/dentist.module.ts",
		"default~clinic-clinic-module~datatables-datatables-module~dentist-dentist-module~importcsv-importcsv~7c0cf883",
		"default~clinic-clinic-module~datatables-datatables-module~dentist-dentist-module",
		"common",
		"dentist-dentist-module"
	],
	"./forms/forms.module": [
		"./src/app/forms/forms.module.ts",
		"default~apps-apps-module~clinic-goals-clinic-goals-module~dentist-goals-dentist-goals-module~forms-f~687192af",
		"default~clinic-goals-clinic-goals-module~dentist-goals-dentist-goals-module~forms-forms-module",
		"default~authentication-authentication-module~forms-forms-module",
		"common",
		"forms-forms-module"
	],
	"./importcsv/importcsv.module": [
		"./src/app/importcsv/importcsv.module.ts",
		"default~clinic-clinic-module~datatables-datatables-module~dentist-dentist-module~importcsv-importcsv~7c0cf883",
		"default~charts-chartslib-module~dashboard-dashboard-module~dashboards-dashboards-module~importcsv-im~dcb35db1",
		"default~charts-chartslib-module~dashboards-dashboards-module~importcsv-importcsv-module",
		"common",
		"importcsv-importcsv-module"
	],
	"./layouts/full/header/header.module": [
		"./src/app/layouts/full/header/header.module.ts",
		"layouts-full-header-header-module"
	],
	"./login/login.module": [
		"./src/app/login/login.module.ts",
		"login-login-module"
	],
	"./material-component/material.module": [
		"./src/app/material-component/material.module.ts",
		"material-component-material-module"
	],
	"./multi-dropdown/multi-dd.module": [
		"./src/app/multi-dropdown/multi-dd.module.ts",
		"multi-dropdown-multi-dd-module"
	],
	"./pages/pages.module": [
		"./src/app/pages/pages.module.ts",
		"default~clinic-clinic-module~datatables-datatables-module~dentist-dentist-module~importcsv-importcsv~7c0cf883",
		"common",
		"pages-pages-module"
	],
	"./tables/tables.module": [
		"./src/app/tables/tables.module.ts",
		"common",
		"tables-tables-module"
	],
	"./widgets/widgets.module": [
		"./src/app/widgets/widgets.module.ts",
		"widgets-widgets-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Main wrapper - style you can find in pages.scss -->\n<!-- ============================================================== -->\n<router-outlet>\n    <app-spinner></app-spinner>\n</router-outlet>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _layouts_full_full_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./layouts/full/full.component */ "./src/app/layouts/full/full.component.ts");
/* harmony import */ var _layouts_blank_blank_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./layouts/blank/blank.component */ "./src/app/layouts/blank/blank.component.ts");
/* harmony import */ var _layouts_full_header_header_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./layouts/full/header/header.component */ "./src/app/layouts/full/header/header.component.ts");
/* harmony import */ var _layouts_full_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./layouts/full/sidebar/sidebar.component */ "./src/app/layouts/full/sidebar/sidebar.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ng-multiselect-dropdown */ "./node_modules/ng-multiselect-dropdown/fesm5/ng-multiselect-dropdown.js");
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-perfect-scrollbar */ "./node_modules/ngx-perfect-scrollbar/dist/ngx-perfect-scrollbar.es5.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _shared_spinner_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./shared/spinner.component */ "./src/app/shared/spinner.component.ts");
/* harmony import */ var angular2_cookie_services_cookies_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! angular2-cookie/services/cookies.service */ "./node_modules/angular2-cookie/services/cookies.service.js");
/* harmony import */ var angular2_cookie_services_cookies_service__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_services_cookies_service__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _auth_authguard_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./auth/authguard.service */ "./src/app/auth/authguard.service.ts");
/* harmony import */ var _layouts_full_header_header_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./layouts/full/header/header.service */ "./src/app/layouts/full/header/header.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true,
    wheelSpeed: 2,
    wheelPropagation: true
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _layouts_full_full_component__WEBPACK_IMPORTED_MODULE_8__["FullComponent"],
                _layouts_full_header_header_component__WEBPACK_IMPORTED_MODULE_10__["AppHeaderComponent"],
                _shared_spinner_component__WEBPACK_IMPORTED_MODULE_17__["SpinnerComponent"],
                _layouts_blank_blank_component__WEBPACK_IMPORTED_MODULE_9__["AppBlankComponent"],
                _layouts_full_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_11__["AppSidebarComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__["BrowserAnimationsModule"],
                _demo_material_module__WEBPACK_IMPORTED_MODULE_13__["DemoMaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_7__["FlexLayoutModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_15__["PerfectScrollbarModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_16__["SharedModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_19__["HttpModule"],
                ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_14__["NgMultiSelectDropDownModule"].forRoot(),
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(_app_routing__WEBPACK_IMPORTED_MODULE_5__["AppRoutes"])
            ],
            providers: [
                _auth_authguard_service__WEBPACK_IMPORTED_MODULE_20__["AuthGuard"],
                _layouts_full_header_header_service__WEBPACK_IMPORTED_MODULE_21__["HeaderService"],
                {
                    provide: ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_15__["PERFECT_SCROLLBAR_CONFIG"],
                    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
                },
                angular2_cookie_services_cookies_service__WEBPACK_IMPORTED_MODULE_18__["CookieService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: AppRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutes", function() { return AppRoutes; });
/* harmony import */ var _layouts_full_full_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layouts/full/full.component */ "./src/app/layouts/full/full.component.ts");
/* harmony import */ var _layouts_blank_blank_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layouts/blank/blank.component */ "./src/app/layouts/blank/blank.component.ts");
/* harmony import */ var _auth_authguard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/authguard.service */ "./src/app/auth/authguard.service.ts");



var AppRoutes = [
    {
        path: '',
        component: _layouts_full_full_component__WEBPACK_IMPORTED_MODULE_0__["FullComponent"],
        children: [
            {
                path: '',
                redirectTo: '/login',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'importcsv',
                loadChildren: './importcsv/importcsv.module#ImportcsvModule',
                canActivate: [_auth_authguard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]]
            },
            {
                path: 'dashboards',
                loadChildren: './dashboards/dashboards.module#DashboardsModule',
                canActivate: [_auth_authguard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]]
            },
            {
                path: 'header',
                loadChildren: './layouts/full/header/header.module#HeaderModule'
            },
            {
                path: 'clinic',
                loadChildren: './clinic/clinic.module#ClinicModule',
                canActivate: [_auth_authguard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]]
            },
            {
                path: 'dentist',
                loadChildren: './dentist/dentist.module#DentistModule',
                canActivate: [_auth_authguard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]]
            },
            {
                path: 'clinic-goals',
                loadChildren: './clinic-goals/clinic-goals.module#ClinicGoalsModule',
                canActivate: [_auth_authguard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]]
            },
            {
                path: 'dentist-goals',
                loadChildren: './dentist-goals/dentist-goals.module#DentistGoalsModule',
                canActivate: [_auth_authguard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]]
            },
            {
                path: 'material',
                loadChildren: './material-component/material.module#MaterialComponentsModule'
            },
            {
                path: 'apps',
                loadChildren: './apps/apps.module#AppsModule'
            },
            {
                path: 'forms',
                loadChildren: './forms/forms.module#FormModule'
            },
            {
                path: 'tables',
                loadChildren: './tables/tables.module#TablesModule'
            },
            {
                path: 'datatables',
                loadChildren: './datatables/datatables.module#DataTablesModule'
            },
            {
                path: 'pages',
                loadChildren: './pages/pages.module#PagesModule'
            },
            {
                path: 'widgets',
                loadChildren: './widgets/widgets.module#WidgetsModule'
            },
            {
                path: 'charts',
                loadChildren: './charts/chartslib.module#ChartslibModule'
            },
            {
                path: 'multi',
                loadChildren: './multi-dropdown/multi-dd.module#MultiModule'
            }
        ]
    },
    {
        path: '',
        component: _layouts_blank_blank_component__WEBPACK_IMPORTED_MODULE_1__["AppBlankComponent"],
        children: [
            {
                path: 'authentication',
                loadChildren: './authentication/authentication.module#AuthenticationModule'
            }
        ]
    },
    {
        path: '',
        component: _layouts_blank_blank_component__WEBPACK_IMPORTED_MODULE_1__["AppBlankComponent"],
        children: [
            {
                path: 'login',
                loadChildren: './login/login.module#LoginModule'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'authentication/404'
    }
];


/***/ }),

/***/ "./src/app/auth/authguard.service.ts":
/*!*******************************************!*\
  !*** ./src/app/auth/authguard.service.ts ***!
  \*******************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// AuthGuard




var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, snackBar, _cookieService) {
        this.router = router;
        this.snackBar = snackBar;
        this._cookieService = _cookieService;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        if (this._cookieService.get("token")) {
            return true;
        }
        else {
            this.router.navigateByUrl('/login');
            //this.snackBar.open('Please Login to Continue');
        }
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_material__WEBPACK_IMPORTED_MODULE_0__["MatSnackBar"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/demo-material-module.ts":
/*!*****************************************!*\
  !*** ./src/app/demo-material-module.ts ***!
  \*****************************************/
/*! exports provided: DemoMaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemoMaterialModule", function() { return DemoMaterialModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/table */ "./node_modules/@angular/cdk/esm5/table.es5.js");
/* harmony import */ var _angular_cdk_accordion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/accordion */ "./node_modules/@angular/cdk/esm5/accordion.es5.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/observers */ "./node_modules/@angular/cdk/esm5/observers.es5.js");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/portal */ "./node_modules/@angular/cdk/esm5/portal.es5.js");
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











/**
 * NgModule that includes all Material modules that are required to serve the demo-app.
 */
var DemoMaterialModule = /** @class */ (function () {
    function DemoMaterialModule() {
    }
    DemoMaterialModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            exports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatChipsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatRippleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatBadgeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSliderModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatStepperModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"],
                _angular_cdk_table__WEBPACK_IMPORTED_MODULE_2__["CdkTableModule"],
                _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__["A11yModule"],
                _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__["BidiModule"],
                _angular_cdk_accordion__WEBPACK_IMPORTED_MODULE_3__["CdkAccordionModule"],
                _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_8__["ObserversModule"],
                _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__["OverlayModule"],
                _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__["PlatformModule"],
                _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_9__["PortalModule"]
            ]
        })
    ], DemoMaterialModule);
    return DemoMaterialModule;
}());



/***/ }),

/***/ "./src/app/layouts/blank/blank.component.html":
/*!****************************************************!*\
  !*** ./src/app/layouts/blank/blank.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Only router without any element -->\n<!-- ============================================================== -->\n<mat-sidenav-container>\n  <router-outlet></router-outlet>\n</mat-sidenav-container>"

/***/ }),

/***/ "./src/app/layouts/blank/blank.component.ts":
/*!**************************************************!*\
  !*** ./src/app/layouts/blank/blank.component.ts ***!
  \**************************************************/
/*! exports provided: AppBlankComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppBlankComponent", function() { return AppBlankComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppBlankComponent = /** @class */ (function () {
    function AppBlankComponent() {
    }
    AppBlankComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-blank',
            template: __webpack_require__(/*! ./blank.component.html */ "./src/app/layouts/blank/blank.component.html"),
            styleUrls: []
        })
    ], AppBlankComponent);
    return AppBlankComponent;
}());



/***/ }),

/***/ "./src/app/layouts/full/full.component.html":
/*!**************************************************!*\
  !*** ./src/app/layouts/full/full.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Main wrapper - style you can find in pages.scss -->\n<!-- ============================================================== -->\n<div class=\"main-container\" [dir]=\"dir\" [ngClass]=\"{'minisidebar': minisidebar, 'boxed': boxed, 'danger': danger, 'blue': blue, 'green': green, 'dark': dark }\">\n    <!-- ============================================================== -->\n    <!-- Topbar - style you can find in header.scss -->\n    <!-- ============================================================== -->\n    <mat-toolbar color=\"primary\" class=\"topbar telative\">\n        <!-- ============================================================== -->\n        <!-- Logo - style you can find in header.scss -->\n        <!-- ============================================================== -->\n        <div class=\"navbar-header\">\n            <a class=\"navbar-brand\" href=\"/\">\n                <!-- Logo icon -->\n                <b>\n                    <!--You can put here icon as well // <i class=\"wi wi-sunset\"></i> //-->\n                    <!-- Dark Logo icon -->\n                    <img src=\"assets/images/logo-icon.png\" alt=\"homepage\" class=\"dark-logo\">\n                    <!-- Light Logo icon -->\n                    <img src=\"assets/images/logo-light-icon.png\" alt=\"homepage\" class=\"light-logo\">\n                </b>\n                <!--End Logo icon -->\n                <!-- Logo text -->\n                <span fxShow=\"false\" fxShow.gt-xs>\n                    <!-- dark Logo text -->\n                    <img src=\"assets/images/logo-text.png\" alt=\"homepage\" class=\"dark-logo\">\n                    <!-- Light Logo text -->\n                    <img src=\"assets/images/logo-light-text.png\" class=\"light-logo\" alt=\"homepage\">\n                </span>\n            </a>\n        </div>\n        <!-- ============================================================== -->\n        <!-- sidebar toggle -->\n        <!-- ============================================================== -->\n\n        <button mat-icon-button (click)=\"snav.toggle()\" value=\"sidebarclosed\">\n            <mat-icon>menu</mat-icon>\n        </button>\n        <!-- ============================================================== -->\n        <!-- Search - style you can find in header.scss -->\n        <!-- ============================================================== -->\n        <button mat-icon-button class=\"srh-btn\">\n            <mat-icon>search</mat-icon>\n        </button>\n        <form class=\"app-search\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Search &amp; enter\">\n            <a class=\"cl-srh-btn\">\n                <i class=\"ti-close\"></i>\n            </a>\n        </form>\n        <span fxFlex></span>\n        <!-- ============================================================== -->\n        <!-- app header component - style you can find in header.scss / header.component.ts-->\n        <!-- ============================================================== -->\n        <app-header></app-header>\n        <!-- ============================================================== -->\n        <!-- Right sidebar toggle - style you can find in rightsidebar.component.scss -->\n        <!-- ============================================================== -->\n        <button (click)=\"end.toggle()\" mat-icon-button class=\"ml-xs overflow-visible\">\n            <mat-icon>settings</mat-icon>\n        </button>\n    </mat-toolbar>\n    <!-- ============================================================== -->\n    <!-- End Topbar - style you can find in pages.scss -->\n    <!-- ============================================================== -->\n    <mat-sidenav-container class=\"example-sidenav-container\" [style.marginTop.px]=\"mobileQuery.matches ? 0 : 0\"\n        [ngClass]=\"{'minisidebar': minisidebar}\">\n        <!-- ============================================================== -->\n        <!-- Sidebar - style you can find in sidebar.scss -->\n        <!-- ============================================================== -->\n        <mat-sidenav #snav id=\"snav\" class=\"pl-xs\" [mode]=\"mobileQuery.matches ? 'side' : 'over'\" fixedTopGap=\"0\"\n            [opened]=\"mobileQuery.matches\" [disableClose]=\"mobileQuery.matches\" (open)=\"sidebarOpened = true\" (close)=\"sidebarOpened = false\"\n            [perfectScrollbar]=\"config\">\n\n            <app-sidebar class=\"app-sidebar\"></app-sidebar>\n\n        </mat-sidenav>\n        <!-- ============================================================== -->\n        <!-- Sidebar - style you can find in sidebar.scss -->\n        <!-- ============================================================== -->\n        <!-- ============================================================== -->\n        <!-- Right Sidebar - style you can find in rightsidebar.component.scss -->\n        <!-- ============================================================== -->\n        <mat-sidenav #end position=\"end\" class=\"chat-panel\" mode=\"over\" opened=\"false\">\n            <div class=\"scroll\">\n                <mat-nav-list>\n\n                    <h3 mat-subheader class=\"text-uppercase font-weight-bold\">Settings</h3>\n                    <mat-list-item>\n                        <mat-slide-toggle color=\"warn\" (change)=\"dir = (dir == 'rtl' ? 'ltr' : 'rtl')\">RTL</mat-slide-toggle>\n                    </mat-list-item>\n                    <mat-list-item>\n                        <mat-slide-toggle color=\"warn\" [(ngModel)]=\"boxed\">Boxed Layout</mat-slide-toggle>\n                    </mat-list-item>\n                    <!--<mat-list-item>\n                    <mat-slide-toggle [(ngModel)]=\"minisidebar\">Mini Sidebar</mat-slide-toggle>\n                  </mat-list-item>    -->\n                    <mat-divider></mat-divider>\n                    <h3 mat-subheader class=\"text-uppercase font-weight-bold\">Colors</h3>\n                    <mat-list-item>\n                        <mat-checkbox color=\"warn\" [(ngModel)]=\"danger\" (change)=\"green = blue = false\" class=\"text-danger\">Red</mat-checkbox>\n                    </mat-list-item>\n                    <mat-list-item>\n                        <mat-checkbox color=\"warn\" [(ngModel)]=\"green\" (change)=\"danger = blue = false\" class=\"text-megna\">Teal\n                            Green</mat-checkbox>\n                    </mat-list-item>\n                    <mat-list-item>\n                        <mat-checkbox color=\"warn\" [(ngModel)]=\"blue\" (change)=\"green = danger = false\" class=\"text-info\">Blue</mat-checkbox>\n                    </mat-list-item>\n                    <mat-list-item>\n                        <mat-checkbox color=\"warn\" [(ngModel)]=\"dark\" (change)=\"green = blue = danger = false\">Dark</mat-checkbox>\n                    </mat-list-item>\n                </mat-nav-list>\n            </div>\n        </mat-sidenav>\n\n        <!-- ============================================================== -->\n        <!-- Page container - style you can find in pages.scss -->\n        <!-- ============================================================== -->\n        <mat-sidenav-content class=\"page-wrapper\">\n            \n                <div class=\"page-content\">\n\n                    <router-outlet>\n                        <app-spinner></app-spinner>\n                    </router-outlet>\n\n                </div>\n            \n        </mat-sidenav-content>\n        <!-- ============================================================== -->\n        <!-- Page container - style you can find in pages.scss -->\n        <!-- ============================================================== -->\n    </mat-sidenav-container>\n</div>"

/***/ }),

/***/ "./src/app/layouts/full/full.component.ts":
/*!************************************************!*\
  !*** ./src/app/layouts/full/full.component.ts ***!
  \************************************************/
/*! exports provided: FullComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FullComponent", function() { return FullComponent; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_menu_items_menu_items__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/menu-items/menu-items */ "./src/app/shared/menu-items/menu-items.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/** @title Responsive sidenav */
var FullComponent = /** @class */ (function () {
    function FullComponent(changeDetectorRef, media, menuItems) {
        this.menuItems = menuItems;
        this.dir = 'ltr';
        this.config = {};
        this.mobileQuery = media.matchMedia('(min-width: 768px)');
        this._mobileQueryListener = function () { return changeDetectorRef.detectChanges(); };
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    FullComponent.prototype.ngOnDestroy = function () {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    };
    FullComponent.prototype.ngAfterViewInit = function () {
        // This is for the topbar search
        jquery__WEBPACK_IMPORTED_MODULE_0__('.srh-btn, .cl-srh-btn').on('click', function () {
            jquery__WEBPACK_IMPORTED_MODULE_0__('.app-search').toggle(200);
        });
        // This is for the megamenu
    };
    FullComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-full-layout',
            template: __webpack_require__(/*! ./full.component.html */ "./src/app/layouts/full/full.component.html"),
            styleUrls: []
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"],
            _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__["MediaMatcher"],
            _shared_menu_items_menu_items__WEBPACK_IMPORTED_MODULE_3__["MenuItems"]])
    ], FullComponent);
    return FullComponent;
}());



/***/ }),

/***/ "./src/app/layouts/full/header/header.component.html":
/*!***********************************************************!*\
  !*** ./src/app/layouts/full/header/header.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Notification - style you can find in header.scss -->\n<!-- ============================================================== -->\n<button [matMenuTriggerFor]=\"notification\" mat-icon-button class=\"m-r-10\">\n    <mat-icon>message</mat-icon>\n    <div class=\"notify\">\n        <span class=\"heartbit\"></span>\n        <span class=\"point\"></span>\n    </div>\n</button>\n<mat-menu #notification=\"matMenu\" class=\"mymegamenu\">\n    <div class=\"mailbox\">\n        <ul>\n            <li>\n                <div class=\"drop-title\">Notifications</div>\n            </li>\n            <li>\n                <div class=\"message-center\">\n                    <perfect-scrollbar [config]=\"config\">\n                        <!-- Message -->\n                        <a href=\"#\" *ngFor=\"let notification of notifications\">\n                            <div class=\"round {{notification.round}}\">\n                                <i class=\"{{notification.icon}}\"></i>\n                            </div>\n                            <div class=\"mail-content\">\n                                <h5>{{notification.title}}</h5>\n                                <span class=\"mail-desc\">{{notification.subject}}</span>\n                                <span class=\"time\">{{notification.time}}</span>\n                            </div>\n                        </a>\n\n                    </perfect-scrollbar>\n                </div>\n            </li>\n\n        </ul>\n    </div>\n</mat-menu>\n<!-- ============================================================== -->\n<!-- Profile - style you can find in header.scss -->\n<!-- ============================================================== -->\n<button [matMenuTriggerFor]=\"message\" mat-icon-button class=\"m-r-10\">\n    <mat-icon>email</mat-icon>\n    <div class=\"notify\">\n        <span class=\"heartbit\"></span>\n        <span class=\"point\"></span>\n    </div>\n</button>\n<mat-menu #message=\"matMenu\" class=\"mymessage\">\n    <div class=\"mailbox\">\n        <ul>\n            <li>\n                <div class=\"drop-title\">You have 4 new Mymessages</div>\n            </li>\n            <li>\n                <div class=\"message-center\">\n                    <perfect-scrollbar [config]=\"config\">\n                        <!-- Message -->\n                        <a href=\"#\" *ngFor=\"let mymessage of mymessages\">\n                            <div class=\"user-img\">\n                                <img src=\"{{mymessage.useravatar}}\" alt=\"user\" class=\"img-circle\" width=\"40\">\n                                <span class=\"profile-status {{mymessage.status}} pull-right\"></span>\n                            </div>\n                            <div class=\"mail-content\">\n                                <h5>{{mymessage.from}}</h5>\n                                <span class=\"mail-desc\">{{mymessage.subject}}</span>\n                                <span class=\"time\">{{mymessage.time}}</span>\n                            </div>\n                        </a>\n                        <!-- Message -->\n                    </perfect-scrollbar>\n                </div>\n            </li>\n        </ul>\n    </div>\n</mat-menu>\n<!-- ============================================================== -->\n<!-- Profile - style you can find in header.scss -->\n<!-- ============================================================== -->\n<button [matMenuTriggerFor]=\"profile\" mat-icon-button class=\"m-r-5\">\n    <img src=\"assets/images/users/1.jpg\" alt=\"user\" class=\"profile-pic\"> </button>\n<mat-menu #profile=\"matMenu\" class=\"mymegamenu\">\n    <button mat-menu-item>\n        <mat-icon>settings</mat-icon> Settings </button>\n    <button mat-menu-item>\n        <mat-icon>account_box</mat-icon> Profile </button>\n    <button mat-menu-item>\n        <mat-icon>notifications_off</mat-icon> Disable notifications </button>\n    <button mat-menu-item (click) = \"logout()\">\n        <mat-icon>exit_to_app</mat-icon> Sign Out </button>\n</mat-menu>"

/***/ }),

/***/ "./src/app/layouts/full/header/header.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/layouts/full/header/header.component.ts ***!
  \*********************************************************/
/*! exports provided: AppHeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppHeaderComponent", function() { return AppHeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _header_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./header.service */ "./src/app/layouts/full/header/header.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppHeaderComponent = /** @class */ (function () {
    function AppHeaderComponent(_cookieService, headerService, router) {
        this._cookieService = _cookieService;
        this.headerService = headerService;
        this.router = router;
        this.config = {};
        // This is for Notifications
        this.notifications = [
            {
                round: 'round-danger',
                icon: 'ti-link',
                title: 'Launch Admin',
                subject: 'Just see the my new admin!',
                time: '9:30 AM'
            },
            {
                round: 'round-success',
                icon: 'ti-calendar',
                title: 'Event today',
                subject: 'Just a reminder that you have event',
                time: '9:10 AM'
            },
            {
                round: 'round-info',
                icon: 'ti-settings',
                title: 'Settings',
                subject: 'You can customize this template as you want',
                time: '9:08 AM'
            },
            {
                round: 'round-primary',
                icon: 'ti-user',
                title: 'Pavan kumar',
                subject: 'Just see the my admin!',
                time: '9:00 AM'
            }
        ];
        // This is for Mymessages
        this.mymessages = [
            {
                useravatar: 'assets/images/users/1.jpg',
                status: 'online',
                from: 'Pavan kumar',
                subject: 'Just see the my admin!',
                time: '9:30 AM'
            },
            {
                useravatar: 'assets/images/users/2.jpg',
                status: 'busy',
                from: 'Sonu Nigam',
                subject: 'I have sung a song! See you at',
                time: '9:10 AM'
            },
            {
                useravatar: 'assets/images/users/2.jpg',
                status: 'away',
                from: 'Arijit Sinh',
                subject: 'I am a singer!',
                time: '9:08 AM'
            },
            {
                useravatar: 'assets/images/users/4.jpg',
                status: 'offline',
                from: 'Pavan kumar',
                subject: 'Just see the my admin!',
                time: '9:00 AM'
            }
        ];
    }
    AppHeaderComponent.prototype.logout = function () {
        var _this = this;
        this.headerService.logout(this._cookieService.get("userid")).subscribe(function (res) {
            console.log(res);
            if (res.message == 'success') {
                _this._cookieService.put("username", '');
                _this._cookieService.put("email", '');
                _this._cookieService.put("token", '');
                _this._cookieService.put("userid", '');
                _this.router.navigate(['/login']);
            }
        }, function (error) {
        });
    };
    AppHeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/layouts/full/header/header.component.html"),
            styleUrls: []
        }),
        __metadata("design:paramtypes", [angular2_cookie_core__WEBPACK_IMPORTED_MODULE_1__["CookieService"], _header_service__WEBPACK_IMPORTED_MODULE_3__["HeaderService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AppHeaderComponent);
    return AppHeaderComponent;
}());



/***/ }),

/***/ "./src/app/layouts/full/header/header.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/layouts/full/header/header.service.ts ***!
  \*******************************************************/
/*! exports provided: HeaderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderService", function() { return HeaderService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HeaderService = /** @class */ (function () {
    function HeaderService(http) {
        this.http = http;
    }
    // Items Predictor Analysis 
    HeaderService.prototype.logout = function (id) {
        var formData = new FormData();
        formData.append('user_id', id);
        return this.http.post("http://localhost/jeeveanalytices/server/users/applogout", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    HeaderService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], HeaderService);
    return HeaderService;
}());



/***/ }),

/***/ "./src/app/layouts/full/sidebar/sidebar.component.html":
/*!*************************************************************!*\
  !*** ./src/app/layouts/full/sidebar/sidebar.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- sidebar -->\n<!-- ============================================================== -->\n<div class=\"user-profile\" style=\"background: url(assets/images/background/user-info.jpg) no-repeat;\">\n    <!-- User profile image -->\n    <div class=\"profile-img\">\n        <img src=\"assets/images/users/profile.png\" alt=\"user\"> </div>\n    <!-- User profile text-->\n    <!-- ============================================================== -->\n    <!-- Profile - style you can find in header.scss -->\n    <!-- ============================================================== -->\n    <div class=\"profile-text\">\n        <a [matMenuTriggerFor]=\"sdprofile\" class=\"\"> Markarn Doe\n            <i class=\"ti-angle-down font-12 m-l-5\"></i>\n        </a>\n    </div>\n    <mat-menu #sdprofile=\"matMenu\" class=\"mymegamenu\">\n        <button mat-menu-item>\n            <mat-icon>settings</mat-icon> Settings\n        </button>\n        <button mat-menu-item>\n            <mat-icon>account_box</mat-icon> Profile\n        </button>\n        <button mat-menu-item>\n            <mat-icon>notifications_off</mat-icon> Disable notifications\n        </button>\n        <button mat-menu-item>\n            <mat-icon>exit_to_app</mat-icon> Sign Out\n        </button>\n    </mat-menu>\n</div>\n\n<mat-nav-list appAccordion>\n    <mat-list-item appAccordionLink *ngFor=\"let menuitem of menuItems.getMenuitem()\" routerLinkActive=\"selected\" group=\"{{menuitem.state}}\">\n        <a class=\"\" appAccordionToggle [routerLink]=\"['/', menuitem.state]\" *ngIf=\"menuitem.type === 'link'\">\n            <mat-icon>{{ menuitem.icon }}</mat-icon>\n            <span>{{ menuitem.name }}</span>\n            <span fxFlex></span>\n            <span class=\"label label-{{ badge.type }}\" *ngFor=\"let badge of menuitem.badge\">{{ badge.value }}</span>\n        </a>\n\n        <a class=\"\" appAccordionToggle href=\"{{menuitem.state}}\" *ngIf=\"menuitem.type === 'extLink'\">\n            <mat-icon>{{ menuitem.icon }}</mat-icon>\n            <span>{{ menuitem.name }}</span>\n            <span fxFlex></span>\n            <span class=\"label label-{{ badge.type }}\" *ngFor=\"let badge of menuitem.badge\">{{ badge.value }}</span>\n        </a>\n        <a class=\"\" appAccordionToggle href=\"{{menuitem.state}}\" target=\"_blank\" *ngIf=\"menuitem.type === 'extTabLink'\">\n            <mat-icon>{{ menuitem.icon }}</mat-icon>\n            <span>{{ menuitem.name}}</span>\n            <span fxFlex></span>\n            <span class=\"label label-{{ badge.type }}\" *ngFor=\"let badge of menuitem.badge\">{{ badge.value }}</span>\n        </a>\n\n        <a class=\"\" appAccordionToggle href=\"javascript:;\" *ngIf=\"menuitem.type === 'sub'\">\n            <mat-icon>{{ menuitem.icon }}</mat-icon>\n            <span>{{ menuitem.name }}</span>\n            <span fxFlex></span>\n            <span class=\"label label-{{ badge.type }}\" *ngFor=\"let badge of menuitem.badge\">{{ badge.value }}</span>\n            <mat-icon class=\"dd-icon\">keyboard_arrow_down</mat-icon>\n        </a>\n        <mat-nav-list class=\"sub-item\" *ngIf=\"menuitem.type === 'sub'\">\n            <mat-list-item *ngFor=\"let childitem of menuitem.children\" routerLinkActive=\"selected\">\n                <a [routerLink]=\"['/', menuitem.state, childitem.state ]\" *ngIf=\"childitem.type === 'link'\" class=\"relative\"\n                    routerLinkActive=\"selected\">{{ childitem.name}}</a>\n            </mat-list-item>\n            <mat-list-item *ngFor=\"let childitem of menuitem.children\">\n                <a class=\"\" href=\"javascript: void(0);\" *ngIf=\"childitem.type === 'subchild'\" (click)=\"clickEvent()\"\n                    [ngClass]=\"status ? 'selected' : ''\">\n                    <span>{{ childitem.name }}</span>\n                    <span fxFlex></span>\n                    <mat-icon class=\"dd-icon\">keyboard_arrow_down</mat-icon>\n                </a>\n                <mat-nav-list class=\"child-sub-item\" *ngIf=\"childitem.type === 'subchild'\">\n                    <mat-list-item *ngFor=\"let child of childitem.subchildren\" routerLinkActive=\"selected\">\n                        <a [routerLink]=\"['/', menuitem.state, childitem.state, child.state ]\" routerLinkActive=\"selected\">{{child.name}}</a>\n                    </mat-list-item>\n                </mat-nav-list>\n            </mat-list-item>\n\n        </mat-nav-list>\n\n        <div class=\"saperator text-muted\" *ngIf=\"menuitem.type === 'saperator'\">\n            <span>{{ menuitem.name }}</span>\n        </div>\n    </mat-list-item>\n</mat-nav-list>"

/***/ }),

/***/ "./src/app/layouts/full/sidebar/sidebar.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/layouts/full/sidebar/sidebar.component.ts ***!
  \***********************************************************/
/*! exports provided: AppSidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSidebarComponent", function() { return AppSidebarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
/* harmony import */ var _shared_menu_items_menu_items__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/menu-items/menu-items */ "./src/app/shared/menu-items/menu-items.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppSidebarComponent = /** @class */ (function () {
    function AppSidebarComponent(changeDetectorRef, media, menuItems) {
        this.menuItems = menuItems;
        this.config = {};
        this.status = false;
        this.mobileQuery = media.matchMedia('(min-width: 768px)');
        this._mobileQueryListener = function () { return changeDetectorRef.detectChanges(); };
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    AppSidebarComponent.prototype.clickEvent = function () {
        this.status = !this.status;
    };
    AppSidebarComponent.prototype.subclickEvent = function () {
        this.status = true;
    };
    AppSidebarComponent.prototype.ngOnDestroy = function () {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    };
    AppSidebarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__(/*! ./sidebar.component.html */ "./src/app/layouts/full/sidebar/sidebar.component.html"),
            styleUrls: []
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"],
            _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__["MediaMatcher"],
            _shared_menu_items_menu_items__WEBPACK_IMPORTED_MODULE_2__["MenuItems"]])
    ], AppSidebarComponent);
    return AppSidebarComponent;
}());



/***/ }),

/***/ "./src/app/shared/accordion/accordion.directive.ts":
/*!*********************************************************!*\
  !*** ./src/app/shared/accordion/accordion.directive.ts ***!
  \*********************************************************/
/*! exports provided: AccordionDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccordionDirective", function() { return AccordionDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_add_operator_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/filter */ "./node_modules/rxjs-compat/_esm5/add/operator/filter.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AccordionDirective = /** @class */ (function () {
    function AccordionDirective(router) {
        var _this = this;
        this.router = router;
        this.navlinks = [];
        setTimeout(function () { return _this.checkOpenLinks(); });
    }
    AccordionDirective.prototype.closeOtherLinks = function (selectedLink) {
        this.navlinks.forEach(function (link) {
            if (link !== selectedLink) {
                link.selected = false;
            }
        });
    };
    AccordionDirective.prototype.addLink = function (link) {
        this.navlinks.push(link);
    };
    AccordionDirective.prototype.removeGroup = function (link) {
        var index = this.navlinks.indexOf(link);
        if (index !== -1) {
            this.navlinks.splice(index, 1);
        }
    };
    AccordionDirective.prototype.checkOpenLinks = function () {
        var _this = this;
        this.navlinks.forEach(function (link) {
            if (link.group) {
                var routeUrl = _this.router.url;
                var currentUrl = routeUrl.split('/');
                if (currentUrl.indexOf(link.group) > 0) {
                    link.selected = true;
                    _this.closeOtherLinks(link);
                }
            }
        });
    };
    AccordionDirective.prototype.ngAfterContentChecked = function () {
        var _this = this;
        this.router.events
            .filter(function (event) { return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]; })
            .subscribe(function (e) { return _this.checkOpenLinks(); });
    };
    AccordionDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appAccordion]'
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AccordionDirective);
    return AccordionDirective;
}());



/***/ }),

/***/ "./src/app/shared/accordion/accordionanchor.directive.ts":
/*!***************************************************************!*\
  !*** ./src/app/shared/accordion/accordionanchor.directive.ts ***!
  \***************************************************************/
/*! exports provided: AccordionAnchorDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccordionAnchorDirective", function() { return AccordionAnchorDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _accordionlink_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./accordionlink.directive */ "./src/app/shared/accordion/accordionlink.directive.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var AccordionAnchorDirective = /** @class */ (function () {
    function AccordionAnchorDirective(navlink) {
        this.navlink = navlink;
    }
    AccordionAnchorDirective.prototype.onClick = function (e) {
        this.navlink.toggle();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AccordionAnchorDirective.prototype, "onClick", null);
    AccordionAnchorDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appAccordionToggle]'
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_accordionlink_directive__WEBPACK_IMPORTED_MODULE_1__["AccordionLinkDirective"])),
        __metadata("design:paramtypes", [_accordionlink_directive__WEBPACK_IMPORTED_MODULE_1__["AccordionLinkDirective"]])
    ], AccordionAnchorDirective);
    return AccordionAnchorDirective;
}());



/***/ }),

/***/ "./src/app/shared/accordion/accordionlink.directive.ts":
/*!*************************************************************!*\
  !*** ./src/app/shared/accordion/accordionlink.directive.ts ***!
  \*************************************************************/
/*! exports provided: AccordionLinkDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccordionLinkDirective", function() { return AccordionLinkDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _accordion_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./accordion.directive */ "./src/app/shared/accordion/accordion.directive.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var AccordionLinkDirective = /** @class */ (function () {
    function AccordionLinkDirective(nav) {
        this.nav = nav;
    }
    Object.defineProperty(AccordionLinkDirective.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = value;
            if (value) {
                this.nav.closeOtherLinks(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    AccordionLinkDirective.prototype.ngOnInit = function () {
        this.nav.addLink(this);
    };
    AccordionLinkDirective.prototype.ngOnDestroy = function () {
        this.nav.removeGroup(this);
    };
    AccordionLinkDirective.prototype.toggle = function () {
        this.selected = !this.selected;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], AccordionLinkDirective.prototype, "group", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"])('class.selected'),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AccordionLinkDirective.prototype, "selected", null);
    AccordionLinkDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appAccordionLink]'
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_accordion_directive__WEBPACK_IMPORTED_MODULE_1__["AccordionDirective"])),
        __metadata("design:paramtypes", [_accordion_directive__WEBPACK_IMPORTED_MODULE_1__["AccordionDirective"]])
    ], AccordionLinkDirective);
    return AccordionLinkDirective;
}());



/***/ }),

/***/ "./src/app/shared/accordion/index.ts":
/*!*******************************************!*\
  !*** ./src/app/shared/accordion/index.ts ***!
  \*******************************************/
/*! exports provided: AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _accordionanchor_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accordionanchor.directive */ "./src/app/shared/accordion/accordionanchor.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AccordionAnchorDirective", function() { return _accordionanchor_directive__WEBPACK_IMPORTED_MODULE_0__["AccordionAnchorDirective"]; });

/* harmony import */ var _accordionlink_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./accordionlink.directive */ "./src/app/shared/accordion/accordionlink.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AccordionLinkDirective", function() { return _accordionlink_directive__WEBPACK_IMPORTED_MODULE_1__["AccordionLinkDirective"]; });

/* harmony import */ var _accordion_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./accordion.directive */ "./src/app/shared/accordion/accordion.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AccordionDirective", function() { return _accordion_directive__WEBPACK_IMPORTED_MODULE_2__["AccordionDirective"]; });






/***/ }),

/***/ "./src/app/shared/menu-items/menu-items.ts":
/*!*************************************************!*\
  !*** ./src/app/shared/menu-items/menu-items.ts ***!
  \*************************************************/
/*! exports provided: MenuItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuItems", function() { return MenuItems; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MENUITEMS = [
    /*{
       state: '',
       name: 'Personal',
       type: 'saperator',
       icon: 'av_timer'
     },
     {
       state: 'dashboard',
       name: 'Dashboard',
       type: 'sub',
       icon: 'av_timer',
       children: [
         { state: 'dashboard1', name: 'Dashboard 1', type: 'link' },
         { state: 'dashboard2', name: 'Dashboard 2', type: 'link' }
       ]
     },*/
    {
        state: 'dashboards',
        name: 'Dashboards',
        type: 'sub',
        icon: 'av_timer',
        children: [
            { state: 'cliniciananalysis', name: 'Clinician Analysis', type: 'link' },
            { state: 'clinicianproceedures', name: 'Clinician Procedures & Referrals', type: 'link' }
        ]
    },
    {
        state: 'importcsv',
        name: 'Importcsv',
        type: 'link',
        icon: 'widgets'
    },
    {
        state: 'clinic',
        name: 'Clinic',
        type: 'link',
        icon: 'widgets'
    },
    {
        state: 'dentist',
        name: 'Dentist',
        type: 'link',
        icon: 'widgets'
    },
    {
        state: 'clinic-goals',
        name: 'Clinic Goals',
        type: 'link',
        icon: 'widgets'
    },
    {
        state: 'dentist-goals',
        name: 'Dentist Goals',
        type: 'link',
        icon: 'widgets'
    },
];
var MenuItems = /** @class */ (function () {
    function MenuItems() {
    }
    MenuItems.prototype.getMenuitem = function () {
        return MENUITEMS;
    };
    MenuItems = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], MenuItems);
    return MenuItems;
}());



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _menu_items_menu_items__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu-items/menu-items */ "./src/app/shared/menu-items/menu-items.ts");
/* harmony import */ var _accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./accordion */ "./src/app/shared/accordion/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _accordion__WEBPACK_IMPORTED_MODULE_2__["AccordionAnchorDirective"],
                _accordion__WEBPACK_IMPORTED_MODULE_2__["AccordionLinkDirective"],
                _accordion__WEBPACK_IMPORTED_MODULE_2__["AccordionDirective"]
            ],
            exports: [
                _accordion__WEBPACK_IMPORTED_MODULE_2__["AccordionAnchorDirective"],
                _accordion__WEBPACK_IMPORTED_MODULE_2__["AccordionLinkDirective"],
                _accordion__WEBPACK_IMPORTED_MODULE_2__["AccordionDirective"]
            ],
            providers: [_menu_items_menu_items__WEBPACK_IMPORTED_MODULE_1__["MenuItems"]]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/app/shared/spinner.component.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/spinner.component.ts ***!
  \*********************************************/
/*! exports provided: SpinnerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpinnerComponent", function() { return SpinnerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var SpinnerComponent = /** @class */ (function () {
    function SpinnerComponent(router, document) {
        var _this = this;
        this.router = router;
        this.document = document;
        this.isSpinnerVisible = true;
        this.backgroundColor = 'rgba(0, 115, 170, 0.69)';
        this.router.events.subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationStart"]) {
                _this.isSpinnerVisible = true;
            }
            else if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"] ||
                event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationCancel"] ||
                event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationError"]) {
                _this.isSpinnerVisible = false;
            }
        }, function () {
            _this.isSpinnerVisible = false;
        });
    }
    SpinnerComponent.prototype.ngOnDestroy = function () {
        this.isSpinnerVisible = false;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SpinnerComponent.prototype, "backgroundColor", void 0);
    SpinnerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-spinner',
            template: "<div class=\"preloader\" *ngIf=\"isSpinnerVisible\">\n        <div class=\"spinner\">\n          <div class=\"double-bounce1\"></div>\n          <div class=\"double-bounce2\"></div>\n        </div>\n    </div>",
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"])),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            Document])
    ], SpinnerComponent);
    return SpinnerComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    apiUrl: "http://localhost/jeeveanalytics/server/"
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/html/jeeveanalytics/client2/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map