import React from "react";
import { IconProps } from "../Icon/Icon";
declare const Toast: React.FC<ToastProps>;
export default Toast;
declare var toastProps: {
    id?: string;
    text?: string;
    visible?: boolean;
    showCloseButton?: boolean;
    type?: "error" | "success" | "warning" | "info" | "custom";
    image?: string | any | React.JSX.Element;
    theme?: ToastTheme;
};
export declare type ToastProps = typeof toastProps;
declare var toastTheme: {
    Class?: string;
    TextClass?: string;
    CloseButtonClass?: string;
    ImageClass?: string;
    InfoImage?: React.JSX.Element | string | undefined | IconProps;
    SuccessImage?: React.JSX.Element | string | undefined | IconProps;
    ErrorImage?: React.JSX.Element | string | undefined | IconProps;
    WarningImage?: React.JSX.Element | string | undefined | IconProps;
};
export declare type ToastTheme = typeof toastTheme;
