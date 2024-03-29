import React from "react";
import { IconProps } from "../Icon";
declare const Spinner: React.FC<SpinnerProps>;
export default Spinner;
declare var spinnerProps: {
    text?: string;
    visible?: boolean;
    theme?: SpinnerTheme;
    image?: string | any | React.JSX.Element;
};
export declare type SpinnerProps = typeof spinnerProps;
declare var spinnerTheme: {
    Class?: string;
    TextClass?: string;
    Image?: React.JSX.Element | string | undefined | IconProps;
};
export declare type SpinnerTheme = typeof spinnerTheme;
