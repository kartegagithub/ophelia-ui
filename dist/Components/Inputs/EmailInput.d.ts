import { AdditionalHtmlAttributes } from "../../Enums/additionalHtmlAttributes";
import React, { InputHTMLAttributes } from "react";
export default class EmailInput<P> extends React.Component<P & AdditionalHtmlAttributes & InputHTMLAttributes<HTMLInputElement>, {}> {
    render(): React.ReactNode;
}
