import React from "react";
import { IconProps } from "../Icon";
declare const Notification: React.FC<NotificationProps>;
export default Notification;
declare var notificationProps: {
    type?: "error" | "info" | "success" | "warning";
    title?: string;
    content?: string;
    ContainerClass?: string;
    theme?: NotificationTheme;
    id?: string;
    text?: string;
    image?: string | any | React.JSX.Element;
};
export declare type NotificationProps = typeof notificationProps;
declare var NotificationTheme: {
    InfoContainer?: string;
    ErrorContainer?: string;
    TitleContainer?: string;
    ContentClass?: string;
    ImageClass?: string;
    InfoImage?: React.JSX.Element | string | undefined | IconProps;
    SuccessImage?: React.JSX.Element | string | undefined | IconProps;
    ErrorImage?: React.JSX.Element | string | undefined | IconProps;
    WarningImage?: React.JSX.Element | string | undefined | IconProps;
};
export declare type NotificationTheme = typeof NotificationTheme;
