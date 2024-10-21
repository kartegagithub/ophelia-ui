import Router from "next/router";
import { randomId, trimChars } from "../Extensions";

export class UrlHandlerClass{
    Initialized: boolean = false
    RouteData: any = {};
    ReverseRouteData: any = {};
    OnRouteNotFound?: (path: string) => Promise<undefined | Array<RouteItem>>;
    LanguageKeys: Array<{key: string, lang: string | number}> = []
    DefaultLanguage?: string = undefined
    InstanceID: string
    
    constructor(){
        this.InstanceID = randomId();
    }

    CopyTo(handler: UrlHandlerClass){
        handler.DefaultLanguage = this.DefaultLanguage;
        handler.LanguageKeys = this.LanguageKeys;
        handler.RouteData = this.RouteData;
        handler.Initialized = true;
    }
    Destroy(){
        this.DefaultLanguage = "";
        this.LanguageKeys = [];
        this.RouteData = {};
    }
    Init(languageKeys: Array<{key: string, lang: string | number}>, defaultLan: string){
        if(!this.Initialized){
            this.LanguageKeys = languageKeys;
            this.DefaultLanguage = defaultLan;
            if(UrlHandler.Current) this.RouteData = UrlHandler.Current.RouteData;
        }
        this.Initialized = true;
    }

    Push(destination: string | undefined, lang: number | string | undefined, onSuccess?: Function){
        destination = this.Get(destination, lang);
        return Router.push(destination ?? "").then(() => onSuccess && onSuccess());
    }

    Get(destination: string | undefined, lang: number | string | undefined){
        if(!destination) return "";
        if(!this.RouteData || Object.keys(this.RouteData).length == 0){
            console.log("URL Mapping: Routes not registered: " + this.InstanceID);
            return destination;
        }
        if(lang) lang = lang.toString().toLocaleLowerCase();
                
        var obj = this.RouteData[destination];
        if(obj){
            var item = obj[lang ?? this.DefaultLanguage ?? "default"] as RouteItem
            if(!item) item = obj[Object.keys(obj)[0]]
            if(item){
                if(this.DefaultLanguage)
                    return item.source.replace("/" + this.DefaultLanguage, "");
                else
                    return item.source
            }

        }
        return destination;
    }

    async FindRoute(path: string, triggerNotFound: boolean = true): Promise<RouteItem | undefined>{
        if(!path) return;

        try {
            path = path.toLocaleLowerCase();

            var item = this.ReverseRouteData[path] as RouteItem;
            if(!item && triggerNotFound){
                if(this.OnRouteNotFound){
                    var newRoutes = await this.OnRouteNotFound(path);
                    if(newRoutes)
                        this.RegisterItems(newRoutes);
                }
                return this.FindRoute(path, false);
            }
            return item;
        } catch (error) {
            console.error(error);
        }
        return undefined;
    }

    Register(item: RouteItem | undefined){
        if(!item) return;
        if(!item.source && !item.fromURL) return;

        if(!item.source && item.fromURL) item.source = item.fromURL;
        if(!item.destination && item.toURL) item.destination = item.toURL;
        if(item.code == 301) item.permanent = true;
        if(item.code == 302) item.permanent = false;

        item.source = item.source.toLocaleLowerCase();
        item.language = this.DefaultLanguage;

        for (let index = 0; index < this.LanguageKeys.length; index++) {
            const element = this.LanguageKeys[index];
            if(item.source.startsWith(element.key) || trimChars(item.source, "/").startsWith(trimChars(element.key, "/"))){
                item.language = element.lang.toString().toLowerCase();
                break;
            }
        }
        this.ReverseRouteData[item.source] = item;

        if(!this.RouteData[item.destination])
            this.RouteData[item.destination] = {};
        this.RouteData[item.destination][item.language ?? this.DefaultLanguage ?? "default"] = item;
    }

    RegisterItems(items: undefined | Array<RouteItem>){
        if(!items || items.length == 0) return;
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            this.Register(element);
        }
    }
}

export class RouteItem {
    source: string = ""
    destination: string = ""
    fromURL?: string
    toURL?: string
    permanent?: boolean
    code?: number
    language?: number | string | undefined
}

const UrlHandler: { Current: UrlHandlerClass } = {
    Current: new UrlHandlerClass()
}
export default UrlHandler 