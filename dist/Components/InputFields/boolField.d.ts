/// <reference types="react" />
import BaseField from "./baseField";
export default class BoolField<P> extends BaseField<P & {
    name: string;
    text?: string;
    value?: string;
    listener?: any;
}> {
    renderInput(): import("react").JSX.Element;
}
