export declare function findData(data: Array<any>, propOne: string, value: any, resultType?: "index" | "object"): any;
export declare function findKeyInObject(data: any, key: string): string | undefined;
export declare function filterData(data: Array<any>, propOne: string, value: any, equals: boolean): false | any[];
export declare const yearSelectBox: (startDate: any) => {
    id: any;
    name: any;
}[];
export declare const loopInRange: (from: number, to: number, fn?: (i: number) => any) => any[];
export declare const findInArray: (arr: Array<any>, find: any, prop?: string | undefined) => {
    value: any;
    index: number;
};
export declare const selectDefaultValues: (selectedValue: any, prop: string, allValues?: any[] | undefined, splitters?: RegExp) => Array<any>;
export declare const filterInArray: (arr: Array<any>, find: string, prop?: string | undefined) => Array<any>;
export declare const getNextElement: (arr?: any[] | undefined, lastIndex?: number | undefined) => any;
