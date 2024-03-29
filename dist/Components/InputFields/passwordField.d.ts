/// <reference types="react" />
import BaseField from "./baseField";
export default class PasswordField<P> extends BaseField<P & {
    name: string;
    text?: string;
    listener?: any;
}> {
    renderInput(): import("react").JSX.Element;
}
