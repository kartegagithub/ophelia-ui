import React from "react";
declare const Progress: React.FC<{
    text?: string;
    visible?: boolean;
    className?: string;
    barClassName?: string;
    width?: string;
    showWidthAsText?: boolean;
}>;
export default Progress;
declare var progressTheme: {
    Class?: string;
    BarClass?: string;
};
export declare type ProgressTheme = typeof progressTheme;
