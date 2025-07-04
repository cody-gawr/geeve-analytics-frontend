import {
    ElementRef,
    AfterViewChecked,
    AfterContentInit,
    QueryList,
    TemplateRef,
    EventEmitter,
} from '@angular/core';
export declare class OrderList implements AfterViewChecked, AfterContentInit {
    el: ElementRef;
    header: string;
    style: any;
    styleClass: string;
    listStyle: any;
    responsive: boolean;
    filterBy: string;
    filterPlaceholder: string;
    metaKeySelection: boolean;
    dragdrop: boolean;
    controlsPosition: string;
    ariaFilterLabel: string;
    selectionChange: EventEmitter<any>;
    trackBy: Function;
    onReorder: EventEmitter<any>;
    onSelectionChange: EventEmitter<any>;
    onFilterEvent: EventEmitter<any>;
    listViewChild: ElementRef;
    templates: QueryList<any>;
    itemTemplate: TemplateRef<any>;
    _selection: any[];
    movedUp: boolean;
    movedDown: boolean;
    itemTouched: boolean;
    draggedItemIndex: number;
    dragOverItemIndex: number;
    dragging: boolean;
    filterValue: string;
    visibleOptions: any[];
    _value: any[];
    constructor(el: ElementRef);
    selection: any[];
    ngAfterContentInit(): void;
    ngAfterViewChecked(): void;
    value: any[];
    onItemClick(event: any, item: any, index: any): void;
    onFilterKeyup(event: any): void;
    filter(): void;
    isItemVisible(item: any): boolean;
    onItemTouchEnd(event: any): void;
    isSelected(item: any): boolean;
    moveUp(event: any): void;
    moveTop(event: any): void;
    moveDown(event: any): void;
    moveBottom(event: any): void;
    onDragStart(event: DragEvent, index: number): void;
    onDragOver(event: DragEvent, index: number): void;
    onDragLeave(event: DragEvent): void;
    onDrop(event: DragEvent, index: number): void;
    onDragEnd(event: DragEvent): void;
    onListMouseMove(event: MouseEvent): void;
    onItemKeydown(event: KeyboardEvent, item: any, index: Number): void;
    findNextItem(item: any): any;
    findPrevItem(item: any): any;
}
export declare class OrderListModule {}
