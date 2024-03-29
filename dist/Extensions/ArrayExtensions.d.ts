export declare function findData(data: Array<any>, propOne: string, value: any, resultType?: "index" | "object"): any;
export declare function findKeyInObject(data: any, key: string): string;
export declare function filterData(data: Array<any>, propOne: string, value: any, equals: boolean): false | any[];
export declare const yearSelectBox: (startDate: any) => {
    id: any;
    name: any;
}[];
export declare const loopInRange: (from: number, to: number, fn?: (i: number) => any) => any[];
export declare const findInArray: (arr: Array<any>, find: any, prop?: string) => {
    value: any;
    index: number;
};
export declare const selectDefaultValues: (selectedValue: any, prop: string, allValues?: Array<any>, splitters?: RegExp) => Array<any>;
export declare const filterInArray: (arr: Array<any>, find: string, prop?: string) => Array<any>;
export declare const getNextElement: (arr?: Array<any>, lastIndex?: number) => any;
