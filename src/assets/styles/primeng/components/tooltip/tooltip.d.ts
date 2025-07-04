import { ElementRef, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
export declare class Tooltip implements AfterViewInit, OnDestroy {
    el: ElementRef;
    zone: NgZone;
    tooltipPosition: string;
    tooltipEvent: string;
    appendTo: any;
    positionStyle: string;
    tooltipStyleClass: string;
    tooltipZIndex: string;
    disabled: boolean;
    escape: boolean;
    showDelay: number;
    hideDelay: number;
    life: number;
    container: any;
    styleClass: string;
    tooltipText: any;
    showTimeout: any;
    hideTimeout: any;
    active: boolean;
    _text: string;
    mouseEnterListener: Function;
    mouseLeaveListener: Function;
    clickListener: Function;
    focusListener: Function;
    blurListener: Function;
    resizeListener: any;
    constructor(el: ElementRef, zone: NgZone);
    ngAfterViewInit(): void;
    onMouseEnter(e: Event): void;
    onMouseLeave(e: Event): void;
    onFocus(e: Event): void;
    onBlur(e: Event): void;
    onClick(e: Event): void;
    activate(): void;
    deactivate(): void;
    text: string;
    create(): void;
    show(): void;
    hide(): void;
    updateText(): void;
    align(): void;
    getHostOffset(): {
        left: any;
        top: any;
    };
    alignRight(): void;
    alignLeft(): void;
    alignTop(): void;
    alignBottom(): void;
    preAlign(position: string): void;
    isOutOfBounds(): boolean;
    onWindowResize(e: Event): void;
    bindDocumentResizeListener(): void;
    unbindDocumentResizeListener(): void;
    unbindEvents(): void;
    remove(): void;
    clearShowTimeout(): void;
    clearHideTimeout(): void;
    clearTimeouts(): void;
    ngOnDestroy(): void;
}
export declare class TooltipModule {}
