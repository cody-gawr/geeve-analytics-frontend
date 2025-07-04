import {
    ElementRef,
    AfterViewInit,
    AfterViewChecked,
    EventEmitter,
    OnDestroy,
    TemplateRef,
    QueryList,
    Renderer2,
    ChangeDetectorRef,
} from '@angular/core';
export declare class Carousel implements AfterViewChecked, AfterViewInit, OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    cd: ChangeDetectorRef;
    numVisible: number;
    firstVisible: number;
    headerText: string;
    circular: boolean;
    breakpoint: number;
    responsive: boolean;
    autoplayInterval: number;
    effectDuration: any;
    easing: string;
    pageLinks: number;
    style: any;
    styleClass: string;
    onPage: EventEmitter<any>;
    templates: QueryList<any>;
    _value: any[];
    itemTemplate: TemplateRef<any>;
    left: any;
    items: any;
    columns: number;
    page: number;
    valuesChanged: any;
    interval: any;
    anchorPageLinks: any[];
    mobileDropdownOptions: any[];
    selectDropdownOptions: any[];
    shrinked: boolean;
    containerViewChild: ElementRef;
    viewportViewChild: ElementRef;
    itemsViewChild: ElementRef;
    documentResponsiveListener: any;
    differ: any;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef);
    ngAfterContentInit(): void;
    value: any[];
    handleDataChange(): void;
    ngAfterViewChecked(): void;
    ngAfterViewInit(): void;
    updateLinks(): void;
    updateDropdown(): void;
    updateMobileDropdown(): void;
    render(): void;
    calculateItemWidths(): void;
    calculateColumns(): void;
    onNextNav(): void;
    onPrevNav(): void;
    setPageWithLink(event: any, p: number): void;
    setPage(p: any, enforce?: boolean): void;
    onDropdownChange(val: string): void;
    readonly displayPageLinks: boolean;
    readonly displayPageDropdown: boolean;
    readonly totalPages: number;
    routerDisplay(): boolean;
    updateState(): void;
    startAutoplay(): void;
    stopAutoplay(): void;
    ngOnDestroy(): void;
}
export declare class CarouselModule {}
