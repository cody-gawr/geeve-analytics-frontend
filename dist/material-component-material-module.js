(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["material-component-material-module"],{

/***/ "./src/app/material-component/badge/badge.component.html":
/*!***************************************************************!*\
  !*** ./src/app/material-component/badge/badge.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-content>\n    <mat-card-title>Badges</mat-card-title>\n    <p>\n      <span matBadge=\"4\" matBadgeOverlap=\"false\">Text with a badge</span>\n    </p>\n\n    <p>\n      Button with a badge on the left\n      <button mat-raised-button color=\"primary\" matBadge=\"8\" matBadgePosition=\"before\" matBadgeColor=\"accent\">\n        Action\n      </button>\n    </p>\n\n    <p>\n      Icon with a badge\n      <mat-icon matBadge=\"15\" matBadgeColor=\"warn\">home</mat-icon>\n    </p>\n\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/material-component/badge/badge.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/material-component/badge/badge.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-button-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-around; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9tYXRlcmlhbC1jb21wb25lbnQvYmFkZ2UvYmFkZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFhO0VBQ2Isb0JBQW1CO0VBQ25CLDhCQUE2QixFQUM5QiIsImZpbGUiOiJzcmMvYXBwL21hdGVyaWFsLWNvbXBvbmVudC9iYWRnZS9iYWRnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5leGFtcGxlLWJ1dHRvbi1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/material-component/badge/badge.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/material-component/badge/badge.component.ts ***!
  \*************************************************************/
/*! exports provided: BadgeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BadgeComponent", function() { return BadgeComponent; });
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

var BadgeComponent = /** @class */ (function () {
    function BadgeComponent() {
    }
    BadgeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-badge',
            template: __webpack_require__(/*! ./badge.component.html */ "./src/app/material-component/badge/badge.component.html"),
            styles: [__webpack_require__(/*! ./badge.component.scss */ "./src/app/material-component/badge/badge.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], BadgeComponent);
    return BadgeComponent;
}());



/***/ }),

/***/ "./src/app/material-component/buttons/buttons.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/material-component/buttons/buttons.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-content>\n    <mat-card-title>Buttons</mat-card-title>\n    <mat-card-subtitle>Angular Material buttons are native\n      <code> button or a </code> elements enhanced with Material Design styling and ink ripples.\n      <code><a href=\"https://material.angular.io/components/button/overview\" target=\"_blank\">Official Doc</a></code>\n    </mat-card-subtitle>\n\n    <h4>Basic Buttons</h4>\n    <h4>\n      <code class=\"bg-light\">&lt;button mat-button color=\"primary\"&gt;Primary&lt;/button&gt;</code>\n    </h4>\n    <div class=\"button-row\">\n      <button mat-button>Basic</button>\n      <button mat-button color=\"primary\">Primary</button>\n      <button mat-button color=\"accent\">Accent</button>\n      <button mat-button color=\"warn\">Warn</button>\n      <button mat-button disabled>Disabled</button>\n      <a mat-button routerLink=\".\">Link</a>\n    </div>\n\n    <h4>Raised Buttons</h4>\n    <h4>\n      <code class=\"bg-light\">&lt;button mat-raised-button color=\"primary\"&gt;Primary&lt;/button&gt;</code>\n    </h4>\n    <div class=\"button-row\">\n      <button mat-raised-button>Basic</button>\n      <button mat-raised-button color=\"primary\">Primary</button>\n      <button mat-raised-button color=\"accent\">Accent</button>\n      <button mat-raised-button color=\"warn\">Warn</button>\n      <button mat-raised-button disabled>Disabled</button>\n      <a mat-raised-button routerLink=\".\">Link</a>\n    </div>\n\n    <h4>Icon Buttons</h4>\n    <h4>\n      <code class=\"bg-light\">&lt;button mat-icon-button color=\"primary\"&gt; <br/>&nbsp;&nbsp;&nbsp;&nbsp;&lt;mat-icon aria-label=\"Example icon-button with a heart icon\"&gt;favorite&lt;/mat-icon&gt;<br/>&lt;/button&gt;</code>\n    </h4>\n    <div class=\"button-row\">\n      <button mat-icon-button>\n        <mat-icon aria-label=\"Example icon-button with a heart icon\">favorite</mat-icon>\n      </button>\n      <button mat-icon-button color=\"primary\">\n        <mat-icon aria-label=\"Example icon-button with a heart icon\">favorite</mat-icon>\n      </button>\n      <button mat-icon-button color=\"accent\">\n        <mat-icon aria-label=\"Example icon-button with a heart icon\">favorite</mat-icon>\n      </button>\n      <button mat-icon-button color=\"warn\">\n        <mat-icon aria-label=\"Example icon-button with a heart icon\">favorite</mat-icon>\n      </button>\n      <button mat-icon-button disabled>\n        <mat-icon aria-label=\"Example icon-button with a heart icon\">favorite</mat-icon>\n      </button>\n    </div>\n\n    <h4>Fab Buttons</h4>\n    <h4>\n      <code class=\"bg-light\">&lt;button mat-fab color=\"primary\"&gt;Primary&lt;/button&gt;</code>\n    </h4>\n    <div class=\"button-row\">\n      <button mat-fab>Basic</button>\n      <button mat-fab color=\"primary\">Primary</button>\n      <button mat-fab color=\"accent\">Accent</button>\n      <button mat-fab color=\"warn\">Warn</button>\n      <button mat-fab disabled>Disabled</button>\n      <button mat-fab>\n        <mat-icon aria-label=\"Example icon-button with a heart icon\">favorite</mat-icon>\n      </button>\n      <a mat-fab routerLink=\".\">Link</a>\n    </div>\n\n    <h4>Mini Fab Buttons</h4>\n    <h4>\n      <code class=\"bg-light\">&lt;button mat-mini-fab color=\"primary\"&gt;Primary&lt;/button&gt;</code>\n    </h4>\n    <div class=\"button-row\">\n      <button mat-mini-fab>Base</button>\n      <button mat-mini-fab color=\"primary\">Pri</button>\n      <button mat-mini-fab color=\"accent\">Acc</button>\n      <button mat-mini-fab color=\"warn\">Warn</button>\n      <button mat-mini-fab disabled>Dis</button>\n      <button mat-mini-fab>\n        <mat-icon aria-label=\"Example icon-button with a heart icon\">favorite</mat-icon>\n      </button>\n      <a mat-mini-fab routerLink=\".\">Link</a>\n    </div>\n    <h4>Button toggle </h4>\n    <mat-button-toggle-group #group=\"matButtonToggleGroup\">\n      <mat-button-toggle value=\"left\">\n        <mat-icon>format_align_left</mat-icon>\n      </mat-button-toggle>\n      <mat-button-toggle value=\"center\">\n        <mat-icon>format_align_center</mat-icon>\n      </mat-button-toggle>\n      <mat-button-toggle value=\"right\">\n        <mat-icon>format_align_right</mat-icon>\n      </mat-button-toggle>\n      <mat-button-toggle value=\"justify\" disabled>\n        <mat-icon>format_align_justify</mat-icon>\n      </mat-button-toggle>\n    </mat-button-toggle-group>\n    <div class=\"m-t-20\">Selected value: {{group.value}}</div>\n\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/material-component/buttons/buttons.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/material-component/buttons/buttons.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-button-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-around; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9tYXRlcmlhbC1jb21wb25lbnQvYnV0dG9ucy9idXR0b25zLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBYTtFQUNiLG9CQUFtQjtFQUNuQiw4QkFBNkIsRUFDOUIiLCJmaWxlIjoic3JjL2FwcC9tYXRlcmlhbC1jb21wb25lbnQvYnV0dG9ucy9idXR0b25zLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmV4YW1wbGUtYnV0dG9uLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/material-component/buttons/buttons.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/material-component/buttons/buttons.component.ts ***!
  \*****************************************************************/
/*! exports provided: ButtonsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonsComponent", function() { return ButtonsComponent; });
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

var ButtonsComponent = /** @class */ (function () {
    function ButtonsComponent() {
    }
    ButtonsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-buttons',
            template: __webpack_require__(/*! ./buttons.component.html */ "./src/app/material-component/buttons/buttons.component.html"),
            styles: [__webpack_require__(/*! ./buttons.component.scss */ "./src/app/material-component/buttons/buttons.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ButtonsComponent);
    return ButtonsComponent;
}());



/***/ }),

/***/ "./src/app/material-component/cards/cards.component.html":
/*!***************************************************************!*\
  !*** ./src/app/material-component/cards/cards.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Basic Card -->\n<!-- ============================================================== -->\n<mat-card>\n    <mat-card-content>Simple card just use\n        <code>&lt;mat-card&gt; &lt;mat-card-content&gt; ... &lt;/mat-card-content&gt; &lt;/mat-card&gt;</code>\n        <code><a href=\"https://material.angular.io/components/card/overview\" target=\"_blank\">Official Doc</a></code>\n    </mat-card-content>\n</mat-card>\n<!-- ============================================================== -->\n<!-- Image Card row-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <!-- Card column -->\n    <div fxFlex.gt-sm=\"33.33%\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-header>\n                <div mat-card-avatar>\n                    <img src=\"assets/images/users/1.jpg\" class=\"img-fluid img-circle\" />\n                </div>\n                <mat-card-title>Shiba Inu</mat-card-title>\n                <mat-card-subtitle>Dog Breed</mat-card-subtitle>\n            </mat-card-header>\n            <img mat-card-image src=\"assets/images/big/img4.jpg\" alt=\"Photo of a Shiba Inu\">\n            <mat-card-content>\n                <p>\n                    The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes\n                    very well with mountainous terrain, the Shiba Inu was originally bred for hunting.\n                </p>\n                <mat-card-actions>\n                    <button mat-raised-button color=\"accent\">LIKE</button>\n                    <button mat-button>SHARE</button>\n                </mat-card-actions>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <!-- Card column -->\n    <div fxFlex.gt-sm=\"33.33%\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-header>\n                <div mat-card-avatar>\n                    <img src=\"assets/images/users/2.jpg\" class=\"img-fluid img-circle\" />\n                </div>\n                <mat-card-title>Shiba Inu</mat-card-title>\n                <mat-card-subtitle>Dog Breed</mat-card-subtitle>\n            </mat-card-header>\n            <img mat-card-image src=\"assets/images/big/img3.jpg\" alt=\"Photo of a Shiba Inu\">\n            <mat-card-content>\n                <p>\n                    The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes\n                    very well with mountainous terrain, the Shiba Inu was originally bred for hunting.\n                </p>\n\n                <mat-card-actions>\n                    <button mat-raised-button color=\"accent\">LIKE</button>\n                    <button mat-button>SHARE</button>\n                </mat-card-actions>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <!-- Card column -->\n    <div fxFlex.gt-sm=\"33.33%\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-header>\n                <div mat-card-avatar>\n                    <img src=\"assets/images/users/3.jpg\" class=\"img-fluid img-circle\" />\n                </div>\n                <mat-card-title>Shiba Inu</mat-card-title>\n                <mat-card-subtitle>Dog Breed</mat-card-subtitle>\n            </mat-card-header>\n            <img mat-card-image src=\"assets/images/big/img5.jpg\" alt=\"Photo of a Shiba Inu\">\n            <mat-card-content>\n                <p>\n                    The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes\n                    very well with mountainous terrain, the Shiba Inu was originally bred for hunting.\n                </p>\n\n                <mat-card-actions>\n                    <button mat-raised-button color=\"accent\">LIKE</button>\n                    <button mat-button>SHARE</button>\n                </mat-card-actions>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n<!-- ============================================================== -->\n<!-- Title subtitle Card row-->\n<!-- ============================================================== -->\n<div fxLayout=\"row\">\n    <div fxFlex.gt-sm=\"100%\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Card with title and footer\n                    <code>&lt;mat-card-title&gt;</code>\n                </mat-card-title>\n                <mat-card-subtitle>This is the subtitle\n                    <code>&lt;mat-card-subtitle&gt;</code>\n                </mat-card-subtitle>\n\n                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore\n                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat\n                    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit\n                    anim id est laborum.</p>\n\n                <mat-card-actions>\n                    <button mat-icon-button color=\"accent\">\n                        <mat-icon>favorite</mat-icon>\n                    </button>\n                    <button mat-icon-button>\n                        <mat-icon>share</mat-icon>\n                    </button>\n                </mat-card-actions>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n<!-- ============================================================== -->\n<!-- Half width Card row-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"50%\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>\n                    <h4 class=\"m-0\">Half width Card</h4>\n                </mat-card-title>\n                <mat-card-subtitle>This is the subtitle</mat-card-subtitle>\n                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore\n                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n                    commodo consequat. </p>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <div fxFlex.gt-sm=\"50%\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>\n                    <h4 class=\"m-0\">Half width Card</h4>\n                </mat-card-title>\n                <mat-card-subtitle>This is the subtitle</mat-card-subtitle>\n\n                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore\n                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n                    commodo consequat.</p>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n<!-- ============================================================== -->\n<!-- Colored Card row-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"33.33%\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-header class=\"bg-primary text-white\">\n                <mat-card-title>Card bg-primary</mat-card-title>\n                <mat-card-subtitle>This is the subtitle</mat-card-subtitle>\n            </mat-card-header>\n            <mat-card-content>\n                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore\n                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n                    commodo consequat. </p>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <div fxFlex.gt-sm=\"33.33%\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-header class=\"bg-info text-white\">\n                <mat-card-title>Card bg-info</mat-card-title>\n                <mat-card-subtitle>This is the subtitle</mat-card-subtitle>\n            </mat-card-header>\n            <mat-card-content>\n                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore\n                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n                    commodo consequat. </p>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <div fxFlex.gt-sm=\"33.33%\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-header class=\"bg-danger text-white\">\n                <mat-card-title>Card bg-danger</mat-card-title>\n                <mat-card-subtitle>This is the subtitle</mat-card-subtitle>\n            </mat-card-header>\n            <mat-card-content>\n                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore\n                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n                    commodo consequat. </p>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"33.33%\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-header class=\"bg-warning text-white\">\n                <mat-card-title>Card bg-warning</mat-card-title>\n                <mat-card-subtitle>This is the subtitle</mat-card-subtitle>\n            </mat-card-header>\n            <mat-card-content>\n                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore\n                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n                    commodo consequat. </p>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <div fxFlex.gt-sm=\"33.33%\">\n        <mat-card>\n            <mat-card-header class=\"bg-inverse text-white\">\n                <mat-card-title>Card bg-inverse</mat-card-title>\n                <mat-card-subtitle>This is the subtitle</mat-card-subtitle>\n            </mat-card-header>\n            <mat-card-content>\n                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore\n                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n                    commodo consequat. </p>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <div fxFlex.gt-sm=\"33.33%\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-header class=\"bg-success text-white\">\n                <mat-card-title>Card bg-success</mat-card-title>\n                <mat-card-subtitle>This is the subtitle</mat-card-subtitle>\n            </mat-card-header>\n            <mat-card-content>\n                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore\n                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n                    commodo consequat. </p>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/material-component/cards/cards.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/material-component/cards/cards.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21hdGVyaWFsLWNvbXBvbmVudC9jYXJkcy9jYXJkcy5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/material-component/cards/cards.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/material-component/cards/cards.component.ts ***!
  \*************************************************************/
/*! exports provided: CardsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardsComponent", function() { return CardsComponent; });
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

var CardsComponent = /** @class */ (function () {
    function CardsComponent() {
    }
    CardsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-cards',
            template: __webpack_require__(/*! ./cards.component.html */ "./src/app/material-component/cards/cards.component.html"),
            styles: [__webpack_require__(/*! ./cards.component.scss */ "./src/app/material-component/cards/cards.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CardsComponent);
    return CardsComponent;
}());



/***/ }),

/***/ "./src/app/material-component/chips/chips.component.html":
/*!***************************************************************!*\
  !*** ./src/app/material-component/chips/chips.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-content>\n    <mat-card-title>Basic Chips</mat-card-title>\n    <mat-card-subtitle>\n      <code>&lt;mat-chip&gt;</code>displays a list of values as individual, keyboard accessible, chips.\n      <code class=\"\"><a href=\"https://material.angular.io/components/chips/overview\">Official Component</a></code>\n    </mat-card-subtitle>\n    <mat-chip-list>\n      <mat-chip>One fish</mat-chip>\n      <mat-chip>Two fish</mat-chip>\n      <mat-chip color=\"primary\" selected=\"true\">Primary fish</mat-chip>\n      <mat-chip color=\"accent\" selected=\"true\">Accent fish</mat-chip>\n    </mat-chip-list>\n\n  </mat-card-content>\n</mat-card>\n\n<mat-card>\n  <mat-card-content>\n    <mat-card-title>Chip input</mat-card-title>\n    <mat-card-subtitle>The MatChipInput directive can be used together with a chip-list to streamline the interaction between the two components.\n      This directive adds chip-specific behaviors to the input element within for adding and removing chips. </mat-card-subtitle>\n\n    <mat-form-field class=\"demo-chip-list\">\n      <mat-chip-list #chipList>\n        <mat-chip *ngFor=\"let fruit of fruits\" [selectable]=\"selectable\" [removable]=\"removable\" (remove)=\"remove(fruit)\">\n          {{fruit.name}}\n          <mat-icon matChipRemove *ngIf=\"removable\">cancel</mat-icon>\n        </mat-chip>\n        <input placeholder=\"New fruit...\" [matChipInputFor]=\"chipList\" [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\" [matChipInputAddOnBlur]=\"addOnBlur\"\n          (matChipInputTokenEnd)=\"add($event)\" />\n      </mat-chip-list>\n    </mat-form-field>\n  </mat-card-content>\n</mat-card>\n\n<mat-card>\n  <mat-card-content>\n    <mat-card-title>Stacked Chips</mat-card-title>\n    <mat-card-subtitle>You can also stack the chips if you want them on top of each other and/or use the\n      <code>(focus)</code> event to run custom code.</mat-card-subtitle>\n\n    <mat-chip-list class=\"mat-chip-list-stacked\">\n      <mat-chip *ngFor=\"let aColor of availableColors\" (focus)=\"color = aColor.color\" color=\"{{aColor.color}}\" selected=\"true\">\n        {{aColor.name}}\n      </mat-chip>\n    </mat-chip-list>\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/material-component/chips/chips.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/material-component/chips/chips.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".demo-chip-list {\n  width: 100%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9tYXRlcmlhbC1jb21wb25lbnQvY2hpcHMvY2hpcHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFXLEVBQ1oiLCJmaWxlIjoic3JjL2FwcC9tYXRlcmlhbC1jb21wb25lbnQvY2hpcHMvY2hpcHMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZGVtby1jaGlwLWxpc3Qge1xuICB3aWR0aDogMTAwJTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/material-component/chips/chips.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/material-component/chips/chips.component.ts ***!
  \*************************************************************/
/*! exports provided: ChipsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChipsComponent", function() { return ChipsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/keycodes */ "./node_modules/@angular/cdk/esm5/keycodes.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ChipsComponent = /** @class */ (function () {
    function ChipsComponent() {
        this.visible = true;
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = true;
        // Enter, comma
        this.separatorKeysCodes = [_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_1__["ENTER"], _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_1__["COMMA"]];
        this.fruits = [{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }];
        this.availableColors = [
            { name: 'none', color: 'gray' },
            { name: 'Primary', color: 'primary' },
            { name: 'Accent', color: 'accent' },
            { name: 'Warn', color: 'warn' }
        ];
    }
    ChipsComponent.prototype.add = function (event) {
        var input = event.input;
        var value = event.value;
        // Add our fruit
        if ((value || '').trim()) {
            this.fruits.push({ name: value.trim() });
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
    };
    ChipsComponent.prototype.remove = function (fruit) {
        var index = this.fruits.indexOf(fruit);
        if (index >= 0) {
            this.fruits.splice(index, 1);
        }
    };
    ChipsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-chips',
            template: __webpack_require__(/*! ./chips.component.html */ "./src/app/material-component/chips/chips.component.html"),
            styles: [__webpack_require__(/*! ./chips.component.scss */ "./src/app/material-component/chips/chips.component.scss")]
        })
    ], ChipsComponent);
    return ChipsComponent;
}());



/***/ }),

/***/ "./src/app/material-component/dialog/dialog.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/material-component/dialog/dialog.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"100%\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Dialog Overview</mat-card-title>\n        <mat-card-subtitle>The\n          <code>&lt;MatDialog&gt;</code> service can be used to open modal dialogs with Material Design styling and animations.</mat-card-subtitle>\n        <ol>\n          <li>\n            <mat-form-field>\n              <input matInput [(ngModel)]=\"name\" placeholder=\"What's your name?\">\n            </mat-form-field>\n          </li>\n          <li>\n            <button mat-raised-button (click)=\"openDialog()\">Pick one</button>\n          </li>\n          <li *ngIf=\"animal\">\n            You chose:\n            <i>{{animal}}</i>\n          </li>\n        </ol>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n<!-- ============================================================== -->\n<!-- Basic Card Grid-->\n<!-- ============================================================== -->"

/***/ }),

/***/ "./src/app/material-component/dialog/dialog.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/material-component/dialog/dialog.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21hdGVyaWFsLWNvbXBvbmVudC9kaWFsb2cvZGlhbG9nLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/material-component/dialog/dialog.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/material-component/dialog/dialog.component.ts ***!
  \***************************************************************/
/*! exports provided: DialogOverviewExampleDialogComponent, DialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogOverviewExampleDialogComponent", function() { return DialogOverviewExampleDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogComponent", function() { return DialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
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


var DialogOverviewExampleDialogComponent = /** @class */ (function () {
    function DialogOverviewExampleDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    DialogOverviewExampleDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dialog-overview-example-dialog',
            template: "<h1 mat-dialog-title>Hi {{data.name}}</h1>\n<div mat-dialog-content>\n  <p>What's your favorite animal?</p>\n  <mat-form-field>\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.animal\">\n  </mat-form-field>\n</div>\n<div mat-dialog-actions>\n  <button mat-button [mat-dialog-close]=\"data.animal\" tabindex=\"2\">Ok</button>\n  <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\">No Thanks</button>\n</div>"
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], DialogOverviewExampleDialogComponent);
    return DialogOverviewExampleDialogComponent;
}());

var DialogComponent = /** @class */ (function () {
    function DialogComponent(dialog) {
        this.dialog = dialog;
    }
    DialogComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
            width: '250px',
            data: { name: this.name, animal: this.animal }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            _this.animal = result;
        });
    };
    DialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dialog',
            template: __webpack_require__(/*! ./dialog.component.html */ "./src/app/material-component/dialog/dialog.component.html"),
            styles: [__webpack_require__(/*! ./dialog.component.scss */ "./src/app/material-component/dialog/dialog.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], DialogComponent);
    return DialogComponent;
}());



/***/ }),

/***/ "./src/app/material-component/expansion/expansion.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/material-component/expansion/expansion.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Basic-->\n<!-- ============================================================== -->\n<mat-card>\n    <mat-card-content>\n        <mat-card-title>Basic Expansion</mat-card-title>\n        <mat-card-subtitle>Expansion panel\n            <code class=\"\"><a href=\"https://material.angular.io/components/expansion/overview\">Official Component</a></code>\n        </mat-card-subtitle>\n        <mat-accordion>\n            <mat-expansion-panel>\n                <mat-expansion-panel-header>\n                    <mat-panel-title> Personal data </mat-panel-title>\n                    <mat-panel-description> Type your name and age </mat-panel-description>\n                </mat-expansion-panel-header>\n                <mat-form-field>\n                    <input matInput placeholder=\"First name\"> </mat-form-field>\n                <mat-form-field>\n                    <input matInput placeholder=\"Age\"> </mat-form-field>\n            </mat-expansion-panel>\n            <mat-expansion-panel (opened)=\"panelOpenState = true\" (closed)=\"panelOpenState = false\">\n                <mat-expansion-panel-header>\n                    <mat-panel-title> Self aware panel </mat-panel-title>\n                    <mat-panel-description> Currently I am {{panelOpenState ? 'open' : 'closed'}} </mat-panel-description>\n                </mat-expansion-panel-header>\n                <p>I'm visible because I am open</p>\n            </mat-expansion-panel>\n        </mat-accordion>\n    </mat-card-content>\n</mat-card>\n<!-- ============================================================== -->\n<!-- As an Accordion -->\n<!-- ============================================================== -->\n<mat-card>\n    <mat-card-content>\n        <mat-card-title>Accordion</mat-card-title>\n        <mat-card-subtitle>Expansion panel</mat-card-subtitle>\n\n        <mat-accordion class=\"example-headers-align\">\n            <mat-expansion-panel [expanded]=\"step === 0\" (opened)=\"setStep(0)\" hideToggle=\"true\">\n                <mat-expansion-panel-header>\n                    <mat-panel-title> Personal data </mat-panel-title>\n                    <mat-panel-description> Type your name and age\n                        <mat-icon>account_circle</mat-icon>\n                    </mat-panel-description>\n                </mat-expansion-panel-header>\n                <mat-form-field>\n                    <input matInput placeholder=\"First name\"> </mat-form-field>\n                <mat-form-field>\n                    <input matInput type=\"number\" min=\"1\" placeholder=\"Age\"> </mat-form-field>\n                <mat-action-row>\n                    <button mat-button color=\"primary\" (click)=\"nextStep()\">Next</button>\n                </mat-action-row>\n            </mat-expansion-panel>\n            <mat-expansion-panel [expanded]=\"step === 1\" (opened)=\"setStep(1)\" hideToggle=\"true\">\n                <mat-expansion-panel-header>\n                    <mat-panel-title> Destination </mat-panel-title>\n                    <mat-panel-description> Type the country name\n                        <mat-icon>map</mat-icon>\n                    </mat-panel-description>\n                </mat-expansion-panel-header>\n                <mat-form-field>\n                    <input matInput placeholder=\"Country\"> </mat-form-field>\n                <mat-action-row>\n                    <button mat-button color=\"warn\" (click)=\"prevStep()\">Previous</button>\n                    <button mat-button color=\"primary\" (click)=\"nextStep()\">Next</button>\n                </mat-action-row>\n            </mat-expansion-panel>\n            <mat-expansion-panel [expanded]=\"step === 2\" (opened)=\"setStep(2)\" hideToggle=\"true\">\n                <mat-expansion-panel-header>\n                    <mat-panel-title> Day of the trip </mat-panel-title>\n                    <mat-panel-description> Inform the date you wish to travel\n                        <mat-icon>date_range</mat-icon>\n                    </mat-panel-description>\n                </mat-expansion-panel-header>\n                <mat-form-field>\n                    <input matInput placeholder=\"Date\" [matDatepicker]=\"picker\" (focus)=\"picker.open()\" readonly> </mat-form-field>\n                <mat-datepicker #picker></mat-datepicker>\n                <mat-action-row>\n                    <button mat-button color=\"warn\" (click)=\"prevStep()\">Previous</button>\n                    <button mat-button color=\"primary\" (click)=\"nextStep()\">End</button>\n                </mat-action-row>\n            </mat-expansion-panel>\n        </mat-accordion>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/material-component/expansion/expansion.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/material-component/expansion/expansion.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-headers-align .mat-expansion-panel-header-title,\n.example-headers-align .mat-expansion-panel-header-description {\n  flex-basis: 0; }\n\n.example-headers-align .mat-expansion-panel-header-description {\n  justify-content: space-between;\n  align-items: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9tYXRlcmlhbC1jb21wb25lbnQvZXhwYW5zaW9uL2V4cGFuc2lvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7RUFFRSxjQUFhLEVBQ2Q7O0FBRUQ7RUFDRSwrQkFBOEI7RUFDOUIsb0JBQW1CLEVBQ3BCIiwiZmlsZSI6InNyYy9hcHAvbWF0ZXJpYWwtY29tcG9uZW50L2V4cGFuc2lvbi9leHBhbnNpb24uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZXhhbXBsZS1oZWFkZXJzLWFsaWduIC5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlci10aXRsZSxcbi5leGFtcGxlLWhlYWRlcnMtYWxpZ24gLm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyLWRlc2NyaXB0aW9uIHtcbiAgZmxleC1iYXNpczogMDtcbn1cblxuLmV4YW1wbGUtaGVhZGVycy1hbGlnbiAubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXItZGVzY3JpcHRpb24ge1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/material-component/expansion/expansion.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/material-component/expansion/expansion.component.ts ***!
  \*********************************************************************/
/*! exports provided: ExpansionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpansionComponent", function() { return ExpansionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ExpansionComponent = /** @class */ (function () {
    function ExpansionComponent() {
        this.panelOpenState = false;
        this.step = 0;
    }
    ExpansionComponent.prototype.setStep = function (index) {
        this.step = index;
    };
    ExpansionComponent.prototype.nextStep = function () {
        this.step++;
    };
    ExpansionComponent.prototype.prevStep = function () {
        this.step--;
    };
    ExpansionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-expansion',
            template: __webpack_require__(/*! ./expansion.component.html */ "./src/app/material-component/expansion/expansion.component.html"),
            styles: [__webpack_require__(/*! ./expansion.component.scss */ "./src/app/material-component/expansion/expansion.component.scss")]
        })
    ], ExpansionComponent);
    return ExpansionComponent;
}());



/***/ }),

/***/ "./src/app/material-component/grid/grid.component.html":
/*!*************************************************************!*\
  !*** ./src/app/material-component/grid/grid.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100%\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Fixed height grid-list</mat-card-title>\n                <mat-card-subtitle>\n                    <code>&lt;mat-grid-list&gt;</code> is a two-dimensional list view that arranges cells into grid-based layout. See Material Design spec.\n                    <code><a href=\"https://material.io/guidelines/components/grid-lists.html\">Official Doc here</a></code>\n                </mat-card-subtitle>\n                <mat-grid-list cols=\"4\" rowHeight=\"100px\">\n                    <mat-grid-tile *ngFor=\"let tile of tiles\" [colspan]=\"tile.cols\" [rowspan]=\"tile.rows\" [style.background]=\"tile.color\">\n                        {{tile.text}}\n                    </mat-grid-tile>\n                </mat-grid-list>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n<!-- ============================================================== -->\n<!-- Basic Card Grid-->\n<!-- ============================================================== -->\n<mat-card>\n    <mat-card-content>\n        <mat-card-title>Basic grid-list</mat-card-title>\n        <mat-card-subtitle>\n            <code>&lt;mat-grid-list&gt;</code> is a two-dimensional list view that arranges cells into grid-based layout. See Material Design spec.\n            <a href=\"https://material.io/guidelines/components/grid-lists.html\">here</a>\n        </mat-card-subtitle>\n        <mat-grid-list cols=\"2\" rowHeight=\"2:1\">\n            <mat-grid-tile>1</mat-grid-tile>\n            <mat-grid-tile>2</mat-grid-tile>\n            <mat-grid-tile>3</mat-grid-tile>\n            <mat-grid-tile>4</mat-grid-tile>\n        </mat-grid-list>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/material-component/grid/grid.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/material-component/grid/grid.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-grid-tile {\n  background: lightblue; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9tYXRlcmlhbC1jb21wb25lbnQvZ3JpZC9ncmlkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usc0JBQXFCLEVBQ3RCIiwiZmlsZSI6InNyYy9hcHAvbWF0ZXJpYWwtY29tcG9uZW50L2dyaWQvZ3JpZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm1hdC1ncmlkLXRpbGUge1xuICBiYWNrZ3JvdW5kOiBsaWdodGJsdWU7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/material-component/grid/grid.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/material-component/grid/grid.component.ts ***!
  \***********************************************************/
/*! exports provided: GridComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridComponent", function() { return GridComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GridComponent = /** @class */ (function () {
    function GridComponent() {
        this.tiles = [
            {
                text: 'One',
                cols: 3,
                rows: 1,
                color: 'lightblue'
            },
            {
                text: 'Two',
                cols: 1,
                rows: 2,
                color: 'lightgreen'
            },
            {
                text: 'Three',
                cols: 1,
                rows: 1,
                color: 'lightpink'
            },
            {
                text: 'Four',
                cols: 2,
                rows: 1,
                color: '#DDBDF1'
            }
        ];
    }
    GridComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-grid',
            template: __webpack_require__(/*! ./grid.component.html */ "./src/app/material-component/grid/grid.component.html"),
            styles: [__webpack_require__(/*! ./grid.component.scss */ "./src/app/material-component/grid/grid.component.scss")]
        })
    ], GridComponent);
    return GridComponent;
}());



/***/ }),

/***/ "./src/app/material-component/lists/lists.component.html":
/*!***************************************************************!*\
  !*** ./src/app/material-component/lists/lists.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"100%\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Basic list</mat-card-title>\n        <mat-card-subtitle>\n          <code>&lt;mat-list&gt;</code> is a container component that wraps and formats a series of line items. As the base list component, it provides\n          Material Design styling, but no behavior of its own.\n          <code><a href=\"https://material.angular.io/components/list/overview\">Official Doc here</a></code>\n        </mat-card-subtitle>\n        <mat-list role=\"list\">\n          <mat-list-item role=\"listitem\">Item 1</mat-list-item>\n          <mat-list-item role=\"listitem\">Item 2</mat-list-item>\n          <mat-list-item role=\"listitem\">Item 3</mat-list-item>\n        </mat-list>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n<!-- ============================================================== -->\n<!-- List with selection-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"50%\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>List with selection</mat-card-title>\n        <mat-card-subtitle>A selection list provides an interface for selecting values, where each list item is an option.</mat-card-subtitle>\n        <mat-selection-list #shoes>\n          <mat-list-option *ngFor=\"let shoe of typesOfShoes\">\n            {{shoe}}\n          </mat-list-option>\n        </mat-selection-list>\n        <p>\n          Options selected: {{shoes.selectedOptions.selected.length}}\n        </p>\n      </mat-card-content>\n    </mat-card>\n  </div>\n  <div fxFlex.gt-sm=\"50%\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Multiline lists</mat-card-title>\n        <mat-card-subtitle>A selection list provides an interface for selecting values, where each list item is an option.</mat-card-subtitle>\n        <mat-list>\n          <mat-list-item *ngFor=\"let message of messages\">\n            <h3 matLine>{{message.from}}</h3>\n            <p matLine class=\"text-muted\">{{message.subject}}</p>\n            <p matLine class=\"text-muted\">{{message.content}}</p>\n          </mat-list-item>\n        </mat-list>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n<!-- ============================================================== -->\n<!-- List with icons selection-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"100%\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Multiline lists</mat-card-title>\n        <mat-card-subtitle>A selection list provides an interface for selecting values, where each list item is an option.</mat-card-subtitle>\n        <mat-list>\n          <mat-list-item *ngFor=\"let message of messages\">\n            <img mat-list-avatar [src]=\"message.image\" alt=\"Image of {{message.from}}\">\n            <h3 matLine>{{message.from}}</h3>\n            <p matLine class=\"text-muted\">{{message.content}}</p>\n          </mat-list-item>\n        </mat-list>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n<!-- ============================================================== -->\n<!-- List with icons selection-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"100%\">\n    <mat-card>\n      <mat-card-content class=\"p-b-0 m-b-0\">\n        <mat-card-title>List with sections</mat-card-title>\n        <mat-card-subtitle>A selection list provides an interface for selecting values, where each list item is an option.</mat-card-subtitle>\n      </mat-card-content>\n      <mat-list>\n        <mat-card-content class=\"p-t-0\">\n          <h3 mat-subheader>Folders</h3>\n          <mat-list-item *ngFor=\"let folder of folders\">\n            <mat-icon mat-list-icon>folder</mat-icon>\n            <h4 mat-line>{{folder.name}}</h4>\n            <p mat-line> {{folder.updated | date}} </p>\n          </mat-list-item>\n        </mat-card-content>\n\n        <mat-divider></mat-divider>\n        <mat-card-content>\n          <h3 mat-subheader>Notes</h3>\n          <mat-list-item *ngFor=\"let note of notes\">\n            <mat-icon mat-list-icon>note</mat-icon>\n            <h4 mat-line>{{note.name}}</h4>\n            <p mat-line> {{note.updated | date}} </p>\n          </mat-list-item>\n        </mat-card-content>\n      </mat-list>\n\n    </mat-card>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/material-component/lists/lists.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/material-component/lists/lists.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21hdGVyaWFsLWNvbXBvbmVudC9saXN0cy9saXN0cy5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/material-component/lists/lists.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/material-component/lists/lists.component.ts ***!
  \*************************************************************/
/*! exports provided: ListsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListsComponent", function() { return ListsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ListsComponent = /** @class */ (function () {
    function ListsComponent() {
        this.typesOfShoes = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
        this.messages = [
            {
                from: 'Nirav joshi (nbj@gmail.com)',
                image: 'assets/images/users/1.jpg',
                subject: 'Material angular',
                content: 'This is the material angular template'
            },
            {
                from: 'Sunil joshi (sbj@gmail.com)',
                image: 'assets/images/users/2.jpg',
                subject: 'Wrappixel',
                content: 'We have wrappixel launched'
            },
            {
                from: 'Vishal Bhatt (bht@gmail.com)',
                image: 'assets/images/users/3.jpg',
                subject: 'Task list',
                content: 'This is the latest task hasbeen done'
            }
        ];
        this.folders = [
            {
                name: 'Photos',
                updated: new Date('1/1/16')
            },
            {
                name: 'Recipes',
                updated: new Date('1/17/16')
            },
            {
                name: 'Work',
                updated: new Date('1/28/16')
            }
        ];
        this.notes = [
            {
                name: 'Vacation Itinerary',
                updated: new Date('2/20/16')
            },
            {
                name: 'Kitchen Remodel',
                updated: new Date('1/18/16')
            }
        ];
    }
    ListsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-lists',
            template: __webpack_require__(/*! ./lists.component.html */ "./src/app/material-component/lists/lists.component.html"),
            styles: [__webpack_require__(/*! ./lists.component.scss */ "./src/app/material-component/lists/lists.component.scss")]
        })
    ], ListsComponent);
    return ListsComponent;
}());



/***/ }),

/***/ "./src/app/material-component/material.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/material-component/material.module.ts ***!
  \*******************************************************/
/*! exports provided: MaterialComponentsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialComponentsModule", function() { return MaterialComponentsModule; });
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/table */ "./node_modules/@angular/cdk/esm5/table.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _material_routing__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./material.routing */ "./src/app/material-component/material.routing.ts");
/* harmony import */ var _buttons_buttons_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./buttons/buttons.component */ "./src/app/material-component/buttons/buttons.component.ts");
/* harmony import */ var _badge_badge_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./badge/badge.component */ "./src/app/material-component/badge/badge.component.ts");
/* harmony import */ var _cards_cards_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./cards/cards.component */ "./src/app/material-component/cards/cards.component.ts");
/* harmony import */ var _grid_grid_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./grid/grid.component */ "./src/app/material-component/grid/grid.component.ts");
/* harmony import */ var _lists_lists_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./lists/lists.component */ "./src/app/material-component/lists/lists.component.ts");
/* harmony import */ var _menu_menu_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./menu/menu.component */ "./src/app/material-component/menu/menu.component.ts");
/* harmony import */ var _tabs_tabs_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./tabs/tabs.component */ "./src/app/material-component/tabs/tabs.component.ts");
/* harmony import */ var _ripples_ripples_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ripples/ripples.component */ "./src/app/material-component/ripples/ripples.component.ts");
/* harmony import */ var _stepper_stepper_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./stepper/stepper.component */ "./src/app/material-component/stepper/stepper.component.ts");
/* harmony import */ var _expansion_expansion_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./expansion/expansion.component */ "./src/app/material-component/expansion/expansion.component.ts");
/* harmony import */ var _chips_chips_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./chips/chips.component */ "./src/app/material-component/chips/chips.component.ts");
/* harmony import */ var _toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./toolbar/toolbar.component */ "./src/app/material-component/toolbar/toolbar.component.ts");
/* harmony import */ var _progress_snipper_progress_snipper_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./progress-snipper/progress-snipper.component */ "./src/app/material-component/progress-snipper/progress-snipper.component.ts");
/* harmony import */ var _progress_progress_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./progress/progress.component */ "./src/app/material-component/progress/progress.component.ts");
/* harmony import */ var _dialog_dialog_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./dialog/dialog.component */ "./src/app/material-component/dialog/dialog.component.ts");
/* harmony import */ var _tooltip_tooltip_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./tooltip/tooltip.component */ "./src/app/material-component/tooltip/tooltip.component.ts");
/* harmony import */ var _snackbar_snackbar_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./snackbar/snackbar.component */ "./src/app/material-component/snackbar/snackbar.component.ts");
/* harmony import */ var _slider_slider_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./slider/slider.component */ "./src/app/material-component/slider/slider.component.ts");
/* harmony import */ var _slide_toggle_slide_toggle_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./slide-toggle/slide-toggle.component */ "./src/app/material-component/slide-toggle/slide-toggle.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var MaterialComponentsModule = /** @class */ (function () {
    function MaterialComponentsModule() {
    }
    MaterialComponentsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_material_routing__WEBPACK_IMPORTED_MODULE_9__["MaterialRoutes"]),
                _demo_material_module__WEBPACK_IMPORTED_MODULE_5__["DemoMaterialModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_8__["FlexLayoutModule"],
                _angular_cdk_table__WEBPACK_IMPORTED_MODULE_6__["CdkTableModule"]
            ],
            providers: [],
            entryComponents: [_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_24__["DialogOverviewExampleDialogComponent"]],
            declarations: [
                _buttons_buttons_component__WEBPACK_IMPORTED_MODULE_10__["ButtonsComponent"],
                _badge_badge_component__WEBPACK_IMPORTED_MODULE_11__["BadgeComponent"],
                _cards_cards_component__WEBPACK_IMPORTED_MODULE_12__["CardsComponent"],
                _grid_grid_component__WEBPACK_IMPORTED_MODULE_13__["GridComponent"],
                _lists_lists_component__WEBPACK_IMPORTED_MODULE_14__["ListsComponent"],
                _menu_menu_component__WEBPACK_IMPORTED_MODULE_15__["MenuComponent"],
                _tabs_tabs_component__WEBPACK_IMPORTED_MODULE_16__["TabsComponent"],
                _ripples_ripples_component__WEBPACK_IMPORTED_MODULE_17__["RipplesComponent"],
                _stepper_stepper_component__WEBPACK_IMPORTED_MODULE_18__["StepperComponent"],
                _expansion_expansion_component__WEBPACK_IMPORTED_MODULE_19__["ExpansionComponent"],
                _chips_chips_component__WEBPACK_IMPORTED_MODULE_20__["ChipsComponent"],
                _toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_21__["ToolbarComponent"],
                _progress_snipper_progress_snipper_component__WEBPACK_IMPORTED_MODULE_22__["ProgressSnipperComponent"],
                _progress_progress_component__WEBPACK_IMPORTED_MODULE_23__["ProgressComponent"],
                _dialog_dialog_component__WEBPACK_IMPORTED_MODULE_24__["DialogComponent"],
                _dialog_dialog_component__WEBPACK_IMPORTED_MODULE_24__["DialogOverviewExampleDialogComponent"],
                _tooltip_tooltip_component__WEBPACK_IMPORTED_MODULE_25__["TooltipComponent"],
                _snackbar_snackbar_component__WEBPACK_IMPORTED_MODULE_26__["SnackbarComponent"],
                _slider_slider_component__WEBPACK_IMPORTED_MODULE_27__["SliderComponent"],
                _slide_toggle_slide_toggle_component__WEBPACK_IMPORTED_MODULE_28__["SlideToggleComponent"]
            ]
        })
    ], MaterialComponentsModule);
    return MaterialComponentsModule;
}());



/***/ }),

/***/ "./src/app/material-component/material.routing.ts":
/*!********************************************************!*\
  !*** ./src/app/material-component/material.routing.ts ***!
  \********************************************************/
/*! exports provided: MaterialRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialRoutes", function() { return MaterialRoutes; });
/* harmony import */ var _buttons_buttons_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buttons/buttons.component */ "./src/app/material-component/buttons/buttons.component.ts");
/* harmony import */ var _badge_badge_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./badge/badge.component */ "./src/app/material-component/badge/badge.component.ts");
/* harmony import */ var _cards_cards_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cards/cards.component */ "./src/app/material-component/cards/cards.component.ts");
/* harmony import */ var _grid_grid_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./grid/grid.component */ "./src/app/material-component/grid/grid.component.ts");
/* harmony import */ var _lists_lists_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lists/lists.component */ "./src/app/material-component/lists/lists.component.ts");
/* harmony import */ var _menu_menu_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./menu/menu.component */ "./src/app/material-component/menu/menu.component.ts");
/* harmony import */ var _tabs_tabs_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tabs/tabs.component */ "./src/app/material-component/tabs/tabs.component.ts");
/* harmony import */ var _stepper_stepper_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./stepper/stepper.component */ "./src/app/material-component/stepper/stepper.component.ts");
/* harmony import */ var _expansion_expansion_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./expansion/expansion.component */ "./src/app/material-component/expansion/expansion.component.ts");
/* harmony import */ var _chips_chips_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./chips/chips.component */ "./src/app/material-component/chips/chips.component.ts");
/* harmony import */ var _toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./toolbar/toolbar.component */ "./src/app/material-component/toolbar/toolbar.component.ts");
/* harmony import */ var _progress_snipper_progress_snipper_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./progress-snipper/progress-snipper.component */ "./src/app/material-component/progress-snipper/progress-snipper.component.ts");
/* harmony import */ var _progress_progress_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./progress/progress.component */ "./src/app/material-component/progress/progress.component.ts");
/* harmony import */ var _ripples_ripples_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ripples/ripples.component */ "./src/app/material-component/ripples/ripples.component.ts");
/* harmony import */ var _dialog_dialog_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./dialog/dialog.component */ "./src/app/material-component/dialog/dialog.component.ts");
/* harmony import */ var _tooltip_tooltip_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./tooltip/tooltip.component */ "./src/app/material-component/tooltip/tooltip.component.ts");
/* harmony import */ var _snackbar_snackbar_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./snackbar/snackbar.component */ "./src/app/material-component/snackbar/snackbar.component.ts");
/* harmony import */ var _slider_slider_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./slider/slider.component */ "./src/app/material-component/slider/slider.component.ts");
/* harmony import */ var _slide_toggle_slide_toggle_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./slide-toggle/slide-toggle.component */ "./src/app/material-component/slide-toggle/slide-toggle.component.ts");



















var MaterialRoutes = [
    {
        path: '',
        children: [
            {
                path: 'button',
                component: _buttons_buttons_component__WEBPACK_IMPORTED_MODULE_0__["ButtonsComponent"]
            },
            {
                path: 'badge',
                component: _badge_badge_component__WEBPACK_IMPORTED_MODULE_1__["BadgeComponent"]
            },
            {
                path: 'cards',
                component: _cards_cards_component__WEBPACK_IMPORTED_MODULE_2__["CardsComponent"]
            },
            {
                path: 'grid',
                component: _grid_grid_component__WEBPACK_IMPORTED_MODULE_3__["GridComponent"]
            },
            {
                path: 'lists',
                component: _lists_lists_component__WEBPACK_IMPORTED_MODULE_4__["ListsComponent"]
            },
            {
                path: 'menu',
                component: _menu_menu_component__WEBPACK_IMPORTED_MODULE_5__["MenuComponent"]
            },
            {
                path: 'tabs',
                component: _tabs_tabs_component__WEBPACK_IMPORTED_MODULE_6__["TabsComponent"]
            },
            {
                path: 'ripples',
                component: _ripples_ripples_component__WEBPACK_IMPORTED_MODULE_13__["RipplesComponent"]
            },
            {
                path: 'stepper',
                component: _stepper_stepper_component__WEBPACK_IMPORTED_MODULE_7__["StepperComponent"]
            },
            {
                path: 'expansion',
                component: _expansion_expansion_component__WEBPACK_IMPORTED_MODULE_8__["ExpansionComponent"]
            },
            {
                path: 'chips',
                component: _chips_chips_component__WEBPACK_IMPORTED_MODULE_9__["ChipsComponent"]
            },
            {
                path: 'toolbar',
                component: _toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_10__["ToolbarComponent"]
            },
            {
                path: 'progress-snipper',
                component: _progress_snipper_progress_snipper_component__WEBPACK_IMPORTED_MODULE_11__["ProgressSnipperComponent"]
            },
            {
                path: 'progress',
                component: _progress_progress_component__WEBPACK_IMPORTED_MODULE_12__["ProgressComponent"]
            },
            {
                path: 'dialog',
                component: _dialog_dialog_component__WEBPACK_IMPORTED_MODULE_14__["DialogComponent"]
            },
            {
                path: 'tooltip',
                component: _tooltip_tooltip_component__WEBPACK_IMPORTED_MODULE_15__["TooltipComponent"]
            },
            {
                path: 'snackbar',
                component: _snackbar_snackbar_component__WEBPACK_IMPORTED_MODULE_16__["SnackbarComponent"]
            },
            {
                path: 'slider',
                component: _slider_slider_component__WEBPACK_IMPORTED_MODULE_17__["SliderComponent"]
            },
            {
                path: 'slide-toggle',
                component: _slide_toggle_slide_toggle_component__WEBPACK_IMPORTED_MODULE_18__["SlideToggleComponent"]
            }
        ]
    }
];


/***/ }),

/***/ "./src/app/material-component/menu/menu.component.html":
/*!*************************************************************!*\
  !*** ./src/app/material-component/menu/menu.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- row -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <!-- Card column -->\n  <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Basic menu</mat-card-title>\n        <mat-card-subtitle>\n          <code>&lt;mat-menu&gt;</code> is a floating panel containing list of options.</mat-card-subtitle>\n        <button mat-button [matMenuTriggerFor]=\"menu\">Menu</button>\n        <mat-menu #menu=\"matMenu\">\n          <button mat-menu-item>Item 1</button>\n          <button mat-menu-item>Item 2</button>\n        </mat-menu>\n      </mat-card-content>\n    </mat-card>\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>On icon menu</mat-card-title>\n        <mat-card-subtitle>\n          <code>&lt;mat-menu&gt;</code> is a floating panel containing list of options.</mat-card-subtitle>\n        <button mat-icon-button [matMenuTriggerFor]=\"menu2\">\n          <mat-icon>menu</mat-icon>\n        </button>\n        <mat-menu #menu2=\"matMenu\">\n          <button mat-menu-item>Item 1</button>\n          <button mat-menu-item>Item 2</button>\n        </mat-menu>\n      </mat-card-content>\n    </mat-card>\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Nested menu</mat-card-title>\n        <mat-card-subtitle>\n          <code>&lt;mat-menu&gt;</code> is a floating panel containing list of options.</mat-card-subtitle>\n        <button mat-raised-button color=\"accent\" [matMenuTriggerFor]=\"animals\">Animal index</button>\n\n        <mat-menu #animals=\"matMenu\">\n          <button mat-menu-item [matMenuTriggerFor]=\"vertebrates\">Vertebrates</button>\n          <button mat-menu-item [matMenuTriggerFor]=\"invertebrates\">Invertebrates</button>\n        </mat-menu>\n\n        <mat-menu #vertebrates=\"matMenu\">\n          <button mat-menu-item [matMenuTriggerFor]=\"fish\">Fishes</button>\n          <button mat-menu-item [matMenuTriggerFor]=\"amphibians\">Amphibians</button>\n          <button mat-menu-item [matMenuTriggerFor]=\"reptiles\">Reptiles</button>\n          <button mat-menu-item>Birds</button>\n          <button mat-menu-item>Mammals</button>\n        </mat-menu>\n\n        <mat-menu #invertebrates=\"matMenu\">\n          <button mat-menu-item>Insects</button>\n          <button mat-menu-item>Molluscs</button>\n          <button mat-menu-item>Crustaceans</button>\n          <button mat-menu-item>Corals</button>\n          <button mat-menu-item>Arachnids</button>\n          <button mat-menu-item>Velvet worms</button>\n          <button mat-menu-item>Horseshoe crabs</button>\n        </mat-menu>\n\n        <mat-menu #fish=\"matMenu\">\n          <button mat-menu-item>Baikal oilfish</button>\n          <button mat-menu-item>Bala shark</button>\n          <button mat-menu-item>Ballan wrasse</button>\n          <button mat-menu-item>Bamboo shark</button>\n          <button mat-menu-item>Banded killifish</button>\n        </mat-menu>\n\n        <mat-menu #amphibians=\"matMenu\">\n          <button mat-menu-item>Sonoran desert toad</button>\n          <button mat-menu-item>Western toad</button>\n          <button mat-menu-item>Arroyo toad</button>\n          <button mat-menu-item>Yosemite toad</button>\n        </mat-menu>\n\n        <mat-menu #reptiles=\"matMenu\">\n          <button mat-menu-item>Banded Day Gecko</button>\n          <button mat-menu-item>Banded Gila Monster</button>\n          <button mat-menu-item>Black Tree Monitor</button>\n          <button mat-menu-item>Blue Spiny Lizard</button>\n          <button mat-menu-item disabled>Velociraptor</button>\n        </mat-menu>\n      </mat-card-content>\n    </mat-card>\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>With icon menu</mat-card-title>\n        <mat-card-subtitle>\n          <code>&lt;mat-menu&gt;</code> is a floating panel containing list of options.</mat-card-subtitle>\n        <button mat-icon-button [matMenuTriggerFor]=\"menu4\">\n          <mat-icon>more_vert</mat-icon>\n        </button>\n        <mat-menu #menu4=\"matMenu\">\n          <button mat-menu-item>\n            <mat-icon>dialpad</mat-icon>\n            <span>Redial</span>\n          </button>\n          <button mat-menu-item disabled>\n            <mat-icon>voicemail</mat-icon>\n            <span>Check voicemail</span>\n          </button>\n          <button mat-menu-item>\n            <mat-icon>notifications_off</mat-icon>\n            <span>Disable alerts</span>\n          </button>\n        </mat-menu>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/material-component/menu/menu.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/material-component/menu/menu.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21hdGVyaWFsLWNvbXBvbmVudC9tZW51L21lbnUuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/material-component/menu/menu.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/material-component/menu/menu.component.ts ***!
  \***********************************************************/
/*! exports provided: MenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuComponent", function() { return MenuComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MenuComponent = /** @class */ (function () {
    function MenuComponent() {
    }
    MenuComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-menu',
            template: __webpack_require__(/*! ./menu.component.html */ "./src/app/material-component/menu/menu.component.html"),
            styles: [__webpack_require__(/*! ./menu.component.scss */ "./src/app/material-component/menu/menu.component.scss")]
        })
    ], MenuComponent);
    return MenuComponent;
}());



/***/ }),

/***/ "./src/app/material-component/progress-snipper/progress-snipper.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/material-component/progress-snipper/progress-snipper.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"100%\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Basic Progress spinner</mat-card-title>\n        <mat-card-subtitle>\n          <code>&lt;mat-progress-spinner&gt;</code> are a circular indicators of progress and activity.</mat-card-subtitle>\n        <mat-spinner></mat-spinner>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n<!-- ============================================================== -->\n<!-- Basic Card Grid-->\n<!-- ============================================================== -->\n<mat-card>\n  <mat-card-content>\n    <mat-card-title>Configurable progress spinner</mat-card-title>\n\n    <section class=\"example-section\">\n      <label class=\"example-margin\">Color:</label>\n      <mat-radio-group [(ngModel)]=\"color\">\n        <mat-radio-button class=\"example-margin\" value=\"primary\">\n          Primary\n        </mat-radio-button>\n        <mat-radio-button class=\"example-margin\" value=\"accent\">\n          Accent\n        </mat-radio-button>\n        <mat-radio-button class=\"example-margin\" value=\"warn\">\n          Warn\n        </mat-radio-button>\n      </mat-radio-group>\n    </section>\n    <br/>\n    <section class=\"example-section\">\n      <label class=\"example-margin\">Mode:</label>\n      <mat-radio-group [(ngModel)]=\"mode\">\n        <mat-radio-button class=\"example-margin\" value=\"determinate\">\n          Determinate\n        </mat-radio-button>\n        <mat-radio-button class=\"example-margin\" value=\"indeterminate\">\n          Indeterminate\n        </mat-radio-button>\n      </mat-radio-group>\n    </section>\n    <br/>\n    <section class=\"example-section\" *ngIf=\"mode == 'determinate'\">\n      <label class=\"example-margin\">Progress:</label>\n      <mat-slider class=\"example-margin\" [(ngModel)]=\"value\"></mat-slider>\n    </section>\n    <h4 class=\"example-h2\">Result</h4>\n\n    <mat-progress-spinner class=\"example-margin\" [color]=\"color\" [mode]=\"mode\" [value]=\"value\">\n    </mat-progress-spinner>\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/material-component/progress-snipper/progress-snipper.component.scss":
/*!*************************************************************************************!*\
  !*** ./src/app/material-component/progress-snipper/progress-snipper.component.scss ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21hdGVyaWFsLWNvbXBvbmVudC9wcm9ncmVzcy1zbmlwcGVyL3Byb2dyZXNzLXNuaXBwZXIuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/material-component/progress-snipper/progress-snipper.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/material-component/progress-snipper/progress-snipper.component.ts ***!
  \***********************************************************************************/
/*! exports provided: ProgressSnipperComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressSnipperComponent", function() { return ProgressSnipperComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ProgressSnipperComponent = /** @class */ (function () {
    function ProgressSnipperComponent() {
        this.color = 'warn';
        this.mode = 'determinate';
        this.value = 50;
    }
    ProgressSnipperComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-snipper',
            template: __webpack_require__(/*! ./progress-snipper.component.html */ "./src/app/material-component/progress-snipper/progress-snipper.component.html"),
            styles: [__webpack_require__(/*! ./progress-snipper.component.scss */ "./src/app/material-component/progress-snipper/progress-snipper.component.scss")]
        })
    ], ProgressSnipperComponent);
    return ProgressSnipperComponent;
}());



/***/ }),

/***/ "./src/app/material-component/progress/progress.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/material-component/progress/progress.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100%\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Determinate progress-bar</mat-card-title>\n                <mat-card-subtitle>\n                    <code>&lt;mat-progress-bar mode=\"determinate\"&gt;</code> is a horizontal progress-bar for\n                    indicating progress and activity.</mat-card-subtitle>\n                <mat-progress-bar mode=\"determinate\" value=\"40\"></mat-progress-bar>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row\">\n    <div fxFlex.gt-sm=\"100%\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Indeterminate progress-bar</mat-card-title>\n                <mat-card-subtitle>\n                    <code>&lt;mat-progress-bar mode=\"indeterminate\"&gt;</code> is a horizontal progress-bar for\n                    indicating progress and activity.</mat-card-subtitle>\n                <mat-progress-bar mode=\"indeterminate\" value=\"40\"></mat-progress-bar>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100%\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Buffer progress-bar</mat-card-title>\n                <mat-card-subtitle>\n                    <code>&lt;mat-progress-bar mode=\"buffer\"&gt;</code> is a horizontal progress-bar for indicating\n                    progress and activity.</mat-card-subtitle>\n                <mat-progress-bar mode=\"buffer\"></mat-progress-bar>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100%\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Query progress-bar</mat-card-title>\n                <mat-card-subtitle>\n                    <code>&lt;mat-progress-bar mode=\"query\"&gt;</code> is a horizontal progress-bar for indicating\n                    progress and activity.</mat-card-subtitle>\n                <mat-progress-bar mode=\"query\"></mat-progress-bar>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100%\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Colored progress-bar</mat-card-title>\n                <mat-card-subtitle>\n                    <code>&lt;mat-progress-bar mode=\"determinate\"&gt;</code> is a horizontal progress-bar for\n                    indicating progress and activity.</mat-card-subtitle>\n                <mat-progress-bar mode=\"determinate\" value=\"40\" color=\"primary\"></mat-progress-bar>\n                <br />\n                <mat-progress-bar mode=\"determinate\" value=\"80\" color=\"accent\"></mat-progress-bar>\n                <br />\n                <mat-progress-bar mode=\"determinate\" value=\"20\" color=\"warn\"></mat-progress-bar>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100%\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Configurable progress-bar</mat-card-title>\n                <mat-card-subtitle>\n                    <code>&lt;mat-progress-bar mode=\"query\"&gt;</code> is a horizontal progress-bar for indicating\n                    progress and activity.</mat-card-subtitle>\n                <section class=\"example-section\">\n                    <label class=\"example-margin\">Color:</label>\n                    <mat-radio-group [(ngModel)]=\"color\">\n                        <mat-radio-button class=\"example-margin\" value=\"primary\">\n                            Primary\n                        </mat-radio-button>\n                        <mat-radio-button class=\"example-margin\" value=\"accent\">\n                            Accent\n                        </mat-radio-button>\n                        <mat-radio-button class=\"example-margin\" value=\"warn\">\n                            Warn\n                        </mat-radio-button>\n                    </mat-radio-group>\n                </section>\n                <br />\n                <section class=\"example-section\">\n                    <label class=\"example-margin\">Mode:</label>\n                    <mat-radio-group [(ngModel)]=\"mode\">\n                        <mat-radio-button class=\"example-margin\" value=\"determinate\">\n                            Determinate\n                        </mat-radio-button>\n                        <mat-radio-button class=\"example-margin\" value=\"indeterminate\">\n                            Indeterminate\n                        </mat-radio-button>\n                        <mat-radio-button class=\"example-margin\" value=\"buffer\">\n                            Buffer\n                        </mat-radio-button>\n                        <mat-radio-button class=\"example-margin\" value=\"query\">\n                            Query\n                        </mat-radio-button>\n                    </mat-radio-group>\n                </section>\n\n                <section class=\"example-section\" *ngIf=\"mode == 'determinate' || mode == 'buffer'\">\n                    <label class=\"example-margin\">Progress:</label>\n                    <mat-slider class=\"example-margin\" [(ngModel)]=\"value\"></mat-slider>\n                </section>\n                <section class=\"example-section\" *ngIf=\"mode == 'buffer'\">\n                    <label class=\"example-margin\">Buffer:</label>\n                    <mat-slider class=\"example-margin\" [(ngModel)]=\"bufferValue\"></mat-slider>\n                </section>\n                <h2 class=\"example-h2\">Result</h2>\n\n                <section class=\"example-section\">\n                    <mat-progress-bar class=\"example-margin\" [color]=\"color\" [mode]=\"mode\" [value]=\"value\"\n                        [bufferValue]=\"bufferValue\">\n                    </mat-progress-bar>\n                </section>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/material-component/progress/progress.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/material-component/progress/progress.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-h2 {\n  margin: 10px; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px; }\n\n.example-margin {\n  margin: 0 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9tYXRlcmlhbC1jb21wb25lbnQvcHJvZ3Jlc3MvcHJvZ3Jlc3MuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFZLEVBQ2I7O0FBRUQ7RUFDRSxjQUFhO0VBQ2Isc0JBQXFCO0VBQ3JCLG9CQUFtQjtFQUNuQixhQUFZLEVBQ2I7O0FBRUQ7RUFDRSxlQUFjLEVBQ2YiLCJmaWxlIjoic3JjL2FwcC9tYXRlcmlhbC1jb21wb25lbnQvcHJvZ3Jlc3MvcHJvZ3Jlc3MuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZXhhbXBsZS1oMiB7XG4gIG1hcmdpbjogMTBweDtcbn1cblxuLmV4YW1wbGUtc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgaGVpZ2h0OiA2MHB4O1xufVxuXG4uZXhhbXBsZS1tYXJnaW4ge1xuICBtYXJnaW46IDAgMTBweDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/material-component/progress/progress.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/material-component/progress/progress.component.ts ***!
  \*******************************************************************/
/*! exports provided: ProgressComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressComponent", function() { return ProgressComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ProgressComponent = /** @class */ (function () {
    function ProgressComponent() {
        this.color = 'primary';
        this.mode = 'determinate';
        this.value = 50;
        this.bufferValue = 75;
    }
    ProgressComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-progress',
            template: __webpack_require__(/*! ./progress.component.html */ "./src/app/material-component/progress/progress.component.html"),
            styles: [__webpack_require__(/*! ./progress.component.scss */ "./src/app/material-component/progress/progress.component.scss")]
        })
    ], ProgressComponent);
    return ProgressComponent;
}());



/***/ }),

/***/ "./src/app/material-component/ripples/ripples.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/material-component/ripples/ripples.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-content>\n    <mat-card-title>Ripples</mat-card-title>\n    <mat-checkbox [(ngModel)]=\"centered\" class=\"example-ripple-checkbox\">Centered</mat-checkbox>\n    <mat-checkbox [(ngModel)]=\"disabled\" class=\"example-ripple-checkbox\">Disabled</mat-checkbox>\n    <mat-checkbox [(ngModel)]=\"unbounded\" class=\"example-ripple-checkbox\">Unbounded</mat-checkbox>\n\n    <mat-form-field class=\"example-ripple-form-field\">\n      <input matInput [(ngModel)]=\"radius\" type=\"number\" placeholder=\"Radius\">\n    </mat-form-field>\n    <mat-form-field class=\"example-ripple-form-field\">\n      <input matInput [(ngModel)]=\"color\" type=\"text\" placeholder=\"Color\">\n    </mat-form-field>\n\n\n    <div class=\"example-ripple-container mat-elevation-z4\" matRipple [matRippleCentered]=\"centered\" [matRippleDisabled]=\"disabled\"\n      [matRippleUnbounded]=\"unbounded\" [matRippleRadius]=\"radius\" [matRippleColor]=\"color\">\n      Click me\n    </div>\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/material-component/ripples/ripples.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/material-component/ripples/ripples.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-ripple-container {\n  cursor: pointer;\n  text-align: center;\n  width: 300px;\n  height: 300px;\n  line-height: 300px;\n  user-select: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -webkit-user-drag: none;\n  -webkit-tap-highlight-color: transparent; }\n\n/** Styles to make the demo look better. */\n\n.example-ripple-checkbox {\n  margin: 6px 12px 6px 0; }\n\n.example-ripple-form-field {\n  margin: 0 12px 0 0; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9tYXRlcmlhbC1jb21wb25lbnQvcmlwcGxlcy9yaXBwbGVzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWU7RUFDZixtQkFBa0I7RUFFbEIsYUFBWTtFQUNaLGNBQWE7RUFDYixtQkFBa0I7RUFFbEIsa0JBQWlCO0VBQ2pCLDBCQUF5QjtFQUN6Qix1QkFBc0I7RUFDdEIsc0JBQXFCO0VBRXJCLHdCQUF1QjtFQUN2Qix5Q0FBd0MsRUFDekM7O0FBRUQsMkNBQTJDOztBQUMzQztFQUNFLHVCQUFzQixFQUN2Qjs7QUFFRDtFQUNFLG1CQUFrQixFQUNuQiIsImZpbGUiOiJzcmMvYXBwL21hdGVyaWFsLWNvbXBvbmVudC9yaXBwbGVzL3JpcHBsZXMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZXhhbXBsZS1yaXBwbGUtY29udGFpbmVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgd2lkdGg6IDMwMHB4O1xuICBoZWlnaHQ6IDMwMHB4O1xuICBsaW5lLWhlaWdodDogMzAwcHg7XG5cbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcblxuICAtd2Via2l0LXVzZXItZHJhZzogbm9uZTtcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLyoqIFN0eWxlcyB0byBtYWtlIHRoZSBkZW1vIGxvb2sgYmV0dGVyLiAqL1xuLmV4YW1wbGUtcmlwcGxlLWNoZWNrYm94IHtcbiAgbWFyZ2luOiA2cHggMTJweCA2cHggMDtcbn1cblxuLmV4YW1wbGUtcmlwcGxlLWZvcm0tZmllbGQge1xuICBtYXJnaW46IDAgMTJweCAwIDA7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/material-component/ripples/ripples.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/material-component/ripples/ripples.component.ts ***!
  \*****************************************************************/
/*! exports provided: RipplesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RipplesComponent", function() { return RipplesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var RipplesComponent = /** @class */ (function () {
    function RipplesComponent() {
        this.centered = false;
        this.disabled = false;
        this.unbounded = false;
    }
    RipplesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-ripples',
            template: __webpack_require__(/*! ./ripples.component.html */ "./src/app/material-component/ripples/ripples.component.html"),
            styles: [__webpack_require__(/*! ./ripples.component.scss */ "./src/app/material-component/ripples/ripples.component.scss")]
        })
    ], RipplesComponent);
    return RipplesComponent;
}());



/***/ }),

/***/ "./src/app/material-component/slide-toggle/slide-toggle.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/material-component/slide-toggle/slide-toggle.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"100%\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Basic slide-toggles</mat-card-title>\n        <mat-card-subtitle>\n          <code>&lt;mat-slide-toggle&gt;</code> is an on/off control that can be toggled via clicking or dragging.</mat-card-subtitle>\n        <mat-slide-toggle>Slide me!</mat-slide-toggle>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n<!-- ============================================================== -->\n<!-- Basic Card Grid-->\n<!-- ============================================================== -->\n<mat-card>\n  <mat-card-content>\n    <mat-card-title>Basic grid-list</mat-card-title>\n    <mat-card-subtitle>\n      <code>&lt;mat-slide-toggle&gt;</code> is an on/off control that can be toggled via clicking or dragging.</mat-card-subtitle>\n    <section class=\"example-section\">\n      <label class=\"example-margin\">Color:</label>\n      <mat-radio-group [(ngModel)]=\"color\">\n        <mat-radio-button class=\"example-margin\" color=\"primary\" value=\"primary\">\n          Primary\n        </mat-radio-button>\n        <mat-radio-button class=\"example-margin\" color=\"accent\" value=\"accent\">\n          Accent\n        </mat-radio-button>\n        <mat-radio-button class=\"example-margin\" color=\"warn\" value=\"warn\">\n          Warn\n        </mat-radio-button>\n      </mat-radio-group>\n    </section>\n\n    <section class=\"example-section\">\n      <mat-checkbox class=\"example-margin\" [(ngModel)]=\"checked\">Checked</mat-checkbox>\n    </section>\n\n    <section class=\"example-section\">\n      <mat-checkbox class=\"example-margin\" [(ngModel)]=\"disabled\">Disabled</mat-checkbox>\n    </section>\n    <mat-card-title>Result</mat-card-title>\n\n    <section class=\"example-section\">\n      <mat-slide-toggle class=\"example-margin\" [color]=\"color\" [checked]=\"checked\" [disabled]=\"disabled\">\n        Slide me!\n      </mat-slide-toggle>\n    </section>\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/material-component/slide-toggle/slide-toggle.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/material-component/slide-toggle/slide-toggle.component.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-h2 {\n  margin: 10px; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px; }\n\n.example-margin {\n  margin: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9tYXRlcmlhbC1jb21wb25lbnQvc2xpZGUtdG9nZ2xlL3NsaWRlLXRvZ2dsZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQVksRUFDYjs7QUFFRDtFQUNFLGNBQWE7RUFDYixzQkFBcUI7RUFDckIsb0JBQW1CO0VBQ25CLGFBQVksRUFDYjs7QUFFRDtFQUNFLGFBQVksRUFDYiIsImZpbGUiOiJzcmMvYXBwL21hdGVyaWFsLWNvbXBvbmVudC9zbGlkZS10b2dnbGUvc2xpZGUtdG9nZ2xlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmV4YW1wbGUtaDIge1xuICBtYXJnaW46IDEwcHg7XG59XG5cbi5leGFtcGxlLXNlY3Rpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGhlaWdodDogNjBweDtcbn1cblxuLmV4YW1wbGUtbWFyZ2luIHtcbiAgbWFyZ2luOiAxMHB4O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/material-component/slide-toggle/slide-toggle.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/material-component/slide-toggle/slide-toggle.component.ts ***!
  \***************************************************************************/
/*! exports provided: SlideToggleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlideToggleComponent", function() { return SlideToggleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SlideToggleComponent = /** @class */ (function () {
    function SlideToggleComponent() {
        this.color = 'accent';
        this.checked = false;
        this.disabled = false;
    }
    SlideToggleComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-slide-toggle',
            template: __webpack_require__(/*! ./slide-toggle.component.html */ "./src/app/material-component/slide-toggle/slide-toggle.component.html"),
            styles: [__webpack_require__(/*! ./slide-toggle.component.scss */ "./src/app/material-component/slide-toggle/slide-toggle.component.scss")]
        })
    ], SlideToggleComponent);
    return SlideToggleComponent;
}());



/***/ }),

/***/ "./src/app/material-component/slider/slider.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/material-component/slider/slider.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-content>\n    <mat-card-title>Slider</mat-card-title>\n    <mat-card-subtitle>mat-slider allows for the selection of a value from a range via mouse, touch, or keyboard, similar to\n      <code class=\"\"><a href=\"https://material.angular.io/components/slider/overview\">Official Component</a></code>\n    </mat-card-subtitle>\n\n    <h4 class=\"m-b-0\">Basic Slider</h4>\n    <mat-slider color=\"warn\" value=\"40\"></mat-slider>\n\n    <h4 class=\"m-b-0\">value Slider</h4>\n    Label\n    <mat-slider #slidey color=\"primary\" value=\"40\"></mat-slider>\n    {{slidey.value}}\n\n    <h4 class=\"m-b-0\">With Min and Max</h4>\n    <mat-form-field>\n      <input [(ngModel)]=\"min\" matInput> </mat-form-field>\n    <mat-form-field>\n      <input [(ngModel)]=\"max\" matInput>\n    </mat-form-field>\n    <br/>\n    <mat-slider [min]=\"min\" [max]=\"max\" tick-interval=\"5\" #slider2 color=\"warn\"></mat-slider>\n    {{slider2.value}}\n\n\n    <h4 class=\"m-b-0\">Disabled Slider</h4>\n    <mat-slider disabled #slider3></mat-slider>\n    {{slider3.value}}\n\n    <h4 class=\"m-b-0\">Vertical slider</h4>\n    <mat-slider vertical value=\"50\"></mat-slider>\n\n    <h4 class=\"m-b-0\">Selecting a value</h4>\n    <mat-slider min=\"1\" max=\"100\" step=\"20\" #slider5></mat-slider>\n    {{slider5.value}}\n\n    <h4 class=\"m-b-0\">Slider with set tick interval</h4>\n    <mat-slider tick-interval=\"auto\"></mat-slider>\n    <mat-slider tick-interval=\"9\"></mat-slider>\n\n    <h4 class=\"m-b-0\">Slider with Thumb Label</h4>\n    <mat-slider thumb-label></mat-slider>\n\n    <h4 class=\"m-b-0\">Slider with one-way binding</h4>\n    <mat-slider [value]=\"val\" step=\"40\"></mat-slider>\n    <mat-form-field>\n      <input [(ngModel)]=\"val\" matInput>\n    </mat-form-field>\n\n    <h4 class=\"m-b-0\">Slider with two-way binding</h4>\n    <mat-slider [(ngModel)]=\"demo\" step=\"40\"></mat-slider>\n    <mat-form-field>\n      <input [(ngModel)]=\"demo\" matInput>\n    </mat-form-field>\n\n    <h4 class=\"m-b-0\">Inverted slider</h4>\n    <mat-slider invert value=\"50\" tick-interval=\"5\"></mat-slider>\n\n\n\n    <h4 class=\"m-b-0\">Inverted vertical slider</h4>\n    <mat-slider vertical invert thumb-label tick-interval=\"auto\" value=\"50\"></mat-slider>\n  </mat-card-content>\n</mat-card>\n\n\n<mat-card>\n  <mat-card-content>\n    <h5 class=\"example-h2\">Slider configuration</h5>\n\n    <section class=\"example-section\">\n      <mat-form-field class=\"example-margin\">\n        <input matInput type=\"number\" placeholder=\"Value\" [(ngModel)]=\"value\">\n      </mat-form-field>\n      <mat-form-field class=\"example-margin\">\n        <input matInput type=\"number\" placeholder=\"Min value\" [(ngModel)]=\"min\">\n      </mat-form-field>\n      <mat-form-field class=\"example-margin\">\n        <input matInput type=\"number\" placeholder=\"Max value\" [(ngModel)]=\"max\">\n      </mat-form-field>\n      <mat-form-field class=\"example-margin\">\n        <input matInput type=\"number\" placeholder=\"Step size\" [(ngModel)]=\"step\">\n      </mat-form-field>\n    </section>\n\n    <section class=\"example-section\">\n      <mat-checkbox class=\"example-margin\" [(ngModel)]=\"showTicks\">Show ticks</mat-checkbox>\n      <mat-checkbox class=\"example-margin\" [(ngModel)]=\"autoTicks\" *ngIf=\"showTicks\">\n        Auto ticks\n      </mat-checkbox>\n      <mat-form-field class=\"example-margin\" *ngIf=\"showTicks && !autoTicks\">\n        <input matInput type=\"number\" placeholder=\"Tick interval\" [(ngModel)]=\"tickInterval\">\n      </mat-form-field>\n    </section>\n\n    <section class=\"example-section\">\n      <mat-checkbox class=\"example-margin\" [(ngModel)]=\"thumbLabel\">Show thumb label</mat-checkbox>\n    </section>\n\n    <section class=\"example-section\">\n      <mat-checkbox class=\"example-margin\" [(ngModel)]=\"vertical\">Vertical</mat-checkbox>\n      <mat-checkbox class=\"example-margin\" [(ngModel)]=\"invert\">Inverted</mat-checkbox>\n    </section>\n\n    <section class=\"example-section\">\n      <mat-checkbox class=\"example-margin\" [(ngModel)]=\"disabled\">Disabled</mat-checkbox>\n    </section>\n\n  </mat-card-content>\n</mat-card>\n\n<mat-card class=\"result\">\n  <mat-card-content>\n    <h5 class=\"example-h2\">Result</h5>\n\n    <mat-slider\n        class=\"example-margin\"\n        [disabled]=\"disabled\"\n        [invert]=\"invert\"\n        [max]=\"max\"\n        [min]=\"min\"\n        [step]=\"step\"\n        [thumbLabel]=\"thumbLabel\"\n        [tickInterval]=\"tickInterval\"\n        [(ngModel)]=\"value\"\n        [vertical]=\"vertical\">\n    </mat-slider>\n  </mat-card-content>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/material-component/slider/slider.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/material-component/slider/slider.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-h2 {\n  margin: 10px; }\n\n.example-section {\n  display: inline;\n  align-content: center;\n  align-items: center;\n  height: 60px; }\n\n.example-margin {\n  margin: 10px; }\n\n.mat-slider-horizontal {\n  width: 300px; }\n\n.mat-slider-vertical {\n  height: 300px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9tYXRlcmlhbC1jb21wb25lbnQvc2xpZGVyL3NsaWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQVksRUFDYjs7QUFFRDtFQUNFLGdCQUFlO0VBQ2Ysc0JBQXFCO0VBQ3JCLG9CQUFtQjtFQUNuQixhQUFZLEVBQ2I7O0FBRUQ7RUFDRSxhQUFZLEVBQ2I7O0FBRUQ7RUFDRSxhQUFZLEVBQ2I7O0FBRUQ7RUFDRSxjQUFhLEVBQ2QiLCJmaWxlIjoic3JjL2FwcC9tYXRlcmlhbC1jb21wb25lbnQvc2xpZGVyL3NsaWRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5leGFtcGxlLWgyIHtcbiAgbWFyZ2luOiAxMHB4O1xufVxuXG4uZXhhbXBsZS1zZWN0aW9uIHtcbiAgZGlzcGxheTogaW5saW5lO1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGhlaWdodDogNjBweDtcbn1cblxuLmV4YW1wbGUtbWFyZ2luIHtcbiAgbWFyZ2luOiAxMHB4O1xufVxuXG4ubWF0LXNsaWRlci1ob3Jpem9udGFsIHtcbiAgd2lkdGg6IDMwMHB4O1xufVxuXG4ubWF0LXNsaWRlci12ZXJ0aWNhbCB7XG4gIGhlaWdodDogMzAwcHg7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/material-component/slider/slider.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/material-component/slider/slider.component.ts ***!
  \***************************************************************/
/*! exports provided: SliderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderComponent", function() { return SliderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SliderComponent = /** @class */ (function () {
    function SliderComponent() {
        this.val = 50;
        this.min = 0;
        this.max = 100;
        // 2
        this.autoTicks = false;
        this.disabled = false;
        this.invert = false;
        this.showTicks = false;
        this.step = 1;
        this.thumbLabel = false;
        this.value = 0;
        this.vertical = false;
        this._tickInterval = 1;
    }
    Object.defineProperty(SliderComponent.prototype, "tickInterval", {
        get: function () {
            return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
        },
        set: function (value) {
            this._tickInterval = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceNumberProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    SliderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-slider',
            template: __webpack_require__(/*! ./slider.component.html */ "./src/app/material-component/slider/slider.component.html"),
            styles: [__webpack_require__(/*! ./slider.component.scss */ "./src/app/material-component/slider/slider.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], SliderComponent);
    return SliderComponent;
}());



/***/ }),

/***/ "./src/app/material-component/snackbar/snackbar.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/material-component/snackbar/snackbar.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-content>\n        <mat-card-title>Basic snack-bar</mat-card-title>\n        <mat-card-subtitle>matSnackBar is a service for displaying snack-bar notifications.\n            <code class=\"\"><a href=\"https://material.angular.io/components/snack-bar/overview\">Official Component</a></code>\n        </mat-card-subtitle>\n        <mat-form-field>\n            <input matInput value=\"Disco party!\" placeholder=\"Message\" #message> </mat-form-field>\n        <mat-form-field>\n            <input matInput value=\"Dance\" placeholder=\"Action\" #action> </mat-form-field>\n        <button mat-raised-button color=\"warn\" (click)=\"openSnackBar(message.value, action.value)\">Show snack-bar</button>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/material-component/snackbar/snackbar.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/material-component/snackbar/snackbar.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21hdGVyaWFsLWNvbXBvbmVudC9zbmFja2Jhci9zbmFja2Jhci5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/material-component/snackbar/snackbar.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/material-component/snackbar/snackbar.component.ts ***!
  \*******************************************************************/
/*! exports provided: SnackbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnackbarComponent", function() { return SnackbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SnackbarComponent = /** @class */ (function () {
    function SnackbarComponent(snackBar) {
        this.snackBar = snackBar;
    }
    SnackbarComponent.prototype.openSnackBar = function (message, action) {
        this.snackBar.open(message, action, {
            duration: 2000
        });
    };
    SnackbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-snackbar',
            template: __webpack_require__(/*! ./snackbar.component.html */ "./src/app/material-component/snackbar/snackbar.component.html"),
            styles: [__webpack_require__(/*! ./snackbar.component.scss */ "./src/app/material-component/snackbar/snackbar.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]])
    ], SnackbarComponent);
    return SnackbarComponent;
}());



/***/ }),

/***/ "./src/app/material-component/stepper/stepper.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/material-component/stepper/stepper.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- row -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <!-- Card column -->\n  <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Stepper</mat-card-title>\n        <mat-card-subtitle>Check the\n          <code class=\"\"><a href=\"https://material.angular.io/components/stepper/overview\">Official Component</a></code>\n        </mat-card-subtitle>\n        <button mat-raised-button (click)=\"isLinear = true\" id=\"toggle-linear\">Enable linear mode</button>\n        <mat-horizontal-stepper [linear]=\"isLinear\">\n          <mat-step [stepControl]=\"firstFormGroup\">\n            <form [formGroup]=\"firstFormGroup\">\n              <ng-template matStepLabel>Fill out your name</ng-template>\n              <mat-form-field>\n                <input matInput placeholder=\"Last name, First name\" formControlName=\"firstCtrl\" required>\n              </mat-form-field>\n              <div>\n                <button mat-raised-button color=\"warn\" matStepperNext>Next</button>\n              </div>\n            </form>\n          </mat-step>\n          <mat-step [stepControl]=\"secondFormGroup\">\n            <form [formGroup]=\"secondFormGroup\">\n              <ng-template matStepLabel>Fill out your address</ng-template>\n              <mat-form-field>\n                <input matInput placeholder=\"Address\" formControlName=\"secondCtrl\" required>\n              </mat-form-field>\n              <div>\n                <button mat-raised-button color=\"accent\" matStepperPrevious>Back</button>\n                <button mat-raised-button color=\"warn\" matStepperNext>Next</button>\n              </div>\n            </form>\n          </mat-step>\n          <mat-step>\n            <ng-template matStepLabel>Done</ng-template>\n            You are now done.\n            <div>\n              <button mat-raised-button color=\"accent\" matStepperPrevious>Back</button>\n            </div>\n          </mat-step>\n        </mat-horizontal-stepper>\n\n      </mat-card-content>\n\n    </mat-card>\n  </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- row -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <!-- Card column -->\n  <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title class=\"p-b-20\">Stepper variants</mat-card-title>\n        \n       <button mat-raised-button (click)=\"isLinear = !isLinear\" id=\"toggle-linear\">\n        {{!isLinear ? 'Enable linear mode' : 'Disable linear mode'}}\n      </button>\n      <mat-vertical-stepper [linear]=\"isLinear\" #stepper>\n        <mat-step [stepControl]=\"firstFormGroup\">\n          <form [formGroup]=\"firstFormGroup\">\n            <ng-template matStepLabel>Fill out your name</ng-template>\n            <mat-form-field>\n              <input matInput placeholder=\"Last name, First name\" formControlName=\"firstCtrl\" required>\n            </mat-form-field>\n            <div>\n              <button mat-button matStepperNext>Next</button>\n            </div>\n          </form>\n        </mat-step>\n        <mat-step [stepControl]=\"secondFormGroup\">\n          <form [formGroup]=\"secondFormGroup\">\n            <ng-template matStepLabel>Fill out your address</ng-template>\n            <mat-form-field>\n              <input matInput placeholder=\"Address\" formControlName=\"secondCtrl\" required>\n            </mat-form-field>\n            <div>\n              <button mat-button matStepperPrevious>Back</button>\n              <button mat-button matStepperNext>Next</button>\n            </div>\n          </form>\n        </mat-step>\n        <mat-step>\n          <ng-template matStepLabel>Done</ng-template>\n          You are now done.\n          <div>\n            <button mat-button matStepperPrevious>Back</button>\n            <button mat-button (click)=\"stepper.reset()\">Reset</button>\n          </div>\n        </mat-step>\n      </mat-vertical-stepper>\n    </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- row -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <!-- Card column -->\n  <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title class=\"p-b-20\">Optional step</mat-card-title>\n        <button mat-raised-button (click)=\"isOptional = !isOptional\">\n          {{!isOptional ? 'Enable optional steps' : 'Disable optional steps'}}\n        </button>\n\n        <mat-horizontal-stepper linear #stepper>\n          <mat-step [stepControl]=\"firstFormGroup\">\n            <form [formGroup]=\"firstFormGroup\">\n              <ng-template matStepLabel>Fill out your name</ng-template>\n              <mat-form-field>\n                <input matInput placeholder=\"Last name, First name\" formControlName=\"firstCtrl\" required>\n              </mat-form-field>\n              <div>\n                <button mat-button matStepperNext>Next</button>\n              </div>\n            </form>\n          </mat-step>\n          <mat-step [stepControl]=\"secondFormGroup\" [optional]=\"isOptional\">\n            <form [formGroup]=\"secondFormGroup\">\n              <ng-template matStepLabel>Fill out your address</ng-template>\n              <mat-form-field>\n                <input matInput placeholder=\"Address\" formControlName=\"secondCtrl\" required>\n              </mat-form-field>\n              <div>\n                <button mat-button matStepperPrevious>Back</button>\n                <button mat-button matStepperNext>Next</button>\n              </div>\n            </form>\n          </mat-step>\n          <mat-step>\n            <ng-template matStepLabel>Done</ng-template>\n            You are now done.\n            <div>\n              <button mat-button matStepperPrevious>Back</button>\n              <button mat-button (click)=\"stepper.reset()\">Reset</button>\n            </div>\n          </mat-step>\n        </mat-horizontal-stepper>\n\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- row -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <!-- Card column -->\n  <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title class=\"p-b-20\">Stepper with editable steps</mat-card-title>\n        <button mat-raised-button (click)=\"isEditable = !isEditable\">\n          {{!isEditable ? 'Enable edit mode' : 'Disable edit mode'}}\n        </button>\n\n        <mat-horizontal-stepper linear #stepper>\n          <mat-step [stepControl]=\"firstFormGroup\" [editable]=\"isEditable\">\n            <form [formGroup]=\"firstFormGroup\">\n              <ng-template matStepLabel>Fill out your name</ng-template>\n              <mat-form-field>\n                <input matInput placeholder=\"Last name, First name\" formControlName=\"firstCtrl\" required>\n              </mat-form-field>\n              <div>\n                <button mat-button matStepperNext>Next</button>\n              </div>\n            </form>\n          </mat-step>\n          <mat-step [stepControl]=\"secondFormGroup\" [editable]=\"isEditable\">\n            <form [formGroup]=\"secondFormGroup\">\n              <ng-template matStepLabel>Fill out your address</ng-template>\n              <mat-form-field>\n                <input matInput placeholder=\"Address\" formControlName=\"secondCtrl\" required>\n              </mat-form-field>\n              <div>\n                <button mat-button matStepperPrevious>Back</button>\n                <button mat-button matStepperNext>Next</button>\n              </div>\n            </form>\n          </mat-step>\n          <mat-step>\n            <ng-template matStepLabel>Done</ng-template>\n            You are now done.\n            <div>\n              <button mat-button matStepperPrevious>Back</button>\n              <button mat-button (click)=\"stepper.reset()\">Reset</button>\n            </div>\n          </mat-step>\n        </mat-horizontal-stepper>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/material-component/stepper/stepper.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/material-component/stepper/stepper.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21hdGVyaWFsLWNvbXBvbmVudC9zdGVwcGVyL3N0ZXBwZXIuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/material-component/stepper/stepper.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/material-component/stepper/stepper.component.ts ***!
  \*****************************************************************/
/*! exports provided: StepperComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StepperComponent", function() { return StepperComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StepperComponent = /** @class */ (function () {
    function StepperComponent(_formBuilder) {
        this._formBuilder = _formBuilder;
        this.isLinear = false;
        this.isOptional = false;
        this.isEditable = false;
    }
    StepperComponent.prototype.ngOnInit = function () {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    };
    StepperComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-stepper',
            template: __webpack_require__(/*! ./stepper.component.html */ "./src/app/material-component/stepper/stepper.component.html"),
            styles: [__webpack_require__(/*! ./stepper.component.scss */ "./src/app/material-component/stepper/stepper.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], StepperComponent);
    return StepperComponent;
}());



/***/ }),

/***/ "./src/app/material-component/tabs/tabs.component.html":
/*!*************************************************************!*\
  !*** ./src/app/material-component/tabs/tabs.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- row -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <!-- Card column -->\n  <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Basic Tab </mat-card-title>\n        <mat-card-subtitle>Check the\n          <code class=\"\"><a href=\"https://material.angular.io/components/tabs/overview\">Official Component</a></code>\n        </mat-card-subtitle>\n      </mat-card-content>\n      <mat-tab-group>\n        <mat-tab label=\"Tab 1\">\n          <mat-card-content>Content 1</mat-card-content>\n        </mat-tab>\n        <mat-tab label=\"Tab 2\">\n          <mat-card-content>Content 2</mat-card-content>\n        </mat-tab>\n      </mat-tab-group>\n    </mat-card>\n  </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- row -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <!-- Card column -->\n  <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Complex Tab Example (Responsive tab)</mat-card-title>\n      </mat-card-content>\n      <mat-tab-group class=\"demo-tab-group\">\n        <mat-tab label=\"Tab 1\">\n          <div class=\"demo-tab-content\">\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue. Phasellus volutpat neque ac dui mattis\n            vulputate. Etiam consequat aliquam cursus. In sodales pretium ultrices. Maecenas lectus est, sollicitudin consectetur\n            felis nec, feugiat ultricies mi. Aliquam erat volutpat. Nam placerat, tortor in ultrices porttitor, orci enim\n            rutrum enim, vel tempor sapien arcu a tellus.\n          </div>\n        </mat-tab>\n        <mat-tab label=\"Tab 2\">\n          <ng-template mat-tab-label>\n            ⭐\n          </ng-template>\n          <div class=\"demo-tab-content\">\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue. Phasellus volutpat neque ac dui mattis\n            vulputate. Etiam consequat aliquam cursus. In sodales pretium ultrices. Maecenas lectus est, sollicitudin consectetur\n            felis nec, feugiat ultricies mi. Aliquam erat volutpat. Nam placerat, tortor in ultrices porttitor, orci enim\n            rutrum enim, vel tempor sapien arcu a tellus.\n          </div>\n        </mat-tab>\n        <mat-tab label=\"Tab 3\" disabled>\n          No content\n        </mat-tab>\n        <mat-tab label=\"Tab 4\">\n          <div class=\"demo-tab-content\">\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue. Phasellus volutpat neque ac dui mattis\n            vulputate. Etiam consequat aliquam cursus. In sodales pretium ultrices. Maecenas lectus est, sollicitudin consectetur\n            felis nec, feugiat ultricies mi. Aliquam erat volutpat. Nam placerat, tortor in ultrices porttitor, orci enim\n            rutrum enim, vel tempor sapien arcu a tellus.\n            <br />\n            <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue. Phasellus volutpat neque\n            ac dui mattis vulputate. Etiam consequat aliquam cursus. In sodales pretium ultrices. Maecenas lectus est, sollicitudin\n            consectetur felis nec, feugiat ultricies mi. Aliquam erat volutpat. Nam placerat, tortor in ultrices porttitor,\n            orci enim rutrum enim, vel tempor sapien arcu a tellus.\n          </div>\n        </mat-tab>\n        <mat-tab label=\"Tab 5\">\n          No content\n        </mat-tab>\n        <mat-tab label=\"Tab 6\">\n          No content\n        </mat-tab>\n      </mat-tab-group>\n    </mat-card>\n  </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- row -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <!-- Card column -->\n  <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Using tabs with a custom label template</mat-card-title>\n        <mat-tab-group>\n          <mat-tab>\n            <ng-template mat-tab-label>\n              <mat-icon class=\"example-tab-icon\">thumb_up</mat-icon>\n              First\n            </ng-template>\n            Content 1\n          </mat-tab>\n\n          <mat-tab>\n            <ng-template mat-tab-label>\n              <mat-icon class=\"example-tab-icon\">thumb_up</mat-icon>\n              Second\n            </ng-template>\n            Content 2\n          </mat-tab>\n\n          <mat-tab>\n            <ng-template mat-tab-label>\n              <mat-icon class=\"example-tab-icon\">thumb_up</mat-icon>\n              Third\n            </ng-template>\n\n            Content 3\n          </mat-tab>\n        </mat-tab-group>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- row -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <!-- Card column -->\n  <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Tag group with dynamic height based on tab contents</mat-card-title>\n        <mat-tab-group dynamicHeight>\n          <mat-tab label=\"Short tab\">\n            <div class=\"example-small-box mat-elevation-z4\">\n              Small content\n            </div>\n          </mat-tab>\n          <mat-tab label=\"Long tab\">\n            <div class=\"example-large-box mat-elevation-z4\">\n              Large content\n            </div>\n          </mat-tab>\n        </mat-tab-group>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- row -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <!-- Card column -->\n  <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Tab group with dynamically changing tabs</mat-card-title>\n        <div>\n          <span class=\"example-input-label\"> Selected tab index: </span>\n          <mat-form-field>\n            <input matInput type=\"number\" [formControl]=\"selected\">\n          </mat-form-field>\n        </div>\n\n        <div>\n          <button mat-raised-button\n                  class=\"example-add-tab-button\"\n                  (click)=\"addTab(selectAfterAdding.checked)\">\n            Add new tab\n          </button>\n          <mat-checkbox #selectAfterAdding> Select tab after adding </mat-checkbox>\n        </div>\n\n        <mat-tab-group [selectedIndex]=\"selected.value\"\n                       (selectedIndexChange)=\"selected.setValue($event)\">\n          <mat-tab *ngFor=\"let tab of tabs; let index = index\" [label]=\"tab\">\n            Contents for {{tab}} tab\n\n            <button mat-raised-button\n                    class=\"example-delete-tab-button\"\n                    [disabled]=\"tabs.length === 1\"\n                    (click)=\"removeTab(index)\">\n              Delete Tab\n            </button>\n          </mat-tab>\n        </mat-tab-group>\n\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- row -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <!-- Card column -->\n  <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Tab group with the headers on the bottom</mat-card-title>\n        <mat-tab-group headerPosition=\"below\">\n          <mat-tab label=\"First\"> Content 1 </mat-tab>\n          <mat-tab label=\"Second\"> Content 2 </mat-tab>\n          <mat-tab label=\"Third\"> Content 3 </mat-tab>\n        </mat-tab-group>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- row -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <!-- Card column -->\n  <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Tab group where the tab content is loaded lazily (when activated)</mat-card-title>\n        <mat-tab-group>\n          <mat-tab label=\"First\">\n            <ng-template matTabContent>\n              Content 1 - Loaded: {{getTimeLoaded(1) | date:'medium'}}\n            </ng-template>\n          </mat-tab>\n          <mat-tab label=\"Second\">\n            <ng-template matTabContent>\n              Content 2 - Loaded: {{getTimeLoaded(2) | date:'medium'}}\n            </ng-template>\n          </mat-tab>\n          <mat-tab label=\"Third\">\n            <ng-template matTabContent>\n              Content 3 - Loaded: {{getTimeLoaded(3) | date:'medium'}}\n            </ng-template>\n          </mat-tab>\n        </mat-tab-group>\n\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- row -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <!-- Card column -->\n  <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Tab group with stretched labels</mat-card-title>\n        <mat-tab-group mat-stretch-tabs class=\"example-stretched-tabs mat-elevation-z4\">\n          <mat-tab label=\"First\"> Content 1 </mat-tab>\n          <mat-tab label=\"Second\"> Content 2 </mat-tab>\n          <mat-tab label=\"Third\"> Content 3 </mat-tab>\n        </mat-tab-group>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- row -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <!-- Card column -->\n  <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Customizing the theme options on the tab group</mat-card-title>\n        <div>\n          <mat-button-toggle-group #colorToggle=\"matButtonToggleGroup\"\n                                   value=\"primary\"\n                                   aria-label=\"Change color\">\n            <mat-button-toggle value=\"primary\"> Primary </mat-button-toggle>\n            <mat-button-toggle value=\"accent\"> Accent </mat-button-toggle>\n          </mat-button-toggle-group>\n          <span class=\"example-button-toggle-label\"> Color </span>\n        </div>\n\n        <div>\n          <mat-button-toggle-group #backgroundColorToggle=\"matButtonToggleGroup\"\n                                   value=\"primary\"\n                                   aria-label=\"Change color\">\n            <mat-button-toggle value=\"primary\"> Primary </mat-button-toggle>\n            <mat-button-toggle value=\"accent\"> Accent </mat-button-toggle>\n          </mat-button-toggle-group>\n          <span class=\"example-button-toggle-label\"> Background Color </span>\n        </div>\n\n        <mat-tab-group [color]=\"colorToggle.value\" [backgroundColor]=\"backgroundColorToggle.value\">\n          <mat-tab label=\"First\"> Content 1 </mat-tab>\n          <mat-tab label=\"Second\"> Content 2 </mat-tab>\n          <mat-tab label=\"Third\"> Content 3 </mat-tab>\n        </mat-tab-group>\n\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- row -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <!-- Card column -->\n  <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Tab group with asynchronously loading tab contents</mat-card-title>\n        <ng-container *ngIf=\"(asyncTabs | async) === null\">\n          Loading tabs...\n        </ng-container>\n\n        <mat-tab-group>\n          <mat-tab *ngFor=\"let tab of asyncTabs | async\">\n            <ng-template mat-tab-label>{{tab.label}}</ng-template>\n            {{tab.content}}\n          </mat-tab>\n        </mat-tab-group>\n\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- row -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <!-- Card column -->\n  <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Basic use of the tab nav bar</mat-card-title>\n        <button mat-raised-button\n          class=\"example-action-button\"\n          (click)=\"toggleBackground()\">\n          Toggle background\n        </button>\n\n        <nav mat-tab-nav-bar [backgroundColor]=\"background\">\n          <a mat-tab-link *ngFor=\"let link of links\"\n             (click)=\"activeLink = link\"\n             [active]=\"activeLink == link\"> {{link}} </a>\n          <a mat-tab-link disabled>Disabled Link</a>\n        </nav>\n\n\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/material-component/tabs/tabs.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/material-component/tabs/tabs.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".demo-tab-group {\n  border: 1px solid #e8e8e8; }\n\n.demo-tab-content {\n  padding: 24px; }\n\n.example-small-box, .example-large-box {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 16px;\n  padding: 16px;\n  border-radius: 8px; }\n\n.example-small-box {\n  height: 100px;\n  width: 100px; }\n\n.example-large-box {\n  height: 300px;\n  width: 300px; }\n\n.example-tab-icon {\n  margin-right: 8px; }\n\n.example-input-label,\n.example-add-tab-button,\n.example-delete-tab-button {\n  margin: 8px; }\n\n.example-stretched-tabs {\n  max-width: 800px; }\n\n.example-button-toggle-label {\n  display: inline-block;\n  margin: 16px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9tYXRlcmlhbC1jb21wb25lbnQvdGFicy90YWJzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsMEJBQXlCLEVBQzFCOztBQUVEO0VBQ0UsY0FBYSxFQUNkOztBQUVEO0VBQ0UsY0FBYTtFQUNiLG9CQUFtQjtFQUNuQix3QkFBdUI7RUFDdkIsYUFBWTtFQUNaLGNBQWE7RUFDYixtQkFBa0IsRUFDbkI7O0FBRUQ7RUFDRSxjQUFhO0VBQ2IsYUFBWSxFQUNiOztBQUVEO0VBQ0UsY0FBYTtFQUNiLGFBQVksRUFDYjs7QUFFRDtFQUNFLGtCQUFpQixFQUNsQjs7QUFFRDs7O0VBR0UsWUFBVyxFQUNaOztBQUVEO0VBQ0UsaUJBQWdCLEVBQ2pCOztBQUVEO0VBQ0Usc0JBQXFCO0VBQ3JCLGFBQVksRUFDYiIsImZpbGUiOiJzcmMvYXBwL21hdGVyaWFsLWNvbXBvbmVudC90YWJzL3RhYnMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZGVtby10YWItZ3JvdXAge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZThlOGU4O1xufVxuXG4uZGVtby10YWItY29udGVudCB7XG4gIHBhZGRpbmc6IDI0cHg7XG59XG5cbi5leGFtcGxlLXNtYWxsLWJveCwgLmV4YW1wbGUtbGFyZ2UtYm94IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1hcmdpbjogMTZweDtcbiAgcGFkZGluZzogMTZweDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xufVxuXG4uZXhhbXBsZS1zbWFsbC1ib3gge1xuICBoZWlnaHQ6IDEwMHB4O1xuICB3aWR0aDogMTAwcHg7XG59XG5cbi5leGFtcGxlLWxhcmdlLWJveCB7XG4gIGhlaWdodDogMzAwcHg7XG4gIHdpZHRoOiAzMDBweDtcbn1cblxuLmV4YW1wbGUtdGFiLWljb24ge1xuICBtYXJnaW4tcmlnaHQ6IDhweDtcbn1cblxuLmV4YW1wbGUtaW5wdXQtbGFiZWwsXG4uZXhhbXBsZS1hZGQtdGFiLWJ1dHRvbixcbi5leGFtcGxlLWRlbGV0ZS10YWItYnV0dG9uIHtcbiAgbWFyZ2luOiA4cHg7XG59XG5cbi5leGFtcGxlLXN0cmV0Y2hlZC10YWJzIHtcbiAgbWF4LXdpZHRoOiA4MDBweDtcbn1cblxuLmV4YW1wbGUtYnV0dG9uLXRvZ2dsZS1sYWJlbCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWFyZ2luOiAxNnB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/material-component/tabs/tabs.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/material-component/tabs/tabs.component.ts ***!
  \***********************************************************/
/*! exports provided: TabsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsComponent", function() { return TabsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
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



var TabsComponent = /** @class */ (function () {
    function TabsComponent() {
        this.tabs = ['First', 'Second', 'Third'];
        this.selected = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](0);
        this.tabLoadTimes = [];
        this.links = ['First', 'Second', 'Third'];
        this.activeLink = this.links[0];
        this.background = '';
        this.asyncTabs = rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"].create(function (observer) {
            setTimeout(function () {
                observer.next([
                    { label: 'First', content: 'Content 1' },
                    { label: 'Second', content: 'Content 2' },
                    { label: 'Third', content: 'Content 3' }
                ]);
            }, 1000);
        });
    }
    TabsComponent.prototype.addTab = function (selectAfterAdding) {
        this.tabs.push('New');
        if (selectAfterAdding) {
            this.selected.setValue(this.tabs.length - 1);
        }
    };
    TabsComponent.prototype.removeTab = function (index) {
        this.tabs.splice(index, 1);
    };
    TabsComponent.prototype.getTimeLoaded = function (index) {
        if (!this.tabLoadTimes[index]) {
            this.tabLoadTimes[index] = new Date();
        }
        return this.tabLoadTimes[index];
    };
    TabsComponent.prototype.toggleBackground = function () {
        this.background = this.background ? '' : 'primary';
    };
    TabsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tabs',
            template: __webpack_require__(/*! ./tabs.component.html */ "./src/app/material-component/tabs/tabs.component.html"),
            styles: [__webpack_require__(/*! ./tabs.component.scss */ "./src/app/material-component/tabs/tabs.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], TabsComponent);
    return TabsComponent;
}());



/***/ }),

/***/ "./src/app/material-component/toolbar/toolbar.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/material-component/toolbar/toolbar.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"no-shadow\">\n  <mat-card-content>\n    <mat-card-title>Toolbar</mat-card-title>\n    <mat-card-subtitle>matToolbar is a container for headers, titles, or actions.\n      <code class=\"\"><a href=\"https://material.angular.io/components/toolbar/overview\">Official Component</a></code>\n    </mat-card-subtitle>\n\n    <p>Basic toolbar:</p>\n    <mat-toolbar>My App</mat-toolbar>\n    <p>The primary color toolbar:</p>\n    <mat-toolbar color=\"primary\">\n      <span>Primary Toolbar</span>\n      <span fxFlex></span>\n      <button mat-button href=\"#\" mat-icon-button>\n        <mat-icon>search</mat-icon>\n      </button>\n      <button mat-button href=\"#\" mat-icon-button>\n        <mat-icon>more_vert</mat-icon>\n      </button>\n    </mat-toolbar>\n    <p>Multiple row</p>\n    <mat-toolbar>\n      <mat-toolbar-row>\n        <span>First Row</span>\n      </mat-toolbar-row>\n\n      <mat-toolbar-row>\n        <span>Second Row</span>\n      </mat-toolbar-row>\n    </mat-toolbar>\n    <p>Positining toolbar</p>\n    <mat-toolbar color=\"primary\">\n      <span>Application Title</span>\n\n      <!-- This fills the remaining space of the current row -->\n      <span class=\"example-fill-remaining-space\"></span>\n\n      <span>Right Aligned Text</span>\n    </mat-toolbar>\n    <p>An accent toolbar using the second toolbar row:</p>\n    <mat-toolbar color=\"accent\">\n      <mat-toolbar-row>\n        <span>Second Line Toolbar</span>\n      </mat-toolbar-row>\n    </mat-toolbar>\n    <p>A primary toolbar using the third toolbar row:</p>\n    <mat-toolbar class=\"bg-success\" color=\"warn\">\n      <mat-toolbar-row>\n        <span>Custom Toolbar</span>\n      </mat-toolbar-row>\n\n      <mat-toolbar-row>\n        <span>Second Line</span>\n        <span class=\"example-spacer\"></span>\n        <mat-icon class=\"example-icon\">verified_user</mat-icon>\n      </mat-toolbar-row>\n\n      <mat-toolbar-row>\n        <span>Third Line</span>\n        <span class=\"example-spacer\"></span>\n        <mat-icon class=\"example-icon\">favorite</mat-icon>\n        <mat-icon class=\"example-icon\">delete</mat-icon>\n      </mat-toolbar-row>\n    </mat-toolbar>\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/material-component/toolbar/toolbar.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/material-component/toolbar/toolbar.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".no-shadow mat-toolbar {\n  box-shadow: none; }\n\n.example-fill-remaining-space {\n  flex: 1 1 auto; }\n\n.example-icon {\n  padding: 0 14px; }\n\n.example-spacer {\n  flex: 1 1 auto; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9tYXRlcmlhbC1jb21wb25lbnQvdG9vbGJhci90b29sYmFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQWdCLEVBQ2pCOztBQUNEO0VBR0UsZUFBYyxFQUNmOztBQUNEO0VBQ0UsZ0JBQWUsRUFDaEI7O0FBRUQ7RUFDRSxlQUFjLEVBQ2YiLCJmaWxlIjoic3JjL2FwcC9tYXRlcmlhbC1jb21wb25lbnQvdG9vbGJhci90b29sYmFyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm5vLXNoYWRvdyBtYXQtdG9vbGJhciB7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG59XG4uZXhhbXBsZS1maWxsLXJlbWFpbmluZy1zcGFjZSB7XG4gIC8vIFRoaXMgZmlsbHMgdGhlIHJlbWFpbmluZyBzcGFjZSwgYnkgdXNpbmcgZmxleGJveC5cbiAgLy8gRXZlcnkgdG9vbGJhciByb3cgdXNlcyBhIGZsZXhib3ggcm93IGxheW91dC5cbiAgZmxleDogMSAxIGF1dG87XG59XG4uZXhhbXBsZS1pY29uIHtcbiAgcGFkZGluZzogMCAxNHB4O1xufVxuXG4uZXhhbXBsZS1zcGFjZXIge1xuICBmbGV4OiAxIDEgYXV0bztcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/material-component/toolbar/toolbar.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/material-component/toolbar/toolbar.component.ts ***!
  \*****************************************************************/
/*! exports provided: ToolbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarComponent", function() { return ToolbarComponent; });
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

var ToolbarComponent = /** @class */ (function () {
    function ToolbarComponent() {
    }
    ToolbarComponent.prototype.ngOnInit = function () { };
    ToolbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-toolbar',
            template: __webpack_require__(/*! ./toolbar.component.html */ "./src/app/material-component/toolbar/toolbar.component.html"),
            styles: [__webpack_require__(/*! ./toolbar.component.scss */ "./src/app/material-component/toolbar/toolbar.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ToolbarComponent);
    return ToolbarComponent;
}());



/***/ }),

/***/ "./src/app/material-component/tooltip/tooltip.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/material-component/tooltip/tooltip.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"100%\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Basic Tooltip</mat-card-title>\n        <mat-card-subtitle>The Angular Material tooltip provides a text label that is displayed when the user hovers over or longpresses an\n          element. add\n          <code>matTooltip=\"yourtext\"</code> to any element </mat-card-subtitle>\n        <button mat-raised-button\n        matTooltip=\"Info about the action\"\n        aria-label=\"Button that displays a tooltip when focused or hovered over\">\n        Action\n      </button>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<mat-card>\n  <mat-card-content>\n    <mat-card-title>Tooltip with custom position</mat-card-title>\n    <mat-card-subtitle>The Angular Material tooltip provides a text label that is displayed when the user hovers over or longpresses an element.</mat-card-subtitle>\n\n    <div class=\"example-tooltip-host\" matTooltip=\"Tooltip!\" [matTooltipPosition]=\"position\">\n      <span>Show tooltip</span>\n      <mat-form-field>\n        <mat-select class=\"example-select\" [(ngModel)]=\"position\">\n          <mat-option value=\"before\">Before</mat-option>\n          <mat-option value=\"after\">After</mat-option>\n          <mat-option value=\"above\">Above</mat-option>\n          <mat-option value=\"below\">Below</mat-option>\n          <mat-option value=\"left\">Left</mat-option>\n          <mat-option value=\"right\">Right</mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n  </mat-card-content>\n</mat-card>\n\n<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"100%\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Tooltip that can have a custom class applied.</mat-card-title>\n        <button mat-raised-button\n              matTooltip=\"Info about the action\"\n              matTooltipClass=\"example-tooltip-red\"\n              aria-label=\"Button that shows a red tooltip\"\n              >\n        Red-tooltip Action\n      </button>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"100%\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Tooltip with a show and hide delay</mat-card-title>\n        <mat-form-field class=\"example-user-input\">\n          <input matInput placeholder=\"Show delay (milliseconds)\"\n                 type=\"number\"\n                 aria-label=\"Adds a delay between hovering over the button and displaying the tooltip\"\n                 [formControl]=\"showDelay\">\n        </mat-form-field>\n\n        <mat-form-field class=\"example-user-input\">\n          <input matInput placeholder=\"Hide delay (milliseconds)\"\n                 type=\"number\"\n                 aria-label=\"Adds a delay between hovering away from the button and hiding the tooltip\"\n                 [formControl]=\"hideDelay\">\n        </mat-form-field>\n\n        <button mat-raised-button\n                matTooltip=\"Info about the action\"\n                [matTooltipShowDelay]=\"showDelay.value\"\n                [matTooltipHideDelay]=\"hideDelay.value\"\n                aria-label=\"Button that displays a tooltip with a customized delay in showing and hiding\">\n          Action\n        </button>\n\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"100%\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Tooltip that can be disabled</mat-card-title>\n        <button mat-raised-button\n        matTooltip=\"Info about the action\"\n        [matTooltipDisabled]=\"disabled.value\"\n        aria-label=\"Button that displays a tooltip that can be programatically disabled\">\n          Action\n        </button>\n\n        <mat-checkbox [formControl]=\"disabled\" class=\"example-disabled-checkbox\">\n          Tooltip disabled\n        </mat-checkbox>\n\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"100%\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Tooltip that can be manually shown/hidden.</mat-card-title>\n        <div>\n          <span> Mouse over to </span>\n          <button mat-button\n                  (mouseenter)=\"tooltip.show()\"\n                  aria-label=\"Button that progamatically shows a tooltip on another button\"\n                  class=\"example-action-button\">\n            show\n          </button>\n          <button mat-button\n                  (mouseenter)=\"tooltip.hide()\"\n                  aria-label=\"Button that progamatically hides a tooltip on another button\"\n                  class=\"example-action-button\">\n            hide\n          </button>\n          <button mat-button\n                  (mouseenter)=\"tooltip.toggle()\"\n                  aria-label=\"Button that progamatically toggles a tooltip on another button to show/hide\"\n                  class=\"example-action-button\">\n            toggle show/hide\n          </button>\n        </div>\n\n        <button mat-raised-button #tooltip=\"matTooltip\"\n                matTooltip=\"Info about the action\"\n                matTooltipPosition=\"right\"\n                aria-tooltip=\"Button that displays and hides a tooltip triggered by other buttons\">\n          Action\n        </button>\n\n\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n\n\n<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"100%\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Tooltip with a changing message</mat-card-title>\n        <mat-form-field class=\"example-user-input\">\n          <input matInput placeholder=\"Tooltip message\" [formControl]=\"message\">\n        </mat-form-field>\n\n        <button mat-raised-button [matTooltip]=\"message.value\" aria-label=\"Button that displays a tooltip with a custom message\" class=\"m-l-20\">\n          Action\n        </button>\n\n\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"100%\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Tooltip with a show and hide delay</mat-card-title>\n        <button mat-raised-button\n                matTooltip=\"By default, I delay\"\n                aria-label=\"Button that displays a tooltip that has custom delays through a default config\">\n          Button with delay-default tooltip\n        </button>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/material-component/tooltip/tooltip.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/material-component/tooltip/tooltip.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-tooltip-host {\n  display: inline-flex;\n  align-items: center;\n  margin: 50px; }\n\n.example-select {\n  margin: 0 10px; }\n\n.example-button {\n  margin-top: 16px; }\n\n.example-tooltip-red {\n  background: #b71c1c; }\n\n.example-user-input {\n  display: block;\n  width: 150px; }\n\n.example-disabled-checkbox {\n  margin-left: 8px; }\n\n.example-action-button {\n  margin-top: 16px; }\n\n.example-user-input {\n  margin-right: 8px; }\n\n.example-button {\n  display: block;\n  width: 48px;\n  margin: 80px auto 400px; }\n\n.example-container {\n  height: 200px;\n  overflow: auto;\n  border: 1px solid #ccc; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9tYXRlcmlhbC1jb21wb25lbnQvdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UscUJBQW9CO0VBQ3BCLG9CQUFtQjtFQUNuQixhQUFZLEVBQ2I7O0FBRUQ7RUFDRSxlQUFjLEVBQ2Y7O0FBQ0Q7RUFDRSxpQkFBZ0IsRUFDakI7O0FBRUQ7RUFDRSxvQkFBbUIsRUFDcEI7O0FBRUQ7RUFDRSxlQUFjO0VBQ2QsYUFBWSxFQUNiOztBQUVEO0VBQ0UsaUJBQWdCLEVBQ2pCOztBQUVEO0VBQ0UsaUJBQWdCLEVBQ2pCOztBQUVEO0VBQ0Usa0JBQWlCLEVBQ2xCOztBQUVEO0VBQ0UsZUFBYztFQUNkLFlBQVc7RUFDWCx3QkFBdUIsRUFDeEI7O0FBRUQ7RUFDRSxjQUFhO0VBQ2IsZUFBYztFQUNkLHVCQUFzQixFQUN2QiIsImZpbGUiOiJzcmMvYXBwL21hdGVyaWFsLWNvbXBvbmVudC90b29sdGlwL3Rvb2x0aXAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZXhhbXBsZS10b29sdGlwLWhvc3Qge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luOiA1MHB4O1xufVxuXG4uZXhhbXBsZS1zZWxlY3Qge1xuICBtYXJnaW46IDAgMTBweDtcbn1cbi5leGFtcGxlLWJ1dHRvbiB7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG59XG5cbi5leGFtcGxlLXRvb2x0aXAtcmVkIHtcbiAgYmFja2dyb3VuZDogI2I3MWMxYztcbn1cblxuLmV4YW1wbGUtdXNlci1pbnB1dCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTUwcHg7XG59XG5cbi5leGFtcGxlLWRpc2FibGVkLWNoZWNrYm94IHtcbiAgbWFyZ2luLWxlZnQ6IDhweDtcbn1cblxuLmV4YW1wbGUtYWN0aW9uLWJ1dHRvbiB7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG59XG5cbi5leGFtcGxlLXVzZXItaW5wdXQge1xuICBtYXJnaW4tcmlnaHQ6IDhweDtcbn1cblxuLmV4YW1wbGUtYnV0dG9uIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiA0OHB4O1xuICBtYXJnaW46IDgwcHggYXV0byA0MDBweDtcbn1cblxuLmV4YW1wbGUtY29udGFpbmVyIHtcbiAgaGVpZ2h0OiAyMDBweDtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/material-component/tooltip/tooltip.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/material-component/tooltip/tooltip.component.ts ***!
  \*****************************************************************/
/*! exports provided: myCustomTooltipDefaults, TooltipComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "myCustomTooltipDefaults", function() { return myCustomTooltipDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipComponent", function() { return TooltipComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



/** Custom options the configure the tooltip's default show/hide delays. */
var myCustomTooltipDefaults = {
    showDelay: 1000,
    hideDelay: 1000,
    touchendHideDelay: 1000,
};
var TooltipComponent = /** @class */ (function () {
    function TooltipComponent() {
        this.position = 'before';
        this.showDelay = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](1000);
        this.hideDelay = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](2000);
        this.disabled = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](false);
        this.message = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('Info about the action');
        this.positionOptions = ['below', 'above', 'left', 'right'];
        this.position1 = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.positionOptions[0]);
    }
    TooltipComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tooltip',
            template: __webpack_require__(/*! ./tooltip.component.html */ "./src/app/material-component/tooltip/tooltip.component.html"),
            styles: [__webpack_require__(/*! ./tooltip.component.scss */ "./src/app/material-component/tooltip/tooltip.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_TOOLTIP_DEFAULT_OPTIONS"], useValue: myCustomTooltipDefaults }
            ],
        })
    ], TooltipComponent);
    return TooltipComponent;
}());



/***/ })

}]);
//# sourceMappingURL=material-component-material-module.js.map