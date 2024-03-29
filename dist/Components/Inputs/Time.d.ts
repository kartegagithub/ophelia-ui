import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "../../Enums/additionalHtmlAttributes";
export default class Time<P> extends React.Component<P & AdditionalHtmlAttributes & InputHTMLAttributes<HTMLInputElement>, {}> {
    render(): React.ReactNode;
}
