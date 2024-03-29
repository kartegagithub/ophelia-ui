import React from "react";
declare const Panel: React.FC<{
    headerText?: string;
    leftIcon?: string | React.JSX.Element | undefined;
    rightIcon?: string | React.JSX.Element | undefined;
    collapsed?: boolean;
    id?: string;
    children?: React.ReactNode;
}>;
export default Panel;
declare var panelTheme: {
    RootClass?: string;
    HeaderClass?: string;
    HeaderTextClass?: string;
};
export declare type PanelTheme = typeof panelTheme;
