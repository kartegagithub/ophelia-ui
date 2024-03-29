import React from "react";
import { IconProps } from "../Icon/Icon";
declare const Alert: React.FC<AlertProps>;
export default Alert;
declare var alertProps: {
    id?: string;
    visible?: boolean;
    children?: React.ReactNode;
    text?: string;
    type?: "error" | "success" | "warning" | "info" | "custom";
    iconProps?: IconProps;
    theme?: AlertTheme;
};
export declare type AlertProps = typeof alertProps;
declare var alertTheme: {
    Class?: string;
    TextClass?: string;
    Types?: {
        info?: string;
        warning?: string;
        error?: string;
        success?: string;
    };
};
export declare type AlertTheme = typeof alertTheme;
