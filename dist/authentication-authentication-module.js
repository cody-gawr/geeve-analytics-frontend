(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["authentication-authentication-module"],{

/***/ "./src/app/authentication/authentication.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/authentication/authentication.module.ts ***!
  \*********************************************************/
/*! exports provided: AuthenticationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationModule", function() { return AuthenticationModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _authentication_routing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./authentication.routing */ "./src/app/authentication/authentication.routing.ts");
/* harmony import */ var _error_error_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./error/error.component */ "./src/app/authentication/error/error.component.ts");
/* harmony import */ var _forgot_forgot_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./forgot/forgot.component */ "./src/app/authentication/forgot/forgot.component.ts");
/* harmony import */ var _lockscreen_lockscreen_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lockscreen/lockscreen.component */ "./src/app/authentication/lockscreen/lockscreen.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./login/login.component */ "./src/app/authentication/login/login.component.ts");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./register/register.component */ "./src/app/authentication/register/register.component.ts");
/* harmony import */ var _reset_reset_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./reset/reset.component */ "./src/app/authentication/reset/reset.component.ts");
/* harmony import */ var _login_login_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../login/login.service */ "./src/app/login/login.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AuthenticationModule = /** @class */ (function () {
    function AuthenticationModule() {
    }
    AuthenticationModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_authentication_routing__WEBPACK_IMPORTED_MODULE_6__["AuthenticationRoutes"]),
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
                _login_login_service__WEBPACK_IMPORTED_MODULE_13__["LoginService"]
            ],
            declarations: [
                _error_error_component__WEBPACK_IMPORTED_MODULE_7__["ErrorComponent"],
                _forgot_forgot_component__WEBPACK_IMPORTED_MODULE_8__["ForgotComponent"],
                _lockscreen_lockscreen_component__WEBPACK_IMPORTED_MODULE_9__["LockscreenComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_10__["LoginComponent"],
                _register_register_component__WEBPACK_IMPORTED_MODULE_11__["RegisterComponent"],
                _reset_reset_component__WEBPACK_IMPORTED_MODULE_12__["ResetComponent"]
            ]
        })
    ], AuthenticationModule);
    return AuthenticationModule;
}());



/***/ }),

/***/ "./src/app/authentication/authentication.routing.ts":
/*!**********************************************************!*\
  !*** ./src/app/authentication/authentication.routing.ts ***!
  \**********************************************************/
/*! exports provided: AuthenticationRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationRoutes", function() { return AuthenticationRoutes; });
/* harmony import */ var _error_error_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error/error.component */ "./src/app/authentication/error/error.component.ts");
/* harmony import */ var _forgot_forgot_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forgot/forgot.component */ "./src/app/authentication/forgot/forgot.component.ts");
/* harmony import */ var _lockscreen_lockscreen_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lockscreen/lockscreen.component */ "./src/app/authentication/lockscreen/lockscreen.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/login.component */ "./src/app/authentication/login/login.component.ts");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./register/register.component */ "./src/app/authentication/register/register.component.ts");
/* harmony import */ var _reset_reset_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reset/reset.component */ "./src/app/authentication/reset/reset.component.ts");






var AuthenticationRoutes = [
    {
        path: '',
        children: [
            {
                path: '404',
                component: _error_error_component__WEBPACK_IMPORTED_MODULE_0__["ErrorComponent"]
            },
            {
                path: 'forgot',
                component: _forgot_forgot_component__WEBPACK_IMPORTED_MODULE_1__["ForgotComponent"]
            },
            {
                path: 'lockscreen',
                component: _lockscreen_lockscreen_component__WEBPACK_IMPORTED_MODULE_2__["LockscreenComponent"]
            },
            {
                path: 'login',
                component: _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"]
            },
            {
                path: 'register/:id',
                component: _register_register_component__WEBPACK_IMPORTED_MODULE_4__["RegisterComponent"]
            },
            {
                path: 'reset/:id',
                component: _reset_reset_component__WEBPACK_IMPORTED_MODULE_5__["ResetComponent"]
            }
        ]
    }
];


/***/ }),

/***/ "./src/app/authentication/error/error.component.html":
/*!***********************************************************!*\
  !*** ./src/app/authentication/error/error.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-register\">\n    <div class=\"login-register-box error-card text-center\">\n        <h1>404</h1>\n        <h3 class=\"text-uppercase\">Page Not Found !</h3>\n        <p class=\"text-muted m-t-30 m-b-30\">You seem to be trying to find this way to home</p>\n        <a mat-raised-button color=\"primary\" [routerLink]=\"['/']\" class=\"btn btn-info btn-rounded waves-effect waves-light m-b-40\">Back to home</a>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/authentication/error/error.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/authentication/error/error.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGhlbnRpY2F0aW9uL2Vycm9yL2Vycm9yLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/authentication/error/error.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/authentication/error/error.component.ts ***!
  \*********************************************************/
/*! exports provided: ErrorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorComponent", function() { return ErrorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ErrorComponent = /** @class */ (function () {
    function ErrorComponent() {
    }
    ErrorComponent.prototype.ngOnInit = function () { };
    ErrorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-error',
            template: __webpack_require__(/*! ./error.component.html */ "./src/app/authentication/error/error.component.html"),
            styles: [__webpack_require__(/*! ./error.component.scss */ "./src/app/authentication/error/error.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ErrorComponent);
    return ErrorComponent;
}());



/***/ }),

/***/ "./src/app/authentication/forgot/forgot.component.html":
/*!*************************************************************!*\
  !*** ./src/app/authentication/forgot/forgot.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sa_login_blur\" style=\"background:url('../../assets/images/background/login-register_60.jpg')!important; background-size:cover!important; filter:blur(20px)!important; position:absolute; width:100%; height: 100vh;\ndisplay: flex;\nbackground-size: cover;\nalign-items: center;\"></div>\n<img class=\"login_abso_logo\" src=\"../assets/images/logo-white.png\">   \n<div class=\"login-register\" style=\"background-image:url(assets/images/background/login-register.jpg);\">\n    <div class=\"login-register-box\">\n    <mat-card>\n      <mat-card-content>\n        <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\n          <div class=\"text-center\">\n            <img alt=\"homepage\" src=\"../assets/images/logo-icon.gif\">\n            <h4 class=\"m-t-0\">Recover Password</h4>\n          </div>\n          <p class=\"text-center font-14\">Enter your email and we'll send you the password reset link.</p>\n\n          <div fxLayout=\"column\" fxLayoutAlign=\"space-around\">\n            <div class=\"pb-1\">\n              <mat-form-field style=\"width: 100%\">\n                <input matInput placeholder=\"Email address\" type=\"email\" [formControl]=\"form.controls['email']\">\n              </mat-form-field>\n              <small *ngIf=\"form.controls['email'].hasError('required') && form.controls['email'].touched\" class=\"text-danger support-text\">You must include an email address.</small>\n              <small *ngIf=\"form.controls['email'].errors?.email && form.controls['email'].touched\" class=\"text-danger support-text\">You must include a valid email address.</small>\n              <small *ngIf=\"errorLogin ==true && errorLoginText != ''\" class=\"text-danger support-text\">{{errorLoginText}}</small>\n               <small *ngIf=\"successLogin ==true && successLoginText != ''\" class=\"text-success support-text\">{{successLoginText}}</small>\n            </div>\n            <button mat-raised-button color=\"primary\" type=\"submit\" class=\"btn-block btn-lg m-t-20\" [disabled]=\"!form.valid\">Submit</button>\n          </div>\n        </form>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/authentication/forgot/forgot.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/authentication/forgot/forgot.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGhlbnRpY2F0aW9uL2ZvcmdvdC9mb3Jnb3QuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/authentication/forgot/forgot.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/authentication/forgot/forgot.component.ts ***!
  \***********************************************************/
/*! exports provided: ForgotComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotComponent", function() { return ForgotComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng2_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng2-validation */ "./node_modules/ng2-validation/dist/index.js");
/* harmony import */ var ng2_validation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ng2_validation__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _login_login_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../login/login.service */ "./src/app/login/login.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ForgotComponent = /** @class */ (function () {
    function ForgotComponent(fb, router, loginService) {
        this.fb = fb;
        this.router = router;
        this.loginService = loginService;
        this.errorLogin = false;
        this.errorLoginText = '';
        this.successLogin = false;
        this.successLoginText = '';
    }
    ForgotComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            email: [
                null,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, ng2_validation__WEBPACK_IMPORTED_MODULE_3__["CustomValidators"].email])
            ]
        });
    };
    ForgotComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loginService.checkEmail(this.form.value.email).subscribe(function (res) {
            _this.errorLogin = false;
            _this.errorLoginText = '';
            _this.successLogin = false;
            _this.successLoginText = '';
            if (res.message == 'success') {
                _this.successLogin = true;
                _this.successLoginText = res.data;
            }
            else if (res.message == 'error') {
                _this.errorLogin = true;
                _this.errorLoginText = res.data;
            }
        }, function (error) {
        });
        //  this.router.navigate(['/login']);
    };
    ForgotComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-forgot',
            template: __webpack_require__(/*! ./forgot.component.html */ "./src/app/authentication/forgot/forgot.component.html"),
            styles: [__webpack_require__(/*! ./forgot.component.scss */ "./src/app/authentication/forgot/forgot.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _login_login_service__WEBPACK_IMPORTED_MODULE_4__["LoginService"]])
    ], ForgotComponent);
    return ForgotComponent;
}());



/***/ }),

/***/ "./src/app/authentication/lockscreen/lockscreen.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/authentication/lockscreen/lockscreen.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-register\" style=\"background-image:url(assets/images/background/login-register.jpg);\">\n  <div class=\"login-register-box\">\n    <mat-card>\n      <mat-card-content>\n        <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\n          <div class=\"text-center\">\n            <img src=\"assets/images/users/1.jpg\" class=\"img-circle\" width=\"80\" alt=\"user\" title=\"user\" />\n            <h4 class=\"m-t-0\">David Miller</h4>\n          </div>\n\n          <div fxLayout=\"row wrap\">\n            <!-- col full-->\n            <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n              <mat-form-field style=\"width: 100%\">\n                <input matInput placeholder=\"Username\" [formControl]=\"form.controls['uname']\">\n              </mat-form-field>\n              <small *ngIf=\"form.controls['uname'].hasError('required') && form.controls['uname'].touched\" class=\"text-danger support-text\">Username is required.</small>\n            </div>\n            <!-- col full-->\n            <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n              <button mat-raised-button class=\"btn-block btn-lg m-t-10 m-b-10\" color=\"primary\" type=\"submit\" [disabled]=\"!form.valid\">Unlock</button>\n            </div>\n          </div>\n        </form>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/authentication/lockscreen/lockscreen.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/authentication/lockscreen/lockscreen.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGhlbnRpY2F0aW9uL2xvY2tzY3JlZW4vbG9ja3NjcmVlbi5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/authentication/lockscreen/lockscreen.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/authentication/lockscreen/lockscreen.component.ts ***!
  \*******************************************************************/
/*! exports provided: LockscreenComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LockscreenComponent", function() { return LockscreenComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LockscreenComponent = /** @class */ (function () {
    function LockscreenComponent(fb, router) {
        this.fb = fb;
        this.router = router;
    }
    LockscreenComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            uname: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])]
        });
    };
    LockscreenComponent.prototype.onSubmit = function () {
        this.router.navigate(['/']);
    };
    LockscreenComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-lockscreen',
            template: __webpack_require__(/*! ./lockscreen.component.html */ "./src/app/authentication/lockscreen/lockscreen.component.html"),
            styles: [__webpack_require__(/*! ./lockscreen.component.scss */ "./src/app/authentication/lockscreen/lockscreen.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], LockscreenComponent);
    return LockscreenComponent;
}());



/***/ }),

/***/ "./src/app/authentication/login/login.component.html":
/*!***********************************************************!*\
  !*** ./src/app/authentication/login/login.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-register\" style=\"background-image:url(assets/images/background/login-register.jpg);\">\n    <div class=\"login-register-box\">\n        <mat-card>\n            <mat-card-content>\n                <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\n                    <div class=\"text-center\">\n                        <img alt=\"homepage\" src=\"assets/images/logo-icon.png\">\n                        <h4 class=\"m-t-0\">Login to App</h4>\n                    </div>\n\n                    <div fxLayout=\"row wrap\">\n                        <!-- col full-->\n                        <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                            <mat-form-field>\n                                <input matInput placeholder=\"Username\" [formControl]=\"form.controls['uname']\">\n                            </mat-form-field>\n                            <small *ngIf=\"form.controls['uname'].hasError('required') && form.controls['uname'].touched\" class=\"text-danger support-text\">Username is required.</small>\n                        </div>\n                        <!-- col full-->\n                        <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                            <mat-form-field>\n                                <input matInput type=\"password\" placeholder=\"Password\" [formControl]=\"form.controls['password']\">\n                            </mat-form-field>\n                            <small *ngIf=\"form.controls['password'].hasError('required') && form.controls['password'].touched\" class=\"text-danger support-text\">Password is required.</small>\n                        </div>\n                        <!-- col half-->\n                        <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"50\">\n                            <mat-checkbox color=\"warn\">Remember me</mat-checkbox>\n                        </div>\n                        <!-- col half-->\n                        <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"50\" class=\"text-right\">\n                            <a [routerLink]=\"['/authentication/forgot']\" class=\"link\">Forgot pwd?</a>\n                        </div>\n                        <!-- col full-->\n                        <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                            <button mat-raised-button color=\"primary\" class=\"btn-block btn-lg m-t-20 m-b-20\" type=\"submit\" [disabled]=\"!form.valid\">Login</button>\n                        </div>\n                        <!-- col full-->\n                        <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\" class=\"text-center\">\n                            <span>Don't have an account?\n                                <a [routerLink]=\"['/authentication/register']\" class=\"text-info link\">Register</a>\n                            </span>\n                        </div>\n                    </div>\n                </form>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/authentication/login/login.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/authentication/login/login.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGhlbnRpY2F0aW9uL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/authentication/login/login.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/authentication/login/login.component.ts ***!
  \*********************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
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
    function LoginComponent(fb, router) {
        this.fb = fb;
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            uname: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])],
            password: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])]
        });
    };
    LoginComponent.prototype.onSubmit = function () {
        this.router.navigate(['/dashboard/dashboard1']);
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/authentication/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/authentication/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/authentication/register/register.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/authentication/register/register.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-register\" style=\"background-image:url(assets/images/background/login-register.jpg);\">\n  <div class=\"login-register-box\">\n    <mat-card>\n      <mat-card-content>\n        <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\n          <div class=\"text-center\">\n            <img alt=\"homepage\" src=\"assets/images/logo-icon.png\">\n            <h4 class=\"m-t-0\">Register to App</h4>\n          </div>\n          <div fxLayout=\"row wrap\">\n            <!-- col full-->\n            <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n              <mat-form-field style=\"width: 100%\">\n                <input matInput placeholder=\"Email address\" type=\"email\" [formControl]=\"form.controls['email']\">\n              </mat-form-field>\n              <small *ngIf=\"form.controls['email'].hasError('required') && form.controls['email'].touched\" class=\"text-danger support-text\">You must include an email address.</small>\n              <small *ngIf=\"form.controls['email'].errors?.email && form.controls['email'].touched\" class=\"text-danger support-text\">You must include a valid email address.</small>\n            </div>\n            <!-- col full-->\n            <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n              <mat-form-field style=\"width: 100%\">\n                <input matInput type=\"password\" placeholder=\"Password\" [formControl]=\"form.controls['password']\">\n              </mat-form-field>\n              <small *ngIf=\"form.controls['password'].hasError('required') && form.controls['password'].touched\" class=\"text-danger support-text\">You must include password.</small>\n            </div>\n            <!-- col full-->\n            <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n              <mat-form-field style=\"width: 100%\">\n                <input matInput placeholder=\"Confirm Password\" [formControl]=\"form.controls['confirmPassword']\" type=\"password\">\n              </mat-form-field>\n              <small *ngIf=\"form.controls['confirmPassword'].hasError('required') && form.controls['confirmPassword'].touched\" class=\"text-danger support-text\">You must include confirm password.</small>\n              <small *ngIf=\"form.controls['confirmPassword'].errors?.equalTo\" class=\"text-danger support-text\">Passwords do not math.</small>\n               <small *ngIf=\"errorLogin ==true && errorLoginText != ''\" class=\"text-danger support-text\">{{errorLoginText}}</small>\n               <small *ngIf=\"successLogin ==true && successLoginText != ''\" class=\"text-success support-text\">{{successLoginText}}</small>\n            </div>\n            <!-- col full-->\n            <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n              <mat-checkbox class=\"font-14\">I agree to the all\n                <a href=\"javascript:void(0)\" class=\"link text-info\">terms</a>.</mat-checkbox>\n            </div>\n            <button mat-raised-button color=\"primary\" class=\"btn-block btn-lg m-t-20 m-b-20\" type=\"submit\" [disabled]=\"!form.valid\">Create your account</button>\n\n            <div class=\"text-center\" fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n              <span>Already have an account?\n                <a [routerLink]=\"['/login']\" class=\"link text-info\"> Login</a>\n              </span>\n            </div>\n          </div>\n        </form>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/authentication/register/register.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/authentication/register/register.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGhlbnRpY2F0aW9uL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/authentication/register/register.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/authentication/register/register.component.ts ***!
  \***************************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng2_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng2-validation */ "./node_modules/ng2-validation/dist/index.js");
/* harmony import */ var ng2_validation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ng2_validation__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _login_login_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../login/login.service */ "./src/app/login/login.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var password = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required);
var confirmPassword = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', ng2_validation__WEBPACK_IMPORTED_MODULE_3__["CustomValidators"].equalTo(password));
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(fb, router, loginService, route) {
        this.fb = fb;
        this.router = router;
        this.loginService = loginService;
        this.route = route;
        this.errorLogin = false;
        this.errorLoginText = '';
        this.successLogin = false;
        this.successLoginText = '';
        this.id = {};
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.plan_id = _this.route.snapshot.paramMap.get("id");
        });
        this.form = this.fb.group({
            email: [
                null,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, ng2_validation__WEBPACK_IMPORTED_MODULE_3__["CustomValidators"].email])
            ],
            password: password,
            confirmPassword: confirmPassword
        });
    };
    RegisterComponent.prototype.onSubmit = function () {
        // this.loginService.checkEmailExists(this.form.value.email).subscribe((res) => {
        //       this.errorLogin = false;
        //       this.errorLoginText = '';
        //       this.successLogin = false;
        //       this.successLoginText = '';
        //        if(res.message == 'success'){
        //                this.loginService.addUser(this.form.value.email,this.form.value.password,'2',this.plan_id).subscribe((res) => {
        //                 this.errorLogin = false;
        //                 this.errorLoginText = '';
        //                 this.successLogin = false;
        //                 this.successLoginText = '';
        //                  if(res.message == 'success'){
        //                       this.successLogin  =true;
        //                       alert('Please confirm your mail and complete the payment!');
        //                   }
        //                  else if(res.message == 'error'){
        //                     this.errorLogin  =true;
        //                     this.errorLoginText  =res.data;
        //                  }
        //               }, error => {
        //           });
        //         }
        //        else if(res.message == 'error'){
        //           this.errorLogin  =true;
        //           this.errorLoginText  ='Email already Exists!';
        //        }
        //     }, error => {
        // });
    };
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/authentication/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.scss */ "./src/app/authentication/register/register.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _login_login_service__WEBPACK_IMPORTED_MODULE_4__["LoginService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/authentication/reset/reset.component.html":
/*!***********************************************************!*\
  !*** ./src/app/authentication/reset/reset.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sa_login_blur\" style=\"background:url('../../assets/images/background/login-register_60.jpg')!important; background-size:cover!important; filter:blur(20px)!important; position:absolute; width:100%; height: 100vh;\ndisplay: flex;\nbackground-size: cover;\nalign-items: center;\"></div>\n<img class=\"login_abso_logo\" src=\"../assets/images/logo-white.png\">   \n<div class=\"login-register\" style=\"background-image:url(assets/images/background/login-register.jpg);\">\n    <div class=\"login-register-box\">\n    <mat-card>\n      <mat-card-content>\n        <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\n          <div class=\"text-center\">\n            <img alt=\"homepage\" src=\"../assets/images/logo-icon.gif\">\n            <h4 class=\"m-t-0\">Reset Password</h4>\n          </div>\n          <p class=\"text-center font-14\">Enter new Password.</p>\n          <div fxLayout=\"column\" fxLayoutAlign=\"space-around\">\n            <div class=\"pb-1\">\n              <mat-form-field style=\"width: 100%\">\n                <input matInput placeholder=\"Password\" type=\"password\" [formControl]=\"form.controls['password']\">\n              </mat-form-field>\n                <mat-form-field style=\"width: 100%\">\n                <input matInput placeholder=\"Confirm Password\" type=\"password\" [formControl]=\"form.controls['cpassword']\">\n              </mat-form-field>\n              <small *ngIf=\"form.controls['password'].value !=  form.controls['cpassword'].value\" class=\"text-danger support-text\">Password and Confirm Password does not match.</small>\n              <small *ngIf=\"errorLogin ==true && errorLoginText != ''\" class=\"text-danger support-text\">{{errorLoginText}}</small>\n               <small *ngIf=\"successLogin ==true && successLoginText != ''\" class=\"text-success support-text\">{{successLoginText}}</small>\n            </div>\n            <button mat-raised-button color=\"primary\" type=\"submit\" class=\"btn-block btn-lg m-t-20\" [disabled]=\"!form.valid\">Submit</button>\n          </div>\n        </form>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/authentication/reset/reset.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/authentication/reset/reset.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGhlbnRpY2F0aW9uL3Jlc2V0L3Jlc2V0LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/authentication/reset/reset.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/authentication/reset/reset.component.ts ***!
  \*********************************************************/
/*! exports provided: ResetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetComponent", function() { return ResetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _login_login_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../login/login.service */ "./src/app/login/login.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ResetComponent = /** @class */ (function () {
    function ResetComponent(fb, router, loginService, route) {
        this.fb = fb;
        this.router = router;
        this.loginService = loginService;
        this.route = route;
        this.errorLogin = false;
        this.errorLoginText = '';
        this.successLogin = false;
        this.successLoginText = '';
        this.id = {};
    }
    ResetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.fb.group({
            password: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])],
            cpassword: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])]
        });
        this.route.params.subscribe(function (params) {
            _this.id = _this.route.snapshot.paramMap.get("id");
        });
    };
    ResetComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loginService.resetPassword(this.form.value.password, this.id).subscribe(function (res) {
            _this.errorLogin = false;
            _this.errorLoginText = '';
            _this.successLogin = false;
            _this.successLoginText = '';
            if (res.message == 'success') {
                _this.successLogin = true;
                _this.successLoginText = res.data;
            }
            else if (res.message == 'error') {
                _this.errorLogin = true;
                _this.errorLoginText = res.data;
            }
        }, function (error) {
        });
        //  this.router.navigate(['/login']);
    };
    ResetComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-reset',
            template: __webpack_require__(/*! ./reset.component.html */ "./src/app/authentication/reset/reset.component.html"),
            styles: [__webpack_require__(/*! ./reset.component.scss */ "./src/app/authentication/reset/reset.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _login_login_service__WEBPACK_IMPORTED_MODULE_3__["LoginService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], ResetComponent);
    return ResetComponent;
}());



/***/ })

}]);
//# sourceMappingURL=authentication-authentication-module.js.map