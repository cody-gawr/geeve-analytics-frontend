import { PlatformService } from './platform.service';
export declare class WindowRef {
    private _platform;
    constructor(_platform: PlatformService);
    getNativeWindow(): Window;
}
