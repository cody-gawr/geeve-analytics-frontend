export interface IPlatformService {
    isBrowser: boolean;
    isServer: boolean;
}
export declare class PlatformService implements IPlatformService {
    private platformId;
    constructor(platformId: any);
    readonly isBrowser: boolean;
    readonly isServer: boolean;
}
