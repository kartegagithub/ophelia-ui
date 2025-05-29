import { getCaseLocale } from "../../Extensions"
import AppClient from "../../AppClient"
import MenuItemClass from "./MenuItemClass"

export default class MenuClass{
    Data?: any = undefined
    Items?: Array<MenuItemClass> = []
    Name?: string = undefined
    SearchInProgress?: boolean = false
    RTL?: boolean = false
    PreventURLCache?: boolean = true
    ItemClassConfig?: {className: string, selectedClassName: string}
    ItemLoader?: ((menu: MenuClass, item: MenuItemClass) => Promise<Array<MenuItemClass>>);
    ItemVisiblityFn? = (menu: MenuClass, item: MenuItemClass) => {
        return true
    }
    Search? = (AppClient: AppClient | undefined, menu: MenuClass, key: string) => {
        menu.SearchInProgress = true;
        if(!key) menu.SearchInProgress = false;
        if(menu.SearchInProgress){
            key = key.toLocaleLowerCase(getCaseLocale());
            menu.Items?.forEach((item) => this.SearchItem && this.SearchItem(AppClient, item, key))
        }
        return menu;
    }
    SearchItem? = (AppClient: AppClient | undefined, item: MenuItemClass, key: string) => {
        item.SearchVisiblity = false;
        if(!item.Component){
            if(item.Text){
                if(!item.TranslatedText) item.TranslatedText = AppClient?.Translate(item.Text);
                if(item.TranslatedText && item.TranslatedText.toLocaleLowerCase(getCaseLocale()).indexOf(key) > -1) item.SearchVisiblity = true;
                else item.SearchVisiblity = item.Text.toLocaleLowerCase(getCaseLocale()).indexOf(key) > -1;
            }
            if(item.SubItems){
                item.SubItems.forEach((subItem) => this.SearchItem && this.SearchItem(AppClient, subItem, key))
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