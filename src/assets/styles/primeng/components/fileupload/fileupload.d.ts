import {
    OnDestroy,
    EventEmitter,
    TemplateRef,
    AfterViewInit,
    AfterContentInit,
    QueryList,
    ElementRef,
    NgZone,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Message } from '../common/message';
import { BlockableUI } from '../common/blockableui';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
export declare class FileUpload implements AfterViewInit, AfterContentInit, OnDestroy, BlockableUI {
    private el;
    sanitizer: DomSanitizer;
    zone: NgZone;
    private http;
    name: string;
    url: string;
    method: string;
    multiple: boolean;
    accept: string;
    disabled: boolean;
    auto: boolean;
    withCredentials: boolean;
    maxFileSize: number;
    invalidFileSizeMessageSummary: string;
    invalidFileSizeMessageDetail: string;
    invalidFileTypeMessageSummary: string;
    invalidFileTypeMessageDetail: string;
    invalidFileLimitMessageDetail: string;
    invalidFileLimitMessageSummary: string;
    style: any;
    styleClass: string;
    previewWidth: number;
    chooseLabel: string;
    uploadLabel: string;
    cancelLabel: string;
    showUploadButton: boolean;
    showCancelButton: boolean;
    mode: string;
    headers: HttpHeaders;
    customUpload: boolean;
    fileLimit: number;
    onBeforeUpload: EventEmitter<any>;
    onSend: EventEmitter<any>;
    onUpload: EventEmitter<any>;
    onError: EventEmitter<any>;
    onClear: EventEmitter<any>;
    onRemove: EventEmitter<any>;
    onSelect: EventEmitter<any>;
    onProgress: EventEmitter<any>;
    uploadHandler: EventEmitter<any>;
    templates: QueryList<any>;
    advancedFileInput: ElementRef;
    basicFileInput: ElementRef;
    content: ElementRef;
    files: File[];
    _files: File[];
    progress: number;
    dragHighlight: boolean;
    msgs: Message[];
    fileTemplate: TemplateRef<any>;
    contentTemplate: TemplateRef<any>;
    toolbarTemplate: TemplateRef<any>;
    uploadedFileCount: number;
    focus: boolean;
    uploading: boolean;
    duplicateIEEvent: boolean;
    constructor(el: ElementRef, sanitizer: DomSanitizer, zone: NgZone, http: HttpClient);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    onFileSelect(event: any): void;
    isFileSelected(file: File): boolean;
    isIE11(): boolean;
    validate(file: File): boolean;
    private isFileTypeValid;
    getTypeClass(fileType: string): string;
    isWildcard(fileType: string): boolean;
    getFileExtension(file: File): string;
    isImage(file: File): boolean;
    onImageLoad(img: any): void;
    upload(): void;
    clear(): void;
    remove(event: Event, index: number): void;
    isFileLimitExceeded(): boolean;
    isChooseDisabled(): boolean;
    checkFileLimit(): void;
    clearInputElement(): void;
    clearIEInput(): void;
    hasFiles(): boolean;
    onDragEnter(e: any): void;
    onDragOver(e: any): void;
    onDragLeave(event: any): void;
    onDrop(event: any): void;
    onFocus(): void;
    onBlur(): void;
    formatSize(bytes: any): string;
    onSimpleUploaderClick(event: Event): void;
    getBlockableElement(): HTMLElement;
    ngOnDestroy(): void;
}
export declare class FileUploadModule {}
