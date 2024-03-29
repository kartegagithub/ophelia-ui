import MenuItemClass from "./MenuItemClass";
export default class MenuClass {
    Data?: any;
    Items?: Array<MenuItemClass>;
    Name?: string;
    ClassName?: string;
    SubMenuClassName?: string;
    SearchInProgress?: boolean;
    RTL?: boolean;
    ItemClassConfig?: {
        className: string;
        selectedClassName: string;
    };
    ItemVisiblityFn?: (menu: MenuClass, item: MenuItemClass) => boolean;
    Search?: (menu: MenuClass, key: string) => MenuClass;
    SearchItem?: (item: MenuItemClass, key: string) => void;
    UnselectItems: (menu: MenuClass, item?: MenuItemClass) => void;
    Init?: (menu: MenuClass, initialPath?: string) => void;
}
