import { ElementRef, OnDestroy, Renderer2, NgZone } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { Confirmation } from '../common/confirmation';
import { ConfirmationService } from '../common/confirmationservice';
import { Subscription } from 'rxjs';
export declare class ConfirmDialog implements OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    private confirmationService;
    zone: NgZone;
    visible: boolean;
    header: string;
    icon: string;
    message: string;
    style: any;
    styleClass: string;
    acceptIcon: string;
    acceptLabel: string;
    acceptVisible: boolean;
    rejectIcon: string;
    rejectLabel: string;
    rejectVisible: boolean;
    acceptButtonStyleClass: string;
    rejectButtonStyleClass: string;
    closeOnEscape: boolean;
    blockScroll: boolean;
    rtl: boolean;
    closable: boolean;
    appendTo: any;
    key: string;
    autoZIndex: boolean;
    baseZIndex: number;
    transitionOptions: string;
    footer: any;
    contentViewChild: ElementRef;
    confirmation: Confirmation;
    _visible: boolean;
    documentEscapeListener: any;
    mask: any;
    container: HTMLDivElement;
    contentContainer: HTMLDivElement;
    subscription: Subscription;
    preWidth: number;
    _width: any;
    _height: any;
    constructor(
        el: ElementRef,
        renderer: Renderer2,
        confirmationService: ConfirmationService,
        zone: NgZone,
    );
    width: any;
    height: any;
    onAnimationStart(event: AnimationEvent): void;
    setDimensions(): void;
    appendContainer(): void;
    restoreAppend(): void;
    enableModality(): void;
    disableModality(): void;
    close(event: Event): void;
    hide(): void;
    moveOnTop(): void;
    bindGlobalListeners(): void;
    unbindGlobalListeners(): void;
    onOverlayHide(): void;
    ngOnDestroy(): void;
    accept(): void;
    reject(): void;
}
export declare class ConfirmDialogModule {}
