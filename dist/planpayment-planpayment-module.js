(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["planpayment-planpayment-module"],{

/***/ "./src/app/planpayment/planpayment.component.html":
/*!********************************************************!*\
  !*** ./src/app/planpayment/planpayment.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sa_login_blur\" style=\"background:url('../../assets/images/background/login-register_60.jpg')!important; background-size:cover!important; filter:blur(20px)!important; position:absolute; width:100%; height: 100vh;\ndisplay: flex;\nbackground-size: cover;\nalign-items: center;\"></div>\n<img class=\"login_abso_logo\" src=\"../assets/images/logo-white.png\">\n<div class=\"login-register\" style=\"background-image:url(assets/images/background/login-register.jpg);\">\n    <div class=\"login-register-box\">\n        <mat-card>\n            <mat-card-content>\n                    <div class=\"text-center\">\n                        <img alt=\"homepage\" src=\"../assets/images/logo-icon.gif\">\n                        <h4 class=\"m-t-0\">Proceed to Payment</h4>\n                    </div>\n\n                    <div class=\"proceed-payment-content\">\n                        <!-- col full-->\n\n                        <div class=\"selectIcon\">\n                        <select class=\"sa_select plan\" id=\"plans\" (change) = \"get_amount()\">\n                             <option value =\"all\">Select Plan</option>\n                            <option *ngFor=\"let plan of plans;let i = index\" [value]=\"i\" [attr.selected] = \"plan.id == plan_id ? 'selected' : null\"> {{plan.plan}}</option>\n                        </select> \n                        </div>\n\n                        <!-- col full-->\n                        <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\" class=\"text-center\">\n                            <span> \n                                <a (click)=\"openCheckout()\" class=\"text-info link\">Pay ${{amount}}</a>\n                            </span>\n                         <small *ngIf=\"successMessage\" class=\"text-success support-text\">{{successMessage}}</small>\n                        </div>\n                    </div>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/planpayment/planpayment.component.scss":
/*!********************************************************!*\
  !*** ./src/app/planpayment/planpayment.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BsYW5wYXltZW50L3BsYW5wYXltZW50LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/planpayment/planpayment.component.ts":
/*!******************************************************!*\
  !*** ./src/app/planpayment/planpayment.component.ts ***!
  \******************************************************/
/*! exports provided: PlanpaymentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanpaymentComponent", function() { return PlanpaymentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _login_login_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../login/login.service */ "./src/app/login/login.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PlanpaymentComponent = /** @class */ (function () {
    function PlanpaymentComponent(fb, router, loginService, _cookieService, route) {
        this.fb = fb;
        this.router = router;
        this.loginService = loginService;
        this._cookieService = _cookieService;
        this.route = route;
        this.errorLogin = false;
        this.plans = [];
    }
    PlanpaymentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.encode_string = _this.route.snapshot.paramMap.get("id");
            _this.checkString();
        });
        this.form = this.fb.group({
            uname: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required])],
            password: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required])]
        });
        this.getPlans();
    };
    PlanpaymentComponent.prototype.checkString = function () {
        var _this = this;
        var string = atob(this.encode_string);
        var res = string.split("/");
        this.plan_id = res[0];
        this.user_id = res[1];
        this.loginService.checkuser(this.plan_id, this.user_id).subscribe(function (res) {
            if (res.message == 'success') {
            }
            else if (res.message == 'error') {
                _this.router.navigate(['/']);
            }
        }, function (error) {
        });
    };
    PlanpaymentComponent.prototype.openCheckout = function () {
        var _this = this;
        var handler = window.StripeCheckout.configure({
            key: 'pk_test_fgXaq2pYYYwd4H3WbbIl4l8D00A63MKWFc',
            locale: 'auto',
            token: function (token) {
                _this.loginService.createSubscription(token, _this.stripe_plan_id, _this.user_id).subscribe(function (res) {
                    if (res.message == 'success') {
                        _this.successMessage = 'Payment Completed Successfully! You will be logged in to the account!';
                        setTimeout(function () {
                            _this.loginService.autoLogin(_this.user_id).subscribe(function (res) {
                                if (res.message == 'success') {
                                    var datares = [];
                                    datares['username'] = res.data.data.username;
                                    datares['email'] = res.data.data.email;
                                    datares['token'] = res.data.data.token;
                                    datares['userid'] = res.data.data.id;
                                    datares['parentid'] = res.data.data.parent_id;
                                    datares['user_type'] = res.data.data.user_type;
                                    datares['user_image'] = res.data.data.user_image;
                                    datares['login_status'] = res.data.data.login_status;
                                    datares['display_name'] = res.data.data.display_name;
                                    datares['dentistid'] = res.data.data.dentist_id;
                                    var opts = {
                                        expires: new Date('2030-07-19')
                                    };
                                    _this._cookieService.put("userid", '', opts);
                                    _this._cookieService.put("childid", '', opts);
                                    _this._cookieService.put("dentistid", '', opts);
                                    _this._cookieService.put("username", datares['username'], opts);
                                    _this._cookieService.put("email", datares['email'], opts);
                                    _this._cookieService.put("token", datares['token'], opts);
                                    _this._cookieService.put("user_type", datares['user_type'], opts);
                                    _this._cookieService.put("login_status", datares['login_status'], opts);
                                    _this._cookieService.put("display_name", datares['display_name'], opts);
                                    _this._cookieService.put("user_image", datares['user_image'], opts);
                                    if (datares['user_type'] == '1') {
                                        _this.router.navigate(['/users']);
                                        _this._cookieService.put("userid", datares['userid'], opts);
                                    }
                                    else if (datares['user_type'] == '2') {
                                        _this._cookieService.put("userid", datares['userid'], opts);
                                        _this.router.navigate(['/dashboards/cliniciananalysis/1']);
                                    }
                                    else if (res.message == 'error') {
                                        _this.errorLogin = true;
                                    }
                                }
                            }, function (error) {
                            });
                        }, 5000);
                    }
                    else if (res.message == 'error') {
                        _this.errorLogin = true;
                    }
                }, function (error) {
                });
            }
        });
        handler.open({
            name: this.planName,
            amount: this.amount
        });
    };
    PlanpaymentComponent.prototype.getPlans = function () {
        var _this = this;
        this.errorLogin = false;
        this.loginService.getPlans().subscribe(function (res) {
            if (res.message == 'success') {
                res.data.forEach(function (res, key) {
                    var temp = { plan: '', allowedClinics: '', description: '', amount: '', discount: '', id: '' };
                    if (res.id == _this.plan_id) {
                        _this.amount = res.amount;
                        _this.stripe_plan_id = res.stripe_plan_id;
                        _this.planName = res.plan;
                    }
                    temp.id = res.id;
                    temp.plan = res.plan;
                    temp.allowedClinics = res.allowedClinics;
                    temp.description = res.description;
                    temp.amount = res.amount;
                    temp.discount = res.discount;
                    _this.plans.push(temp);
                });
            }
            else if (res.message == 'error') {
                _this.errorLogin = true;
            }
        }, function (error) {
        });
    };
    PlanpaymentComponent.prototype.get_amount = function () {
        var id = $('#plans').val();
        this.amount = this.plans[id].amount;
        this.stripe_plan_id = this.plans[id].stripe_plan_id;
    };
    PlanpaymentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-planpayment',
            template: __webpack_require__(/*! ./planpayment.component.html */ "./src/app/planpayment/planpayment.component.html"),
            styles: [__webpack_require__(/*! ./planpayment.component.scss */ "./src/app/planpayment/planpayment.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _login_login_service__WEBPACK_IMPORTED_MODULE_4__["LoginService"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_2__["CookieService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], PlanpaymentComponent);
    return PlanpaymentComponent;
}());



/***/ }),

/***/ "./src/app/planpayment/planpayment.module.ts":
/*!***************************************************!*\
  !*** ./src/app/planpayment/planpayment.module.ts ***!
  \***************************************************/
/*! exports provided: PlanpaymentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanpaymentModule", function() { return PlanpaymentModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _planpayment_routing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./planpayment.routing */ "./src/app/planpayment/planpayment.routing.ts");
/* harmony import */ var _planpayment_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./planpayment.component */ "./src/app/planpayment/planpayment.component.ts");
/* harmony import */ var _login_login_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../login/login.service */ "./src/app/login/login.service.ts");
/* harmony import */ var _nomadreservations_ngx_stripe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @nomadreservations/ngx-stripe */ "./node_modules/@nomadreservations/ngx-stripe/fesm5/nomadreservations-ngx-stripe.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var PlanpaymentModule = /** @class */ (function () {
    function PlanpaymentModule() {
    }
    PlanpaymentModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_planpayment_routing__WEBPACK_IMPORTED_MODULE_6__["PlanpaymentRoutes"]),
                _nomadreservations_ngx_stripe__WEBPACK_IMPORTED_MODULE_9__["NgxStripeModule"].forRoot('pk_test_fgXaq2pYYYwd4H3WbbIl4l8D00A63MKWFc'),
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__["FlexLayoutModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"]
            ],
            providers: [
                _login_login_service__WEBPACK_IMPORTED_MODULE_8__["LoginService"]
            ],
            declarations: [
                _planpayment_component__WEBPACK_IMPORTED_MODULE_7__["PlanpaymentComponent"],
            ]
        })
    ], PlanpaymentModule);
    return PlanpaymentModule;
}());



/***/ }),

/***/ "./src/app/planpayment/planpayment.routing.ts":
/*!****************************************************!*\
  !*** ./src/app/planpayment/planpayment.routing.ts ***!
  \****************************************************/
/*! exports provided: PlanpaymentRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanpaymentRoutes", function() { return PlanpaymentRoutes; });
/* harmony import */ var _planpayment_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./planpayment.component */ "./src/app/planpayment/planpayment.component.ts");

var PlanpaymentRoutes = [
    {
        path: '',
        component: _planpayment_component__WEBPACK_IMPORTED_MODULE_0__["PlanpaymentComponent"],
        data: {
            title: 'Planpayment'
        }
    }
];


/***/ })

}]);
//# sourceMappingURL=planpayment-planpayment-module.js.map