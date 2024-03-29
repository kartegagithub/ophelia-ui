export default class ClientCookies {
    get: (sKey: string) => string | undefined;
    set: (sKey: string, sValue: string, vEnd?: string | number | Date | undefined, sPath?: string | undefined, sDomain?: string | undefined, bSecure?: boolean | undefined) => boolean;
    remove: (sKey: string, sPath?: string | undefined, sDomain?: string | undefined) => boolean;
    has: (sKey: string) => boolean;
    keys: () => string[];
}
