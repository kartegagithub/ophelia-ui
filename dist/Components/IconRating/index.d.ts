import React from "react";
import { IconProps } from "../Icon";
declare const IconRating: React.FC<{
    text?: string;
    count?: number;
    value?: number;
    visible?: boolean;
    className?: string;
    textClassName?: string;
    image?: string | React.JSX.Element;
    filledImage?: string | React.JSX.Element;
    onClick?: ((index: number) => void);
}>;
export default IconRating;
declare var iconRatingTheme: {
    Class?: string;
    TextClass?: string;
    Icon?: React.JSX.Element | string | undefined | IconProps;
    FilledIcon?: React.JSX.Element | string | undefined | IconProps;
};
export declare type IconRatingTheme = typeof iconRatingTheme;
