/// <reference types="react" />
import BaseField from "./baseField";
export default class DropdownField<P> extends BaseField<P & {
    name: string;
    text?: string;
    value?: string;
    placeholder?: string;
    options?: Array<{
        text: string;
        value: string;
    }>;
    displayProp?: string;
    valueProp?: string;
    low?: number;
    high?: number;
    listener?: any;
    multiple?: boolean;
}> {
    renderInput(): import("react").JSX.Element;
}
