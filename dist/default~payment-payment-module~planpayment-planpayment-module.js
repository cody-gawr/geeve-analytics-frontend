(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~payment-payment-module~planpayment-planpayment-module"],{

/***/ "./node_modules/@nomadreservations/ngx-stripe/fesm5/nomadreservations-ngx-stripe.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@nomadreservations/ngx-stripe/fesm5/nomadreservations-ngx-stripe.js ***!
  \******************************************************************************************/
/*! exports provided: DocumentRef, LazyStripeAPILoader, NgxStripeModule, PlatformService, STRIPE_OPTIONS, STRIPE_PUBLISHABLE_KEY, StripeCardComponent, StripeService, WindowRef, isBankAccount, isBankAccountData, isPii, isPiiData, isSourceData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentRef", function() { return DocumentRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyStripeAPILoader", function() { return LazyStripeAPILoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxStripeModule", function() { return NgxStripeModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformService", function() { return PlatformService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STRIPE_OPTIONS", function() { return STRIPE_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STRIPE_PUBLISHABLE_KEY", function() { return STRIPE_PUBLISHABLE_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StripeCardComponent", function() { return StripeCardComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StripeService", function() { return StripeService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WindowRef", function() { return WindowRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBankAccount", function() { return isBankAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBankAccountData", function() { return isBankAccountData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPii", function() { return isPii; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPiiData", function() { return isPiiData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSourceData", function() { return isSourceData; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/@nomadreservations/ngx-stripe/node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






function isSourceData(sourceData) {
    return 'type' in sourceData;
}

var STRIPE_PUBLISHABLE_KEY = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('Stripe Publishable Key');
var STRIPE_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('Stripe Options');

function isBankAccount(account) {
    return account === 'bank_account';
}
function isBankAccountData(bankAccountData) {
    return ('country' in bankAccountData &&
        'currency' in bankAccountData &&
        'routing_number' in bankAccountData &&
        'account_number' in bankAccountData &&
        'account_holder_name' in bankAccountData &&
        'account_holder_type' in bankAccountData &&
        (bankAccountData.account_holder_type === 'individual' ||
            bankAccountData.account_holder_type === 'company'));
}
function isPii(pii) {
    return pii === 'pii';
}
function isPiiData(piiData) {
    return 'personal_id_number' in piiData;
}

var PlatformService = /** @class */ (function () {
    function PlatformService(platformId) {
        this.platformId = platformId;
    }
    Object.defineProperty(PlatformService.prototype, "isBrowser", {
        get: function () {
            return Object(_angular_common__WEBPACK_IMPORTED_MODULE_3__["isPlatformBrowser"])(this.platformId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformService.prototype, "isServer", {
        get: function () {
            return Object(_angular_common__WEBPACK_IMPORTED_MODULE_3__["isPlatformServer"])(this.platformId);
        },
        enumerable: true,
        configurable: true
    });
    PlatformService = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__param"])(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"])),
        Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:paramtypes", [Object])
    ], PlatformService);
    return PlatformService;
}());

var DocumentRef = /** @class */ (function () {
    function DocumentRef(_platform) {
        this._platform = _platform;
    }
    DocumentRef.prototype.getNativeDocument = function () {
        if (this._platform.isBrowser) {
            return document;
        }
        return {};
    };
    DocumentRef = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:paramtypes", [PlatformService])
    ], DocumentRef);
    return DocumentRef;
}());

var WindowRef = /** @class */ (function () {
    function WindowRef(_platform) {
        this._platform = _platform;
    }
    WindowRef.prototype.getNativeWindow = function () {
        if (this._platform.isBrowser) {
            return window;
        }
        return {};
    };
    WindowRef = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:paramtypes", [PlatformService])
    ], WindowRef);
    return WindowRef;
}());

var LazyStripeAPILoader = /** @class */ (function () {
    function LazyStripeAPILoader(window, document, _platform) {
        this.window = window;
        this.document = document;
        this._platform = _platform;
        this.status = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({
            error: false,
            loaded: false,
            loading: false
        });
    }
    LazyStripeAPILoader.prototype.asStream = function () {
        this.load();
        return this.status.asObservable();
    };
    LazyStripeAPILoader.prototype.isReady = function () {
        return this.status.getValue().loaded;
    };
    LazyStripeAPILoader.prototype.load = function () {
        var _this = this;
        if (this._platform.isServer) {
            return;
        }
        if (this.window.getNativeWindow().hasOwnProperty('Stripe')) {
            this.status.next({
                error: false,
                loaded: true,
                loading: false
            });
        }
        else {
            if (!this.status.getValue().loaded && !this.status.getValue().loading) {
                this.status.next(Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, this.status.getValue(), { loading: true }));
                var script = this.document
                    .getNativeDocument()
                    .createElement('script');
                script.type = 'text/javascript';
                script.async = true;
                script.defer = true;
                script.src = 'https://js.stripe.com/v3/';
                script.onload = function () {
                    _this.status.next({
                        error: false,
                        loaded: true,
                        loading: false
                    });
                };
                script.onerror = function () {
                    _this.status.next({
                        error: true,
                        loaded: false,
                        loading: false
                    });
                };
                this.document.getNativeDocument().body.appendChild(script);
            }
        }
    };
    LazyStripeAPILoader = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:paramtypes", [WindowRef,
            DocumentRef,
            PlatformService])
    ], LazyStripeAPILoader);
    return LazyStripeAPILoader;
}());

var StripeService = /** @class */ (function () {
    function StripeService(key, options, loader, window, _platform) {
        this.key = key;
        this.options = options;
        this.loader = loader;
        this.window = window;
        this._platform = _platform;
        this.stripeChanged$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"]();
        this.stripe = {};
        this.changeKey(this.key, this.options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1))
            .subscribe(function () { });
    }
    StripeService.prototype.changeKey = function (key, options) {
        var _this = this;
        var obs = this.loader.asStream().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (status) { return status.loaded === true; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function () {
            if (!_this.window.getNativeWindow()) {
                return;
            }
            var Stripe = _this.window.getNativeWindow().Stripe;
            if (key) {
                _this.stripe = options
                    ? Stripe(key, options)
                    : Stripe(key);
                _this.stripeChanged$.next(_this.stripe);
            }
            return _this.stripe;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["publishLast"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["refCount"])());
        obs.subscribe();
        return obs;
    };
    StripeService.prototype.elements = function (options) {
        var _this = this;
        return this.stripeChanged$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function () { return _this.stripe.elements(options); }));
    };
    StripeService.prototype.createToken = function (a, b) {
        if (isBankAccount(a) && isBankAccountData(b)) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this.stripe.createToken(a, b));
        }
        else if (isPii(a) && isPiiData(b)) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this.stripe.createToken(a, b));
        }
        else {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this.stripe.createToken(a, b));
        }
    };
    StripeService.prototype.handleCardSetup = function (clientSecret, element, cardSetupOptions) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this.stripe.handleCardSetup(clientSecret, element, cardSetupOptions));
    };
    StripeService.prototype.createSource = function (a, b) {
        if (isSourceData(a)) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this.stripe.createSource(a));
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this.stripe.createSource(a, b));
    };
    StripeService.prototype.retrieveSource = function (source) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this.stripe.retrieveSource(source));
    };
    StripeService = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__param"])(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(STRIPE_PUBLISHABLE_KEY)),
        Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__param"])(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(STRIPE_OPTIONS)),
        Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:paramtypes", [String, Object, LazyStripeAPILoader,
            WindowRef,
            PlatformService])
    ], StripeService);
    return StripeService;
}());

var StripeCardComponent = /** @class */ (function () {
    function StripeCardComponent(stripeService) {
        this.stripeService = stripeService;
        this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.complete = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.error = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.options$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({});
        this.elementsOptions$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({});
    }
    Object.defineProperty(StripeCardComponent.prototype, "options", {
        set: function (optionsIn) {
            this.options$.next(optionsIn);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StripeCardComponent.prototype, "elementsOptions", {
        set: function (optionsIn) {
            this.elementsOptions$.next(optionsIn);
        },
        enumerable: true,
        configurable: true
    });
    StripeCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        var elements$ = this.elementsOptions$.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (options) {
            if (Object.keys(options).length > 0) {
                return _this.stripeService.elements(options);
            }
            return _this.stripeService.elements();
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])(elements$, this.options$.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (options) { return Boolean(options); }))).subscribe(function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__read"])(_a, 2), elements = _b[0], options = _b[1];
            if (_this.card) {
                _this.element = elements.create('card', options);
                _this.element.mount(_this.card.nativeElement);
                _this.element.on('change', function (changedCard) {
                    _this.change.emit({
                        card: changedCard,
                        element: _this.element
                    });
                    if (changedCard.complete) {
                        _this.complete.emit({
                            card: changedCard,
                            element: _this.element
                        });
                    }
                    if (changedCard.error) {
                        _this.error.emit(changedCard.error);
                    }
                });
            }
        });
    };
    StripeCardComponent.prototype.getCard = function () {
        return this.element;
    };
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Object)
    ], StripeCardComponent.prototype, "change", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Object)
    ], StripeCardComponent.prototype, "complete", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Object)
    ], StripeCardComponent.prototype, "error", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('card'),
        Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], StripeCardComponent.prototype, "card", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Object),
        Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:paramtypes", [Object])
    ], StripeCardComponent.prototype, "options", null);
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Object),
        Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:paramtypes", [Object])
    ], StripeCardComponent.prototype, "elementsOptions", null);
    StripeCardComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngx-stripe-card',
            template: "<div class=\"field\" #card></div>"
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:paramtypes", [StripeService])
    ], StripeCardComponent);
    return StripeCardComponent;
}());

var NgxStripeModule = /** @class */ (function () {
    function NgxStripeModule() {
    }
    NgxStripeModule_1 = NgxStripeModule;
    NgxStripeModule.forRoot = function (publishableKey, options) {
        return {
            ngModule: NgxStripeModule_1,
            providers: [
                LazyStripeAPILoader,
                StripeService,
                PlatformService,
                WindowRef,
                DocumentRef,
                {
                    provide: STRIPE_PUBLISHABLE_KEY,
                    useValue: publishableKey
                },
                {
                    provide: STRIPE_OPTIONS,
                    useValue: options
                }
            ]
        };
    };
    var NgxStripeModule_1;
    NgxStripeModule = NgxStripeModule_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [StripeCardComponent],
            exports: [StripeCardComponent]
        })
    ], NgxStripeModule);
    return NgxStripeModule;
}());


//# sourceMappingURL=nomadreservations-ngx-stripe.js.map


/***/ }),

/***/ "./node_modules/@nomadreservations/ngx-stripe/node_modules/tslib/tslib.es6.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@nomadreservations/ngx-stripe/node_modules/tslib/tslib.es6.js ***!
  \************************************************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ })

}]);
//# sourceMappingURL=default~payment-payment-module~planpayment-planpayment-module.js.map