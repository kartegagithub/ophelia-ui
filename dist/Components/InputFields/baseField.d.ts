import React, { SyntheticEvent } from "react";
import { InputFieldsTheme } from "./Theme";
export default class BaseField<P> extends React.Component<P & {
    name: string;
    text?: string;
    labelVisible?: boolean;
    value?: any;
    checked?: boolean;
    format?: string;
    listener?: any;
    type?: string;
    required?: boolean;
    theme?: InputFieldsTheme;
}, {
    hasValidationError: boolean;
    key: string;
    value: any;
}> {
    Theme?: InputFieldsTheme;
    constructor(props: any);
    render(): React.ReactNode;
    renderInput(): React.JSX.Element;
    onChange(e: SyntheticEvent | any): Promise<boolean>;
    Validate: () => boolean;
    GetValue(): any;
    GetProps(): any;
}
