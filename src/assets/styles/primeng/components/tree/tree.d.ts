import {
    AfterContentInit,
    OnDestroy,
    EventEmitter,
    OnInit,
    QueryList,
    TemplateRef,
    ElementRef,
} from '@angular/core';
import { TreeNode } from '../common/treenode';
import { TreeDragDropService } from '../common/treedragdropservice';
import { Subscription } from 'rxjs';
import { BlockableUI } from '../common/blockableui';
export declare class UITreeNode implements OnInit {
    static ICON_CLASS: string;
    node: TreeNode;
    parentNode: TreeNode;
    root: boolean;
    index: number;
    firstChild: boolean;
    lastChild: boolean;
    tree: Tree;
    constructor(tree: any);
    draghoverPrev: boolean;
    draghoverNext: boolean;
    draghoverNode: boolean;
    ngOnInit(): void;
    getIcon(): string;
    isLeaf(): boolean;
    toggle(event: Event): void;
    expand(event: Event): void;
    collapse(event: Event): void;
    onNodeClick(event: MouseEvent): void;
    onNodeTouchEnd(): void;
    onNodeRightClick(event: MouseEvent): void;
    isSelected(): boolean;
    onDropPoint(event: Event, position: number): void;
    processPointDrop(dragNode: any, dragNodeIndex: any, position: any): void;
    onDropPointDragOver(event: any): void;
    onDropPointDragEnter(event: Event, position: number): void;
    onDropPointDragLeave(event: Event): void;
    onDragStart(event: any): void;
    onDragStop(event: any): void;
    onDropNodeDragOver(event: any): void;
    onDropNode(event: any): void;
    processNodeDrop(dragNode: any): void;
    onDropNodeDragEnter(event: any): void;
    onDropNodeDragLeave(event: any): void;
    onKeyDown(event: KeyboardEvent): void;
    findNextSiblingOfAncestor(nodeElement: any): any;
    findLastVisibleDescendant(nodeElement: any): any;
    getParentNodeElement(nodeElement: any): any;
    focusNode(element: any): void;
}
export declare class Tree implements OnInit, AfterContentInit, OnDestroy, BlockableUI {
    el: ElementRef;
    dragDropService: TreeDragDropService;
    value: TreeNode[];
    selectionMode: string;
    selection: any;
    selectionChange: EventEmitter<any>;
    onNodeSelect: EventEmitter<any>;
    onNodeUnselect: EventEmitter<any>;
    onNodeExpand: EventEmitter<any>;
    onNodeCollapse: EventEmitter<any>;
    onNodeContextMenuSelect: EventEmitter<any>;
    onNodeDrop: EventEmitter<any>;
    style: any;
    styleClass: string;
    contextMenu: any;
    layout: string;
    draggableScope: any;
    droppableScope: any;
    draggableNodes: boolean;
    droppableNodes: boolean;
    metaKeySelection: boolean;
    propagateSelectionUp: boolean;
    propagateSelectionDown: boolean;
    loading: boolean;
    loadingIcon: string;
    emptyMessage: string;
    ariaLabel: string;
    ariaLabelledBy: string;
    validateDrop: boolean;
    filter: boolean;
    filterBy: string;
    filterMode: string;
    filterPlaceholder: string;
    nodeTrackBy: Function;
    templates: QueryList<any>;
    templateMap: any;
    nodeTouched: boolean;
    dragNodeTree: Tree;
    dragNode: TreeNode;
    dragNodeSubNodes: TreeNode[];
    dragNodeIndex: number;
    dragNodeScope: any;
    dragHover: boolean;
    dragStartSubscription: Subscription;
    dragStopSubscription: Subscription;
    filteredNodes: TreeNode[];
    constructor(el: ElementRef, dragDropService: TreeDragDropService);
    ngOnInit(): void;
    readonly horizontal: boolean;
    ngAfterContentInit(): void;
    onNodeClick(event: any, node: TreeNode): void;
    onNodeTouchEnd(): void;
    onNodeRightClick(event: MouseEvent, node: TreeNode): void;
    findIndexInSelection(node: TreeNode): number;
    syncNodeOption(node: any, parentNodes: any, option: any, value?: any): void;
    hasFilteredNodes(): number;
    getNodeWithKey(key: string, nodes: TreeNode[]): any;
    propagateUp(node: TreeNode, select: boolean): void;
    propagateDown(node: TreeNode, select: boolean): void;
    isSelected(node: TreeNode): boolean;
    isSingleSelectionMode(): boolean;
    isMultipleSelectionMode(): boolean;
    isCheckboxSelectionMode(): boolean;
    isNodeLeaf(node: any): boolean;
    getRootNode(): TreeNode[];
    getTemplateForNode(node: TreeNode): TemplateRef<any>;
    onDragOver(event: any): void;
    onDrop(event: any): void;
    onDragEnter(event: any): void;
    onDragLeave(event: any): void;
    allowDrop(dragNode: TreeNode, dropNode: TreeNode, dragNodeScope: any): boolean;
    isValidDragScope(dragScope: any): boolean;
    onFilter(event: any): void;
    findFilteredNodes(node: any, paramsWithoutNode: any): boolean;
    isFilterMatched(
        node: any,
        {
            searchFields,
            filterText,
            isStrictMode,
        }: {
            searchFields: any;
            filterText: any;
            isStrictMode: any;
        },
    ): boolean;
    getBlockableElement(): HTMLElement;
    ngOnDestroy(): void;
}
export declare class TreeModule {}
