export default class ClientCookies {
    get: (sKey: string) => string | undefined;
    set: (sKey: string, sValue: string, vEnd?: number | string | Date, sPath?: string, sDomain?: string, bSecure?: boolean) => boolean;
    remove: (sKey: string, sPath?: string, sDomain?: string) => boolean;
    has: (sKey: string) => boolean;
    keys: () => string[];
}
