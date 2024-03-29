import React from "react";
import BaseField from "./baseField";
export default class TextAreaField<P> extends BaseField<P & {
    name: string;
    text?: string;
    value?: string;
    listener?: any;
}> {
    renderInput(): React.JSX.Element;
}
