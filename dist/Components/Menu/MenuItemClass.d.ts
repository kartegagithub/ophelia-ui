import { MouseEventHandler } from "react";
import MenuClass from "./MenuClass";
export default class MenuItemClass {
    Text?: string;
    LeftIcon?: string | React.JSX.Element | undefined | ((selected: boolean) => undefined);
    RightIcon?: string | React.JSX.Element | undefined;
    IconClassName?: string;
    ClassName?: string;
    Location?: string;
    RequireLogin?: boolean;
    Role?: string | number | undefined | string[] | number[];
    OnClick?: MouseEventHandler<HTMLAnchorElement>;
    SubItems?: Array<MenuItemClass>;
    Component?: React.JSX.Element | ((menuCollapsed: boolean, menu: MenuClass) => React.JSX.Element) | undefined;
    RTL?: boolean;
    Visible?: boolean;
    SearchVisiblity?: boolean;
    Selected?: boolean;
    MenuCode?: string;
    Level?: number;
    Init?: ((item: MenuItemClass, initialPath?: string | undefined) => void) | undefined;
}
