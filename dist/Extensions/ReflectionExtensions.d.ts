export declare function getKeyByValue(object: any, value: any): string;
export declare function getQueryString(object?: any, url?: string, disableCache?: boolean): string;
export declare const randomId: () => string;
export declare const typeCheck: (element: any, typesToCheck: string[]) => boolean;
export declare const deepMap: (children: any, types: string[]) => Array<any>;
export declare const getReferencePath: (propName?: string) => string;
export declare const getObjectValue: (obj: any, propName?: string, defaultValue?: any) => any;
export declare const setObjectValue: (obj: any, propName?: string, value?: any) => void;
export declare function functionExists(obj?: any, funcName?: string): boolean;
export declare function execInTry(fn: Function, catchFn: ((error: any) => void)): any;
export declare const removeEmptyProps: (obj: any) => any;
export declare const enumToArray: (type: any, translateFn?: (key: string) => string | undefined) => {
    value: any;
    text: string;
}[];
