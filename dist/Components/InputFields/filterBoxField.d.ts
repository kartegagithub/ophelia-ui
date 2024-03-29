/// <reference types="react" />
import BaseField from "./baseField";
import { defaultProps } from "react-select/base";
export default class FilterBoxField<P> extends BaseField<P & {
    name: string;
    text?: string;
    value?: string;
    placeholder?: string;
    remoteDataSource?: {
        DisplayProp?: string;
        ValueProp?: string;
        CallFunction: (input: string, page: number, pageSize: number) => Promise<any>;
    };
    displayProp?: string;
    valueProp?: string;
    listener?: any;
    multiple?: boolean;
} & typeof defaultProps> {
    constructor(props: any);
    Searching: boolean;
    promiseOptions: (input: string, callback: (options: any[]) => void) => void;
    renderInput(): import("react").JSX.Element;
}
