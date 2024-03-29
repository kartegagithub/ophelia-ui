import React from "react";
import MenuClass from "./MenuClass";
declare const Menu: React.FC<MenuProps>;
export default Menu;
declare var menuProps: {
    menu: MenuClass;
    searchKey?: string;
    stateKey?: any;
    setMenuCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    menuCollapsed: boolean;
    id?: string;
    children?: React.ReactNode;
    theme?: MenuTheme;
};
export declare type MenuProps = typeof menuProps;
declare var menuTheme: {
    Class?: string;
    Levels: {
        Selected: {
            "1"?: string;
            "2"?: string;
            "3"?: string;
        };
    };
};
export declare type MenuTheme = typeof menuTheme;
