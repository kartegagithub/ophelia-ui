/// <reference types="react" />
import BaseField from "./baseField";
export default class TimeField<P> extends BaseField<P & {
    name: string;
    text?: string;
    value?: string;
    format?: string;
    listener?: any;
}> {
    renderInput(): import("react").JSX.Element;
}
