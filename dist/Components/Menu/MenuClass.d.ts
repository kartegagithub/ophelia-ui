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
    ItemVisiblityFn?: ((menu: MenuClass, item: MenuItemClass) => boolean) | undefined;
    Search?: ((menu: MenuClass, key: string) => MenuClass) | undefined;
    SearchItem?: ((item: MenuItemClass, key: string) => void) | undefined;
    UnselectItems: (menu: MenuClass, item?: MenuItemClass | undefined) => void;
    Init?: ((menu: MenuClass, initialPath?: string | undefined) => void) | undefined;
}
