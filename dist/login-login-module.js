(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-login-module"],{

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sa_login_blur\" style=\"background:url('../../assets/images/background/login-register_60.jpg')!important; background-size:cover!important; filter:blur(20px)!important; position:absolute; width:100%; height: 100vh;\ndisplay: flex;\nbackground-size: cover;\nalign-items: center;\"></div>\n<img class=\"login_abso_logo\" src=\"../assets/images/logo-white.png\">\n<div class=\"login-register\" style=\"background-image:url(assets/images/background/login-register.jpg);\">\n    <div class=\"login-register-box\">\n        <mat-card>\n            <mat-card-content>\n                <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\n                    <div class=\"text-center\">\n                        <img alt=\"homepage\" src=\"../assets/images/logo-icon.gif\">\n                        <h4 class=\"m-t-0\">Login to Jeeve Analytics</h4>\n                    </div>\n\n                    <div fxLayout=\"row wrap\">\n                        <!-- col full-->\n                        <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\" class=\"dc_input\">\n                            <mat-form-field>\n                                <input matInput placeholder=\"Email\" [formControl]=\"form.controls['uname']\">\n                            </mat-form-field>\n                            <small *ngIf=\"form.controls['uname'].hasError('required') && form.controls['uname'].touched\" class=\"text-danger support-text\">Email is required.</small>\n                        </div>\n                        <!-- col full-->\n                        <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\" class=\"dc_input\">\n                            <mat-form-field>\n                                <input matInput type=\"password\" placeholder=\"Password\" [formControl]=\"form.controls['password']\">\n                            </mat-form-field>\n                            <small *ngIf=\"form.controls['password'].hasError('required') && form.controls['password'].touched\" class=\"text-danger support-text\">Password is required.</small>\n\n                        </div>\n                          <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                         <small *ngIf=\"errorLogin\" class=\"text-danger support-text\">Incorrect Email or Password.</small>\n                     </div>\n                        <!-- col half-->\n                         <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"50\">\n                            <mat-checkbox color=\"warn\">Remember me</mat-checkbox>\n                        </div> \n                        <!-- col half-->\n                        <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"50\" class=\"text-right\">\n                            <a [routerLink]=\"['/authentication/forgot']\" class=\"link\">Forgot Password?</a>\n                        </div> \n                        <!-- col full-->\n                      \n                     <div  fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                            <button mat-raised-button color=\"dc\" class=\"btn-block btn-lg m-t-20 m-b-20\" type=\"submit\" [disabled]=\"!form.valid\">Login</button>\n                        </div>\n                        <!-- col full-->\n                        <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\" class=\"text-center\">\n                            <span>Don't have an account?\n                                <a [routerLink]=\"['/subscription']\" class=\"text-info link\">Register</a>\n                            </span>\n                        </div>\n                    </div>\n                </form>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/login/login.component.scss":
/*!********************************************!*\
  !*** ./src/app/login/login.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login.service */ "./src/app/login/login.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, router, loginService, _cookieService) {
        this.fb = fb;
        this.router = router;
        this.loginService = loginService;
        this._cookieService = _cookieService;
        this.errorLogin = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            uname: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required])],
            password: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required])]
        });
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.errorLogin = false;
        this.loginService.login(this.form.value.uname, this.form.value.password).subscribe(function (res) {
            if (res.message == 'success') {
                var datares = [];
                datares['username'] = res.data.data.username;
                datares['email'] = res.data.data.email;
                datares['token'] = res.data.data.token;
                datares['userid'] = res.data.data.id;
                datares['parentid'] = res.data.data.parent_id;
                datares['user_type'] = res.data.data.user_type;
                datares['user_image'] = res.data.data.user_image;
                datares['login_status'] = res.data.data.status;
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
                if (datares['login_status'] == '5') {
                    _this.router.navigate(['/profile-settings']);
                    _this._cookieService.put("userid", datares['userid'], opts);
                }
                else if (datares['user_type'] == '1') {
                    _this.router.navigate(['/users']);
                    _this._cookieService.put("userid", datares['userid'], opts);
                }
                else if (datares['user_type'] == '2') {
                    _this._cookieService.put("userid", datares['userid'], opts);
                    // if(datares['login_status'] == 0)
                    //  window.location.href = '/assets/stepper/index.html';
                    //  else
                    _this.router.navigate(['/dashboards/healthscreen']);
                }
                else {
                    _this._cookieService.put("userid", datares['parentid'], opts);
                    _this._cookieService.put("childid", datares['userid'], opts);
                    _this._cookieService.put("dentistid", datares['dentistid'], opts);
                    _this.router.navigate(['/profile-settings']);
                }
            }
            else if (res.message == 'error') {
                _this.errorLogin = true;
            }
        }, function (error) {
        });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _login_service__WEBPACK_IMPORTED_MODULE_4__["LoginService"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_2__["CookieService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/login/login.module.ts":
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/*! exports provided: LoginModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _login_routing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login.routing */ "./src/app/login/login.routing.ts");
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./login.service */ "./src/app/login/login.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_login_routing__WEBPACK_IMPORTED_MODULE_6__["LoginRoutes"]),
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
                _login_service__WEBPACK_IMPORTED_MODULE_8__["LoginService"]
            ],
            declarations: [
                _login_component__WEBPACK_IMPORTED_MODULE_7__["LoginComponent"],
            ]
        })
    ], LoginModule);
    return LoginModule;
}());



/***/ }),

/***/ "./src/app/login/login.routing.ts":
/*!****************************************!*\
  !*** ./src/app/login/login.routing.ts ***!
  \****************************************/
/*! exports provided: LoginRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginRoutes", function() { return LoginRoutes; });
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.component */ "./src/app/login/login.component.ts");

var LoginRoutes = [
    {
        path: '',
        component: _login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"],
        data: {
            title: 'Login'
        }
    }
];


/***/ })

}]);
//# sourceMappingURL=login-login-module.js.map