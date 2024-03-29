import MenuItemClass from "./MenuItemClass"
import _ from "lodash-es"

export default class MenuClass{
    Data?: any = undefined
    Items?: Array<MenuItemClass> = []
    Name?: string = undefined
    ClassName?: string = undefined
    SubMenuClassName?: string = undefined
    SearchInProgress?: boolean = false
    RTL?: boolean = false
    ItemClassConfig?: {className: string, selectedClassName: string}
    ItemVisiblityFn? = (menu: MenuClass, item: MenuItemClass) => {
        return true
    }
    Search? = (menu: MenuClass, key: string) => {
        menu.SearchInProgress = true;
        if(!key) menu.SearchInProgress = false;
        if(menu.SearchInProgress){
            key = key.toLocaleLowerCase();
            menu.Items?.forEach((item) => this.SearchItem && this.SearchItem(item, key))
        }
        return menu;
    }
    SearchItem? = (item: MenuItemClass, key: string) => {
        item.SearchVisiblity = false;
        if(!item.Component){
            if(item.Text) item.SearchVisiblity = item.Text.toLocaleLowerCase().indexOf(key) > -1;
            if(item.SubItems){
                item.SubItems.forEach((subItem) => this.SearchItem && this.SearchItem(subItem, key))
                if(item.SubItems.find((subItem) => subItem.SearchVisiblity === true)) item.SearchVisiblity = true
            }
        }
    }
    UnselectItems = (menu: MenuClass, item?: MenuItemClass) => {
        var items = menu.Items;
        if(item) items = item.SubItems;

        items?.forEach((tmpItem) => { tmpItem.Selected = false; this.UnselectItems(menu, tmpItem) } )
    }
    Init? = (menu: MenuClass, initialPath?: string) => {
        menu.Items?.forEach((item) => {
            if(!item.Init) item.Init = new MenuItemClass().Init;
            if(item.Init) item.Init(item, initialPath)
        });
    }
}