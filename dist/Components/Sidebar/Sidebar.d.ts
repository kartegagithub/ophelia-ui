import React from "react";
import SidebarMenuClass from "./SidebarMenuClass";
declare const Sidebar: React.FC<{
    menu: SidebarMenuClass;
    id?: string;
    stateKey?: any;
    children?: React.ReactNode;
}>;
export default Sidebar;
declare var sidebarTheme: {
    RootClass?: string;
    ToogleClass?: string;
};
export declare type SidebarTheme = typeof sidebarTheme;
