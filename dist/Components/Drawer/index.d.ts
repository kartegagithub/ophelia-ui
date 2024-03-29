import React from "react";
declare const Drawer: React.FC<DrawerProps>;
export default Drawer;
declare var drawerProps: {
    id?: string;
    position?: "top-left" | "top-center" | "top-right" | "left" | "right" | "center" | "bottom-left" | "bottom-center" | "bottom-right" | "custom";
    backdrop?: boolean;
    visible?: boolean;
    fullWidth?: boolean;
    children?: React.ReactNode;
    swipe?: boolean;
    swipeElement?: string | React.JSX.Element;
    theme?: DrawerTheme;
};
export declare type DrawerProps = typeof drawerProps;
declare var drawerTheme: {
    Class?: string;
};
export declare type DrawerTheme = typeof drawerTheme;
