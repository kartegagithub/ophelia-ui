import React from "react";
import MenuItemClass from "./MenuItemClass";
import MenuClass from "./MenuClass";
import { MenuTheme } from "./Menu";
declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
declare var menuItemProps: {
    menu: MenuClass;
    item: MenuItemClass;
    id?: string;
    searchKey?: string;
    stateKey?: any;
    setMenuCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
    menuCollapsed?: boolean;
    children?: React.ReactNode;
    selected?: boolean;
    listener?: {
        onSelect: Function;
        onRightIconClick: Function;
        onLeftIconClick: Function;
    };
    theme?: MenuTheme;
};
export declare type MenuItemProps = typeof menuItemProps;
