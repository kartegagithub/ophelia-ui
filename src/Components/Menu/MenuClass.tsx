import AppClient from "../../AppClient"
import MenuItemClass from "./MenuItemClass"

export default class MenuClass{
    Data?: any = undefined
    Items?: Array<MenuItemClass> = []
    Name?: string = undefined
    SearchInProgress?: boolean = false
    RTL?: boolean = false
    ItemClassConfig?: {className: string, selectedClassName: string}
    ItemVisiblityFn? = (menu: MenuClass, item: MenuItemClass) => {
        return true
    }
    Search? = (AppClient: AppClient | undefined, menu: MenuClass, key: string) => {
        menu.SearchInProgress = true;
        if(!key) menu.SearchInProgress = false;
        if(menu.SearchInProgress){
            key = key.toLocaleLowerCase();
            menu.Items?.forEach((item) => this.SearchItem && this.SearchItem(AppClient, item, key))
        }
        return menu;
    }
    SearchItem? = (AppClient: AppClient | undefined, item: MenuItemClass, key: string) => {
        item.SearchVisiblity = false;
        if(!item.Component){
            if(item.Text){
                var translatedText: string | undefined = item.Text;
                if(AppClient && AppClient.Translate) translatedText = AppClient.Translate(item.Text);
                if(translatedText && translatedText.toLocaleLowerCase().indexOf(key) > -1) item.SearchVisiblity = true;
                else item.SearchVisiblity = item.Text.toLocaleLowerCase().indexOf(key) > -1;
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