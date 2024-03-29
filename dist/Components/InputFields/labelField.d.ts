/// <reference types="react" />
import BaseField from "./baseField";
export default class LabelField<P> extends BaseField<P & {
    name: string;
    text?: string;
    value?: string;
    defaultValue?: string;
    listener?: any;
}> {
    renderInput(): import("react").JSX.Element;
}
