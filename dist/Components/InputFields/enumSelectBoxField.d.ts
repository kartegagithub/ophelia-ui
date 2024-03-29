/// <reference types="react" />
import BaseField from "./baseField";
export default class EnumSelectBoxField<P> extends BaseField<P & {
    name: string;
    text?: string;
    value?: string;
    placeholder?: string;
    options: Array<{
        text: string;
        value: string;
    }>;
    enumSelectionType?: any;
    listener?: any;
    translateFn?: (key: string) => string;
}> {
    renderInput(): import("react").JSX.Element;
}
