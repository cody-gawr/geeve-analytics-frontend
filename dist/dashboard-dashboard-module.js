(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dashboard-dashboard-module"],{

/***/ "./src/app/dashboard/dashboard.module.ts":
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.module.ts ***!
  \***********************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _dashboard_routing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard.routing */ "./src/app/dashboard/dashboard.routing.ts");
/* harmony import */ var ng_chartist__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng-chartist */ "./node_modules/ng-chartist/dist/ng-chartist.js");
/* harmony import */ var ng_chartist__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ng_chartist__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-charts */ "./node_modules/ng2-charts/index.js");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ng2_charts__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _dashboard1_dashboard1_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dashboard1/dashboard1.component */ "./src/app/dashboard/dashboard1/dashboard1.component.ts");
/* harmony import */ var _dashboard2_dashboard2_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dashboard2/dashboard2.component */ "./src/app/dashboard/dashboard2/dashboard2.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _demo_material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__["FlexLayoutModule"],
                ng_chartist__WEBPACK_IMPORTED_MODULE_7__["ChartistModule"],
                ng2_charts__WEBPACK_IMPORTED_MODULE_8__["ChartsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_dashboard_routing__WEBPACK_IMPORTED_MODULE_6__["DashboardRoutes"])
            ],
            declarations: [_dashboard1_dashboard1_component__WEBPACK_IMPORTED_MODULE_9__["Dashboard1Component"], _dashboard2_dashboard2_component__WEBPACK_IMPORTED_MODULE_10__["Dashboard2Component"]]
        })
    ], DashboardModule);
    return DashboardModule;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.routing.ts":
/*!************************************************!*\
  !*** ./src/app/dashboard/dashboard.routing.ts ***!
  \************************************************/
/*! exports provided: DashboardRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardRoutes", function() { return DashboardRoutes; });
/* harmony import */ var _dashboard1_dashboard1_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard1/dashboard1.component */ "./src/app/dashboard/dashboard1/dashboard1.component.ts");
/* harmony import */ var _dashboard2_dashboard2_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard2/dashboard2.component */ "./src/app/dashboard/dashboard2/dashboard2.component.ts");


var DashboardRoutes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard1',
                component: _dashboard1_dashboard1_component__WEBPACK_IMPORTED_MODULE_0__["Dashboard1Component"]
            },
            {
                path: 'dashboard2',
                component: _dashboard2_dashboard2_component__WEBPACK_IMPORTED_MODULE_1__["Dashboard2Component"]
            }
        ]
    }
];


/***/ }),

/***/ "./src/app/dashboard/dashboard1/dashboard1.component.html":
/*!****************************************************************!*\
  !*** ./src/app/dashboard/dashboard1/dashboard1.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Simple four boxes Row -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <!-- column -->\n    <div fxFlex.gt-sm=\"25\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <!-- Row -->\n                <div class=\"d-flex no-block\">\n                    <!-- column -->\n                    <div class=\"m-r-10 no-shrink\">\n                        <button mat-fab mat-card-icon class=\"shadow-none bg-inverse  bg-success\">\n                            <mat-icon>account_circle</mat-icon>\n                        </button>\n                    </div>\n                    <!-- column -->\n                    <div>\n                        <h3 class=\"m-0\">386</h3>\n                        <h6 class=\"text-muted m-0\">New Clients</h6>\n                    </div>\n\n                </div>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <!-- column -->\n    <!-- column -->\n    <div fxFlex.gt-sm=\"25\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <!-- Row -->\n                <div class=\"d-flex no-block\">\n                    <!-- column -->\n                    <div class=\"m-r-10 no-shrink\">\n                        <button mat-fab color=\"warn\" mat-card-icon class=\"shadow-none  bg-warning\">\n                            <mat-icon>local_mall</mat-icon>\n                        </button>\n                    </div>\n                    <!-- column -->\n                    <div>\n                        <h3 class=\"m-0\">2408</h3>\n                        <h6 class=\"text-muted m-0\">All Projects</h6>\n                    </div>\n\n                </div>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <!-- column -->\n    <!-- column -->\n    <div fxFlex.gt-sm=\"25\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <!-- Row -->\n                <div class=\"d-flex no-block\">\n                    <!-- column -->\n                    <div class=\"m-r-10 no-shrink\">\n                        <button mat-fab color=\"accent\" mat-card-icon class=\"shadow-none\">\n                            <mat-icon>stars</mat-icon>\n                        </button>\n                    </div>\n                    <!-- column -->\n                    <div>\n                        <h3 class=\"m-0\">352</h3>\n                        <h6 class=\"text-muted m-0\">New Items</h6>\n                    </div>\n\n                </div>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <!-- column -->\n    <!-- column -->\n    <div fxFlex.gt-sm=\"25\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <!-- Row -->\n                <div class=\"d-flex no-block\">\n                    <!-- column -->\n                    <div class=\"m-r-10 no-shrink\">\n                        <button mat-fab color=\"warn\" mat-card-icon class=\"shadow-none bg-danger\">\n                            <mat-icon>content_paste</mat-icon>\n                        </button>\n                    </div>\n                    <!-- column -->\n                    <div>\n                        <h3 class=\"m-0\">159</h3>\n                        <h6 class=\"text-muted m-0\">New Invoices</h6>\n                    </div>\n\n                </div>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <!-- column -->\n</div>\n<!-- ============================================================== -->\n<!-- Charts -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <!-- Column-->\n    <div fxFlex.gt-lg=\"75\" fxFlex.gt-md=\"60\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Sales Overview</mat-card-title>\n                <mat-card-subtitle>Ample Admin Vs Material Admin</mat-card-subtitle>\n\n                <div class=\"barchrt\" style=\"height:360px;\">\n                    <x-chartist class=\"\" [data]=\"barChart1.data\" [type]=\"barChart1.type\" [options]=\"barChart1.options\" [responsiveOptions]=\"barChart1.responsiveOptions\"\n                        [events]=\"barChart1.events\"> </x-chartist>\n                </div>\n                <ul class=\"list-inline text-center\">\n                    <li>\n                        <h6 class=\"text-muted text-success m-0\">\n                            <i class=\"fa fa-circle font-10 m-r-10 \"></i>Ample</h6>\n                    </li>\n                    <li>\n                        <h6 class=\"text-muted  text-info  m-0\">\n                            <i class=\"fa fa-circle font-10 m-r-10\"></i>Pixel</h6>\n                    </li>\n                </ul>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <!-- Column-->\n    <div fxFlex.gt-lg=\"25\" fxFlex.gt-md=\"40\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Our Visitors</mat-card-title>\n                <mat-card-subtitle>Different Devices Used to Visit</mat-card-subtitle>\n                <div class=\"piechart\">\n                    <x-chartist class=\"\" [data]=\"donuteChart1.data\" [type]=\"donuteChart1.type\" [options]=\"donuteChart1.options\" [responsiveOptions]=\"donuteChart1.responsiveOptions\"\n                        [events]=\"donuteChart1.events\"> </x-chartist>\n                </div>\n            </mat-card-content>\n            <hr>\n            <mat-card-content>\n                <ul class=\"list-inline text-center\">\n                    <li>\n                        <h6 class=\"text-muted text-success m-0\">\n                            <i class=\"fa fa-circle font-10 m-r-10 \"></i>Mobile</h6>\n                    </li>\n                    <li>\n                        <h6 class=\"text-muted  text-info  m-0\">\n                            <i class=\"fa fa-circle font-10 m-r-10\"></i>Desktop</h6>\n                    </li>\n                    <li>\n                        <h6 class=\"text-muted  text-purple  m-0\">\n                            <i class=\"fa fa-circle font-10 m-r-10\"></i>Tablet</h6>\n                    </li>\n                </ul>\n            </mat-card-content>\n\n        </mat-card>\n    </div>\n    <!-- Column-->\n</div>\n<!-- ============================================================== -->\n<!-- Chart boxes -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <!-- column -->\n    <div fxFlex.gt-sm=\"33.33\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card class=\"bg-info\">\n            <mat-card-content>\n                <!-- column -->\n                <div class=\"d-flex no-block align-items-center\">\n                    <div class=\"stats\">\n                        <h3 class=\"text-white m-0\">Purchase</h3>\n                        <h6 class=\"text-white m-t-0\">March 2017</h6>\n                        <h1 class=\"text-white m-0\">35487</h1>\n                    </div>\n                    <div class=\"spark-count ml-auto\"></div>\n                </div>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <!-- column -->\n    <!-- column -->\n    <div fxFlex.gt-sm=\"33.33\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card class=\"bg-purple\">\n            <mat-card-content>\n                <!-- column -->\n                <div class=\"d-flex no-block align-items-center\">\n                    <div class=\"stats\">\n                        <h3 class=\"text-white m-0\">Expense</h3>\n                        <h6 class=\"text-white m-t-0\">March 2017</h6>\n                        <h1 class=\"text-white m-0\">35487</h1>\n                    </div>\n                    <div class=\"spark-count ml-auto\"></div>\n                </div>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <!-- column -->\n    <!-- column -->\n    <div fxFlex.gt-sm=\"33.33\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card class=\"bg-success\">\n            <mat-card-content>\n                <!-- column -->\n                <div class=\"d-flex no-block align-items-center\">\n                    <div class=\"stats\">\n                        <h3 class=\"text-white m-0\">Income</h3>\n                        <h6 class=\"text-white m-t-0\">March 2017</h6>\n                        <h1 class=\"text-white m-0\">35487</h1>\n                    </div>\n                    <div class=\"spark-count ml-auto\"></div>\n                </div>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <!-- column -->\n\n    <!-- column -->\n</div>\n<!-- ============================================================== -->\n<!-- Image and chart -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <!-- Column-->\n    <div fxFlex.gt-lg=\"25\" fxFlex.gt-md=\"40\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card class=\"oh\">\n            <img mat-card-image src=\"assets/images/big/img1.jpg\" alt=\"Photo of a Shiba Inu\">\n            <mat-card-content>\n                <p>\n                    The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes\n                    very well with mountainous terrain\n                </p>\n                <mat-card-actions>\n                    <button mat-raised-button color=\"accent\">LIKE</button>\n                    <button mat-button>SHARE</button>\n                </mat-card-actions>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <!-- Column-->\n    <div fxFlex.gt-lg=\"75\" fxFlex.gt-md=\"60\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Newsletter Campaign</mat-card-title>\n                <mat-card-subtitle>Overview of Newsletter Campaign</mat-card-subtitle>\n\n                <div class=\"linearea\" style=\"height:360px;\">\n                    <x-chartist class=\"\" [data]=\"lineChart1.data\" [type]=\"lineChart1.type\" [options]=\"lineChart1.options\" [responsiveOptions]=\"lineChart1.responsiveOptions\"\n                        [events]=\"lineChart1.events\"> </x-chartist>\n                </div>\n                <ul class=\"list-inline text-center p-t-10\">\n                    <li>\n                        <h6 class=\"text-muted text-success m-0\">\n                            <i class=\"fa fa-circle font-10 m-r-10 \"></i>Sent</h6>\n                    </li>\n                    <li>\n                        <h6 class=\"text-muted  text-info  m-0\">\n                            <i class=\"fa fa-circle font-10 m-r-10\"></i>Clicked</h6>\n                    </li>\n                </ul>\n            </mat-card-content>\n        </mat-card>\n    </div>\n\n</div>\n<!-- ============================================================== -->\n<!-- Image Card row-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <!-- Card column -->\n    <div fxFlex.gt-lg=\"25\" fxFlex.gt-md=\"40\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card class=\"oh text-center little-profile\">\n            <img mat-card-image src=\"assets/images/background/profile-bg.jpg\" alt=\"Photo of a Shiba Inu\">\n            <mat-card-content>\n                <div class=\"pro-img\">\n                    <img src=\"assets/images/users/4.jpg\" width=\"100\" alt=\"user\">\n                </div>\n                <h3 class=\"m-b-0\">Angela Dominic</h3>\n                <h6 class=\"m-t-0 \">Web Designer &amp; Developer</h6>\n                <mat-card-actions>\n                    <button mat-raised-button color=\"warn\">Follow</button>\n                </mat-card-actions>\n                <div fxLayout=\"row\" fxLayoutWrap=\"wrap\" class=\"m-t-30\">\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">1099</h3>\n                        <small>Articles</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">23,469</h3>\n                        <small>Followers</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">6035</h3>\n                        <small>Likes</small>\n                    </div>\n                </div>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <!-- Card column -->\n    <!-- Card column -->\n    <div fxFlex.gt-lg=\"75\" fxFlex.gt-md=\"60\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-tab-group>\n                <!-- Tab 1 -->\n                <mat-tab label=\"Activity\">\n                    <mat-card-content>\n                        <div class=\"d-flex no-blcok\" *ngFor=\"let mytimeline of mytimelines\">\n                            <div class=\"m-r-20\">\n                                <img class=\"img-circle\" width=\"50\" [src]=\"mytimeline.image\" alt=\"Image of {{mytimeline.from}}\"> </div>\n                            <div class=\"p-b-20 b-b m-b-30\">\n                                <h4 class=\"m-0\">{{mytimeline.from}}\n                                    <small class=\"text-muted\">{{mytimeline.time}}</small>\n                                </h4>\n                                <p class=\"text-muted\">{{mytimeline.content}}</p>\n                                <div fxLayout=\"row wrap\">\n                                    <div fxFlex.gt-sm=\"20\" fxFlex=\"100\">\n                                        <img class=\"img-responsive rounded\" [src]=\"mytimeline.attachment\" *ngIf=\"mytimeline.attachment\" alt=\"Image of {{mytimeline.attachment}}\">\n                                    </div>\n                                </div>\n                                <button mat-raised-button color=\"{{mytimeline.buttons}}\" *ngIf=\"mytimeline.buttons\">Check Now</button>\n                            </div>\n                        </div>\n                    </mat-card-content>\n                </mat-tab>\n                <!-- End Tab 1 -->\n                <!-- Tab 2 -->\n                <mat-tab label=\"Profile\">\n                    <mat-card-content>\n                        <mat-card-title>Form Basic Layouts</mat-card-title>\n                        <!-- ============================================================== -->\n                        <!-- column -->\n                        <!-- ============================================================== -->\n                        <form class=\"basic-form\">\n                            <div fxLayout=\"row wrap\">\n                                <!-- column -->\n                                <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n                                    <mat-form-field>\n                                        <input matInput placeholder=\"Some text value\">\n                                    </mat-form-field>\n                                </div>\n                                <!-- column -->\n                                <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n                                    <mat-form-field>\n                                        <input matInput placeholder=\"EmailId\" type=\"email\">\n                                    </mat-form-field>\n                                </div>\n                                <!-- column -->\n                                <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n                                    <mat-form-field>\n                                        <input matInput placeholder=\"Password\" type=\"password\">\n                                    </mat-form-field>\n                                </div>\n\n                                <!-- column -->\n                                <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n                                    <mat-form-field>\n                                        <mat-select placeholder=\"Select\">\n                                            <mat-option value=\"option\">Option</mat-option>\n                                            <mat-option value=\"option\">Option2</mat-option>\n                                            <mat-option value=\"option\">Option3</mat-option>\n                                        </mat-select>\n                                    </mat-form-field>\n                                </div>\n\n                                <!-- column -->\n                                <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n                                    <mat-form-field>\n                                        <textarea matInput placeholder=\"Textarea\"></textarea>\n                                    </mat-form-field>\n                                </div>\n                                <!-- column -->\n                                <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n                                    <button mat-raised-button color=\"primary\">Update Profile</button>\n                                </div>\n                            </div>\n                        </form>\n                    </mat-card-content>\n                </mat-tab>\n            </mat-tab-group>\n        </mat-card>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/dashboard/dashboard1/dashboard1.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/dashboard/dashboard1/dashboard1.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".piechart {\n  height: 300px;\n  width: 280px;\n  margin: 0 auto; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9kYXNoYm9hcmQvZGFzaGJvYXJkMS9kYXNoYm9hcmQxLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBYTtFQUNiLGFBQVk7RUFDWixlQUFjLEVBQ2YiLCJmaWxlIjoic3JjL2FwcC9kYXNoYm9hcmQvZGFzaGJvYXJkMS9kYXNoYm9hcmQxLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnBpZWNoYXJ0IHtcbiAgaGVpZ2h0OiAzMDBweDtcbiAgd2lkdGg6IDI4MHB4O1xuICBtYXJnaW46IDAgYXV0bztcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/dashboard/dashboard1/dashboard1.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/dashboard/dashboard1/dashboard1.component.ts ***!
  \**************************************************************/
/*! exports provided: Dashboard1Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dashboard1Component", function() { return Dashboard1Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var data = __webpack_require__(/*! ./data.json */ "./src/app/dashboard/dashboard1/data.json");
var Dashboard1Component = /** @class */ (function () {
    function Dashboard1Component() {
        // Barchart
        this.barChart1 = {
            type: 'Bar',
            data: data['Bar'],
            options: {
                seriesBarDistance: 15,
                high: 12,
                axisX: {
                    showGrid: false,
                    offset: 20
                },
                axisY: {
                    showGrid: true,
                    offset: 40
                }
            },
            responsiveOptions: [
                [
                    'screen and (min-width: 640px)',
                    {
                        axisX: {
                            labelInterpolationFnc: function (value, index) {
                                return index % 1 === 0 ? "" + value : null;
                            }
                        }
                    }
                ]
            ]
        };
        // This is for the donute chart
        this.donuteChart1 = {
            type: 'Pie',
            data: data['Pie'],
            options: {
                donut: true,
                showLabel: false,
                donutWidth: 30
            }
            // events: {
            //   draw(data: any): boolean {
            //     return data;
            //   }
            // }
        };
        // This is for the line chart
        // Line chart
        this.lineChart1 = {
            type: 'Line',
            data: data['LineWithArea'],
            options: {
                low: 0,
                high: 35000,
                showArea: true,
                fullWidth: true
            }
        };
        // Timeline
        this.mytimelines = [
            {
                from: 'Nirav joshi',
                time: '(5 minute ago)',
                image: 'assets/images/users/1.jpg',
                attachment: 'assets/images/big/img2.jpg',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.'
            },
            {
                from: 'Sunil joshi',
                time: '(3 minute ago)',
                image: 'assets/images/users/2.jpg',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
                buttons: 'primary'
            },
            {
                from: 'Vishal Bhatt',
                time: '(1 minute ago)',
                image: 'assets/images/users/3.jpg',
                attachment: 'assets/images/big/img1.jpg',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.'
            },
            {
                from: 'Dhiren Adesara',
                time: '(1 minute ago)',
                image: 'assets/images/users/4.jpg',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
                buttons: 'warn'
            }
        ];
    }
    Dashboard1Component.prototype.ngAfterViewInit = function () {
        // Sparkline chart
        var sparklineLogin = function () {
            // spark count
            $('.spark-count').sparkline([4, 5, 0, 10, 9, 12, 4, 9, 4, 5, 3, 10, 9, 12, 10, 9, 12, 4, 9], {
                type: 'bar',
                width: '100%',
                height: '70',
                barWidth: '2',
                resize: true,
                barSpacing: '6',
                barColor: 'rgba(255, 255, 255, 0.3)'
            });
        };
        var sparkResize;
        $(window).resize(function (e) {
            clearTimeout(sparkResize);
            sparkResize = setTimeout(sparklineLogin, 500);
        });
        sparklineLogin();
    };
    Dashboard1Component = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard1.component.html */ "./src/app/dashboard/dashboard1/dashboard1.component.html"),
            styles: [__webpack_require__(/*! ./dashboard1.component.scss */ "./src/app/dashboard/dashboard1/dashboard1.component.scss")]
        })
    ], Dashboard1Component);
    return Dashboard1Component;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard1/data.json":
/*!************************************************!*\
  !*** ./src/app/dashboard/dashboard1/data.json ***!
  \************************************************/
/*! exports provided: Bar, LineWithArea, Pie, default */
/***/ (function(module) {

module.exports = {"Bar":{"labels":["Jan","Feb","Mar","Apr","May","Jun"],"series":[[9,4,11,7,10,12],[3,2,9,5,8,10]]},"LineWithArea":{"labels":[1,2,3,4,5,6,7,8],"series":[[0,5000,15000,8000,15000,9000,30000,0],[0,3000,5000,2000,8000,1000,5000,0]]},"Pie":{"series":[20,10,30,40]}};

/***/ }),

/***/ "./src/app/dashboard/dashboard2/dashboard2.component.html":
/*!****************************************************************!*\
  !*** ./src/app/dashboard/dashboard2/dashboard2.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Card Group Row -->\n<!-- ============================================================== -->\n<div class=\"card-group\">\n    <!-- column -->\n\n    <mat-card>\n        <mat-card-content>\n            <!-- column -->\n            <mat-icon class=\"text-info\">account_circle</mat-icon>\n            <h3 class=\"m-0\">386</h3>\n            <h5 class=\"text-muted m-t-0 m-b-10\">New Clients</h5>\n            <mat-progress-bar mode=\"determinate\" value=\"40\"></mat-progress-bar>\n        </mat-card-content>\n    </mat-card>\n\n    <!-- column -->\n    <!-- column -->\n\n    <mat-card>\n        <mat-card-content>\n            <!-- column -->\n            <mat-icon class=\"text-danger\">local_mall</mat-icon>\n            <h3 class=\"m-0\">1386</h3>\n            <h5 class=\"text-muted m-t-0 m-b-10\">New Projects</h5>\n            <mat-progress-bar color=\"warn\" mode=\"determinate\" value=\"60\"></mat-progress-bar>\n        </mat-card-content>\n    </mat-card>\n\n    <!-- column -->\n    <!-- column -->\n\n    <mat-card>\n        <mat-card-content>\n            <!-- column -->\n            <mat-icon class=\"text-purple\">stars</mat-icon>\n            <h3 class=\"m-0\">986</h3>\n            <h5 class=\"text-muted m-t-0 m-b-10\">New Items</h5>\n            <mat-progress-bar color=\"accent\" mode=\"determinate\" value=\"80\"></mat-progress-bar>\n        </mat-card-content>\n    </mat-card>\n\n    <!-- column -->\n    <!-- column -->\n\n    <mat-card>\n        <mat-card-content>\n            <!-- column -->\n            <mat-icon class=\"text-info\">content_paste</mat-icon>\n            <h3 class=\"m-0\">786</h3>\n            <h5 class=\"text-muted m-t-0  m-b-10\">New Invoices</h5>\n            <mat-progress-bar mode=\"indeterminate\" value=\"40\"></mat-progress-bar>\n        </mat-card-content>\n    </mat-card>\n\n    <!-- column -->\n</div>\n<!-- ============================================================== -->\n<!-- Chart boxes -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <!-- column -->\n    <div fxFlex.gt-md=\"33.33\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <div fxLayout=\"row wrap\">\n            <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                <mat-card class=\"bg-success\">\n                    <mat-card-content>\n                        <!-- column -->\n                        <div class=\"d-flex p-t-20 p-b-20 no-block align-items-center\">\n                            <div class=\"stats\">\n                                <h3 class=\"text-white m-0\">Sales</h3>\n                                <h6 class=\"text-white m-t-0\">March 2018</h6>\n                                <h1 class=\"text-white m-0\">35487</h1>\n                            </div>\n                            <div class=\"spark-count ml-auto\"></div>\n                        </div>\n                    </mat-card-content>\n                </mat-card>\n            </div>\n        </div>\n        <div fxLayout=\"row wrap\">\n            <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                <mat-card class=\"bg-purple\">\n                    <mat-card-content>\n                        <!-- column -->\n                        <div class=\"d-flex p-t-20 p-b-20 no-block align-items-center\">\n                            <div class=\"stats\">\n                                <h3 class=\"text-white m-0\">Purchase</h3>\n                                <h6 class=\"text-white m-t-0\">March 2018</h6>\n                                <h1 class=\"text-white m-0\">35487</h1>\n                            </div>\n                            <div class=\"spark-count ml-auto\"></div>\n                        </div>\n                    </mat-card-content>\n                </mat-card>\n            </div>\n        </div>\n    </div>\n    <!-- column -->\n    <!-- column -->\n    <div fxFlex.gt-md=\"33.33\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <!-- column -->\n                <mat-card-title>Our Visitors</mat-card-title>\n                <mat-card-subtitle>Different Devices Used to Visit</mat-card-subtitle>\n                <div class=\"text-center\">\n                    <canvas baseChart class=\"m-auto\" width=\"230\" height=\"230\" [data]=\"doughnutChartData\" [labels]=\"doughnutChartLabels\" [legend]=\"doughnutChartLegend\"\n                        [options]=\"doughnutChartOptions\" [chartType]=\"doughnutChartType\" [colors]=\"[{backgroundColor: ['#1976d2', '#26dad2', '#dadada']}]\"></canvas>\n                </div>\n            </mat-card-content>\n            <hr>\n            <mat-card-content>\n                <ul class=\"list-inline text-center\">\n                    <li>\n                        <h6 class=\"text-muted text-success m-0\">\n                            <i class=\"fa fa-circle font-10 m-r-10 \"></i>Mobile</h6>\n                    </li>\n                    <li>\n                        <h6 class=\"text-muted  text-info  m-0\">\n                            <i class=\"fa fa-circle font-10 m-r-10\"></i>Desktop</h6>\n                    </li>\n                    <li>\n                        <h6 class=\"text-muted  text-purple  m-0\">\n                            <i class=\"fa fa-circle font-10 m-r-10\"></i>Tablet</h6>\n                    </li>\n                </ul>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <!-- column -->\n    <!-- column -->\n    <div fxFlex.gt-md=\"33.33\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <!-- column -->\n                <mat-card-title>Sales Yealry</mat-card-title>\n                <mat-card-subtitle>This is the simple example of bar chart</mat-card-subtitle>\n                <div class=\"barchrt\" style=\"height:325px;\">\n                    <x-chartist class=\"\" [data]=\"barChart1.data\" [type]=\"barChart1.type\" [options]=\"barChart1.options\" [responsiveOptions]=\"barChart1.responsiveOptions\" \n                        [events]=\"barChart1.events\"> </x-chartist>\n                </div>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <!-- column -->\n\n    <!-- column -->\n</div>\n<!-- ============================================================== -->\n<!-- Image and chart -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <!-- Column-->\n    <div fxFlex.gt-lg=\"25\" fxFlex.gt-md=\"40\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card class=\"oh text-center little-profile\">\n            <img mat-card-image src=\"assets/images/background/profile-bg.jpg\" alt=\"Photo of a Shiba Inu\">\n            <mat-card-content>\n                <div class=\"pro-img\">\n                    <img src=\"assets/images/users/4.jpg\" width=\"100\" alt=\"user\">\n                </div>\n                <h3 class=\"m-b-0\">Angela Dominic</h3>\n                <h6 class=\"m-t-0 \">Web Designer &amp; Developer</h6>\n                <mat-card-actions>\n                    <button mat-raised-button color=\"warn\">Follow</button>\n                </mat-card-actions>\n                <div fxLayout=\"row wrap\" class=\"m-t-40\">\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">1099</h3>\n                        <small>Articles</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">23,469</h3>\n                        <small>Followers</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">6035</h3>\n                        <small>Likes</small>\n                    </div>\n                </div>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <!-- Column-->\n    <div fxFlex.gt-lg=\"75\" fxFlex.gt-md=\"60\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Contact list</mat-card-title>\n                \n                <div class=\"responsive-table\">\n                    <mat-table #table [dataSource]=\"dataSource\" class=\"contactlist\">\n                        <!--- Note that these columns can be defined in any order.\n                              The actual rendered columns are set as a property on the row definition\" -->\n\n                        <!-- Position Column -->\n                        <ng-container matColumnDef=\"pic\">\n                            <mat-header-cell *matHeaderCellDef> Pic </mat-header-cell>\n                            <mat-cell *matCellDef=\"let element\">\n                                <span class=\"header-label\">pic:</span>\n                                <img src=\"{{element.pic}}\" class=\"img-circle\" width=\"30\" />\n                            </mat-cell>\n                        </ng-container>\n\n                        <!-- Name Column -->\n                        <ng-container matColumnDef=\"name\">\n                            <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>\n                            <mat-cell *matCellDef=\"let element\">\n                                <span class=\"header-label\">name:</span>\n                                <h5 class=\"m-0\">{{element.name}}</h5> </mat-cell>\n                        </ng-container>\n\n                        <!-- Weight Column -->\n                        <ng-container matColumnDef=\"weight\">\n                            <mat-header-cell *matHeaderCellDef> Weight </mat-header-cell>\n                            <mat-cell *matCellDef=\"let element\">\n                                <span class=\"header-label\">Weight:</span>\n                                {{element.weight}} \n                            </mat-cell>\n                        </ng-container>\n\n                        <!-- Symbol Column -->\n                        <ng-container matColumnDef=\"designation\">\n                            <mat-header-cell *matHeaderCellDef> Post </mat-header-cell>\n                            <mat-cell *matCellDef=\"let element\"> \n                                <span class=\"header-label\">Post:</span>\n                                {{element.designation}} \n                            </mat-cell>\n                        </ng-container>\n\n                        <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n                        <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n                    </mat-table>\n                </div>\n                <mat-paginator #paginator [pageSize]=\"5\" [pageSizeOptions]=\"[5, 10, 20]\">\n                </mat-paginator>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n<!-- ============================================================== -->\n<!-- Image Card row-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <!-- Card column -->\n    <div fxFlex.gt-lg=\"50\" fxFlex.gt-md=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Recent Comments</mat-card-title>\n                <mat-card-subtitle>Latest Comments on users from Material</mat-card-subtitle>\n                <div class=\"comment-widgets\">\n                    <!-- Comment Row -->\n                    <div class=\"d-flex flex-row comment-row\" *ngFor=\"let mycomment of mycomments\">\n                        <div class=\"p-2\">\n                            <span class=\"round\">\n                                <img src=\"{{mycomment.profile}}\" alt=\"user\" width=\"50\">\n                            </span>\n                        </div>\n                        <div class=\"comment-text w-100\">\n                            <h5 class=\"m-0\">{{mycomment.name}}</h5>\n                            <p class=\"m-b-5\">{{mycomment.content}}</p>\n                            <div class=\"comment-footer\">\n                                <span class=\"text-muted pull-right\">{{mycomment.date}}</span>\n                                <span class=\"label label-{{mycomment.class}}\">{{mycomment.status}}</span>\n                                <span class=\"action-icons\">\n                                    <a href=\"javascript:void(0)\">\n                                        <i class=\"ti-pencil-alt\"></i>\n                                    </a>\n                                    <a href=\"javascript:void(0)\">\n                                        <i class=\"ti-check\"></i>\n                                    </a>\n                                    <a href=\"javascript:void(0)\">\n                                        <i class=\"ti-heart\"></i>\n                                    </a>\n                                </span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <!-- Card column -->\n    <!-- Card column -->\n    <div fxFlex.gt-lg=\"50\" fxFlex.gt-md=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Recent Messages</mat-card-title>\n                <mat-card-subtitle>Latest Messages on users from Material</mat-card-subtitle>\n                <div class=\"mailbox message-widget\">\n                    <div class=\"message-center\">\n                        <a href=\"#\" *ngFor=\"let mymessage of mymessages\">\n                            <div class=\"user-img\">\n                                <img src=\"{{mymessage.useravatar}}\" alt=\"user\" class=\"img-circle\" width=\"40\">\n                                <span class=\"profile-status {{mymessage.status}} pull-right\"></span>\n                            </div>\n                            <div class=\"mail-content\">\n                                <h5>{{mymessage.from}}</h5>\n                                <span class=\"mail-desc\">{{mymessage.subject}}</span>\n                                <span class=\"time\">{{mymessage.time}}</span>\n                            </div>\n                        </a>\n                    </div>\n                </div>\n\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/dashboard/dashboard2/dashboard2.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/dashboard/dashboard2/dashboard2.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".saleschart {\n  width: 100%; }\n\n.contactlist .mat-row {\n  padding: 10px 15px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9kYXNoYm9hcmQvZGFzaGJvYXJkMi9kYXNoYm9hcmQyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBVyxFQUNaOztBQUNEO0VBQ0UsbUJBQWtCLEVBQ25CIiwiZmlsZSI6InNyYy9hcHAvZGFzaGJvYXJkL2Rhc2hib2FyZDIvZGFzaGJvYXJkMi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zYWxlc2NoYXJ0IHtcbiAgd2lkdGg6IDEwMCU7XG59XG4uY29udGFjdGxpc3QgLm1hdC1yb3cge1xuICBwYWRkaW5nOiAxMHB4IDE1cHg7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/dashboard/dashboard2/dashboard2.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/dashboard/dashboard2/dashboard2.component.ts ***!
  \**************************************************************/
/*! exports provided: Dashboard2Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dashboard2Component", function() { return Dashboard2Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var data = __webpack_require__(/*! ./data.json */ "./src/app/dashboard/dashboard2/data.json");
var ELEMENT_DATA = [
    {
        pic: 'assets/images/users/1.jpg',
        name: 'Nirav joshi',
        weight: 1.0079,
        designation: 'H'
    },
    {
        pic: 'assets/images/users/2.jpg',
        name: 'Sunil joshi',
        weight: 4.0026,
        designation: 'He'
    },
    {
        pic: 'assets/images/users/3.jpg',
        name: 'Vishal Bhatt',
        weight: 6.941,
        designation: 'Li'
    },
    {
        pic: 'assets/images/users/4.jpg',
        name: 'Beryllium Lon',
        weight: 9.0122,
        designation: 'Be'
    },
    {
        pic: 'assets/images/users/5.jpg',
        name: 'Boron son',
        weight: 10.811,
        designation: 'B'
    },
    {
        pic: 'assets/images/users/6.jpg',
        name: 'Carbon hryt',
        weight: 12.0107,
        designation: 'C'
    },
    {
        pic: 'assets/images/users/7.jpg',
        name: 'Nitro oxur',
        weight: 14.0067,
        designation: 'N'
    }
];
var Dashboard2Component = /** @class */ (function () {
    // This is for the table responsive
    function Dashboard2Component(breakpointObserver) {
        var _this = this;
        // Barchart
        this.barChart1 = {
            type: 'Bar',
            data: data['Bar'],
            options: {
                seriesBarDistance: 15,
                high: 12,
                axisX: {
                    showGrid: false,
                    offset: 20
                },
                axisY: {
                    showGrid: true,
                    offset: 40
                }
            },
            responsiveOptions: [
                [
                    'screen and (min-width: 640px)',
                    {
                        axisX: {
                            labelInterpolationFnc: function (value, index) {
                                return index % 1 === 0 ? "" + value : null;
                            }
                        }
                    }
                ]
            ]
        };
        // Doughnut
        this.doughnutChartLabels = ['Desktop', 'Mobile', 'Tablet'];
        this.doughnutChartOptions = {
            responsive: false
        };
        this.doughnutChartData = [350, 450, 100];
        this.doughnutChartType = 'doughnut';
        this.doughnutChartLegend = false;
        // This is for the comments
        this.mycomments = [
            {
                name: 'James Anderson',
                content: 'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
                profile: 'assets/images/users/1.jpg',
                status: 'Pending',
                class: 'info',
                date: 'April 14, 2016'
            },
            {
                name: 'Michael Jorden',
                content: 'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
                profile: 'assets/images/users/2.jpg',
                status: 'Approved',
                class: 'light-success',
                date: 'April 14, 2016'
            },
            {
                name: 'James Anderson',
                content: 'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
                profile: 'assets/images/users/3.jpg',
                status: 'Pending',
                class: 'danger',
                date: 'April 14, 2016'
            },
            {
                name: 'Johnathan Doeting',
                content: 'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
                profile: 'assets/images/users/1.jpg',
                status: 'Pending',
                class: 'info',
                date: 'April 14, 2016'
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
                useravatar: 'assets/images/users/3.jpg',
                status: 'away',
                from: 'Arijit Sinh',
                subject: 'I am a singer!',
                time: '9:08 AM'
            },
            {
                useravatar: 'assets/images/users/4.jpg',
                status: 'busy',
                from: 'Sonu Nigam',
                subject: 'I have sung a song! See you at',
                time: '9:10 AM'
            },
            {
                useravatar: 'assets/images/users/6.jpg',
                status: 'away',
                from: 'Arijit Sinh',
                subject: 'I am a singer!',
                time: '9:08 AM'
            },
            {
                useravatar: 'assets/images/users/7.jpg',
                status: 'busy',
                from: 'Sonu Nigam',
                subject: 'I have sung a song! See you at',
                time: '9:10 AM'
            },
            {
                useravatar: 'assets/images/users/8.jpg',
                status: 'away',
                from: 'Arijit Sinh',
                subject: 'I am a singer!',
                time: '9:08 AM'
            },
            {
                useravatar: 'assets/images/users/6.jpg',
                status: 'offline',
                from: 'Pavan kumar',
                subject: 'Just see the my admin!',
                time: '9:00 AM'
            }
        ];
        // tslint:disable-next-line:member-ordering
        this.displayedColumns = ['pic', 'name', 'weight', 'designation'];
        // tslint:disable-next-line:member-ordering
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](ELEMENT_DATA);
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(function (result) {
            _this.displayedColumns = result.matches ?
                ['pic', 'name', 'weight', 'designation'] :
                ['pic', 'name', 'weight', 'designation'];
        });
    }
    Dashboard2Component.prototype.ngAfterViewInit = function () {
        // Sparkline chart
        var sparklineLogin = function () {
            // spark count
            $('.spark-count').sparkline([4, 5, 0, 10, 9, 12, 4, 9, 4, 5, 3, 10, 9, 12, 10, 9, 12, 4, 9], {
                type: 'bar',
                width: '100%',
                height: '70',
                barWidth: '2',
                resize: true,
                barSpacing: '6',
                barColor: 'rgba(255, 255, 255, 0.3)'
            });
        };
        var sparkResize;
        $(window).resize(function (e) {
            clearTimeout(sparkResize);
            sparkResize = setTimeout(sparklineLogin, 500);
        });
        sparklineLogin();
        /**
         * Set the paginator after the view init since this component will
         * be able to query its view for the initialized paginator.
         */
        this.dataSource.paginator = this.paginator;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], Dashboard2Component.prototype, "paginator", void 0);
    Dashboard2Component = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard2',
            template: __webpack_require__(/*! ./dashboard2.component.html */ "./src/app/dashboard/dashboard2/dashboard2.component.html"),
            styles: [__webpack_require__(/*! ./dashboard2.component.scss */ "./src/app/dashboard/dashboard2/dashboard2.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_2__["BreakpointObserver"]])
    ], Dashboard2Component);
    return Dashboard2Component;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard2/data.json":
/*!************************************************!*\
  !*** ./src/app/dashboard/dashboard2/data.json ***!
  \************************************************/
/*! exports provided: Bar, LineWithArea, Pie, default */
/***/ (function(module) {

module.exports = {"Bar":{"labels":["Jan","Feb","Mar","Apr","May","Jun"],"series":[[9,4,11,7,10,12],[3,2,9,5,8,10]]},"LineWithArea":{"labels":[1,2,3,4,5,6,7,8],"series":[[0,5000,15000,8000,15000,9000,30000,0],[0,3000,5000,2000,8000,1000,5000,0]]},"Pie":{"series":[20,10,30,40]}};

/***/ })

}]);
//# sourceMappingURL=dashboard-dashboard-module.js.map