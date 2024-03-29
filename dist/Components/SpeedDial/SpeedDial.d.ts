import React from "react";
import { IconProps } from "../Icon/Icon";
declare var SpeedDialButton: {
    ID: string;
    Tooltip?: boolean;
    TooltipText?: string;
    ClassName?: string;
    Location?: string;
    OnClick?: ((e: any) => void);
    TooltipPosition?: string;
    Icon?: string | React.JSX.Element | IconProps;
};
export declare type SpeedDialButton = typeof SpeedDialButton;
declare const SpeedDial: React.FC<SpeedDialProps>;
export default SpeedDial;
declare var speedDialProps: {
    id?: string;
    open?: boolean;
    image?: string | IconProps | React.JSX.Element;
    buttons?: Array<SpeedDialButton>;
    children?: React.ReactNode;
    theme?: SpeedDialTheme;
};
export declare type SpeedDialProps = typeof speedDialProps;
declare var speedDialTheme: {
    Class?: string;
    MenuClass?: string;
    MainButtonClass?: string;
    DialButtonClass?: string;
    Image?: React.JSX.Element | string | undefined | IconProps;
};
export declare type SpeedDialTheme = typeof speedDialTheme;
