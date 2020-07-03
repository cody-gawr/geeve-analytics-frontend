import { PlatformService } from './platform.service';
export declare class DocumentRef {
    private _platform;
    constructor(_platform: PlatformService);
    getNativeDocument(): Document;
}
