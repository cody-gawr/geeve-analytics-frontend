import {
    ElementRef,
    OnInit,
    AfterViewInit,
    AfterContentInit,
    AfterViewChecked,
    OnDestroy,
    Renderer2,
    EventEmitter,
    ChangeDetectorRef,
    TemplateRef,
    QueryList,
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { SelectItem } from '../common/selectitem';
import { ControlValueAccessor } from '@angular/forms';
export declare const MULTISELECT_VALUE_ACCESSOR: any;
export declare class MultiSelectItem {
    option: SelectItem;
    selected: boolean;
    disabled: boolean;
    visible: boolean;
    itemSize: number;
    template: TemplateRef<any>;
    maxSelectionLimitReached: boolean;
    onClick: EventEmitter<any>;
    onKeydown: EventEmitter<any>;
    onOptionClick(event: Event): void;
    onOptionKeydown(event: Event): void;
}
export declare class MultiSelect
    implements
        OnInit,
        AfterViewInit,
        AfterContentInit,
        AfterViewChecked,
        OnDestroy,
        ControlValueAccessor
{
    el: ElementRef;
    renderer: Renderer2;
    private cd;
    scrollHeight: string;
    _defaultLabel: string;
    defaultLabel: string;
    style: any;
    styleClass: string;
    panelStyle: any;
    panelStyleClass: string;
    inputId: string;
    disabled: boolean;
    readonly: boolean;
    filter: boolean;
    filterPlaceHolder: string;
    overlayVisible: boolean;
    tabindex: number;
    appendTo: any;
    dataKey: string;
    name: string;
    displaySelectedLabel: boolean;
    maxSelectedLabels: number;
    selectionLimit: number;
    selectedItemsLabel: string;
    showToggleAll: boolean;
    emptyFilterMessage: string;
    resetFilterOnHide: boolean;
    dropdownIcon: string;
    optionLabel: string;
    showHeader: boolean;
    autoZIndex: boolean;
    baseZIndex: number;
    filterBy: string;
    virtualScroll: boolean;
    itemSize: number;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    ariaFilterLabel: string;
    containerViewChild: ElementRef;
    filterInputChild: ElementRef;
    footerFacet: any;
    headerFacet: any;
    templates: QueryList<any>;
    onChange: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    onClick: EventEmitter<any>;
    onPanelShow: EventEmitter<any>;
    onPanelHide: EventEmitter<any>;
    value: any[];
    onModelChange: Function;
    onModelTouched: Function;
    overlay: HTMLDivElement;
    valuesAsString: string;
    focus: boolean;
    filled: boolean;
    documentClickListener: any;
    selfClick: boolean;
    panelClick: boolean;
    filterValue: string;
    visibleOptions: SelectItem[];
    disabledSelectedOptions: SelectItem[];
    filtered: boolean;
    itemTemplate: TemplateRef<any>;
    selectedItemsTemplate: TemplateRef<any>;
    headerCheckboxFocus: boolean;
    _options: any[];
    maxSelectionLimitReached: boolean;
    documentResizeListener: any;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef);
    options: any[];
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    writeValue(value: any): void;
    checkSelectionLimit(): void;
    updateFilledState(): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    onOptionClick(event: any): void;
    isSelected(value: any): boolean;
    findSelectionIndex(val: any): number;
    toggleAll(event: Event): void;
    isAllChecked(): boolean;
    isAllVisibleOptionsChecked(): boolean;
    getEnabledOptionCount(): number;
    setDisabledSelectedOptions(): void;
    show(): void;
    onOverlayAnimationStart(event: AnimationEvent): void;
    appendOverlay(): void;
    restoreOverlayAppend(): void;
    alignOverlay(): void;
    hide(): void;
    close(event: any): void;
    onMouseclick(event: any, input: any): void;
    onInputFocus(event: any): void;
    onInputBlur(event: any): void;
    onOptionKeydown(event: any): void;
    findNextItem(event: any): any;
    findPrevItem(event: any): any;
    onKeydown(event: KeyboardEvent): void;
    updateLabel(): void;
    findLabelByValue(val: any): string;
    onFilter(): void;
    activateFilter(): void;
    isItemVisible(option: SelectItem): boolean;
    getVisibleOptions(): SelectItem[];
    onHeaderCheckboxFocus(): void;
    onHeaderCheckboxBlur(): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    bindDocumentResizeListener(): void;
    unbindDocumentResizeListener(): void;
    onWindowResize(): void;
    onOverlayHide(): void;
    ngOnDestroy(): void;
}
export declare class MultiSelectModule {}
